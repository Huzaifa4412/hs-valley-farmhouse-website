import { useEffect } from 'react';

/**
 * One rAF-throttled scroll loop driving every `[data-parallax]` element on the
 * page, mounted once from App. Only elements currently near the viewport are
 * written to, and only `transform` is touched, so the whole thing stays on the
 * compositor.
 *
 * Markup contract:
 *   data-parallax="0.16"        drift strength; negative moves the other way
 *   data-parallax-scale="1.12"  static scale kept alongside the drift, for
 *                               images that need headroom inside a clipped box
 *
 * Only ever attach this to an element whose container clips it (or that is
 * oversized), otherwise the drift will expose an edge.
 */
export function useParallax() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (elements.length === 0) return;

    const inView = new Set<HTMLElement>();
    let frame = 0;

    const draw = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      inView.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.12;
        const scale = Number(el.dataset.parallaxScale) || 1;
        const rect = el.getBoundingClientRect();
        // -1 when the element sits a viewport below centre, +1 a viewport above.
        const fromCentre = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const shift = Math.max(-1.25, Math.min(1.25, fromCentre)) * speed * viewportHeight * 0.5;
        el.style.transform =
          `translate3d(0, ${shift.toFixed(2)}px, 0)` + (scale === 1 ? '' : ` scale(${scale})`);
      });
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) inView.add(el);
          else inView.delete(el);
        });
        request();
      },
      { rootMargin: '15% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    request();

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      elements.forEach((el) => {
        el.style.removeProperty('transform');
      });
    };
  }, []);
}
