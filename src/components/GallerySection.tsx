import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItemsData, srcSetFor, thumbFor } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

/** Cell proportions, so masonry columns pack without leaving holes. */
const aspectClass: Record<string, string> = {
  wide: 'aspect-[16/9]',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

interface GallerySectionProps {
  onOpenLightbox: (index: number) => void;
}

export function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'exterior', label: 'Architecture' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'lawns', label: 'Lawns & Gazebos' },
    { id: 'activities', label: 'Play & Sports' },
    { id: 'rooms', label: 'Rooms & Halls' },
    { id: 'wildlife', label: 'Mini Zoo' },
    { id: 'evening', label: 'Evening' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItemsData
      : galleryItemsData.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = galleryGridRef.current?.children;
      if (!items) return;

      gsap.from(items, {
        y: 35,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full py-14 sm:py-20 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 md:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono">
                Visual Archive
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light uppercase tracking-tight">
              Property <span className="italic text-[#B99A5B]">Gallery</span>
            </h2>
          </div>

          {/* Filter Pills (Horizontally scrollable on small mobile screens) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                data-cursor="explore"
                className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-full text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-mono whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#B99A5B] text-[#0B0F0D] font-semibold shadow-md'
                    : 'bg-[#14251D]/60 hover:bg-[#14251D] text-[#FAF9F5]/70 hover:text-[#FAF9F5] border border-[#FAF9F5]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry columns: photographs keep their own proportions and the
            layout closes up behind them, so no gaps are left in the grid. */}
        <div
          ref={galleryGridRef}
          className="columns-2 lg:columns-3 gap-2.5 sm:gap-4 md:gap-6"
        >
          {filteredItems.map((item, index) => {
            const originalIndex = galleryItemsData.findIndex((g) => g.id === item.id);
            // Reserve each cell's height up front: the photographs are lazy-loaded,
            // and without a known ratio the columns would collapse and reflow.
            const ratio = aspectClass[item.aspect];

            return (
              <div
                key={item.id}
                data-cursor="view"
                onClick={() => onOpenLightbox(originalIndex >= 0 ? originalIndex : index)}
                className={`group relative mb-3.5 sm:mb-5 md:mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-[#14251D]/40 border border-[#FAF9F5]/10 shadow-xl cursor-pointer ${ratio}`}
              >
                {/* Image */}
                <img
                  src={thumbFor(item.image)}
                  srcSet={srcSetFor(item.image)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/45 to-[#0B0F0D]/5 opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content Badge */}
                <div className="absolute inset-0 p-2.5 sm:p-4 md:p-5 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 bg-[#B99A5B] text-[#0B0F0D] text-[10px] uppercase font-mono tracking-[0.2em] font-semibold px-3 py-1 rounded-full items-center gap-1 shadow-lg">
                      <span>VIEW</span>
                      <ArrowUpRight size={11} />
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#B99A5B] block mb-0.5 sm:mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-[13px] sm:text-lg md:text-xl font-serif-editorial text-[#FAF9F5] font-light leading-tight">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block text-xs font-sans-body text-[#FAF9F5]/70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
