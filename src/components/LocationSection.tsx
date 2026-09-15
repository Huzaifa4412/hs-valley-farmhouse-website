import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Car, Compass, Copy, Check, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const mapFrameRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(infoCardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(mapFrameRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyAddress = () => {
    const fullAddress = `${contactConfig.locationName}, ${contactConfig.addressLine1}, ${contactConfig.addressLine2}, ${contactConfig.city}, ${contactConfig.country}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const travelTimes = [
    { label: 'Bahria Town Main Gate', time: '15 - 20 mins' },
    { label: 'Karachi Toll Plaza (M-9)', time: '25 - 30 mins' },
    { label: 'Jinnah Int. Airport', time: '40 - 45 mins' },
  ];

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative w-full py-14 sm:py-18 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden border-t border-[#14251D]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#14251D]/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#B99A5B]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1px] bg-[#B99A5B]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[#B99A5B] font-mono">
                Coordinates & Access
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-serif-editorial font-light uppercase tracking-tight">
              Estate <span className="italic text-[#B99A5B]">Location</span> & Directions
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 max-w-md font-light">
            Conveniently situated in the peaceful Gabol Abad corridor near Bahria Town Karachi, offering seamless access with maximum seclusion.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Left Details Card */}
          <div
            ref={infoCardRef}
            className="lg:col-span-5 rounded-3xl bg-[#14251D]/70 border border-[#B99A5B]/25 p-5 sm:p-7 md:p-9 flex flex-col justify-between backdrop-blur-md shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0F0D]/60 border border-[#B99A5B]/30 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#B99A5B]">
                  <Compass size={12} />
                  <span>Bahria Town Vicinity</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#FAF9F5]/50 uppercase tracking-widest">
                  Secure Access
                </span>
              </div>

              {/* Exact Address Highlight */}
              <div className="mb-5 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#FAF9F5] font-normal leading-tight mb-2">
                  HS Valley Farmhouse
                </h3>
                <p className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/85 leading-relaxed">
                  Near Village VIP Usmania Hotel, Gabol Abad Road, Bahria Town, Karachi.
                </p>
              </div>

              {/* Travel Times Pills */}
              <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-[#FAF9F5]/10">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B99A5B] block mb-2.5 sm:mb-3">
                  Approximate Travel Times
                </span>
                <div className="space-y-2 sm:space-y-2.5">
                  {travelTimes.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between text-xs py-2 px-3 sm:px-3.5 rounded-xl bg-[#0B0F0D]/50 border border-[#FAF9F5]/5"
                    >
                      <span className="text-[#FAF9F5]/80 font-sans-body">{item.label}</span>
                      <span className="font-mono text-[#B99A5B] font-medium">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Amenities at Entrance */}
              <div className="space-y-3 text-xs text-[#FAF9F5]/80 font-sans-body">
                <div className="flex items-start gap-2.5">
                  <Car size={16} className="text-[#B99A5B] mt-0.5 shrink-0" />
                  <span>Wide paved route with secure dedicated parking inside the gated perimeter.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-[#25D366] mt-0.5 shrink-0" />
                  <span>Private 24/7 security and secluded tranquil surroundings.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#FAF9F5]/10 flex flex-col xs:flex-row gap-3">
              <a
                href={contactConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="explore"
                className="flex-1 py-3.5 px-5 min-h-[44px] rounded-full bg-[#B99A5B] hover:bg-[#a6884e] text-[#0B0F0D] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Navigation size={14} />
                <span>Open in Google Maps</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                data-cursor="explore"
                className="py-3.5 px-5 min-h-[44px] rounded-full border border-[#FAF9F5]/20 hover:border-[#B99A5B] bg-[#0B0F0D]/60 text-[#FAF9F5] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[#25D366]" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Address'}</span>
              </button>
            </div>
          </div>

          {/* Right Live Map Embed Container */}
          <div
            ref={mapFrameRef}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#B99A5B]/30 shadow-2xl bg-[#14251D] relative min-h-[320px] sm:min-h-[400px] lg:min-h-[500px]"
          >
            <iframe
              title="HS Valley Farmhouse Google Maps Location"
              src="https://maps.google.com/maps?q=Village%20VIP%20Usmania%20Hotel%2C%20Gabol%20Abad%20Road%2C%20Bahria%20Town%2C%20Karachi&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-25 contrast-110"
            />

            {/* Overlay Map Badge on Mobile/Desktop */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-[#0B0F0D]/90 backdrop-blur-md border border-[#B99A5B]/40 py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#25D366] animate-ping" />
              <div>
                <span className="text-xs font-serif-editorial text-[#FAF9F5] block font-medium">
                  HS Valley Farmhouse
                </span>
                <span className="text-[10px] text-[#B99A5B] font-mono block">
                  Bahria Town Karachi • Verified Location
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
