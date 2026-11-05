import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import {
  ensureVisitorTables,
  parseUserAgent,
  parseTrafficSource,
  resolveGeoAndIsp,
  isIpBlocked,
  getVisitorFingerprint,
} from "@/lib/visitorStore";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch (_) {
      body = {};
    }

    const eventType = body?.type === "heartbeat" ? "heartbeat" : "pageview";
    const path = typeof body?.path === "string" ? body.path.slice(0, 200) : "/";
    const pageTitle = typeof body?.title === "string" ? body.title.slice(0, 140) : "";
    const referrer = typeof body?.referrer === "string" ? body.referrer.slice(0, 300) : null;
    const screen = typeof body?.screen === "string" ? body.screen.slice(0, 30) : null;
    const language = typeof body?.language === "string" ? body.language.slice(0, 20) : null;
    const utmSource = typeof body?.utmSource === "string" ? body.utmSource.slice(0, 80) : null;
    const utmMedium = typeof body?.utmMedium === "string" ? body.utmMedium.slice(0, 80) : null;
    const utmCampaign = typeof body?.utmCampaign === "string" ? body.utmCampaign.slice(0, 80) : null;
    const chatSessionId = typeof body?.chatSessionId === "string" ? body.chatSessionId.slice(0, 80) : null;
    const userName = typeof body?.userName === "string" && body.userName.trim() ? body.userName.trim().slice(0, 100) : null;
    const userEmail = typeof body?.userEmail === "string" && body.userEmail.trim() ? body.userEmail.trim().slice(0, 120) : null;
    const userImage = typeof body?.userImage === "string" && body.userImage.trim() ? body.userImage.trim().slice(0, 350) : null;
    const durationSec = Math.min(Math.max(Number(body?.durationSec) || 20, 5), 60);

    // Discard internal admin and API telemetry
    if (path.startsWith("/709832") || path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ignored: true });
    }

    const userAgent = request.headers.get("user-agent") || "";

    // Bot detection filter
    if (/bot|crawl|spider|slurp|bingbot|googlebot|headlesschrome/i.test(userAgent)) {
      return NextResponse.json({ ignored: true });
    }

    await ensureVisitorTables();

    // Resolve IP, Location & ISP
    const geo = await resolveGeoAndIsp(request);
    const ip = geo.ip.length > 45 ? geo.ip.slice(0, 45) : geo.ip;

    // Check if IP is blocked by Admin
    const blockedRecord = await isIpBlocked(ip);
    if (blockedRecord) {
      return NextResponse.json({
        blocked: true,
        reason: blockedRecord.reason || "Your IP address has been restricted by the administrator.",
      });
    }

    const { device, os, deviceBrand, browser } = parseUserAgent(userAgent);
    const trafficSource = parseTrafficSource(referrer, utmSource);
    const visitorId = getVisitorFingerprint(ip, userAgent, body?.visitorId);

    // Determine current date in Asia/Dhaka timezone (YYYY-MM-DD)
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date());

    // Update or create VisitorSession in PostgreSQL
    try {
      const existingRows = await prisma.$queryRaw`
        SELECT * FROM "VisitorSession" WHERE "id" = ${visitorId} LIMIT 1
      `;
      const existing = existingRows?.[0] || null;

      if (existing) {
        if (eventType === "heartbeat") {
          await prisma.$executeRaw`
            UPDATE "VisitorSession"
            SET
              "lastSeenAt" = NOW(),
              "currentPage" = ${path},
              "totalDurationSec" = "totalDurationSec" + ${durationSec},
              "chatSessionId" = COALESCE(${chatSessionId}, "chatSessionId"),
              "userName" = COALESCE(${userName}, "userName"),
              "userEmail" = COALESCE(${userEmail}, "userEmail"),
              "userImage" = COALESCE(${userImage}, "userImage")
            WHERE "id" = ${visitorId}
          `;
        } else {
          // Pageview event: update journey array and counters
          let prevJourney = [];
          try {
            prevJourney = Array.isArray(existing.pagesVisited)
              ? existing.pagesVisited
              : JSON.parse(existing.pagesVisited || "[]");
          } catch {
            prevJourney = [];
          }

          const lastEntry = prevJourney[prevJourney.length - 1];
          if (!lastEntry || lastEntry.path !== path) {
            prevJourney.push({
              path,
              title: pageTitle || path,
              time: new Date().toISOString(),
            });
          }
          const trimmedJourney = JSON.stringify(prevJourney.slice(-40));
          const isNewDayVisit = existing.lastVisitDate !== today ? 1 : 0;

          await prisma.$executeRaw`
            UPDATE "VisitorSession"
            SET
              "lastSeenAt" = NOW(),
              "ip" = ${ip},
              "isp" = COALESCE(${geo.isp || null}, "isp"),
              "country" = COALESCE(${geo.country || null}, "country"),
              "countryName" = COALESCE(${geo.countryName || null}, "countryName"),
              "city" = COALESCE(${geo.city || null}, "city"),
              "region" = COALESCE(${geo.region || null}, "region"),
              "timezone" = COALESCE(${geo.timezone || null}, "timezone"),
              "latitude" = COALESCE(${geo.latitude || null}, "latitude"),
              "longitude" = COALESCE(${geo.longitude || null}, "longitude"),
              "device" = ${device},
              "os" = ${os},
              "deviceBrand" = ${deviceBrand},
              "browser" = ${browser},
              "screen" = COALESCE(${screen}, "screen"),
              "language" = COALESCE(${language}, "language"),
              "currentPage" = ${path},
              "pagesVisited" = ${trimmedJourney}::jsonb,
              "pageViews" = "pageViews" + 1,
              "visitCount" = "visitCount" + ${isNewDayVisit},
              "lastVisitDate" = ${today},
              "chatSessionId" = COALESCE(${chatSessionId}, "chatSessionId"),
              "userName" = COALESCE(${userName}, "userName"),
              "userEmail" = COALESCE(${userEmail}, "userEmail"),
              "userImage" = COALESCE(${userImage}, "userImage")
            WHERE "id" = ${visitorId}
          `;
        }
      } else {
        const initialJourney = JSON.stringify([
          {
            path,
            title: pageTitle || path,
            time: new Date().toISOString(),
          },
        ]);

        await prisma.$executeRaw`
          INSERT INTO "VisitorSession" (
            "id", "chatSessionId", "ip", "isp", "country", "countryName", "city", "region",
            "timezone", "latitude", "longitude", "device", "os", "deviceBrand", "browser",
            "screen", "language", "referrer", "trafficSource", "utmSource", "utmMedium",
            "utmCampaign", "currentPage", "pagesVisited", "pageViews", "visitCount",
            "totalDurationSec", "userName", "userEmail", "userImage", "lastVisitDate",
            "firstSeenAt", "lastSeenAt"
          )
          VALUES (
            ${visitorId}, ${chatSessionId}, ${ip}, ${geo.isp || null}, ${geo.country || "BD"},
            ${geo.countryName || "Bangladesh"}, ${geo.city || null}, ${geo.region || null},
            ${geo.timezone || "Asia/Dhaka"}, ${geo.latitude || null}, ${geo.longitude || null},
            ${device}, ${os}, ${deviceBrand}, ${browser}, ${screen}, ${language},
            ${referrer}, ${trafficSource}, ${utmSource}, ${utmMedium}, ${utmCampaign},
            ${path}, ${initialJourney}::jsonb, 1, 1, 0,
            ${userName}, ${userEmail}, ${userImage}, ${today}, NOW(), NOW()
          )
          ON CONFLICT ("id") DO UPDATE SET "lastSeenAt" = NOW()
        `;
      }
    } catch (sessionErr) {
      console.warn("VisitorSession upsert warning:", sessionErr?.message);
    }

    // Check if Admin sent a proactive message to this visitor's ChatSession
    let proactiveChat = null;
    if (chatSessionId) {
      try {
        const chatRows = await prisma.$queryRaw`
          SELECT "unreadVisitor", "mode", "lastMessage"
          FROM "ChatSession"
          WHERE "id" = ${chatSessionId}
          LIMIT 1
        `;
        if (chatRows && chatRows[0] && Number(chatRows[0].unreadVisitor) > 0) {
          proactiveChat = {
            unreadVisitor: Number(chatRows[0].unreadVisitor),
            mode: chatRows[0].mode,
            lastMessage: chatRows[0].lastMessage,
          };
        }
      } catch {}
    }

    // If it's a heartbeat, we don't need to insert a new VisitorLog or increment DailyVisitor pageviews
    if (eventType === "heartbeat") {
      return NextResponse.json({
        success: true,
        blocked: false,
        proactiveChat,
      });
    }

    // Pseudonymized daily hash to count unique daily visits
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
      isNewDailyVisitor = true;
    }

    // Record VisitorLog entry (using raw SQL so enriched columns work even before prisma generate)
    try {
      const logId = "vlog_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
      await prisma.$executeRaw`
        INSERT INTO "VisitorLog" (
          "id", "visitorHash", "visitorId", "ip", "isp", "path", "userAgent",
          "device", "os", "browser", "country", "city", "region", "referrer",
          "trafficSource", "date", "createdAt"
        )
        VALUES (
          ${logId}, ${visitorHash}, ${visitorId}, ${ip}, ${geo.isp || null}, ${path},
          ${userAgent.slice(0, 255)}, ${device}, ${os}, ${browser}, ${geo.country || "BD"},
          ${geo.city || null}, ${geo.region || null}, ${referrer}, ${trafficSource},
          ${today}, NOW()
        )
      `;
    } catch (logErr) {
      // Fallback to standard prisma create if needed
      try {
        await prisma.visitorLog.create({
          data: {
            visitorHash,
            ip,
            path,
            userAgent: userAgent.slice(0, 255),
            device,
            browser,
            country: geo.country || "BD",
            referrer,
            date: today,
          },
        });
      } catch {}
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

    return NextResponse.json({
      success: true,
      blocked: false,
      proactiveChat,
    });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Telemetry failed" }, { status: 500 });
  }
}
