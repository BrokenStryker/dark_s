import { useState, useCallback } from 'react';

interface UseImageCarouselOptions {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
}

interface UseImageCarouselReturn {
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function useImageCarousel(
  totalImages: number,
  options: UseImageCarouselOptions = {}
): UseImageCarouselReturn {
  const { autoPlay = false, autoPlayInterval = 3000, loop = true } = options;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalImages - 1));
    }
  }, [totalImages, loop]);

  const goToPrevious = useCallback(() => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [totalImages, loop]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalImages) {
      setCurrentIndex(index);
    }
  }, [totalImages]);

  const canGoNext = loop || currentIndex < totalImages - 1;
  const canGoPrevious = loop || currentIndex > 0;

  // Auto-play effect can be added here if needed in the future
  // useEffect(() => {
  //   if (autoPlay && canGoNext) {
  //     const interval = setInterval(goToNext, autoPlayInterval);
  //     return () => clearInterval(interval);
  //   }
  // }, [autoPlay, autoPlayInterval, canGoNext, goToNext]);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    canGoNext,
    canGoPrevious
  };
}

// Multi-carousel hook for managing multiple carousels (like in services section)
interface UseMultiCarouselReturn {
  getCarouselIndex: (key: string) => number;
  goToNext: (key: string, totalImages: number) => void;
  goToPrevious: (key: string, totalImages: number) => void;
  goToIndex: (key: string, index: number) => void;
}

export function useMultiCarousel(): UseMultiCarouselReturn {
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  const getCarouselIndex = useCallback((key: string): number => {
    return carouselIndices[key] || 0;
  }, [carouselIndices]);

  const goToNext = useCallback((key: string, totalImages: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [key]: ((prev[key] || 0) + 1) % totalImages
    }));
  }, []);

  const goToPrevious = useCallback((key: string, totalImages: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [key]: ((prev[key] || 0) - 1 + totalImages) % totalImages
    }));
  }, []);

  const goToIndex = useCallback((key: string, index: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [key]: index
    }));
  }, []);

  return {
    getCarouselIndex,
    goToNext,
    goToPrevious,
    goToIndex
  };
}