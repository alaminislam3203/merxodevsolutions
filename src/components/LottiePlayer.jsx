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

  useEffect(() => {
    let anim = null;
    let isMounted = true;
    setIsLoaded(false);

    // Defer lottie loading until initial hydration & paint completes to avoid TBT (Total Blocking Time)
    const timer = setTimeout(() => {
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
          }, 100);
        })
        .catch((err) => {
          console.error("Lottie load error:", err);
        });
    }, 120);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (anim) {
        try {
          anim.destroy();
        } catch (e) {}
      }
    };
  }, [animationPath, loop, autoplay]);

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
          opacity: isLoaded ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  );
}
