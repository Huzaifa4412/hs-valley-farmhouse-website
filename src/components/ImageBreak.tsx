import { useRef } from 'react';
import { imagesConfig } from '../config/siteConfig';
import { useReveal } from '../hooks/useReveal';

export function ImageBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[58vh] min-h-[360px] max-h-[620px] overflow-hidden flex items-center justify-center bg-[#0B0F0D]"
    >
      {/* Oversized so the drift never exposes an edge */}
      <img
        src={imagesConfig.breakSection}
        alt="The open lawn at HS Valley Farmhouse at dusk"
        loading="lazy"
        decoding="async"
        data-cursor="view"
        data-parallax="0.22"
        className="absolute -top-[14%] left-0 w-full h-[128%] object-cover object-center"
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="absolute inset-0 bg-[#0B0F0D]/40" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/20 to-[#0B0F0D]/60" />

      {/* Floating Statement — drifts against the photograph */}
      <div data-parallax="-0.07" className="relative z-10 text-center px-6 max-w-4xl">
        <h2
          data-reveal="blur"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial text-[#FAF9F5] font-light italic tracking-tight uppercase drop-shadow-2xl"
        >
          Escape the ordinary.
        </h2>
        <p data-reveal data-reveal-delay="180" className="mt-4 text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-[#B99A5B]">
          Gabol Abad Road • Bahria Town Karachi
        </p>
      </div>
    </section>
  );
}
