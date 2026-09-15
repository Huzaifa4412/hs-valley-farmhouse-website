import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryItemsData, srcSetFor, thumbFor } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

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
      className="relative w-full py-20 sm:py-28 md:py-40 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
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

        {/* Asymmetrical / Masonry Inspired Grid */}
        <div
          ref={galleryGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8"
        >
          {filteredItems.map((item, index) => {
            // Calculate asymmetric spanning for editorial layout
            const originalIndex = galleryItemsData.findIndex((g) => g.id === item.id);
            let colSpan = 'lg:col-span-4 aspect-[4/3]';
            if (item.aspect === 'wide' || index === 0) {
              colSpan = 'lg:col-span-8 aspect-[16/10] sm:aspect-[16/9]';
            } else if (item.aspect === 'portrait') {
              colSpan = 'lg:col-span-4 aspect-[4/5] sm:aspect-[3/4]';
            } else if (item.aspect === 'square') {
              colSpan = 'lg:col-span-4 aspect-square';
            }

            return (
              <div
                key={item.id}
                data-cursor="view"
                onClick={() => onOpenLightbox(originalIndex >= 0 ? originalIndex : index)}
                className={`group relative rounded-2xl overflow-hidden bg-[#14251D]/40 border border-[#FAF9F5]/10 shadow-xl cursor-pointer ${colSpan}`}
              >
                {/* Image */}
                <img
                  src={thumbFor(item.image)}
                  srcSet={srcSetFor(item.image)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/45 to-[#0B0F0D]/5 opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content Badge */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="sm:opacity-0 group-hover:opacity-100 transition-all duration-300 sm:transform sm:-translate-y-2 group-hover:translate-y-0 bg-[#B99A5B] text-[#0B0F0D] text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] font-semibold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <span>VIEW</span>
                      <ArrowUpRight size={11} />
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B99A5B] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-serif-editorial text-[#FAF9F5] font-light">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans-body text-[#FAF9F5]/70 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5 sm:mt-1 line-clamp-1">
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
