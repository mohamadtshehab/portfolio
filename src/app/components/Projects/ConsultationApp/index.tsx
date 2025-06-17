'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Original image paths from your example
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

// Configuration for image dimensions and layout from your snippet
const IMAGE_ASPECT_RATIO_W = 9;
const IMAGE_ASPECT_RATIO_H = 16;
const IMAGE_BASE_WIDTH = 200;

const IMAGE_WIDTH = IMAGE_BASE_WIDTH;
const IMAGE_HEIGHT = (IMAGE_BASE_WIDTH / IMAGE_ASPECT_RATIO_W) * IMAGE_ASPECT_RATIO_H;
const IMAGES_PER_VIEW = 3;
const GAP = 16; // Gap between images in pixels

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationDuration = 500; // Corresponds to 'transform 0.5s'

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return; // Prevent action if animating or at boundary
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= images.length - IMAGES_PER_VIEW) return; // Prevent action if animating or at boundary
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDotClick = (dotIndex) => {
    if (isAnimating || currentIndex === dotIndex) return; // Prevent action if animating or dot is current
    setIsAnimating(true);
    setCurrentIndex(dotIndex);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  const numPages = images.length > 0 ? Math.max(0, images.length - IMAGES_PER_VIEW + 1) : 0;
  const translateXValue = -currentIndex * (IMAGE_WIDTH + GAP);
  const viewportWidth = IMAGES_PER_VIEW * IMAGE_WIDTH + (IMAGES_PER_VIEW - 1) * GAP;

  const isPrevDisabledBoundary = currentIndex === 0;
  const isNextDisabledBoundary = currentIndex >= images.length - IMAGES_PER_VIEW || images.length <= IMAGES_PER_VIEW;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-8">
      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={handlePrev}
          disabled={isPrevDisabledBoundary}
          className="absolute left-0 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-md disabled:opacity-30 disabled:hover:bg-white/80"
          style={{ top: '50%', transform: `translateY(-50%) translateX(-40%)` }}
          aria-label="Previous image"
        >
          <ChevronLeft size={32} className="text-neutral-800"/>
        </button>

        <div
          className="overflow-hidden rounded-lg"
          style={{ width: `${viewportWidth}px` }}
        >
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
                  width: `${IMAGE_WIDTH}px`,
                  height: `${IMAGE_HEIGHT}px`,
                  marginRight: index < images.length - 1 ? `${GAP}px` : '0px',
                }}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md shadow-md"
                  priority={index >= currentIndex && index < currentIndex + IMAGES_PER_VIEW}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={isNextDisabledBoundary}
          className="absolute right-0 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-md disabled:opacity-30 disabled:hover:bg-white/80"
          style={{ top: '50%', transform: `translateY(-50%) translateX(40%)` }}
          aria-label="Next image"
        >
          <ChevronRight size={32} className="text-neutral-800"/>
        </button>
      </div>

      {/* Dots Indicator */}
      {numPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: numPages }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => handleDotClick(dotIndex)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out
                ${ currentIndex === dotIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/20 hover:bg-white/40'
                }
              `}
              aria-label={`Go to image group ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;