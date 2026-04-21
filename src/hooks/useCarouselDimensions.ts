'use client';

import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

export type SingleCarouselOpts = {
  mode: 'single';
  maxSlideWidth: number;
  aspectW: number;
  aspectH: number;
};

export type MultiCarouselOpts = {
  mode: 'multi';
  targetPerView: number;
  minSlideWidth: number;
  aspectW: number;
  aspectH: number;
};

export type CarouselOpts = SingleCarouselOpts | MultiCarouselOpts;

export function useCarouselDimensions(
  containerRef: RefObject<HTMLDivElement | null>,
  gap: number,
  opts: CarouselOpts,
) {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const [dims, setDims] = useState({
    slideWidth: 300,
    slideHeight: 150,
    imagesPerView: 1,
    viewportWidth: 300,
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const o = optsRef.current;
      const cw = el.getBoundingClientRect().width;
      if (cw < 8) return;

      if (o.mode === 'single') {
        const slide = Math.min(o.maxSlideWidth, cw);
        const h = (slide / o.aspectW) * o.aspectH;
        setDims({
          slideWidth: slide,
          slideHeight: h,
          imagesPerView: 1,
          viewportWidth: slide,
        });
      } else {
        let perView = o.targetPerView;
        while (perView > 1) {
          const sw = (cw - (perView - 1) * gap) / perView;
          if (sw >= o.minSlideWidth) break;
          perView -= 1;
        }
        const slideW = (cw - (perView - 1) * gap) / perView;
        const h = (slideW / o.aspectW) * o.aspectH;
        setDims({
          slideWidth: slideW,
          slideHeight: h,
          imagesPerView: perView,
          viewportWidth: perView * slideW + (perView - 1) * gap,
        });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, gap]);

  return dims;
}
