import { useEffect, useRef } from 'react';
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { amenitiesData, imagesConfig, srcSetFor, thumbFor } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (gridRef.current?.children) {
        gsap.from(gridRef.current.children, {
          y: 34,
          opacity: 0,
          stagger: 0.07,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      gsap.from(featureRef.current, {
        clipPath: 'inset(12% 0% 12% 0%)',
        opacity: 0.6,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featureRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden border-t border-[#14251D]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#14251D]/50 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
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
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {amenitiesData.map((item) => {
            const Icon = iconMap[item.icon] ?? Trees;

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#14251D]/60 hover:bg-[#14251D] border border-[#FAF9F5]/10 hover:border-[#B99A5B]/50 p-5 sm:p-6 transition-all duration-300 backdrop-blur-xs"
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
          ref={featureRef}
          className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-[#B99A5B]/25 bg-[#14251D]/70 shadow-2xl"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden group">
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
