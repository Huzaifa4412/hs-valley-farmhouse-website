import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { experiencesData, srcSetFor } from '../config/siteConfig';

import { useReveal } from '../hooks/useReveal';

interface ExperienceSectionProps {
  onOpenInquiry: () => void;
}

export function ExperienceSection({ onOpenInquiry }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative w-full py-14 sm:py-20 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div data-reveal="fade" className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="rule-grow w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono">
                Curated Occasions
              </span>
            </div>
            <h2 data-reveal className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light leading-tight uppercase tracking-tight">
              Made for <span className="italic text-[#B99A5B]">Your Moments</span>
            </h2>
          </div>
          <p data-reveal data-reveal-delay="120" className="max-w-md text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 font-light leading-relaxed">
            HS Valley Farmhouse provides a private, secluded stage for memories that deserve an exceptional setting.
          </p>
        </div>

        {/* 2x2 Large Editorial Image Experience Grid */}
        <div
          ref={cardsContainerRef}
          data-reveal-stagger="120"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
        >
          {experiencesData.map((item) => (
            <div
              key={item.id}
              data-cursor="explore"
              onClick={onOpenInquiry}
              role="button"
              tabIndex={0}
              aria-label={`Inquire about ${item.title}`}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpenInquiry(); } }}
              data-reveal
              className="group lift-card relative w-full min-w-0 rounded-2xl overflow-hidden min-h-[320px] aspect-[4/3] xs:aspect-[16/11] border border-[#FAF9F5]/10 bg-[#14251D]/50 shadow-2xl cursor-pointer"
            >
              {/* Background Image with Zoom */}
              <img
                src={item.image}
                srcSet={srcSetFor(item.image)}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Multi-layer Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/40 to-transparent" />
              <div className="absolute inset-0 bg-[#14251D]/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Tag & Action Trigger */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B99A5B] bg-[#0B0F0D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#B99A5B]/30">
                  {item.tag}
                </span>
                <div className="icon-pop w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF9F5]/10 group-hover:bg-[#B99A5B] text-[#FAF9F5] group-hover:text-[#0B0F0D] flex items-center justify-center backdrop-blur-xs">
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
