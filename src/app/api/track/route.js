import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function parseClientDetails(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : (request.headers.get("x-real-ip") || "127.0.0.1");
  const userAgent = request.headers.get("user-agent") || "";
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "BD";

  let device = "Desktop";
  if (/mobile/i.test(userAgent)) device = "Mobile";
  else if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

  let browser = "Other";
  if (/edg/i.test(userAgent)) browser = "Edge";
  else if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
  else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
  else if (/opera|opr/i.test(userAgent)) browser = "Opera";

  return { ip, userAgent, country, device, browser };
}

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch (_) {
      body = {};
    }

    const path = typeof body?.path === "string" ? body.path.slice(0, 200) : "/";
    const referrer = typeof body?.referrer === "string" ? body.referrer.slice(0, 300) : null;

    // Discard internal admin and API telemetry
    if (path.startsWith("/709832") || path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ignored: true });
    }

    const { ip, userAgent, country, device, browser } = parseClientDetails(request);

    // Bot detection filter
    if (/bot|crawl|spider|slurp|bingbot|googlebot/i.test(userAgent)) {
      return NextResponse.json({ ignored: true });
    }

    // Determine current date in Asia/Dhaka timezone (YYYY-MM-DD)
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date());

    // Pseudonymized daily hash to protect user privacy while counting unique visits
    const visitorHash = crypto
      .createHash("sha256")
      .update(`${ip}-${userAgent}-${today}`)
      .digest("hex")
      .slice(0, 20);

    // Check if this visitor has already been recorded today
    let isNewDailyVisitor = false;
    try {
      const existing = await prisma.visitorLog.findFirst({
        where: {
          date: today,
          visitorHash,
        },
      });
      isNewDailyVisitor = !existing;
    } catch (_) {
      // Fallback
      isNewDailyVisitor = true;
    }

    // Record log entry
    try {
      await prisma.visitorLog.create({
        data: {
          visitorHash,
          ip: ip.length > 45 ? ip.slice(0, 45) : ip,
          path,
          userAgent: userAgent.slice(0, 255),
          device,
          browser,
          country,
          referrer,
          date: today,
        },
      });
    } catch (logErr) {
      console.warn("Failed to create VisitorLog record:", logErr);
    }

    // Upsert DailyVisitor aggregator
    try {
      await prisma.dailyVisitor.upsert({
        where: { date: today },
        create: {
          date: today,
          uniqueVisits: 1,
          pageViews: 1,
        },
        update: {
          uniqueVisits: isNewDailyVisitor ? { increment: 1 } : undefined,
          pageViews: { increment: 1 },
        },
      });
    } catch (upsertErr) {
      console.warn("Failed to upsert DailyVisitor:", upsertErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Telemetry failed" }, { status: 500 });
  }
}
