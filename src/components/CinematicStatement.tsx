import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CinematicStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const words = [word1Ref.current, word2Ref.current, word3Ref.current];

      words.forEach((word) => {
        if (!word) return;

        gsap.fromTo(
          word,
          {
            opacity: 0.08,
            y: 40,
            scale: 0.94,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: word,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-32 md:py-52 bg-[#0B0F0D] text-[#FAF9F5] flex flex-col items-center justify-center overflow-hidden border-y border-[#14251D]"
    >
      {/* Subtle radial ambient glow */}
      <div className="absolute w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-[#14251D]/40 blur-[100px] sm:blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#B99A5B] font-mono mb-2 sm:mb-4">
          The Sanctuary Creed
        </span>

        {/* Word 1: Gather */}
        <h2
          ref={word1Ref}
          className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-serif-editorial font-light tracking-tight uppercase leading-[0.95] sm:leading-[0.9] text-[#FAF9F5]"
        >
          Gather.
        </h2>

        {/* Word 2: Celebrate */}
        <h2
          ref={word2Ref}
          className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-serif-editorial font-light tracking-tight uppercase leading-[0.95] sm:leading-[0.9] text-[#B99A5B] italic"
        >
          Celebrate.
        </h2>

        {/* Word 3: Escape */}
        <h2
          ref={word3Ref}
          className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-serif-editorial font-light tracking-tight uppercase leading-[0.95] sm:leading-[0.9] text-[#F3EFE5]"
        >
          Escape.
        </h2>

        <p className="mt-6 sm:mt-8 text-[11px] sm:text-xs md:text-sm font-sans-body tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#FAF9F5]/60 max-w-md pt-2 sm:pt-4">
          Bahria Town • Karachi
        </p>
      </div>
    </section>
  );
}
