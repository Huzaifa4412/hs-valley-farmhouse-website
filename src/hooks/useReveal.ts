import { useEffect, type RefObject } from 'react';

/**
 * Progressively enhances elements marked with [data-reveal] with smooth
 * scroll-triggered entrance animations. Content stays accessible and visible
 * before, after, and in environments without Web Animations or IntersectionObserver.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || motion.matches || !('IntersectionObserver' in window)) return;

    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);

          if (!motion.matches && typeof target.animate === 'function') {
            const el = target as HTMLElement;
            const delay = parseFloat(el.dataset.revealDelay || '0');
            const direction = el.dataset.revealDirection || 'up';

            let fromTransform = 'translate3d(0, 32px, 0)';
            if (direction === 'left') fromTransform = 'translate3d(-32px, 0, 0)';
            else if (direction === 'right') fromTransform = 'translate3d(32px, 0, 0)';
            else if (direction === 'down') fromTransform = 'translate3d(0, -32px, 0)';
            else if (direction === 'scale') fromTransform = 'scale3d(0.95, 0.95, 1)';

            try {
              const anim = target.animate(
                [
                  { opacity: 0, transform: fromTransform },
                  { opacity: 1, transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' },
                ],
                {
                  duration: 800,
                  delay,
                  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  fill: 'forwards',
                }
              );
              animations.push(anim);
            } catch {
              // Gracefully continue if element cannot animate
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    root.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => {
        try {
          animation.cancel();
        } catch {
          // ignore
        }
      });
    };
  }, [ref]);
}
