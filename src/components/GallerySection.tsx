import { useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { galleryItemsData, srcSetFor, thumbFor } from '../config/siteConfig';
import { useReveal } from '../hooks/useReveal';

interface GallerySectionProps { onOpenLightbox: (index: number) => void; }

export function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
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


  const filteredItems = galleryItemsData.filter(item => activeCategory === 'all' || item.category === activeCategory);
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 9);

  // Re-sweep whenever the visible set changes, so new tiles are picked up too
  useReveal(sectionRef, [activeCategory, showAll]);

  return (
    <section ref={sectionRef} id="gallery" className="section-space bg-[#0B0F0D]">
      <div className="page-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">
          <div><p data-reveal="fade" className="eyebrow mb-3">See it for yourself</p><h2 data-reveal className="section-title">The property <em className="text-[#B99A5B]">in pictures.</em></h2></div>
          <p data-reveal data-reveal-delay="140" className="text-sm text-[#FAF9F5]/65 max-w-xs">Real photographs from around HS Valley. Select a photo for a closer look.</p>
        </div>
        <div data-reveal="fade" className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter property photos">
          {categories.map(cat => <button key={cat.id} type="button" aria-pressed={activeCategory === cat.id}
            onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
            className={`gallery-filter ${activeCategory === cat.id ? 'is-active' : ''}`}>{cat.label}</button>)}
        </div>
        <p className="text-xs text-[#FAF9F5]/60 mb-5" aria-live="polite">Showing {visibleItems.length} of {filteredItems.length} photographs</p>
        <div key={activeCategory} className="gallery-grid grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleItems.map((item, i) => <button key={item.id} type="button" aria-label={`View ${item.title}`}
            style={{ '--i': i } as React.CSSProperties}
            onClick={() => onOpenLightbox(galleryItemsData.findIndex(g => g.id === item.id))}
            className="gallery-card group text-left rounded-2xl overflow-hidden bg-[#14251D]/50 border border-[#FAF9F5]/10 hover:border-[#B99A5B]/60">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={thumbFor(item.image)} srcSet={srcSetFor(item.image)} sizes="(max-width: 399px) 100vw, (max-width: 1023px) 50vw, 400px" alt={item.caption} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="gallery-badge absolute right-3 top-3 rounded-full bg-[#0B0F0D]/70 p-2 text-[#FAF9F5]" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </div>
            <div className="px-4 py-4 sm:px-5"><p className="text-[10px] uppercase tracking-[0.15em] text-[#B99A5B] mb-1">{categories.find(c => c.id === item.category)?.label}</p><h3 className="text-lg sm:text-xl font-serif-editorial leading-tight transition-colors duration-300 group-hover:text-[#B99A5B]">{item.title}</h3></div>
          </button>)}
        </div>
        {visibleItems.length < filteredItems.length && <div className="text-center mt-8"><button type="button" onClick={() => setShowAll(true)} className="btn-sheen group inline-flex items-center gap-3 min-h-12 px-6 py-3 border border-[#B99A5B]/50 rounded-full text-sm text-[#B99A5B] hover:bg-[#B99A5B] hover:text-[#0B0F0D] transition-colors"><Plus size={17} className="transition-transform duration-500 group-hover:rotate-90" /> Show all {filteredItems.length} photographs</button></div>}
      </div>
    </section>
  );
}
