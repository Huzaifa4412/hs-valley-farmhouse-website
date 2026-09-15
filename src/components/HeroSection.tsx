import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imagesConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenInquiry: () => void;
}

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Entry timeline after preloader
      const tl = gsap.timeline({ delay: 0.1 });

      if (!prefersReducedMotion) {
        // Reveal hero image with clip-path
        gsap.set(imageContainerRef.current, {
          clipPath: 'inset(12% 12% 12% 12%)',
          scale: 1.1,
        });

        tl.to(imageContainerRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.8,
          ease: 'power3.inOut',
        });

        // Stagger in text elements
        gsap.set([eyebrowRef.current, headingRef.current, paragraphRef.current, facilitiesRef.current, ctaContainerRef.current], {
          y: 35,
          opacity: 0,
        });
        if (scrollIndicatorRef.current) {
          gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });
        }

        tl.to(eyebrowRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.9')
        .to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6')
        .to(paragraphRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6')
        .to(facilitiesRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.5')
        .to(ctaContainerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.45');

        if (scrollIndicatorRef.current) {
          tl.to(scrollIndicatorRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.4');
        }

        // 2. Parallax effect on scroll
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const introEl = document.querySelector('#intro-statement');
    if (introEl) {
      introEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenInquiry();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[640px] md:min-h-[700px] overflow-hidden flex items-end pb-24 sm:pb-20 md:pb-24 bg-[#0B0F0D]"
    >
      {/* Background Image Container with Clip Path Reveal & Ken Burns */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <picture className="block w-full h-full">
          <source media="(max-width: 767px)" srcSet={imagesConfig.heroMobile} />
          <source media="(min-width: 768px)" srcSet={imagesConfig.hero} />
          <img
            ref={imageRef}
            src={imagesConfig.hero}
            alt="HS Valley Farmhouse lit at night, with the front lawn and play area"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center animate-ken-burns will-change-transform scale-105"
          />
        </picture>

        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/40 to-[#0B0F0D]/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/20 to-[#0B0F0D]/70" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow Label */}
          <div ref={eyebrowRef} className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono font-medium">
              Bahria Town • Karachi
            </span>
          </div>

          {/* Main Display Heading */}
          <h1
            ref={headingRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif-editorial text-[#FAF9F5] font-light leading-[1.08] sm:leading-[1.05] tracking-tight uppercase mb-4 sm:mb-6"
          >
            Your Private <br className="hidden sm:block" />
            <span className="italic font-normal text-[#F3EFE5]">Escape</span> in Karachi
          </h1>

          {/* Supporting Statement */}
          <p
            ref={paragraphRef}
            className="text-sm sm:text-base md:text-xl font-sans-body text-[#FAF9F5]/85 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8"
          >
            A gated farmhouse on Gabol Abad Road with a covered swimming pool, children&apos;s playground, floodlit sports court and a resident mini zoo. Booked privately, one group at a time.
          </p>

          {/* Signature Facilities Strip */}
          <div
            ref={facilitiesRef}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#FAF9F5]/70">
            {['Covered Pool', 'Kids Playground', 'Sports Court', 'Mini Zoo', 'AC Rooms'].map((label) => (
              <span key={label} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B99A5B]" />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            ref={ctaContainerRef}
            className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-6"
          >
            <a
              href="#intro-statement"
              onClick={handleExploreClick}
              data-cursor="explore"
              className="group px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full bg-[#FAF9F5] hover:bg-[#B99A5B] text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <span>EXPLORE</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={handleBookNowClick}
              data-cursor="explore"
              className="group px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full border border-[#B99A5B]/60 hover:border-[#B99A5B] bg-[#14251D]/80 hover:bg-[#14251D] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>BOOK NOW</span>
              <ArrowUpRight size={14} className="text-[#B99A5B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator (Desktop and Tablets) */}
      <a
        ref={scrollIndicatorRef}
        href="#intro-statement"
        onClick={handleExploreClick}
        data-cursor="explore"
        className="hidden md:flex absolute bottom-8 right-8 md:right-12 z-10 flex-col items-center gap-2 group text-[#FAF9F5]/60 hover:text-[#B99A5B] transition-colors"
        aria-label="Scroll down to introduction"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono writing-mode-vertical rotate-180">
          SCROLL
        </span>
        <ArrowDown size={14} className="animate-bounce text-[#B99A5B]" />
      </a>
    </section>
  );
}
