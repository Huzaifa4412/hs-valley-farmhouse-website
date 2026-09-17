import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { imagesConfig, srcSetFor } from '../config/siteConfig';

export function HorizontalScrollSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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


  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(horizontalSlides.length - 1, activeIndex + direction));
    const card = track.children[next] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <section id="property-journey" className="section-space bg-[#14251D]/40 border-y border-[#B99A5B]/15">
      <div className="page-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">A look around</p>
            <h2 className="section-title">Explore the <em className="text-[#B99A5B]">farmhouse.</em></h2>
            <p className="mt-4 text-sm text-[#FAF9F5]/70">From a morning by the pool to an evening on the lawn. Swipe through the grounds.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-[#B99A5B] mr-2" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / 07</span>
            <button type="button" className="round-control" aria-label="Previous property photo" onClick={() => move(-1)} disabled={activeIndex === 0}><ArrowLeft size={18} /></button>
            <button type="button" className="round-control" aria-label="Next property photo" onClick={() => move(1)} disabled={activeIndex === horizontalSlides.length - 1}><ArrowRight size={18} /></button>
          </div>
        </div>
        <div ref={trackRef} className="property-track" role="region" aria-label="Farmhouse photo tour" tabIndex={0}
          onScroll={() => {
            const track = trackRef.current;
            if (!track) return;
            const cards = Array.from(track.children) as HTMLElement[];
            const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
            setActiveIndex(atEnd ? cards.length - 1 : cards.reduce((best, card, i) => Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.offsetLeft - track.scrollLeft) ? i : best, 0));
          }}>
          {horizontalSlides.map(slide => (
            <article key={slide.id} className="property-slide">
              <img src={slide.image} srcSet={srcSetFor(slide.image)} sizes="(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 550px" alt={slide.title} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              <div className="p-5 sm:p-6">
                <p className="eyebrow text-[10px] mb-3">{slide.tag}</p>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl mb-2">{slide.title}</h3>
                <p className="text-sm text-[#FAF9F5]/70 leading-relaxed">{slide.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 text-sm">
          <p className="text-[#FAF9F5]/60">One booking. The whole place to yourselves.</p>
          <a href="#contact" className="inline-flex items-center gap-2 min-h-11 text-[#B99A5B] hover:text-[#FAF9F5]">Plan your visit <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}
