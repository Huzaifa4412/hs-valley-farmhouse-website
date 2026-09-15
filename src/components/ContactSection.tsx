import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Calendar,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  Send,
  RefreshCw,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig, imagesConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoSidebarRef = useRef<HTMLDivElement>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventType, setEventType] = useState('Family Gathering');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestCount, setGuestCount] = useState('20 - 40 Guests');
  const [slotTime, setSlotTime] = useState('Day Slot (10:00 AM – 6:00 PM)');
  const [message, setMessage] = useState('');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(formCardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(infoSidebarRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
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

  const eventTypes = [
    'Family Gathering',
    'Birthday / Celebration',
    'Private Event / Retreat',
    'Weekend Day-Out',
    'Photography / Shoot',
  ];

  const guestOptions = [
    '10 - 20 Guests',
    '20 - 40 Guests',
    '40 - 70 Guests',
    '70+ Guests',
  ];

  const timeSlots = [
    'Day Slot (10:00 AM – 6:00 PM)',
    'Night Slot (8:00 PM – 4:00 AM)',
    'Full Day / 24-Hour Stay',
  ];

  const formatWhatsAppMessage = () => {
    let text = `*New Booking Inquiry - HS Valley Farmhouse*\n\n`;
    if (fullName) text += `• *Name:* ${fullName}\n`;
    if (phoneNumber) text += `• *Contact:* ${phoneNumber}\n`;
    text += `• *Occasion:* ${eventType}\n`;
    if (preferredDate) text += `• *Date:* ${preferredDate}\n`;
    text += `• *Guests:* ${guestCount}\n`;
    text += `• *Slot:* ${slotTime}\n`;
    if (message) text += `• *Notes:* ${message}\n`;
    text += `\nPlease confirm availability and rate quote for Bahria Town Karachi location. Thank you!`;
    return text;
  };

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber && !fullName) {
      setErrorMessage('Please provide your Name or Phone number to proceed.');
      return;
    }
    setErrorMessage('');

    const formattedText = formatWhatsAppMessage();
    const url = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      setErrorMessage('Please fill in both your Name and Contact Phone number.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate direct reservation registration
    setTimeout(() => {
      const generatedRef = `HSV-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhoneNumber('');
    setMessage('');
    setPreferredDate('');
  };

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 sm:py-24 md:py-36 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <img
          src={imagesConfig.ctaBackground}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B0F0D]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#14251D] border border-[#B99A5B]/30 mb-3 sm:mb-4 shadow-md">
            <Sparkles size={13} className="text-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#FAF9F5] font-mono font-medium">
              Direct Reservations & Inquiries
            </span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light uppercase tracking-tight text-[#FAF9F5] leading-tight">
            Reserve Your <span className="italic text-[#B99A5B]">Private Escape</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-sans-body text-[#FAF9F5]/75 font-light mt-2.5 sm:mt-3 max-w-xl mx-auto">
            Experience Karachi&apos;s secluded sanctuary on Gabol Abad Road, Bahria Town. Submit your requirements or connect instantly with our team.
          </p>
        </div>

        {/* Main Grid: Form on Left/Center, Quick Details & Direct Links on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Main Contact Form Card (7 Cols) */}
          <div
            ref={formCardRef}
            className="lg:col-span-7 rounded-3xl bg-[#14251D]/85 border border-[#B99A5B]/30 p-5 sm:p-7 md:p-10 shadow-2xl backdrop-blur-md relative"
          >
            {isSubmitted ? (
              /* Success Confirmation View */
              <div className="text-center py-8 sm:py-10 px-2 sm:px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mx-auto mb-5 sm:mb-6 text-[#25D366]">
                  <CheckCircle2 size={32} />
                </div>

                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B99A5B] block mb-2">
                  Inquiry Dispatched Successfully
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#FAF9F5] font-light mb-2.5 sm:mb-3">
                  Thank You, {fullName || 'Valued Guest'}
                </h3>

                <p className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/80 max-w-md mx-auto mb-6 leading-relaxed">
                  Your reservation inquiry for{' '}
                  <strong className="text-[#FAF9F5]">{eventType}</strong>{' '}
                  {preferredDate ? `on ${preferredDate}` : ''} has been registered with Reference ID:{' '}
                  <span className="font-mono text-[#B99A5B] font-semibold">{referenceId}</span>.
                </p>

                <div className="p-4 rounded-2xl bg-[#0B0F0D]/60 border border-[#FAF9F5]/10 max-w-md mx-auto mb-6 sm:mb-8 text-left text-xs font-sans-body space-y-2 text-[#FAF9F5]/70">
                  <div className="flex justify-between">
                    <span>Expected Guests:</span>
                    <span className="font-medium text-[#FAF9F5]">{guestCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preferred Slot:</span>
                    <span className="font-medium text-[#FAF9F5]">{slotTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium text-[#FAF9F5]">Bahria Town Karachi</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    data-cursor="explore"
                    className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                  >
                    <MessageSquare size={15} />
                    <span>Also Send on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full border border-[#FAF9F5]/20 hover:bg-[#FAF9F5]/10 text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form View */
              <form onSubmit={handleDirectSubmit} className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#FAF9F5]/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif-editorial text-[#FAF9F5] font-light">
                      Reservation Form
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#FAF9F5]/60 font-sans-body">
                      Fill your gathering details for customized pricing & confirmation.
                    </p>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#B99A5B] bg-[#0B0F0D]/60 px-2.5 sm:px-3 py-1 rounded-full border border-[#B99A5B]/30 shrink-0">
                    Direct Inquiry
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-sans-body">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tariq Khan"
                      className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] placeholder-[#FAF9F5]/30 focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] placeholder-[#FAF9F5]/30 focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>

                {/* Event Type Select */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-2 sm:mb-2.5">
                    Occasion / Event Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {eventTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEventType(type)}
                        className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs text-left transition-all border min-h-[38px] cursor-pointer ${
                          eventType === type
                            ? 'bg-[#B99A5B] text-[#0B0F0D] font-semibold border-[#B99A5B] shadow-md'
                            : 'bg-[#0B0F0D]/60 border-[#FAF9F5]/10 text-[#FAF9F5]/80 hover:bg-[#0B0F0D]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <Users size={13} />
                      <span>Expected Guests</span>
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] focus:outline-hidden transition-colors cursor-pointer"
                    >
                      {guestOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0B0F0D] text-[#FAF9F5]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slot Preference */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>Time Slot Preference</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSlotTime(slot)}
                        className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs text-left transition-all border min-h-[38px] cursor-pointer ${
                          slotTime === slot
                            ? 'bg-[#B99A5B] text-[#0B0F0D] font-semibold border-[#B99A5B] shadow-md'
                            : 'bg-[#0B0F0D]/60 border-[#FAF9F5]/10 text-[#FAF9F5]/80 hover:bg-[#0B0F0D]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes / Special Requests */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Setup requirements, catering space, photography timing..."
                    className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] placeholder-[#FAF9F5]/30 focus:outline-hidden transition-colors"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="explore"
                    className="flex-1 py-3.5 sm:py-4 px-6 min-h-[44px] rounded-full bg-[#B99A5B] hover:bg-[#a6884e] text-[#0B0F0D] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    <span>{isSubmitting ? 'Submitting Request...' : 'Submit Reservation Request'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    data-cursor="explore"
                    className="py-3.5 sm:py-4 px-6 min-h-[44px] rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>

                <p className="text-[10px] sm:text-[11px] text-[#FAF9F5]/50 font-mono text-center pt-1">
                  🔒 Your details remain 100% confidential. No spam guaranteed.
                </p>
              </form>
            )}
          </div>

          {/* Right Sidebar: Direct Contact & Guarantees (5 Cols) */}
          <div ref={infoSidebarRef} className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Quick Contact Card */}
            <div className="rounded-3xl bg-[#14251D]/70 border border-[#B99A5B]/25 p-5 sm:p-7 md:p-8 backdrop-blur-md shadow-xl">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#B99A5B] block mb-3 sm:mb-4">
                Instant Hospitality Desk
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#FAF9F5] font-light leading-snug mb-5 sm:mb-6">
                Prefer to speak <br />
                <span className="text-[#B99A5B] italic">directly</span> with us?
              </h3>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {/* WhatsApp */}
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="explore"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0B0F0D]/60 hover:bg-[#25D366]/10 border border-[#FAF9F5]/10 hover:border-[#25D366]/40 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                      <MessageSquare size={17} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#FAF9F5] block">
                        WhatsApp Line
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#25D366] font-mono">
                        {contactConfig.displayPhone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-[#FAF9F5]/50 group-hover:text-[#25D366] transition-colors" />
                </a>

                {/* Phone Call */}
                <a
                  href={`tel:${contactConfig.phone}`}
                  data-cursor="explore"
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0B0F0D]/60 hover:bg-[#B99A5B]/10 border border-[#FAF9F5]/10 hover:border-[#B99A5B]/40 transition-all min-h-[44px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#B99A5B]/20 flex items-center justify-center text-[#B99A5B] shrink-0">
                      <Phone size={17} />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#FAF9F5] block">
                        Direct Phone Call
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#B99A5B] font-mono">
                        {contactConfig.displayPhone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-[#FAF9F5]/50 group-hover:text-[#B99A5B] transition-colors" />
                </a>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2.5 pt-4 border-t border-[#FAF9F5]/10 text-xs text-[#FAF9F5]/70 font-sans-body">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                <span>Response Time: Typically under 15 minutes</span>
              </div>
            </div>

            {/* Private Estate Policy Card */}
            <div className="rounded-3xl bg-[#0B0F0D]/70 border border-[#FAF9F5]/10 p-5 sm:p-6 md:p-7 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-3">
                <Shield size={17} className="text-[#B99A5B] shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FAF9F5]">
                  Reservation & Privacy Policy
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#FAF9F5]/70 font-sans-body">
                <li>• Exclusive full compound access for your booked slot.</li>
                <li>• Advance token confirms and locks your chosen date exclusively.</li>
                <li>• Suitable for families, corporate retreats, and private celebrations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
