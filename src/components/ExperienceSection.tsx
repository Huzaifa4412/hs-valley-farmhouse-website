import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { experiencesData, srcSetFor } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  onOpenInquiry: () => void;
}

export function ExperienceSection({ onOpenInquiry }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.children;
      if (!cards) return;

      gsap.from(cards, {
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative w-full py-20 sm:py-28 md:py-40 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono">
                Curated Occasions
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light leading-tight uppercase tracking-tight">
              Made for <span className="italic text-[#B99A5B]">Your Moments</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 font-light leading-relaxed">
            HS Valley Farmhouse provides a private, secluded stage for memories that deserve an exceptional setting.
          </p>
        </div>

        {/* 2x2 Large Editorial Image Experience Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          {experiencesData.map((item) => (
            <div
              key={item.id}
              data-cursor="explore"
              onClick={onOpenInquiry}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] xs:aspect-[16/11] border border-[#FAF9F5]/10 bg-[#14251D]/50 shadow-2xl cursor-pointer"
            >
              {/* Background Image with Zoom */}
              <img
                src={item.image}
                srcSet={srcSetFor(item.image)}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Multi-layer Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/40 to-transparent" />
              <div className="absolute inset-0 bg-[#14251D]/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Tag & Action Trigger */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B99A5B] bg-[#0B0F0D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#B99A5B]/30">
                  {item.tag}
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF9F5]/10 group-hover:bg-[#B99A5B] text-[#FAF9F5] group-hover:text-[#0B0F0D] flex items-center justify-center transition-all duration-300 backdrop-blur-xs">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <span className="text-[11px] sm:text-xs font-mono text-[#FAF9F5]/70 block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-editorial text-[#FAF9F5] font-light mb-1.5 sm:mb-2 group-hover:text-[#B99A5B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/80 font-light line-clamp-2 max-w-lg mb-3 sm:mb-4">
                  {item.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.highlights.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-[#FAF9F5]/60 bg-[#FAF9F5]/5 px-2.5 py-0.5 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
