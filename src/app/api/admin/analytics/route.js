import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { ensureVisitorTables } from "@/lib/visitorStore";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin({ allowTeamMember: true });
    if (!authorized) return response;

    await ensureVisitorTables();

    const { searchParams } = new URL(request.url);
    const rangeDays = Math.min(Math.max(parseInt(searchParams.get("days") || "14", 10), 7), 60);

    // Current date & yesterday in Dhaka timezone
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(now);

    const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(yesterdayDate);

    // 1. Fetch Today's Metrics
    let todayData = null;
    try {
      todayData = await prisma.dailyVisitor.findUnique({
        where: { date: todayStr },
      });
    } catch (_) {}

    // 2. Fetch Yesterday's Metrics
    let yesterdayData = null;
    try {
      yesterdayData = await prisma.dailyVisitor.findUnique({
        where: { date: yesterdayStr },
      });
    } catch (_) {}

    // 3. Fetch Range History for Interactive Chart
    let dailyRecords = [];
    try {
      dailyRecords = await prisma.dailyVisitor.findMany({
        orderBy: { date: "desc" },
        take: rangeDays,
      });
    } catch (_) {}

    // Construct continuous day sequence for chart (filling any missing days with 0)
    const historyMap = new Map();
    (dailyRecords || []).forEach((rec) => {
      historyMap.set(rec.date, rec);
    });

    const chartData = [];
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(d);
      const match = historyMap.get(dStr);
      chartData.push({
        date: dStr,
        label: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "Asia/Dhaka" }).format(d),
        uniqueVisits: match ? match.uniqueVisits : 0,
        pageViews: match ? match.pageViews : 0,
      });
    }

    // 4. Calculate Aggregate Totals
    let totalUnique = 0;
    let totalViews = 0;
    try {
      const allAggregates = await prisma.dailyVisitor.findMany();
      (allAggregates || []).forEach((row) => {
        totalUnique += row.uniqueVisits || 0;
        totalViews += row.pageViews || 0;
      });
    } catch (_) {}

    // 5. Recent Visitor Logs (last 15 visits)
    let recentLogs = [];
    try {
      recentLogs = await prisma.visitorLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 15,
      });
    } catch (_) {}

    // 6. Top Visited Pages & Device Stats
    let topPages = [];
    let deviceBreakdown = { Desktop: 0, Mobile: 0, Tablet: 0 };

    try {
      const logsForStats = await prisma.$queryRaw`
        SELECT "path", COUNT(*)::int as views
        FROM "VisitorLog"
        WHERE "createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY "path"
        ORDER BY views DESC
        LIMIT 6
      `;
      topPages = logsForStats || [];

      const deviceStats = await prisma.$queryRaw`
        SELECT "device", COUNT(*)::int as count
        FROM "VisitorLog"
        WHERE "createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY "device"
      `;
      (deviceStats || []).forEach((item) => {
        if (item.device && deviceBreakdown[item.device] !== undefined) {
          deviceBreakdown[item.device] = item.count;
        }
      });
    } catch (_) {}

    return NextResponse.json({
      today: {
        date: todayStr,
        uniqueVisits: todayData?.uniqueVisits || 0,
        pageViews: todayData?.pageViews || 0,
      },
      yesterday: {
        date: yesterdayStr,
        uniqueVisits: yesterdayData?.uniqueVisits || 0,
        pageViews: yesterdayData?.pageViews || 0,
      },
      allTime: {
        totalUniqueVisits: totalUnique,
        totalPageViews: totalViews,
      },
      chartData,
      topPages,
      deviceBreakdown,
      recentLogs,
    });
  } catch (error) {
    console.error("Admin Analytics GET Error:", error);
    return NextResponse.json({ error: "Failed to load visitor analytics" }, { status: 500 });
  }
}
