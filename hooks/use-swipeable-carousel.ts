import { useState, useCallback } from 'react';

export interface SwipeableCarouselConfig {
  totalItems: number;
  minSwipeDistance?: number;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  loop?: boolean;
}

export interface TouchHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export interface SwipeableCarouselReturn {
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  touchHandlers: TouchHandlers;
}

export function useSwipeableCarousel(config: SwipeableCarouselConfig): SwipeableCarouselReturn {
  const {
    totalItems,
    minSwipeDistance = 50,
    loop = true
  } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const goToNext = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
    }
  }, [totalItems, loop]);

  const goToPrevious = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [totalItems, loop]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [totalItems]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  }, [touchStart, touchEnd, minSwipeDistance, goToNext, goToPrevious]);

  const touchHandlers: TouchHandlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    touchHandlers
  };
}