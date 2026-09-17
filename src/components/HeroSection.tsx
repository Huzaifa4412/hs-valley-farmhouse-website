import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { imagesConfig } from '../config/siteConfig';

interface HeroSectionProps {
  onOpenInquiry: () => void;
}

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const introEl = document.querySelector('#intro-statement');
    if (introEl) {
      introEl.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } else {
      onOpenInquiry();
    }
  };

  return (
    <section
      id="hero"
      className="hero-section relative w-full overflow-hidden flex items-end bg-[#0B0F0D]"
    >
      {/* Farmhouse hero photograph */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <picture className="block w-full h-full">
          <source media="(max-width: 767px)" srcSet={imagesConfig.heroMobile} />
          <source media="(min-width: 768px)" srcSet={imagesConfig.hero} />
          <img
            src={imagesConfig.hero}
            alt="HS Valley Farmhouse entrance with tall columns and a paved courtyard"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center md:object-[center_40%] animate-ken-burns will-change-transform scale-105"
          />
        </picture>

        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/45 to-[#0B0F0D]/20" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/20 to-[#0B0F0D]/70" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl">
          {/* Eyebrow Label */}
          <div className="hero-fade-up-1 flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono font-medium">
              Bahria Town • Karachi
            </span>
          </div>

          {/* Main Display Heading */}
          <h1
            className="hero-fade-up-2 hero-title font-serif-editorial text-[#FAF9F5] font-light leading-[1.08] sm:leading-[1.05] tracking-tight uppercase mb-4 sm:mb-6"
          >
            Your Private <br className="hidden sm:block" />
            <span className="italic font-normal text-[#F3EFE5]">Escape</span> in Karachi
          </h1>

          {/* Supporting Statement */}
          <p
            className="hero-fade-up-3 text-sm sm:text-base md:text-lg font-sans-body text-[#FAF9F5]/85 font-light leading-relaxed max-w-2xl mb-6 sm:mb-8"
          >
            A gated farmhouse on Gabol Abad Road with a covered swimming pool, children&apos;s playground, floodlit sports court and a resident mini zoo. Booked privately, one group at a time.
          </p>

          {/* Signature Facilities Strip */}
          <div
            className="hero-fade-up-4 flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 sm:mb-8 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#FAF9F5]/70">
            {['Covered Pool', 'Kids Playground', 'Sports Court', 'Mini Zoo', 'AC Rooms'].map((label) => (
              <span key={label} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#B99A5B]" />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="hero-fade-up-5 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-6"
          >
            <a
              href="#intro-statement"
              onClick={handleExploreClick}
              data-cursor="explore"
              className="group px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full bg-[#FAF9F5] hover:bg-[#B99A5B] text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <span>EXPLORE</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={handleBookNowClick}
              data-cursor="explore"
              className="group px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full border border-[#B99A5B]/60 hover:border-[#B99A5B] bg-[#14251D]/80 hover:bg-[#14251D] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>BOOK NOW</span>
              <ArrowUpRight size={14} className="text-[#B99A5B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator (Desktop and Tablets) */}
      <a
        href="#intro-statement"
        onClick={handleExploreClick}
        data-cursor="explore"
        className="hero-fade-up-6 hidden md:flex absolute bottom-8 right-8 md:right-12 z-10 flex-col items-center gap-2 group text-[#FAF9F5]/60 hover:text-[#B99A5B] transition-colors"
        aria-label="Scroll down to introduction"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono writing-mode-vertical rotate-180">
          SCROLL
        </span>
        <ArrowDown size={14} className="animate-bounce text-[#B99A5B]" />
      </a>
    </section>
  );
}
