import { useRef, useEffect } from 'react';
import { imagesConfig } from '../config/siteConfig';
import { useReveal } from '../hooks/useReveal';

export function ImageBreak() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useReveal(sectionRef);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = sectionRef.current;
          const image = imageRef.current;
          if (section && image) {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
              const progress = (windowHeight - rect.top) / (windowHeight + rect.height) - 0.5;
              image.style.transform = `translate3d(0, ${progress * 50}px, 0) scale(1.1)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[58vh] min-h-[360px] max-h-[620px] overflow-hidden flex items-center justify-center bg-[#0B0F0D]"
    >
      <img
        ref={imageRef}
        src={imagesConfig.breakSection}
        alt="The open lawn at HS Valley Farmhouse at dusk"
        loading="lazy"
        decoding="async"
        data-cursor="view"
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center will-change-transform transition-transform duration-100 ease-out"
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="absolute inset-0 bg-[#0B0F0D]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/20 to-[#0B0F0D]/60 pointer-events-none" />

      {/* Floating Statement */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2
          data-reveal
          data-reveal-direction="scale"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial text-[#FAF9F5] font-light italic tracking-tight uppercase drop-shadow-2xl"
        >
          Escape the ordinary.
        </h2>
        <p
          data-reveal
          data-reveal-delay="150"
          className="mt-4 text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-[#B99A5B]"
        >
          Gabol Abad Road • Bahria Town Karachi
        </p>
      </div>
    </section>
  );
}
