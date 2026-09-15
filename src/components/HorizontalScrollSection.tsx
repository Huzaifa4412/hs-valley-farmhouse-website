import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { imagesConfig, srcSetFor } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const horizontalSlides = [
    {
      id: 'slide-1',
      title: 'The Arrival Court',
      subtitle: 'Columns, Palms & Paved Approach',
      tag: '01 / ARCHITECTURE',
      image: imagesConfig.colonnadeSunset,
      description: 'The entrance colonnade catching the last of the Karachi sun.',
    },
    {
      id: 'slide-2',
      title: 'Covered Swimming Pool',
      subtitle: 'Shade, Slide & Still Water',
      tag: '02 / THE POOL',
      image: imagesConfig.coveredPoolDay,
      description: 'A canopied pool with a water slide, loungers and a shallow end for children.',
    },
    {
      id: 'slide-3',
      title: 'Lawns & Gazebos',
      subtitle: 'Open Green, Shaded Seating',
      tag: '03 / OUTDOOR',
      image: imagesConfig.gazebosLawn,
      description: 'Timber gazebos on cut grass, ready for tea, dinner or an afternoon of cricket.',
    },
    {
      id: 'slide-4',
      title: 'Play & Sport',
      subtitle: 'Floodlit Court and Playground',
      tag: '04 / ACTIVITIES',
      image: imagesConfig.sportsCourtNight,
      description: 'A netted court lit for night cricket and futsal, beside the children’s play area.',
    },
    {
      id: 'slide-5',
      title: 'Indoors & Games',
      subtitle: 'Air-Conditioned Comfort',
      tag: '05 / INTERIORS',
      image: imagesConfig.grandHall,
      description: 'A marble hall linking the bedrooms, majlis lounge and billiards room.',
    },
    {
      id: 'slide-6',
      title: 'The Resident Mini Zoo',
      subtitle: 'Peacocks, Deer & Pigeons',
      tag: '06 / WILDLIFE',
      image: imagesConfig.peacocksLawn,
      description: 'Peafowl, deer, turkeys and a working pigeon loft kept across the grounds.',
    },
    {
      id: 'slide-7',
      title: 'Twilight Atmosphere',
      subtitle: 'When the Lights Come On',
      tag: '07 / AMBIANCE',
      image: imagesConfig.poolNightBuilding,
      description: 'The heat subsides, the pool is lit, and the evening slot begins.',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      // On mobile or reduced motion, allow standard touch horizontal scrolling without pin
      return;
    }

    const ctx = gsap.context(() => {
      const scrollWrapper = scrollWrapperRef.current;
      if (!scrollWrapper) return;

      const totalScrollWidth = scrollWrapper.scrollWidth - window.innerWidth;

      gsap.to(scrollWrapper, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth + 300}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBookingScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="property-journey"
      className="relative w-full bg-[#0B0F0D] overflow-hidden py-14 sm:py-16 md:py-0"
    >
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-5 sm:pt-6 md:pt-8 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono block mb-1.5 sm:mb-2">
            Visual Exploration
          </span>
          <h2 className="text-2xl xs:text-3xl md:text-5xl font-serif-editorial text-[#FAF9F5] font-light uppercase tracking-tight">
            Journey Through <span className="italic text-[#B99A5B]">The Sanctuary</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#FAF9F5]/60 uppercase tracking-widest">
          <span className="hidden xs:inline">Swipe or scroll</span>
          <span className="xs:hidden">Swipe across</span>
          <ArrowRight size={13} className="text-[#B99A5B] animate-pulse" />
        </div>
      </div>

      {/* Horizontal Slider Track (Touch-friendly on mobile with scroll-snap) */}
      <div
        ref={scrollWrapperRef}
        className="flex gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-12 md:h-[80vh] items-center overflow-x-auto md:overflow-visible no-scrollbar pb-6 md:pb-0 snap-x snap-mandatory"
      >
        {horizontalSlides.map((slide) => (
          <div
            key={slide.id}
            data-cursor="view"
            className="flex-shrink-0 snap-center w-[84vw] xs:w-[78vw] sm:w-[60vw] md:w-[48vw] lg:w-[38vw] h-[48vh] sm:h-[55vh] md:h-[68vh] rounded-2xl overflow-hidden relative group border border-[#FAF9F5]/10 shadow-2xl bg-[#14251D]/40"
          >
            <img
              src={slide.image}
              srcSet={srcSetFor(slide.image)}
              sizes="(max-width: 768px) 84vw, 42vw"
              alt={slide.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/90 via-[#0B0F0D]/30 to-transparent" />

            {/* Slide Metadata */}
            <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B99A5B] bg-[#0B0F0D]/75 backdrop-blur-md px-3 py-1 rounded-full self-start border border-[#B99A5B]/30">
                {slide.tag}
              </span>

              <div>
                <span className="text-[11px] sm:text-xs font-mono text-[#FAF9F5]/70 block mb-1">
                  {slide.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-editorial text-[#FAF9F5] font-light mb-1.5 sm:mb-2">
                  {slide.title}
                </h3>
                <p className="text-xs md:text-sm font-sans-body text-[#FAF9F5]/80 line-clamp-2">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Closing Slide Prompt */}
        <div className="flex-shrink-0 snap-center w-[75vw] xs:w-[65vw] sm:w-[40vw] md:w-[28vw] h-[48vh] sm:h-[55vh] md:h-[68vh] rounded-2xl border border-[#B99A5B]/30 bg-[#14251D]/80 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-3 sm:mb-4">
            Private Booking
          </span>
          <p className="text-xl sm:text-2xl font-serif-editorial text-[#FAF9F5] mb-5 sm:mb-6">
            Reserve Your Desired Date Today
          </p>
          <a
            href="#contact"
            onClick={handleBookingScroll}
            data-cursor="explore"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 min-h-[44px] rounded-full bg-[#B99A5B] text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF9F5] transition-colors"
          >
            <span>Inquire Now</span>
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
