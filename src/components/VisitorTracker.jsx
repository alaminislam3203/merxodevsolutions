"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiShieldOff } from "react-icons/fi";

export default function VisitorTracker() {
  const pathname = usePathname();
  const { data: authSession } = useSession();
  const lastTracked = useRef("");
  const visitorIdRef = useRef("");
  const chatSessionIdRef = useRef("");
  const [blockedInfo, setBlockedInfo] = useState(null);

  const userName = authSession?.user?.name || "";
  const userEmail = authSession?.user?.email || "";
  const userImage = authSession?.user?.image || "";

  // Ensure persistent visitorId and chatSessionId in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      let vid = localStorage.getItem("merxodev_visitor_id");
      if (!vid) {
        vid =
          "vis_" +
          Date.now().toString(36) +
          "_" +
          Math.random().toString(36).slice(2, 9);
        localStorage.setItem("merxodev_visitor_id", vid);
      }
      visitorIdRef.current = vid;

      let cid = localStorage.getItem("merxodev_chat_session_id");
      if (!cid) {
        cid =
          "mx_" +
          Date.now().toString(36) +
          "_" +
          Math.random().toString(36).slice(2, 8);
        localStorage.setItem("merxodev_chat_session_id", cid);
      }
      chatSessionIdRef.current = cid;
    } catch {}
  }, []);

  // Track Pageview on route change
  useEffect(() => {
    if (!pathname) return;

    // Do not track admin panel routes, internal API calls, or static assets
    if (
      pathname.startsWith("/709832") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      pathname.includes(".")
    ) {
      return;
    }

    const trackKey = `${pathname}|${userEmail}`;
    if (lastTracked.current === trackKey) return;
    lastTracked.current = trackKey;

    const sendPageview = async () => {
      try {
        const params = new URLSearchParams(window.location.search || "");
        const payload = {
          type: "pageview",
          visitorId:
            visitorIdRef.current || localStorage.getItem("merxodev_visitor_id") || "",
          chatSessionId:
            chatSessionIdRef.current ||
            localStorage.getItem("merxodev_chat_session_id") ||
            "",
          path: pathname,
          title: typeof document !== "undefined" ? document.title : pathname,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          screen:
            typeof window !== "undefined"
              ? `${window.innerWidth}x${window.innerHeight}`
              : "",
          language:
            typeof window !== "undefined"
              ? localStorage.getItem("lang") || navigator.language || "en"
              : "en",
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          userName,
          userEmail,
          userImage,
        };

        const res = await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.blocked) {
            setBlockedInfo(
              data.reason ||
                "Your access to this website has been restricted by the administrator."
            );
          } else if (data?.proactiveChat) {
            window.dispatchEvent(
              new CustomEvent("merxodev:proactive-chat", {
                detail: data.proactiveChat,
              })
            );
          }
        }
      } catch {}
    };

    let timer;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleHandle = window.requestIdleCallback(sendPageview, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleHandle);
    } else {
      timer = setTimeout(sendPageview, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname, userName, userEmail, userImage]);

  // Live Heartbeat every 20 seconds while tab is visible (tracks duration & online presence)
  useEffect(() => {
    if (
      !pathname ||
      pathname.startsWith("/709832") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api")
    ) {
      return;
    }

    const timer = setInterval(async () => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState !== "visible"
      ) {
        return;
      }

      try {
        const res = await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "heartbeat",
            visitorId:
              visitorIdRef.current ||
              localStorage.getItem("merxodev_visitor_id") ||
              "",
            chatSessionId:
              chatSessionIdRef.current ||
              localStorage.getItem("merxodev_chat_session_id") ||
              "",
            path: pathname,
            durationSec: 20,
            userName,
            userEmail,
            userImage,
          }),
          keepalive: true,
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.blocked) {
            setBlockedInfo(
              data.reason ||
                "Your access to this website has been restricted by the administrator."
            );
          } else if (data?.proactiveChat) {
            window.dispatchEvent(
              new CustomEvent("merxodev:proactive-chat", {
                detail: data.proactiveChat,
              })
            );
          }
        }
      } catch {}
    }, 20000);

    return () => clearInterval(timer);
  }, [pathname, userName, userEmail, userImage]);

  if (blockedInfo) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          background: "#060913",
          color: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 440,
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius: 20,
            padding: "36px 28px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
            }}
          >
            <FiShieldOff size={28} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px" }}>
            Access Restricted
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#94a3b8",
              lineHeight: 1.6,
              margin: "0 0 18px",
            }}
          >
            {blockedInfo}
          </p>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Protected by MerxoDev Security Firewall
          </div>
        </div>
      </div>
    );
  }

  return null;
}
