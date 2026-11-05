import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { ensureVisitorTables } from "@/lib/visitorStore";
import {
  getOrCreateSession,
  addChatMessage,
  updateSessionState,
} from "@/lib/chatStore";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    await ensureVisitorTables();

    const { searchParams } = new URL(request.url);
    const chatSessionId = searchParams.get("chatSessionId");
    const ipQuery = searchParams.get("ip");

    // If querying a single visitor for Live Chat context
    if (chatSessionId || ipQuery) {
      let visitor = null;
      if (chatSessionId) {
        const rows = await prisma.$queryRaw`
          SELECT * FROM "VisitorSession"
          WHERE "chatSessionId" = ${chatSessionId}
          ORDER BY "lastSeenAt" DESC
          LIMIT 1
        `;
        visitor = rows?.[0] || null;
      }
      if (!visitor && ipQuery) {
        const rows = await prisma.$queryRaw`
          SELECT * FROM "VisitorSession"
          WHERE "ip" = ${ipQuery}
          ORDER BY "lastSeenAt" DESC
          LIMIT 1
        `;
        visitor = rows?.[0] || null;
      }
      if (visitor) {
        let pagesVisited = [];
        try {
          pagesVisited = Array.isArray(visitor.pagesVisited)
            ? visitor.pagesVisited
            : JSON.parse(visitor.pagesVisited || "[]");
        } catch {}
        const isOnline =
          Date.now() - new Date(visitor.lastSeenAt).getTime() <= 65000;
        return NextResponse.json({
          visitor: { ...visitor, pagesVisited, isOnline },
        });
      }
      return NextResponse.json({ visitor: null });
    }

    // Load Blocked IPs
    let blockedIps = [];
    try {
      blockedIps = await prisma.$queryRaw`
        SELECT * FROM "BlockedIp" ORDER BY "createdAt" DESC
      `;
    } catch {
      blockedIps = [];
    }
    const blockedIpSet = new Set((blockedIps || []).map((b) => b.ip));

    // Load recent VisitorSessions
    let rawVisitors = [];
    try {
      rawVisitors = await prisma.$queryRaw`
        SELECT * FROM "VisitorSession"
        ORDER BY "lastSeenAt" DESC
        LIMIT 200
      `;
    } catch {
      rawVisitors = [];
    }

    // If VisitorSession is empty but VisitorLog has legacy entries, backfill from VisitorLog
    if ((!rawVisitors || rawVisitors.length === 0)) {
      try {
        const legacyLogs = await prisma.visitorLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 50,
        });
        const seenHashes = new Map();
        for (const log of legacyLogs) {
          const key = log.visitorId || log.visitorHash || log.id;
          if (!seenHashes.has(key)) {
            seenHashes.set(key, {
              id: key,
              chatSessionId: null,
              ip: log.ip || "127.0.0.1",
              isp: log.isp || "Internet Provider",
              country: log.country || "BD",
              countryName: log.country === "BD" ? "Bangladesh" : log.country || "Bangladesh",
              city: log.city || "Dhaka",
              region: log.region || "",
              timezone: "Asia/Dhaka",
              device: log.device || "Desktop",
              os: log.os || "Windows / Mobile",
              deviceBrand: log.device === "Mobile" ? "Mobile Phone" : "PC",
              browser: log.browser || "Chrome",
              screen: "",
              language: "en",
              referrer: log.referrer || "",
              trafficSource: log.trafficSource || "Direct",
              currentPage: log.path || "/",
              pagesVisited: [{ path: log.path || "/", title: log.path || "/", time: log.createdAt }],
              pageViews: 1,
              visitCount: 1,
              totalDurationSec: 30,
              userName: null,
              userEmail: null,
              userImage: null,
              firstSeenAt: log.createdAt,
              lastSeenAt: log.createdAt,
            });
          } else {
            const existing = seenHashes.get(key);
            existing.pageViews += 1;
            existing.pagesVisited.push({
              path: log.path || "/",
              title: log.path || "/",
              time: log.createdAt,
            });
          }
        }
        rawVisitors = Array.from(seenHashes.values());
      } catch {}
    }

    const nowMs = Date.now();
    let onlineNow = 0;
    let returningCount = 0;
    let newCount = 0;
    let identifiedCount = 0;
    let totalDurationSum = 0;

    const locationMap = new Map();
    const sourceMap = new Map();
    const browserMap = new Map();
    const ispMap = new Map();
    const deviceBreakdown = { Desktop: 0, Mobile: 0, Tablet: 0 };

    const visitors = (rawVisitors || []).map((v) => {
      const lastSeenMs = v.lastSeenAt ? new Date(v.lastSeenAt).getTime() : 0;
      const isOnline = nowMs - lastSeenMs <= 65000;
      if (isOnline) onlineNow += 1;

      const visits = Number(v.visitCount || 1);
      const views = Number(v.pageViews || 1);
      if (visits > 1 || views > 2) returningCount += 1;
      else newCount += 1;

      if (v.userName || v.userEmail) identifiedCount += 1;
      totalDurationSum += Number(v.totalDurationSec || 0);

      // Breakdowns
      const dev = v.device || "Desktop";
      if (deviceBreakdown[dev] !== undefined) deviceBreakdown[dev] += 1;
      else deviceBreakdown.Desktop += 1;

      const locKey = `${v.city || "Unknown"}, ${v.countryName || v.country || "BD"}`;
      locationMap.set(locKey, {
        label: locKey,
        country: v.country || "BD",
        city: v.city || "Unknown",
        count: (locationMap.get(locKey)?.count || 0) + 1,
      });

      const srcKey = v.trafficSource || "Direct";
      sourceMap.set(srcKey, (sourceMap.get(srcKey) || 0) + 1);

      const brKey = v.browser || "Chrome";
      browserMap.set(brKey, (browserMap.get(brKey) || 0) + 1);

      const ispKey = v.isp || "Internet Provider";
      ispMap.set(ispKey, (ispMap.get(ispKey) || 0) + 1);

      let pagesVisited = [];
      try {
        pagesVisited = Array.isArray(v.pagesVisited)
          ? v.pagesVisited
          : JSON.parse(v.pagesVisited || "[]");
      } catch {
        pagesVisited = [];
      }

      return {
        ...v,
        pagesVisited,
        isOnline,
        isBlocked: Boolean(v.ip && blockedIpSet.has(v.ip)),
      };
    });

    // Today's metrics from DailyVisitor
    const todayStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
    }).format(new Date());
    let todayData = null;
    try {
      todayData = await prisma.dailyVisitor.findUnique({
        where: { date: todayStr },
      });
    } catch {}

    // Top pages from VisitorLog
    let topPages = [];
    try {
      topPages = await prisma.$queryRaw`
        SELECT "path", COUNT(*)::int as views
        FROM "VisitorLog"
        WHERE "createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY "path"
        ORDER BY views DESC
        LIMIT 8
      `;
    } catch {}

    const avgDurationSec =
      visitors.length > 0 ? Math.round(totalDurationSum / visitors.length) : 0;

    return NextResponse.json({
      stats: {
        onlineNow,
        totalTracked: visitors.length,
        todayUnique: todayData?.uniqueVisits || 0,
        todayPageViews: todayData?.pageViews || 0,
        returningCount,
        newCount,
        identifiedCount,
        avgDurationSec,
        blockedCount: (blockedIps || []).length,
      },
      visitors,
      blockedIps: blockedIps || [],
      breakdowns: {
        locations: Array.from(locationMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 8),
        sources: Array.from(sourceMap.entries())
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8),
        browsers: Array.from(browserMap.entries())
          .map(([browser, count]) => ({ browser, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6),
        isps: Array.from(ispMap.entries())
          .map(([isp, count]) => ({ isp, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6),
        devices: deviceBreakdown,
        topPages: topPages || [],
      },
    });
  } catch (error) {
    console.error("Admin Visitors GET Error:", error);
    return NextResponse.json(
      { error: "Failed to load visitor intelligence" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    await ensureVisitorTables();
    const body = await request.json();
    const action = body?.action;

    // 1. Block IP
    if (action === "block_ip") {
      const ip = String(body?.ip || "").trim();
      const reason =
        String(body?.reason || "Blocked by Administrator for suspicious activity").slice(0, 200);
      const visitorId = body?.visitorId ? String(body.visitorId) : null;
      const location = body?.location ? String(body.location) : null;

      if (!ip) {
        return NextResponse.json({ error: "IP address is required" }, { status: 400 });
      }

      await prisma.$executeRaw`
        INSERT INTO "BlockedIp" ("ip", "reason", "visitorId", "location", "createdAt")
        VALUES (${ip}, ${reason}, ${visitorId}, ${location}, NOW())
        ON CONFLICT ("ip") DO UPDATE SET "reason" = ${reason}, "createdAt" = NOW()
      `;

      return NextResponse.json({ success: true, ip });
    }

    // 2. Unblock IP
    if (action === "unblock_ip") {
      const ip = String(body?.ip || "").trim();
      if (!ip) {
        return NextResponse.json({ error: "IP address is required" }, { status: 400 });
      }
      await prisma.$executeRaw`
        DELETE FROM "BlockedIp" WHERE "ip" = ${ip}
      `;
      return NextResponse.json({ success: true, ip });
    }

    // 3. Send Proactive Live Chat Message to Visitor
    if (action === "proactive_message") {
      const visitorId = String(body?.visitorId || "").trim();
      const text = String(body?.text || "").trim();
      if (!text) {
        return NextResponse.json({ error: "Message text is required" }, { status: 400 });
      }

      const targetChatSessionId =
        body?.chatSessionId && String(body.chatSessionId).trim()
          ? String(body.chatSessionId).trim()
          : `mx_pro_${visitorId.slice(-8)}_${Date.now().toString(36)}`;

      const visitorName =
        body?.visitorName ||
        (body?.city ? `Visitor (${body.city})` : `Visitor #${visitorId.slice(-4).toUpperCase()}`);

      await getOrCreateSession(targetChatSessionId, {
        visitorName,
        visitorEmail: body?.visitorEmail || null,
        visitorImage: body?.visitorImage || null,
        ip: body?.ip || null,
        language: body?.language || "en",
      });

      await updateSessionState(targetChatSessionId, {
        mode: "live",
        needsHuman: false,
        visitorName,
      });

      await addChatMessage(targetChatSessionId, {
        sender: "admin",
        text,
      });

      if (visitorId) {
        try {
          await prisma.$executeRaw`
            UPDATE "VisitorSession"
            SET "chatSessionId" = ${targetChatSessionId}
            WHERE "id" = ${visitorId}
          `;
        } catch {}
      }

      return NextResponse.json({
        success: true,
        chatSessionId: targetChatSessionId,
      });
    }

    // 4. Delete single visitor record
    if (action === "delete_visitor") {
      const visitorId = String(body?.visitorId || "").trim();
      if (visitorId) {
        await prisma.$executeRaw`
          DELETE FROM "VisitorSession" WHERE "id" = ${visitorId}
        `;
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin Visitors POST Error:", error);
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
