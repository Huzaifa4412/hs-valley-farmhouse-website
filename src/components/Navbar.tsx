import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Phone, MapPin } from 'lucide-react';
import { contactConfig } from '../config/siteConfig';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'About Sanctuary', href: '#about' },
    { label: 'Moments & Experiences', href: '#experiences' },
    { label: 'Visual Journey', href: '#property-journey' },
    { label: 'Property Gallery', href: '#gallery' },
    { label: 'Estate Location', href: '#location' },
    { label: 'Reservations & Contact', href: '#contact' },
    { label: 'Common FAQs', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowClick = () => {
    setIsMenuOpen(false);
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenInquiry();
    }
  };

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 sm:py-3.5 bg-[#0B0F0D]/90 backdrop-blur-md border-b border-[#B99A5B]/15 shadow-xl'
            : 'py-4 sm:py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram & Title */}
          <a
            href="#"
            data-cursor="explore"
            className="group flex flex-col focus:outline-hidden"
          >
            <span className="font-serif-editorial text-base sm:text-lg md:text-xl font-light tracking-[0.2em] sm:tracking-[0.25em] text-[#FAF9F5] group-hover:text-[#B99A5B] transition-colors">
              HS VALLEY
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-sans-body tracking-[0.35em] sm:tracking-[0.4em] text-[#FAF9F5]/70 uppercase font-light">
              FARMHOUSE
            </span>
          </a>

          {/* Right Action Items: MENU and BOOK NOW */}
          <div className="flex items-center gap-2.5 sm:gap-4 md:gap-8">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-cursor="explore"
              className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-[#FAF9F5] hover:text-[#B99A5B] transition-colors py-2 px-2 min-h-[44px] min-w-[44px] justify-center focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className="hidden xs:inline">MENU</span>
              <div className="w-8 h-8 rounded-full border border-[#FAF9F5]/25 flex items-center justify-center group-hover:border-[#B99A5B] transition-colors bg-[#0B0F0D]/40">
                {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
              </div>
            </button>

            <button
              type="button"
              onClick={handleBookNowClick}
              data-cursor="explore"
              className="group relative overflow-hidden px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-full border border-[#B99A5B]/50 bg-[#14251D]/80 hover:bg-[#B99A5B] text-[#FAF9F5] hover:text-[#0B0F0D] text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm focus:outline-hidden cursor-pointer flex items-center"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span>BOOK NOW</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Slide-Over Menu (Fully Responsive & Scrollable) */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0F0D]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between overflow-y-auto p-5 sm:p-8 md:p-16 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row justify-between items-start pt-16 sm:pt-20 gap-8">
          {/* Left Info Column */}
          <div className="hidden lg:block max-w-sm">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-4">
              A Private Sanctuary
            </span>
            <p className="text-sm font-sans-body text-[#FAF9F5]/70 leading-relaxed">
              HS Valley Farmhouse is crafted for secluded gatherings, celebrations, and calm escapes in Bahria Town Karachi.
            </p>
            <div className="mt-8 space-y-2.5 text-xs text-[#FAF9F5]/60 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#B99A5B] shrink-0" />
                <span>Village VIP Usmania Hotel, Gabol Abad Road</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#B99A5B] shrink-0" />
                <span>Direct Inquiries: {contactConfig.displayPhone}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6 text-left w-full lg:w-auto">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-1">
              Navigation Menu
            </span>
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                data-cursor="explore"
                className="group flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif-editorial text-[#FAF9F5] hover:text-[#B99A5B] transition-colors py-1.5"
              >
                <span className="text-[11px] sm:text-xs font-mono text-[#B99A5B]/60 group-hover:text-[#B99A5B]">
                  0{idx + 1}
                </span>
                <span className="tracking-wide">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Menu CTAs */}
        <div className="max-w-7xl w-full mx-auto pt-8 mt-6 border-t border-[#FAF9F5]/10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <p className="text-[11px] sm:text-xs text-[#FAF9F5]/50 font-mono tracking-wider text-center sm:text-left">
            © 2026 HS Valley Farmhouse • Bahria Town Karachi
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FAF9F5] hover:text-[#B99A5B] transition-colors py-3 px-5 rounded-full border border-[#FAF9F5]/15 hover:border-[#B99A5B]/40 min-h-[44px]"
            >
              <MessageSquare size={14} className="text-[#25D366]" />
              <span>WhatsApp Inquiries</span>
            </a>

            <button
              type="button"
              onClick={handleBookNowClick}
              className="w-full sm:w-auto bg-[#B99A5B] hover:bg-[#a6884e] text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-semibold py-3 px-6 rounded-full transition-all min-h-[44px] flex items-center justify-center cursor-pointer shadow-lg"
            >
              Reserve Sanctuary
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
