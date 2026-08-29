import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EditorialIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLParagraphElement>(null);
  const textLine2Ref = useRef<HTMLParagraphElement>(null);
  const textLine3Ref = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = [textLine1Ref.current, textLine2Ref.current, textLine3Ref.current];

      gsap.from(lines, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.18,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(subtextRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-statement"
      className="relative w-full py-20 sm:py-28 md:py-44 bg-[#F3EFE5] text-[#14251D] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-start max-w-5xl">
          {/* Eyebrow marker */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono font-semibold">
              The Philosophy
            </span>
          </div>

          {/* Huge Editorial Typography (Responsive wrap for small devices) */}
          <div className="overflow-hidden mb-1 sm:mb-2">
            <p
              ref={textLine1Ref}
              className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif-editorial font-light leading-[1.0] sm:leading-[0.95] tracking-tight uppercase"
            >
              MORE THAN
            </p>
          </div>

          <div className="overflow-hidden mb-1 sm:mb-2">
            <p
              ref={textLine2Ref}
              className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif-editorial font-light leading-[1.0] sm:leading-[0.95] tracking-tight uppercase italic text-[#14251D]/90"
            >
              A FARMHOUSE.
            </p>
          </div>

          <div className="overflow-hidden mt-3 sm:mt-4 md:mt-8">
            <p
              ref={textLine3Ref}
              className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif-editorial font-light leading-[1.0] sm:leading-[0.95] tracking-tight uppercase text-[#B99A5B]"
            >
              A PLACE FOR MEMORIES.
            </p>
          </div>

          {/* Subtext and details */}
          <div
            ref={subtextRef}
            className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-[#14251D]/15 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 w-full"
          >
            <div className="md:col-span-4">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#14251D]/60 block mb-1.5 sm:mb-2">
                Sanctuary In Bahria Town
              </span>
              <p className="text-xs sm:text-sm font-sans-body text-[#14251D]/80">
                Gabol Abad Road, Karachi
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg md:text-xl font-sans-body text-[#14251D]/85 font-light leading-relaxed">
                Designed to quiet the senses. An architectural sanctuary created exclusively for families, close friends, and meaningful celebrations where uninterrupted privacy is the ultimate luxury.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
