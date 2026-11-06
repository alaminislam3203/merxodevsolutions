import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    let targetUrl = String(body?.url || "").trim();
    if (!targetUrl) {
      return NextResponse.json({ error: "Please enter a website URL" }, { status: 400 });
    }
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const startMs = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    let html = "";
    let statusCode = 0;
    try {
      const res = await fetch(parsed.toString(), {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; MerxoDevSEOAuditor/1.0; +https://merxodevsolutions.pro.bd)",
          Accept: "text/html,application/xhtml+xml",
        },
        signal: controller.signal,
        redirect: "follow",
      });
      statusCode = res.status;
      html = await res.text();
    } catch (fetchErr) {
      clearTimeout(timeout);
      return NextResponse.json(
        {
          error: `Could not reach ${parsed.hostname} (${fetchErr.message || "Connection timeout"})`,
        },
        { status: 422 }
      );
    } finally {
      clearTimeout(timeout);
    }

    const responseTimeMs = Date.now() - startMs;
    const isHttps = parsed.protocol === "https:";

    // Extract SEO tags
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

    const descMatch =
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const description = descMatch ? descMatch[1].trim() : "";

    const viewportMatch = html.match(/<meta[^>]+name=["']viewport["']/i);
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["']/i);
    const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["']/i);
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["']/i);
    const schemaMatch = html.match(/application\/ld\+json/i);

    const h1Matches = html.match(/<h1\b[^>]*>/gi) || [];
    const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
    const imgsWithAlt = imgMatches.filter((tag) => /\balt=["'][^"']+["']/i.test(tag));

    const checks = [
      {
        label: "HTTPS SSL Encryption",
        passed: isHttps,
        detail: isHttps ? "Active HTTPS connection" : "Missing SSL / HTTPS security",
        points: 12,
      },
      {
        label: "Server Response Time (TTFB)",
        passed: responseTimeMs < 1200,
        detail: `${responseTimeMs} ms (${
          responseTimeMs < 500 ? "Blazing Fast" : responseTimeMs < 1200 ? "Good" : "Slow — Needs Optimization"
        })`,
        points: responseTimeMs < 600 ? 16 : responseTimeMs < 1200 ? 12 : 4,
      },
      {
        label: "SEO Title Tag",
        passed: title.length >= 15 && title.length <= 75,
        detail: title
          ? `"${title.slice(0, 65)}" (${title.length} chars)`
          : "Missing <title> tag",
        points: title ? 14 : 0,
      },
      {
        label: "Meta Description",
        passed: description.length >= 50 && description.length <= 180,
        detail: description
          ? `${description.length} characters (${
              description.length >= 50 ? "Optimal" : "Too short"
            })`
          : "Missing meta description tag",
        points: description ? 14 : 0,
      },
      {
        label: "Mobile Viewport Configuration",
        passed: Boolean(viewportMatch),
        detail: viewportMatch ? "Responsive viewport meta present" : "Missing mobile viewport tag",
        points: 10,
      },
      {
        label: "Heading Hierarchy (<H1> Tag)",
        passed: h1Matches.length === 1,
        detail:
          h1Matches.length === 1
            ? "Exactly 1 primary H1 heading found"
            : h1Matches.length === 0
            ? "No H1 heading found on page"
            : `Multiple H1 tags found (${h1Matches.length}) — recommend 1 primary H1`,
        points: h1Matches.length === 1 ? 10 : h1Matches.length > 1 ? 6 : 0,
      },
      {
        label: "OpenGraph Social Preview Tags",
        passed: Boolean(ogTitleMatch && ogImageMatch),
        detail:
          ogTitleMatch && ogImageMatch
            ? "og:title & og:image configured"
            : "Incomplete OpenGraph social tags",
        points: 8,
      },
      {
        label: "Canonical URL Tag",
        passed: Boolean(canonicalMatch),
        detail: canonicalMatch ? "Canonical link tag present" : "Missing canonical link tag",
        points: 6,
      },
      {
        label: "JSON-LD Structured Schema Data",
        passed: Boolean(schemaMatch),
        detail: schemaMatch
          ? "Schema.org JSON-LD detected"
          : "No JSON-LD structured data found for Google Rich Snippets",
        points: 5,
      },
      {
        label: "Image Alt Accessibility",
        passed: imgMatches.length === 0 || imgsWithAlt.length / imgMatches.length >= 0.7,
        detail: `${imgsWithAlt.length} of ${imgMatches.length} images have alt attributes`,
        points: 5,
      },
    ];

    const score = Math.min(
      100,
      checks.reduce((acc, c) => acc + (c.passed ? c.points : Math.floor(c.points * 0.2)), 0)
    );

    return NextResponse.json({
      url: parsed.toString(),
      hostname: parsed.hostname,
      statusCode,
      responseTimeMs,
      score,
      title,
      description,
      checks,
    });
  } catch (error) {
    console.error("POST /api/tools/website-audit error:", error);
    return NextResponse.json(
      { error: "Failed to audit website" },
      { status: 500 }
    );
  }
}

