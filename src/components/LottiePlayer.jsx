"use client";
import { useEffect, useRef, useState } from "react";

export default function LottiePlayer({
  animationPath,
  loop = true,
  autoplay = true,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  // 1. Observe intersection so we don't load or parse heavy Lottie on initial paint or off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: "150px" }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      setInView(true);
    }
  }, []);

  // 2. Only load lottie-web when visible & main thread is idle (drastically cuts TBT)
  useEffect(() => {
    if (!inView) return;

    let anim = null;
    let isMounted = true;
    setIsLoaded(false);

    const initLottie = () => {
      import("lottie-web/build/player/lottie_light")
        .catch(() => import("lottie-web"))
        .then((lottieModule) => {
          if (!isMounted || !containerRef.current) return;
          const lottie = lottieModule.default || lottieModule;

          // Clear previous children in container
          if (containerRef.current) {
            containerRef.current.innerHTML = "";
          }

          anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop,
            autoplay,
            path: animationPath,
          });

          anim.addEventListener("DOMLoaded", () => {
            if (isMounted) setIsLoaded(true);
          });
          anim.addEventListener("data_ready", () => {
            if (isMounted) setIsLoaded(true);
          });
          setTimeout(() => {
            if (isMounted) setIsLoaded(true);
          }, 150);
        })
        .catch((err) => {
          console.error("Lottie load error:", err);
        });
    };

    // Use requestIdleCallback if available, otherwise deferred timeout
    let timer;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleHandle = window.requestIdleCallback(initLottie, { timeout: 2000 });
      return () => {
        isMounted = false;
        window.cancelIdleCallback(idleHandle);
        if (anim) {
          try {
            anim.destroy();
          } catch (e) {}
        }
      };
    } else {
      timer = setTimeout(initLottie, 500);
      return () => {
        isMounted = false;
        clearTimeout(timer);
        if (anim) {
          try {
            anim.destroy();
          } catch (e) {}
        }
      };
    }
  }, [inView, animationPath, loop, autoplay]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        ...style,
      }}
      className={className}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isLoaded ? 1 : 0.6,
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  );
}
