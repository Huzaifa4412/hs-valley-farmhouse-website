import { useRef } from 'react';
import {
  Waves,
  ToyBrick,
  Trophy,
  Bird,
  Gamepad2,
  BedDouble,
  Trees,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { amenitiesData, imagesConfig, srcSetFor, thumbFor } from '../config/siteConfig';

import { useReveal } from '../hooks/useReveal';

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  toy: ToyBrick,
  trophy: Trophy,
  bird: Bird,
  gamepad: Gamepad2,
  bed: BedDouble,
  tent: Trees,
  shield: ShieldCheck,
};

export function AmenitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative w-full py-14 sm:py-20 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden border-t border-[#14251D]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#14251D]/50 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono">
                What&apos;s On the Grounds
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light uppercase tracking-tight leading-tight">
              Estate <span className="italic text-[#B99A5B]">Facilities</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 font-light leading-relaxed">
            Every booking includes the entire compound: the pool, the lawns, the games hall, the courts and the animals. Nothing is shared with another group.
          </p>
        </div>

        {/* Facilities Grid */}
        <div
          data-reveal ref={gridRef}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
        >
          {amenitiesData.map((item) => {
            const Icon = iconMap[item.icon] ?? Trees;

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#14251D]/60 hover:bg-[#14251D] border border-[#FAF9F5]/10 hover:border-[#B99A5B]/50 p-4 sm:p-5 lg:p-6 transition-all duration-300 backdrop-blur-xs"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#B99A5B]/30 bg-[#0B0F0D]/70 flex items-center justify-center text-[#B99A5B] mb-4 group-hover:bg-[#B99A5B] group-hover:text-[#0B0F0D] transition-colors duration-300">
                  <Icon size={18} />
                </div>
                <h3 className="text-base sm:text-lg font-serif-editorial text-[#FAF9F5] font-normal mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] font-sans-body text-[#FAF9F5]/65 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Band: The Mini Zoo */}
        <div
          data-reveal ref={featureRef}
          className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-[#B99A5B]/25 bg-[#14251D]/70 shadow-2xl"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden group">
            <img
              src={thumbFor(imagesConfig.peacocksLawn)}
              srcSet={srcSetFor(imagesConfig.peacocksLawn)}
              sizes="(max-width: 1024px) 100vw, 58vw"
              alt="Resident peacocks on the lawn at HS Valley Farmhouse"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14251D]/85 via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#14251D]/85 lg:via-transparent lg:to-transparent" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-3">
              Resident Wildlife
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-editorial text-[#FAF9F5] font-light leading-snug mb-3 sm:mb-4">
              A small zoo, kept on the grounds.
            </h3>
            <p className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 font-light leading-relaxed mb-5">
              Peacocks walk the lawn edge, deer rest in a shaded pen near the pool garden, and turkeys, guinea fowl and pigeons are kept beside the gazebos. For most families arriving with children, it is the first thing they go looking for.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Peacocks', 'Deer', 'Turkeys', 'Guinea Fowl', 'Pigeon Loft'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#FAF9F5]/70 bg-[#0B0F0D]/60 border border-[#FAF9F5]/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
