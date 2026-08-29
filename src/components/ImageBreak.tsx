import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imagesConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export function ImageBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax image scrolling
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Text reveal on scroll
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        letterSpacing: '0.1em',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] min-h-[500px] overflow-hidden flex items-center justify-center bg-[#0B0F0D]"
    >
      <img
        ref={imageRef}
        src={imagesConfig.breakSection}
        alt="HS Valley Farmhouse Scenic Break"
        loading="lazy"
        decoding="async"
        data-cursor="view"
        className="absolute inset-0 w-full h-[125%] object-cover object-center will-change-transform"
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="absolute inset-0 bg-[#0B0F0D]/40" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/20 to-[#0B0F0D]/60" />

      {/* Floating Statement */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial text-[#FAF9F5] font-light italic tracking-tight uppercase drop-shadow-2xl"
        >
          Escape the ordinary.
        </h2>
        <p className="mt-4 text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-[#B99A5B]">
          A Secluded Oasis in Karachi
        </p>
      </div>
    </section>
  );
}
