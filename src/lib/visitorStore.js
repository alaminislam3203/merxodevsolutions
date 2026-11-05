import crypto from "crypto";
import prisma from "@/lib/prisma";

let visitorTablesInitialized = false;

// In-memory Geo-IP cache to avoid redundant lookups for the same IP
const geoCache = new Map();

export async function ensureVisitorTables() {
  if (visitorTablesInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "VisitorSession" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "chatSessionId" TEXT,
        "ip" TEXT,
        "isp" TEXT,
        "country" TEXT NOT NULL DEFAULT 'BD',
        "countryName" TEXT NOT NULL DEFAULT 'Bangladesh',
        "city" TEXT,
        "region" TEXT,
        "timezone" TEXT,
        "latitude" TEXT,
        "longitude" TEXT,
        "device" TEXT NOT NULL DEFAULT 'Desktop',
        "os" TEXT,
        "deviceBrand" TEXT,
        "browser" TEXT,
        "screen" TEXT,
        "language" TEXT,
        "referrer" TEXT,
        "trafficSource" TEXT NOT NULL DEFAULT 'Direct',
        "utmSource" TEXT,
        "utmMedium" TEXT,
        "utmCampaign" TEXT,
        "currentPage" TEXT NOT NULL DEFAULT '/',
        "pagesVisited" JSONB NOT NULL DEFAULT '[]'::jsonb,
        "pageViews" INTEGER NOT NULL DEFAULT 1,
        "visitCount" INTEGER NOT NULL DEFAULT 1,
        "totalDurationSec" INTEGER NOT NULL DEFAULT 0,
        "userName" TEXT,
        "userEmail" TEXT,
        "userImage" TEXT,
        "lastVisitDate" TEXT,
        "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "VisitorSession_lastSeenAt_idx" ON "VisitorSession"("lastSeenAt" DESC);
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "VisitorSession_ip_idx" ON "VisitorSession"("ip");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "VisitorSession_chatSessionId_idx" ON "VisitorSession"("chatSessionId");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "BlockedIp" (
        "ip" TEXT NOT NULL PRIMARY KEY,
        "reason" TEXT,
        "visitorId" TEXT,
        "location" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add enriched columns to VisitorLog if not already present
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "VisitorLog" ADD COLUMN IF NOT EXISTS "city" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "VisitorLog" ADD COLUMN IF NOT EXISTS "region" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "VisitorLog" ADD COLUMN IF NOT EXISTS "isp" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "VisitorLog" ADD COLUMN IF NOT EXISTS "os" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "VisitorLog" ADD COLUMN IF NOT EXISTS "trafficSource" TEXT;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "VisitorLog" ADD COLUMN IF NOT EXISTS "visitorId" TEXT;
    `);

    visitorTablesInitialized = true;
  } catch (err) {
    console.warn("ensureVisitorTables warning:", err?.message);
  }
}

/**
 * Parse User-Agent into Device Type, OS, Brand/Model, and Browser
 */
export function parseUserAgent(ua = "") {
  const userAgent = String(ua || "");

  // 1. Device Type
  let device = "Desktop";
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    device = "Tablet";
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(userAgent)) {
    device = "Mobile";
  }

  // 2. Operating System
  let os = "Unknown OS";
  if (/windows nt 10\.0/i.test(userAgent)) os = "Windows 10/11";
  else if (/windows nt 6\.3/i.test(userAgent)) os = "Windows 8.1";
  else if (/windows nt 6\.2/i.test(userAgent)) os = "Windows 8";
  else if (/windows nt 6\.1/i.test(userAgent)) os = "Windows 7";
  else if (/windows/i.test(userAgent)) os = "Windows";
  else if (/android/i.test(userAgent)) {
    const match = userAgent.match(/Android\s+([\d.]+)/i);
    os = match ? `Android ${match[1].split(".")[0]}` : "Android";
  } else if (/iphone|ipod/i.test(userAgent)) {
    const match = userAgent.match(/OS\s+([\d_]+)/i);
    os = match ? `iOS ${match[1].split("_")[0]}` : "iOS";
  } else if (/ipad/i.test(userAgent)) {
    os = "iPadOS";
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    os = "macOS";
  } else if (/cros/i.test(userAgent)) {
    os = "ChromeOS";
  } else if (/linux/i.test(userAgent)) {
    os = "Linux";
  }

  // 3. Device Brand / Hardware
  let deviceBrand = device === "Desktop" ? "PC / Workstation" : "Mobile Device";
  if (/iphone/i.test(userAgent)) deviceBrand = "Apple iPhone";
  else if (/ipad/i.test(userAgent)) deviceBrand = "Apple iPad";
  else if (/macintosh|mac os x/i.test(userAgent)) deviceBrand = "Apple Mac";
  else if (/samsung|sm-|gt-/i.test(userAgent)) deviceBrand = "Samsung Galaxy";
  else if (/redmi|xiaomi|poco|mi\s/i.test(userAgent)) deviceBrand = "Xiaomi / Redmi";
  else if (/vivo/i.test(userAgent)) deviceBrand = "Vivo";
  else if (/oppo|cph/i.test(userAgent)) deviceBrand = "Oppo";
  else if (/realme|rmx/i.test(userAgent)) deviceBrand = "Realme";
  else if (/oneplus/i.test(userAgent)) deviceBrand = "OnePlus";
  else if (/huawei|honor/i.test(userAgent)) deviceBrand = "Huawei / Honor";
  else if (/pixel/i.test(userAgent)) deviceBrand = "Google Pixel";
  else if (/infinix/i.test(userAgent)) deviceBrand = "Infinix";
  else if (/tecno/i.test(userAgent)) deviceBrand = "Tecno";
  else if (/symphony/i.test(userAgent)) deviceBrand = "Symphony";
  else if (/walton/i.test(userAgent)) deviceBrand = "Walton";
  else if (/windows/i.test(userAgent)) deviceBrand = "Windows PC";
  else if (/linux/i.test(userAgent) && device === "Desktop") deviceBrand = "Linux PC";

  // 4. Browser
  let browser = "Browser";
  if (/FBAN|FBAV|FB_IAB/i.test(userAgent)) browser = "Facebook App";
  else if (/Instagram/i.test(userAgent)) browser = "Instagram App";
  else if (/WhatsApp/i.test(userAgent)) browser = "WhatsApp";
  else if (/LinkedInApp/i.test(userAgent)) browser = "LinkedIn App";
  else if (/edg/i.test(userAgent)) browser = "Edge";
  else if (/opr|opera/i.test(userAgent)) browser = "Opera";
  else if (/ucbrowser/i.test(userAgent)) browser = "UC Browser";
  else if (/samsungbrowser/i.test(userAgent)) browser = "Samsung Internet";
  else if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
  else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
  else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) browser = "Safari";

  return { device, os, deviceBrand, browser };
}

/**
 * Parse Traffic Source from referrer URL & UTM parameters
 */
export function parseTrafficSource(referrer = "", utmSource = "") {
  if (utmSource) {
    const s = utmSource.toLowerCase();
    if (s.includes("fb") || s.includes("facebook")) return "Facebook";
    if (s.includes("google")) return "Google";
    if (s.includes("linkedin")) return "LinkedIn";
    if (s.includes("whatsapp") || s.includes("wa")) return "WhatsApp";
    if (s.includes("instagram") || s.includes("ig")) return "Instagram";
    if (s.includes("youtube") || s.includes("yt")) return "YouTube";
    return utmSource.slice(0, 40);
  }

  if (!referrer) return "Direct";
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes("merxodevsolutions") || host.includes("localhost") || host.includes("127.0.0.1")) {
      return "Direct";
    }
    if (host.includes("google.")) return "Google Search";
    if (host.includes("bing.")) return "Bing Search";
    if (host.includes("yahoo.")) return "Yahoo Search";
    if (host.includes("duckduckgo.")) return "DuckDuckGo";
    if (host.includes("facebook.") || host.includes("fb.com") || host.includes("m.facebook")) return "Facebook";
    if (host.includes("instagram.")) return "Instagram";
    if (host.includes("linkedin.") || host.includes("lnkd.in")) return "LinkedIn";
    if (host.includes("youtube.") || host.includes("youtu.be")) return "YouTube";
    if (host.includes("whatsapp.") || host.includes("wa.me")) return "WhatsApp";
    if (host.includes("twitter.") || host.includes("t.co") || host.includes("x.com")) return "X / Twitter";
    if (host.includes("github.")) return "GitHub";
    if (host.includes("chatgpt.") || host.includes("openai.")) return "ChatGPT AI";
    if (host.includes("gemini.google") || host.includes("perplexity.ai") || host.includes("claude.ai")) return "AI Search";
    return host.replace(/^www\./, "").slice(0, 45);
  } catch {
    return "Direct";
  }
}

/**
 * Resolve IP, Geolocation, and ISP from headers + free Geo-IP APIs
 */
export async function resolveGeoAndIsp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const rawIp = forwarded
    ? forwarded.split(",")[0].trim()
    : request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "127.0.0.1";

  const ip = rawIp === "::1" ? "127.0.0.1" : rawIp.replace(/^::ffff:/, "");

  // Extract Vercel / Cloudflare edge geolocation headers if available
  const headerCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";
  const headerCity =
    decodeURIComponent(request.headers.get("x-vercel-ip-city") || "") ||
    request.headers.get("cf-ipcity") ||
    "";
  const headerRegion =
    decodeURIComponent(request.headers.get("x-vercel-ip-country-region") || "") || "";
  const headerTimezone = request.headers.get("x-vercel-ip-timezone") || "";
  const headerLat = request.headers.get("x-vercel-ip-latitude") || "";
  const headerLon = request.headers.get("x-vercel-ip-longitude") || "";

  // Check in-memory cache first
  if (geoCache.has(ip)) {
    const cached = geoCache.get(ip);
    if (Date.now() - cached.timestamp < 6 * 60 * 60 * 1000) {
      return { ip, ...cached.data };
    }
  }

  // Localhost / private network fallback
  const isPrivateIp =
    ip === "127.0.0.1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.16.");

  if (isPrivateIp) {
    const localData = {
      country: headerCountry || "BD",
      countryName: "Bangladesh",
      city: headerCity || "Rangpur (Local Dev)",
      region: headerRegion || "Rangpur Division",
      timezone: headerTimezone || "Asia/Dhaka",
      latitude: headerLat || "25.7439",
      longitude: headerLon || "89.2752",
      isp: "Local Development Network",
    };
    geoCache.set(ip, { timestamp: Date.now(), data: localData });
    return { ip, ...localData };
  }

  // Query free Geo-IP API (ipwho.is) for ISP, City, Country, Coordinates
  let geo = {
    country: headerCountry || "BD",
    countryName: headerCountry === "BD" || !headerCountry ? "Bangladesh" : headerCountry,
    city: headerCity || "Unknown City",
    region: headerRegion || "",
    timezone: headerTimezone || "Asia/Dhaka",
    latitude: headerLat || "",
    longitude: headerLon || "",
    isp: "Internet Provider",
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2200);
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        geo = {
          country: data.country_code || geo.country || "BD",
          countryName: data.country || geo.countryName || "Bangladesh",
          city: data.city || geo.city || "Unknown City",
          region: data.region || geo.region || "",
          timezone: data.timezone?.id || geo.timezone || "Asia/Dhaka",
          latitude: data.latitude ? String(data.latitude) : geo.latitude,
          longitude: data.longitude ? String(data.longitude) : geo.longitude,
          isp:
            data.connection?.isp ||
            data.connection?.org ||
            data.isp ||
            geo.isp,
        };
      }
    }
  } catch {
    // Fallback to ip-api.com if ipwho.is timed out
    try {
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), 1800);
      const res2 = await fetch(
        `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city,lat,lon,timezone,isp,org`,
        { signal: controller2.signal }
      );
      clearTimeout(timeout2);
      if (res2.ok) {
        const d2 = await res2.json();
        if (d2 && d2.status === "success") {
          geo = {
            country: d2.countryCode || geo.country,
            countryName: d2.country || geo.countryName,
            city: d2.city || geo.city,
            region: d2.regionName || geo.region,
            timezone: d2.timezone || geo.timezone,
            latitude: d2.lat ? String(d2.lat) : geo.latitude,
            longitude: d2.lon ? String(d2.lon) : geo.longitude,
            isp: d2.isp || d2.org || geo.isp,
          };
        }
      }
    } catch {}
  }

  geoCache.set(ip, { timestamp: Date.now(), data: geo });
  return { ip, ...geo };
}

/**
 * Check if an IP address is blocked
 */
export async function isIpBlocked(ip) {
  if (!ip) return false;
  await ensureVisitorTables();
  try {
    const rows = await prisma.$queryRaw`
      SELECT "ip", "reason" FROM "BlockedIp" WHERE "ip" = ${ip} LIMIT 1
    `;
    return rows && rows.length > 0 ? rows[0] : null;
  } catch {
    return null;
  }
}

/**
 * Generate a deterministic visitor ID if client did not provide one
 */
export function getVisitorFingerprint(ip, userAgent, clientVisitorId) {
  if (clientVisitorId && typeof clientVisitorId === "string" && clientVisitorId.length >= 6) {
    return clientVisitorId.slice(0, 64);
  }
  return (
    "vis_" +
    crypto
      .createHash("sha256")
      .update(`${ip}-${userAgent}`)
      .digest("hex")
      .slice(0, 18)
  );
}

