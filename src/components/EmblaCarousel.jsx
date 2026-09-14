"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButtons";

/**
 * EmblaCarousel — shared embla-powered carousel.
 *
 * Props:
 *  children     – slide elements
 *  autoplay     – enable autoplay (default false)
 *  dragFree     – enable free-drag (default false)
 *  arrowButtons – show prev/next arrow buttons (default false)
 *  dotButtons   – show dot navigation (default false)
 */
export default function EmblaCarousel({
  children,
  autoplay = false,
  dragFree = false,
  arrowButtons = false,
  dotButtons = false,
}) {
  const plugins = autoplay ? [Autoplay({ delay: 4000, stopOnInteraction: false })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { dragFree, slidesToScroll: "auto", loop: true },
    plugins
  );

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;
    const resetOrStop =
      autoplayPlugin.options.stopOnInteraction === false
        ? autoplayPlugin.reset
        : autoplayPlugin.stop;
    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <div className="embla-root">
      <div className="embla-viewport" ref={emblaRef}>
        <div className="embla-container">{children}</div>
      </div>

      {arrowButtons && (
        <>
          <div className="embla-arrow embla-arrow-prev hidden md:block">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          </div>
          <div className="embla-arrow embla-arrow-next hidden md:block">
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </>
      )}

      {dotButtons && scrollSnaps.length > 1 && (
        <div className="embla-pill-indicator">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onDotButtonClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`embla-pill-dot ${index === selectedIndex ? "embla-pill-dot-active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
