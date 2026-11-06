import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ||
    "MerxoDev Solutions — Custom Web & App Engineering";
  const tag = searchParams.get("tag") || "Next.js 16 • Full-Stack • SaaS • E-Commerce";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060914",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.32), transparent 55%), radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.28), transparent 55%)",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #f97316, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 900,
              }}
            >
              M
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              MerxoDev Solutions
            </div>
          </div>

          <div
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              background: "rgba(249, 115, 22, 0.16)",
              border: "1px solid rgba(249, 115, 22, 0.45)",
              color: "#fb923c",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {tag}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-1px",
              color: "#f8fafc",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            High-performance Custom Websites, SaaS Web Apps & E-Commerce Solutions engineered in Bangladesh.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#cbd5e1",
          }}
        >
          <div>merxodevsolutions.pro.bd</div>
          <div style={{ color: "#38bdf8", fontWeight: 700 }}>
            +880 1313-334279 • 24/7 Support
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
