import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element scrolls into the viewport.
 * Uses IntersectionObserver for 60fps buttery hardware-accelerated performance.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (!options.repeat) {
          observer.unobserve(el);
        }
      } else if (options.repeat) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold ?? 0.12,
      rootMargin: options.rootMargin ?? '0px 0px -40px 0px'
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.repeat]);

  return [ref, isVisible];
}

/**
 * Reusable ScrollReveal wrapper component.
 * Makes any content pop or slide smoothly when scrolled into view.
 */
export default function ScrollReveal({ 
  children, 
  animation = 'slide-up', 
  delay = 0, 
  className = '',
  threshold = 0.12,
  repeat = false
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, repeat });

  const getAnimationStyles = () => {
    switch (animation) {
      case 'pop':
        return isVisible 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-[0.90] translate-y-6';
      case 'slide-left':
        return isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12';
      case 'slide-right':
        return isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-12';
      case 'fade':
        return isVisible 
          ? 'opacity-100' 
          : 'opacity-0';
      case 'slide-up':
      default:
        return isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-10 scale-[0.97]';
    }
  };

  return (
    <div
      ref={ref}
      style={{ 
        transitionDuration: '700ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity'
      }}
      className={`transition-all duration-700 ${getAnimationStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
