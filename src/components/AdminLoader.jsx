"use client";

export default function AdminLoader({
  fullScreen = false,
  title = "MerxoDev Control Center",
  label = "Synchronizing real-time agency data...",
  compact = false,
}) {
  return (
    <div
      style={{
        minHeight: fullScreen ? "100vh" : compact ? "260px" : "68vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: fullScreen ? "#080c18" : "transparent",
        color: "#f8fafc",
        padding: compact ? "32px 16px" : "48px 20px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <style>{`
        @keyframes mdxOrbitSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes mdxOrbitSpinReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes mdxPulseGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 28px rgba(249, 115, 22, 0.35), 0 0 60px rgba(99, 102, 241, 0.2);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 0 42px rgba(249, 115, 22, 0.55), 0 0 85px rgba(99, 102, 241, 0.35);
          }
        }
        @keyframes mdxProgressSweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(20%); }
          100% { transform: translateX(220%); }
        }
        @keyframes mdxDotBounce {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>

      {/* Ambient Background Glow */}
      <div
        style={{
          position: "absolute",
          width: compact ? 220 : 340,
          height: compact ? 220 : 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(249,115,22,0.08) 45%, transparent 72%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />

      {/* Glassmorphic Loader Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: compact ? "26px 32px" : "38px 46px",
          borderRadius: 24,
          background: "rgba(15, 23, 42, 0.68)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 24px 60px -12px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Dual Orbital Ring + Brand Emblem */}
        <div
          style={{
            position: "relative",
            width: compact ? 76 : 96,
            height: compact ? 76 : 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: compact ? 18 : 24,
          }}
        >
          {/* Outer Gradient Ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2.5px solid transparent",
              borderTopColor: "#f97316",
              borderRightColor: "#8b5cf6",
              animation: "mdxOrbitSpin 1.35s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite",
            }}
          />

          {/* Inner Counter-Rotating Ring */}
          <div
            style={{
              position: "absolute",
              inset: 9,
              borderRadius: "50%",
              border: "2px dashed rgba(56, 189, 248, 0.45)",
              borderBottomColor: "transparent",
              animation: "mdxOrbitSpinReverse 2.4s linear infinite",
            }}
          />

          {/* Center Favicon Emblem */}
          <div
            style={{
              width: compact ? 44 : 54,
              height: compact ? 44 : 54,
              borderRadius: 16,
              background: "linear-gradient(135deg, #f97316 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "mdxPulseGlow 2.2s ease-in-out infinite",
              border: "1px solid rgba(255, 255, 255, 0.22)",
            }}
          >
            <img
              src="/favicon.png"
              alt="MerxoDev"
              style={{
                width: compact ? 26 : 32,
                height: compact ? 26 : 32,
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Brand Logo */}
        {!compact && (
          <img
            src="/logo.png"
            alt="MerxoDev Solutions"
            style={{
              height: 26,
              width: "auto",
              objectFit: "contain",
              marginBottom: 12,
              opacity: 0.95,
            }}
          />
        )}

        {/* Title */}
        <div
          style={{
            fontSize: compact ? 14 : 16,
            fontWeight: 700,
            color: "#f8fafc",
            letterSpacing: "-0.2px",
            marginBottom: 6,
          }}
        >
          {title}
        </div>

        {/* Subtitle with Animated Dots */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12.5,
            color: "#94a3b8",
            fontWeight: 500,
            marginBottom: 20,
          }}
        >
          <span>{label}</span>
          <span
            style={{
              display: "inline-flex",
              gap: 2,
              marginLeft: 2,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#f97316",
                animation: "mdxDotBounce 1.4s infinite 0s",
              }}
            />
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#8b5cf6",
                animation: "mdxDotBounce 1.4s infinite 0.2s",
              }}
            />
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#38bdf8",
                animation: "mdxDotBounce 1.4s infinite 0.4s",
              }}
            />
          </span>
        </div>

        {/* Sleek Shimmer Progress Bar */}
        <div
          style={{
            width: "100%",
            height: 5,
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.06)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "45%",
              height: "100%",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #f97316 0%, #8b5cf6 55%, #38bdf8 100%)",
              boxShadow: "0 0 12px rgba(139, 92, 246, 0.6)",
              animation: "mdxProgressSweep 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

