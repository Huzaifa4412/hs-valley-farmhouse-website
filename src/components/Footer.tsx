import { ArrowUp, ArrowUpRight, MapPin, Phone, MessageSquare, Calendar } from 'lucide-react';
import { contactConfig, imagesConfig } from '../config/siteConfig';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Explore Sanctuary', href: '#hero' },
    { label: 'About Estate', href: '#about' },
    { label: 'Curated Experiences', href: '#experiences' },
    { label: 'Property Gallery', href: '#gallery' },
    { label: 'Location & Directions', href: '#location' },
    { label: 'Reservations & Contact', href: '#contact' },
    { label: 'Common FAQs', href: '#faq' },
  ];

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <footer className="relative w-full bg-[#0B0F0D] text-[#FAF9F5] pt-14 sm:pt-20 pb-8 sm:pb-10 overflow-hidden border-t border-[#14251D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Top Editorial Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 sm:pb-12 border-b border-[#FAF9F5]/10 gap-6 sm:gap-10">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] block mb-2 sm:mb-3">
              Private Farmhouse & Sanctuary
            </span>
            <p className="text-xl sm:text-3xl md:text-4xl font-serif-editorial text-[#FAF9F5] font-light max-w-xl leading-snug">
              Karachi&apos;s secluded destination for intimate celebrations, retreats, and meaningful family escapes.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="explore"
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-mono text-[#FAF9F5]/70 hover:text-[#B99A5B] transition-colors self-start lg:self-end min-h-[44px] cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-9 h-9 rounded-full border border-[#FAF9F5]/20 flex items-center justify-center group-hover:border-[#B99A5B] transition-colors">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

        {/* Middle Navigation & Contact Columns */}
        <div className="py-9 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10">
          {/* Column 1: Nav Links */}
          <div className="md:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-4 sm:mb-6">
              Navigation
            </span>
            <ul className="space-y-2.5 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="explore"
                    className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 hover:text-[#B99A5B] transition-colors inline-block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact Channels */}
          <div className="md:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-4 sm:mb-6">
              Contact & Inquiries
            </span>
            <ul className="space-y-3 sm:space-y-3.5">
              <li>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="explore"
                  className="flex items-center gap-2 text-xs sm:text-sm text-[#FAF9F5]/80 hover:text-[#25D366] transition-colors py-1"
                >
                  <MessageSquare size={15} className="text-[#25D366] shrink-0" />
                  <span>WhatsApp Inquiries</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              {[
                { tel: contactConfig.phone, display: contactConfig.displayPhone },
                { tel: contactConfig.phoneAlt, display: contactConfig.displayPhoneAlt },
              ].map((line) => (
                <li key={line.tel}>
                  <a
                    href={`tel:${line.tel}`}
                    data-cursor="explore"
                    className="flex items-center gap-2 text-xs sm:text-sm text-[#FAF9F5]/80 hover:text-[#B99A5B] transition-colors py-1"
                  >
                    <Phone size={15} className="text-[#B99A5B] shrink-0" />
                    <span className="tabular-nums">{line.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  data-cursor="explore"
                  className="flex items-center gap-2 text-xs sm:text-sm text-[#FAF9F5]/80 hover:text-[#B99A5B] transition-colors py-1"
                >
                  <Calendar size={15} className="text-[#B99A5B] shrink-0" />
                  <span>Online Reservation Form</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Location */}
          <div className="md:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B99A5B] block mb-4 sm:mb-6">
              Estate Location
            </span>
            <div className="space-y-2 text-xs sm:text-sm text-[#FAF9F5]/70 font-sans-body">
              <p className="font-medium text-[#FAF9F5]">HS Valley Farmhouse</p>
              <p>Village VIP Usmania Hotel, Gabol Abad Road</p>
              <p>Bahria Town Karachi, Pakistan</p>
              <a
                href={contactConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="explore"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B99A5B] hover:underline pt-2"
              >
                <MapPin size={13} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Monumental Brand Typography */}
        <div className="py-6 sm:py-9 border-t border-[#FAF9F5]/10 select-none overflow-hidden text-center">
          <img
            src={imagesConfig.brandMarkGold}
            alt=""
            aria-hidden="true"
            width={826}
            height={386}
            loading="lazy"
            className="w-24 sm:w-32 h-auto mx-auto mb-4 sm:mb-6 opacity-80"
          />
          <h2 className="text-[13vw] sm:text-[12vw] font-serif-editorial font-light text-[#FAF9F5]/10 tracking-[0.08em] sm:tracking-[0.1em] uppercase leading-none hover:text-[#B99A5B]/20 transition-colors duration-700">
            HS VALLEY
          </h2>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 sm:pt-8 border-t border-[#FAF9F5]/5 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#FAF9F5]/40 gap-3">
          <p>© {new Date().getFullYear()} HS Valley Farmhouse. All rights reserved.</p>
          <p>Bahria Town Karachi • Luxury Private Retreat</p>
        </div>
      </div>
    </footer>
  );
}
