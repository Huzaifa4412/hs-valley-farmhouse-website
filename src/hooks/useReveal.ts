import { useEffect, type RefObject } from 'react';

/** Content stays visible before, after, and without animation support. */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || motion.matches || !('IntersectionObserver' in window)) return;

    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (!motion.matches && typeof target.animate === 'function') {
          animations.push(target.animate(
            [{ transform: 'translateY(18px)' }, { transform: 'translateY(0)' }],
            { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
          ));
        }
      });
    }, { threshold: 0.08 });

    root.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
    };
  }, [ref]);
}
