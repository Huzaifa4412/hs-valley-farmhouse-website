import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { imagesConfig, srcSetFor } from '../config/siteConfig';
import { useReveal } from '../hooks/useReveal';

export function CinematicStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-space bg-[#F3EFE5] text-[#14251D] overflow-hidden">
      <div className="page-container grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div data-reveal>
          <p className="eyebrow text-[#756039] mb-5">Time together, well spent</p>
          <h2 className="section-title leading-[1.05]">
            Gather.<br />
            <em className="text-[#856c3f]">Celebrate.</em><br />
            Escape.
          </h2>
          <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-[#14251D]/80">
            A swim, a shared meal, an evening outdoors. Make space for the people who matter, with the entire farmhouse reserved for your group.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 mt-6 min-h-12 border-b border-[#14251D]/40 font-medium text-sm hover:border-[#856c3f] hover:text-[#856c3f] transition-colors"
          >
            <span>Find your day at HS Valley</span>
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <figure
          data-reveal
          data-reveal-delay="160"
          data-reveal-direction="scale"
          className="relative overflow-hidden rounded-2xl group shadow-2xl"
        >
          <img
            src={imagesConfig.gazeboDining}
            srcSet={srcSetFor(imagesConfig.gazeboDining)}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Shaded gazebo dining beside the farmhouse lawn"
            loading="lazy"
            className="w-full aspect-[4/3] md:aspect-[4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B0F0D]/90 to-transparent px-6 pb-5 pt-16 text-[#FAF9F5] text-sm">
            Slow afternoons. Open skies. Your own space.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
