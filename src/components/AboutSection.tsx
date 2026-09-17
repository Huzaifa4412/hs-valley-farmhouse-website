import { useRef } from 'react';
import { MapPin, Shield } from 'lucide-react';
import { imagesConfig, srcSetFor, thumbFor } from '../config/siteConfig';

import { useReveal } from '../hooks/useReveal';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-14 sm:py-20 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Left Column: Big Serif Display */}
          <div data-reveal="left" ref={leftColRef} className="lg:col-span-6">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <span className="rule-grow w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono">
                About the Estate
              </span>
            </div>

            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-editorial font-light leading-[1.08] sm:leading-[1.05] tracking-tight uppercase mb-6 sm:mb-8">
              A Place <br />
              <span className="italic text-[#B99A5B]">Made for Moments</span>
            </h2>

            {/* Architecture / Philosophy Detail */}
            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm md:text-base font-sans-body text-[#FAF9F5]/70 font-light leading-relaxed max-w-lg">
              <p>
                Set against the open skies of Gabol Abad Road near Bahria Town Karachi, HS Valley Farmhouse is a walled private estate built for one group at a time. Inside the gate: a covered swimming pool, wide lawns, timber gazebos, a floodlit sports court and a small resident zoo.
              </p>
              <p>
                Indoors there are three air-conditioned bedrooms, a majlis-style floor seating lounge and a games hall with billiards and carrom. Whether it is a family day-out, a birthday, or a quiet 24-hour stay, the whole compound is yours for the slot you book.
              </p>
            </div>

            {/* Location Pill & Verification Tags */}
            <div className="mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-[#FAF9F5]/10 flex flex-col xs:flex-row items-start xs:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#B99A5B]/30 flex items-center justify-center bg-[#14251D] shrink-0">
                  <MapPin size={15} className="text-[#B99A5B]" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#B99A5B] block">
                    LOCATION
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#FAF9F5]">
                    Bahria Town Karachi • Gabol Abad
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#B99A5B]/30 flex items-center justify-center bg-[#14251D] shrink-0">
                  <Shield size={15} className="text-[#B99A5B]" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#B99A5B] block">
                    SECURITY
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#FAF9F5]">
                    Walled Compound • 24/7 Guarded
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph & Featured Architectural Imagery */}
          <div data-reveal="right" data-reveal-delay="140" ref={rightColRef} className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8">
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#14251D]/60 border border-[#B99A5B]/20 relative overflow-hidden backdrop-blur-xs">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.28em] text-[#B99A5B] block mb-2.5 sm:mb-3">
                The Mission
              </span>
              <p className="text-lg sm:text-xl md:text-2xl font-serif-editorial text-[#FAF9F5] font-light leading-snug">
                &ldquo;HS Valley Farmhouse is designed as a private space where families, friends, and groups can slow down, reconnect, and enjoy time together away from the city&apos;s everyday pace.&rdquo;
              </p>
            </div>

            {/* Asymmetrical Image Frame */}
            <div
              data-reveal="scale" data-reveal-delay="240" ref={imageFrameRef}
              data-cursor="view"
              className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#FAF9F5]/10 shadow-2xl group"
            >
              <img
                src={thumbFor(imagesConfig.exterior)}
                srcSet={srcSetFor(imagesConfig.exterior)}
                sizes="(max-width: 1024px) 100vw, 46vw"
                alt="The paved arrival forecourt and planted borders at HS Valley Farmhouse"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#FAF9F5]/80">
                <span>GATED &amp; PRIVATE</span>
                <span className="text-[#B99A5B]">ARRIVAL FORECOURT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
