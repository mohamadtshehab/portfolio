'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselDimensions, type MultiCarouselOpts } from '@/hooks/useCarouselDimensions';

const images = [
  '/consultation-app/1.jpg',
  '/consultation-app/2.jpg',
  '/consultation-app/3.jpg',
  '/consultation-app/4.jpg',
  '/consultation-app/5.jpg',
  '/consultation-app/6.jpg',
  '/consultation-app/7.jpg',
  '/consultation-app/8.jpg',
  '/consultation-app/9.jpg',
  '/consultation-app/10.jpg',
  '/consultation-app/11.jpg',
  '/consultation-app/12.jpg',
  '/consultation-app/13.jpg',
];

const GAP = 16;

const CAROUSEL_OPTS: MultiCarouselOpts = {
  mode: 'multi',
  targetPerView: 3,
  minSlideWidth: 88,
  aspectW: 9,
  aspectH: 16,
};

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { slideWidth, slideHeight, imagesPerView: IMAGES_PER_VIEW } = useCarouselDimensions(
    containerRef,
    GAP,
    CAROUSEL_OPTS,
  );

  const animationDuration = 500;

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= images.length - IMAGES_PER_VIEW) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (dotIndex: number) => {
    if (isAnimating || currentIndex === dotIndex) return;
    setIsAnimating(true);
    setCurrentIndex(dotIndex);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    const maxIdx = Math.max(0, images.length - IMAGES_PER_VIEW);
    setCurrentIndex((i) => Math.min(i, maxIdx));
  }, [IMAGES_PER_VIEW]);

  const numPages =
    images.length > 0 ? Math.max(0, images.length - IMAGES_PER_VIEW + 1) : 0;
  const translateXValue = -currentIndex * (slideWidth + GAP);

  const isPrevDisabledBoundary = currentIndex === 0;
  const isNextDisabledBoundary =
    currentIndex >= images.length - IMAGES_PER_VIEW || images.length <= IMAGES_PER_VIEW;

  return (
    <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-center px-1">
      <div className="relative flex w-full items-center justify-center px-8 sm:px-10">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabledBoundary}
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white disabled:opacity-30 disabled:hover:bg-white/80"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} className="text-neutral-800 sm:h-8 sm:w-8" />
        </button>

        <div ref={containerRef} className="mx-auto w-full max-w-full overflow-hidden rounded-lg">
          <div
            className="flex"
            style={{
              transform: `translateX(${translateXValue}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {images.map((src, index) => (
              <div
                key={src}
                className="relative flex-shrink-0"
                style={{
                  width: `${slideWidth}px`,
                  height: `${slideHeight}px`,
                  marginRight: index < images.length - 1 ? `${GAP}px` : '0px',
                }}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="rounded-md object-cover shadow-md"
                  sizes="(max-width: 768px) 33vw, 200px"
                  priority={index >= currentIndex && index < currentIndex + IMAGES_PER_VIEW}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabledBoundary}
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white disabled:opacity-30 disabled:hover:bg-white/80"
          aria-label="Next image"
        >
          <ChevronRight size={28} className="text-neutral-800 sm:h-8 sm:w-8" />
        </button>
      </div>

      {numPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: numPages }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => handleDotClick(dotIndex)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ease-in-out ${
                currentIndex === dotIndex
                  ? 'scale-125 bg-white'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to image group ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
