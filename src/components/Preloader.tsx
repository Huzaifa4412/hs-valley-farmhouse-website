import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { imagesConfig } from '../config/siteConfig';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLImageElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
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
      const tl = gsap.timeline({ onComplete });

      gsap.set([crestRef.current, wordmarkRef.current, farmhouseRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(locationTagRef.current, { opacity: 0, y: 10 });

      // 1. The crest settles in
      tl.to(crestRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      // 2. Wordmark rises beneath it
      .to(wordmarkRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.35')

      // 3. Rule draws out, then the descriptor and location
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '-=0.4')
      .to(farmhouseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.35')
      .to(locationTagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.25')

      // Hold on the finished lockup
      .to({}, { duration: 0.45 })

      // 4. Curtain lift
      .to([crestRef.current, wordmarkRef.current, lineRef.current, farmhouseRef.current, locationTagRef.current], {
        opacity: 0,
        y: -18,
        stagger: 0.05,
        duration: 0.45,
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
      role="status"
      aria-label="Loading HS Valley Farmhouse"
      className="fixed inset-0 z-[99999] bg-[#0B0F0D] flex flex-col items-center justify-center text-[#FAF9F5] select-none px-6"
    >
      {/* Ambient warmth behind the lockup */}
      <div
        aria-hidden="true"
        className="absolute w-[460px] max-w-[85vw] aspect-square rounded-full bg-[#B99A5B]/8 blur-[120px] pointer-events-none"
      />

      <div className="relative flex flex-col items-center justify-center w-full max-w-md text-center">
        {/* Brand crest */}
        <div className="overflow-hidden">
          <img
            ref={crestRef}
            src={imagesConfig.brandMarkGold}
            alt=""
            aria-hidden="true"
            width={826}
            height={386}
            className="block w-40 xs:w-48 sm:w-56 md:w-64 h-auto"
          />
        </div>

        {/* Wordmark */}
        <div className="overflow-hidden mt-5 sm:mt-7">
          <span
            ref={wordmarkRef}
            className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-light tracking-[0.18em] xs:tracking-[0.24em] sm:tracking-[0.3em] text-[#FAF9F5] uppercase whitespace-nowrap"
          >
            HS Valley
          </span>
        </div>

        {/* Accent rule */}
        <div
          ref={lineRef}
          aria-hidden="true"
          className="w-20 sm:w-24 h-px bg-[#B99A5B]/60 my-4 sm:my-5 origin-center"
        />

        {/* Descriptor */}
        <div className="overflow-hidden">
          <span
            ref={farmhouseRef}
            className="block text-[10px] xs:text-xs sm:text-sm font-sans-body tracking-[0.35em] xs:tracking-[0.45em] text-[#FAF9F5]/65 uppercase font-light pl-[0.35em]"
          >
            Farmhouse
          </span>
        </div>

        {/* Location */}
        <div ref={locationTagRef} className="mt-8 sm:mt-10">
          <p className="text-[9px] xs:text-[10px] tracking-[0.28em] xs:tracking-[0.3em] uppercase text-[#B99A5B]/80 font-mono">
            Bahria Town • Karachi
          </p>
        </div>
      </div>
    </div>
  );
}
