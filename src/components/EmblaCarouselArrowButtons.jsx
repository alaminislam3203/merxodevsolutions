'use client';

import { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const usePrevNextButtons = (emblaApi, onButtonClick) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick };
};

export function PrevButton({ children, onClick, disabled, className = '', style, ...restProps }) {
  return (
    <button
      className={`embla-prev-btn group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-r-md rounded-l-none bg-white/85 hover:bg-white dark:bg-zinc-900/85 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-l-0 border-white/90 dark:border-zinc-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/50 shadow-md hover:shadow-lg hover:shadow-indigo-500/20 dark:shadow-black/50 dark:hover:shadow-indigo-500/25 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 select-none cursor-pointer ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
      aria-label="আগের স্লাইড"
      {...restProps}
    >
      <FaArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {children}
    </button>
  );
}

export function NextButton({ children, onClick, disabled, className = '', style, ...restProps }) {
  return (
    <button
      className={`embla-next-btn group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-l-md rounded-r-none bg-white/85 hover:bg-white dark:bg-zinc-900/85 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-r-0 border-white/90 dark:border-zinc-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/50 shadow-md hover:shadow-lg hover:shadow-indigo-500/20 dark:shadow-black/50 dark:hover:shadow-indigo-500/25 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 select-none cursor-pointer ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
      aria-label="পরের স্লাইড"
      {...restProps}
    >
      <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      {children}
    </button>
  );
}
