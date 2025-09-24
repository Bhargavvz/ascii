import { useCallback, useRef } from 'react';

type ThrottledFunction<T extends unknown[]> = (...args: T) => void;
type DebouncedFunction<T extends unknown[]> = (...args: T) => void;

export const usePerformance = () => {
  const rafRef = useRef<number | undefined>(undefined);

  const throttle = useCallback(<T extends unknown[]>(func: (...args: T) => void, delay: number): ThrottledFunction<T> => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    
    return function (...args: T) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  const debounce = useCallback(<T extends unknown[]>(func: (...args: T) => void, delay: number): DebouncedFunction<T> => {
    let timeoutId: NodeJS.Timeout;
    
    return function (...args: T) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  const requestAnimationFrame = useCallback((callback: () => void) => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = window.requestAnimationFrame(callback);
  }, []);

  const cancelAnimation = useCallback(() => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
  }, []);

  return {
    throttle,
    debounce,
    requestAnimationFrame,
    cancelAnimation
  };
};

export const useVirtualization = (items: unknown[], containerHeight: number, itemHeight: number) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = 0; // In a real implementation, this would be calculated based on scroll position
  const endIndex = Math.min(startIndex + visibleCount, items.length);
  
  return {
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex,
    totalHeight: items.length * itemHeight
  };
};