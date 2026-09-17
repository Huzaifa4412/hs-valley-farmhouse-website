import { useEffect, type RefObject } from 'react';

/**
 * Scroll reveals for every `[data-reveal]` element inside `ref`.
 *
 * Progressive enhancement, deliberately: an element is only hidden once this
 * hook has attached an observer that can bring it back, and anything already
 * on screen is never hidden at all. Without JS, without IntersectionObserver,
 * or with reduced motion requested, the page renders exactly as authored.
 *
 * Markup contract:
 *   data-reveal="up|fade|left|right|scale|mask|blur"   variant (default: up)
 *   data-reveal-delay="180"                            explicit delay, ms
 *   data-reveal-stagger="80"                           on a parent, staggers
 *                                                      its revealing children
 *
 * `deps` re-runs the sweep when a section swaps its own content (filters,
 * "show all"), so freshly mounted nodes are picked up too.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = ref.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const managed: HTMLElement[] = [];
    // An element is not always its own trigger: a masked line is translated
    // clean out of its overflow-hidden wrapper, and IntersectionObserver
    // clips against ancestors, so it would never register as intersecting.
    // Those watch the wrapper instead, which never moves.
    const triggers = new Map<Element, HTMLElement[]>();

    const reveal = (el: HTMLElement) => {
      el.dataset.revealState = 'shown';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          (triggers.get(entry.target) ?? []).forEach(reveal);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' },
    );

    const viewportHeight = window.innerHeight;

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      managed.push(el);

      // Delay: the element's own, else its turn in a staggering parent.
      let delay = Number(el.dataset.revealDelay ?? 0);
      const parent = el.parentElement;
      const stagger = Number(parent?.dataset.revealStagger ?? 0);
      if (!delay && stagger && parent) {
        const siblings = Array.from(parent.children).filter((child) => child.hasAttribute('data-reveal'));
        // Capped so a long grid never leaves its last cards waiting.
        delay = Math.min(siblings.indexOf(el), 7) * stagger;
      }
      if (delay > 0) el.style.setProperty('--reveal-delay', `${delay}ms`);

      // Already in view on mount: show it outright. No first-paint flash, and
      // nothing above the fold ever depends on the observer firing.
      if (el.getBoundingClientRect().top < viewportHeight * 0.92) {
        reveal(el);
        return;
      }

      el.dataset.revealState = 'hidden';

      const trigger = el.dataset.reveal === 'mask' ? el.parentElement ?? el : el;
      const existing = triggers.get(trigger);
      if (existing) {
        existing.push(el);
      } else {
        triggers.set(trigger, [el]);
        observer.observe(trigger);
      }
    });

    return () => {
      observer.disconnect();
      managed.forEach((el) => {
        delete el.dataset.revealState;
        el.style.removeProperty('--reveal-delay');
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
