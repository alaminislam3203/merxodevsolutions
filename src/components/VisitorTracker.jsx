"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTracked = useRef("");

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

    // Debounce exact path repeat in quick succession within the same session
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    try {
      const payload = JSON.stringify({
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        screen: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "",
      });

      // Prefer navigator.sendBeacon for zero-latency background transmission
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/track", blob);
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch (_) {
      // Non-critical telemetry silently handled
    }
  }, [pathname]);

  return null;
}
