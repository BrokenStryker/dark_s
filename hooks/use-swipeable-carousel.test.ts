import { renderHook, act } from '@testing-library/react';
import { useSwipeableCarousel } from './use-swipeable-carousel';

describe('useSwipeableCarousel', () => {
  const defaultConfig = {
    totalItems: 5
  };

  it('should initialize with first item', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    expect(result.current.currentIndex).toBe(0);
  });

  it('should go to next item', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('should go to previous item', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    // Start at item 2
    act(() => {
      result.current.goToIndex(2);
    });

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('should loop when reaching end (default behavior)', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    // Go to last item
    act(() => {
      result.current.goToIndex(4);
    });

    // Go next should loop to first
    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it('should loop when going before first item', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentIndex).toBe(4);
  });

  it('should not loop when loop is disabled', () => {
    const { result } = renderHook(() =>
      useSwipeableCarousel({ ...defaultConfig, loop: false })
    );

    // Go to last item
    act(() => {
      result.current.goToIndex(4);
    });

    // Try to go next - should stay at last item
    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(4);

    // Go to first item
    act(() => {
      result.current.goToIndex(0);
    });

    // Try to go previous - should stay at first item
    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it('should provide touch handlers', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    expect(result.current.touchHandlers).toHaveProperty('onTouchStart');
    expect(result.current.touchHandlers).toHaveProperty('onTouchMove');
    expect(result.current.touchHandlers).toHaveProperty('onTouchEnd');
    expect(typeof result.current.touchHandlers.onTouchStart).toBe('function');
    expect(typeof result.current.touchHandlers.onTouchMove).toBe('function');
    expect(typeof result.current.touchHandlers.onTouchEnd).toBe('function');
  });

  it('should go to specific index', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    act(() => {
      result.current.goToIndex(3);
    });

    expect(result.current.currentIndex).toBe(3);
  });

  it('should not go to invalid index', () => {
    const { result } = renderHook(() => useSwipeableCarousel(defaultConfig));

    act(() => {
      result.current.goToIndex(-1);
    });

    expect(result.current.currentIndex).toBe(0);

    act(() => {
      result.current.goToIndex(10);
    });

    expect(result.current.currentIndex).toBe(0);
  });
});