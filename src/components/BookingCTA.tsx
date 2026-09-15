import { useEffect, useRef } from 'react';
import { MessageSquare, Phone, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imagesConfig, contactConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

interface BookingCTAProps {
  onOpenInquiry: () => void;
}

export function BookingCTA({ onOpenInquiry }: BookingCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <section
      ref={sectionRef}
      id="booking-cta"
      className="relative w-full py-32 md:py-48 bg-[#0B0F0D] overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Atmospheric Overlays */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imagesConfig.ctaBackground}
          alt="The illuminated pool terrace at HS Valley Farmhouse after dark"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#0B0F0D]/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/50 to-[#0B0F0D]" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#FAF9F5]"
      >
        <div className="inline-flex items-center gap-3 mb-6 bg-[#14251D]/80 border border-[#B99A5B]/30 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#FAF9F5]">
            Reservations Open
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif-editorial font-light uppercase tracking-tight leading-tight mb-6">
          Your next <span className="italic text-[#B99A5B]">escape</span> is waiting.
        </h2>

        <p className="text-base sm:text-xl font-sans-body text-[#FAF9F5]/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Plan your gathering at HS Valley Farmhouse. Secure your preferred date for a private, unforgettable retreat in Bahria Town Karachi.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="explore"
            className="group px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl flex items-center gap-2.5"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Us</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={`tel:${contactConfig.phone}`}
            data-cursor="explore"
            className="group px-8 py-4 rounded-full border border-[#FAF9F5]/30 hover:border-[#B99A5B] bg-[#14251D]/80 hover:bg-[#FAF9F5] text-[#FAF9F5] hover:text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-md flex items-center gap-2.5 shadow-lg"
          >
            <Phone size={15} />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={onOpenInquiry}
            data-cursor="explore"
            className="group px-8 py-4 rounded-full border border-[#B99A5B]/50 hover:bg-[#B99A5B] text-[#B99A5B] hover:text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-md flex items-center gap-2"
          >
            <span>Inquiry Form</span>
          </button>
        </div>

        <p className="mt-8 text-xs font-mono text-[#FAF9F5]/50 uppercase tracking-widest">
          Direct Lines: <span className="tabular-nums">{contactConfig.displayPhone}</span> &nbsp;•&nbsp; <span className="tabular-nums">{contactConfig.displayPhoneAlt}</span>
        </p>
      </div>
    </section>
  );
}
