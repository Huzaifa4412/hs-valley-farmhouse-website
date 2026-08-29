import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hsRef = useRef<HTMLSpanElement>(null);
  const valleyRef = useRef<HTMLSpanElement>(null);
  const farmhouseRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const locationTagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Initial states
      gsap.set([hsRef.current, valleyRef.current, farmhouseRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(locationTagRef.current, { opacity: 0 });

      // Step 1: "HS" emerges
      tl.to(hsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '-=0.2')

      // Step 2: "HS VALLEY" reveals
      .to(valleyRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '+=0.2')

      // Step 3: "FARMHOUSE" and location tag reveal
      .to(farmhouseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '+=0.2')
      .to(locationTagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')

      // Hold briefly for dramatic impression
      .to({}, { duration: 0.5 })

      // Step 4: Cinematic Curtain Lift / Website Reveal
      .to([hsRef.current, valleyRef.current, farmhouseRef.current, lineRef.current, locationTagRef.current], {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.in',
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      }, '-=0.1');
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      id="preloader"
      className="fixed inset-0 z-[99999] bg-[#0B0F0D] flex flex-col items-center justify-center text-[#FAF9F5] select-none"
    >
      <div className="flex flex-col items-center justify-center max-w-lg px-6 text-center">
        {/* Monogram / Top Badge */}
        <div className="overflow-hidden mb-3">
          <span
            ref={hsRef}
            className="block text-4xl md:text-5xl font-serif-editorial text-[#B99A5B] tracking-[0.25em] font-light"
          >
            HS
          </span>
        </div>

        {/* Dynamic Horizontal Accent Rule */}
        <div
          ref={lineRef}
          className="w-16 h-[1px] bg-[#B99A5B]/40 my-3 origin-center"
        />

        {/* Brand Name Sequence */}
        <div className="overflow-hidden">
          <span
            ref={valleyRef}
            className="block text-2xl md:text-3xl font-serif-editorial tracking-[0.35em] text-[#FAF9F5] uppercase"
          >
            VALLEY
          </span>
        </div>

        <div className="overflow-hidden mt-1">
          <span
            ref={farmhouseRef}
            className="block text-xs md:text-sm font-sans-body tracking-[0.45em] text-[#FAF9F5]/70 uppercase font-light"
          >
            FARMHOUSE
          </span>
        </div>

        {/* Location Subtext */}
        <div ref={locationTagRef} className="mt-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#B99A5B]/80 font-mono">
            Bahria Town • Karachi
          </p>
        </div>
      </div>
    </div>
  );
}
