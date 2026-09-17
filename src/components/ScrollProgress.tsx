import { useEffect, useRef } from 'react';

/** Hairline gold read-out of how far through the page you are. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    const draw = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
