import { useState, useRef } from 'react';
import {
  MessageSquare,
  Phone,
  Calendar,
  Users,
  Clock,
  Sparkles,
  ArrowUpRight,
  Shield,
  Send,
} from 'lucide-react';
import { contactConfig, imagesConfig } from '../config/siteConfig';

import { useReveal } from '../hooks/useReveal';
import { buildBookingUrl, localDateToday } from '../utils/booking';

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoSidebarRef = useRef<HTMLDivElement>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventType, setEventType] = useState('Family Gathering');
  const [preferredDate, setPreferredDate] = useState('');
  const [guestCount, setGuestCount] = useState('20 - 30 Guests');
  const [slotTime, setSlotTime] = useState('Day Slot (8:00 AM – 6:00 PM)');
  const [message, setMessage] = useState('');

  // UI status
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useReveal(sectionRef);

  const eventTypes = [
    'Family Gathering',
    'Birthday / Celebration',
    'Private Event / Retreat',
    'Weekend Day-Out',
    'Photography / Shoot',
  ];

  const guestOptions = [
    '10 - 20 Guests',
    '20 - 30 Guests',
    '30 - 40 Guests',
    '40 - 45 Guests',
    '45 - 50 Guests',
  ];

  const timeSlots = [
    'Day Slot (8:00 AM – 6:00 PM)',
    'Night Slot (8:00 PM – 6:00 AM)',
    'Full Day / 24-Hour Stay',
  ];

  const bookingUrl = buildBookingUrl(contactConfig.whatsapp, { fullName, phoneNumber, eventType, preferredDate, guestCount, slotTime, message });

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phoneNumber.replace(/\D/g, '');
    if (!fullName.trim() || digits.length < 10 || digits.length > 15) {
      setErrorMessage('Enter your name and a valid phone number with 10–15 digits.');
      return;
    }
    if (preferredDate && preferredDate < localDateToday()) {
      setErrorMessage('Please choose today or a future date.');
      return;
    }
    setErrorMessage('');
    setIsReviewOpen(true);
    requestAnimationFrame(() => {
      formCardRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      formCardRef.current?.querySelector('h3')?.focus({ preventScroll: true });
    });
  };

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-14 sm:py-18 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden"
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
        <div data-reveal className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#14251D] border border-[#B99A5B]/30 mb-3 sm:mb-4 shadow-md">
            <Sparkles size={13} className="text-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#FAF9F5] font-mono font-medium">
              Plan your visit
            </span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light uppercase tracking-tight text-[#FAF9F5] leading-tight">
            Reserve Your <span className="italic text-[#B99A5B]">Private Escape</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-sans-body text-[#FAF9F5]/75 font-light mt-2.5 sm:mt-3 max-w-xl mx-auto">
            Experience Karachi&apos;s secluded sanctuary on Gabol Abad Road, Bahria Town. Share your plans on WhatsApp and our team will confirm the details.
          </p>
        </div>

        {/* Main Grid: Form on Left/Center, Quick Details & Direct Links on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Main Contact Form Card (7 Cols) */}
          <div
            data-reveal
            data-reveal-delay="100"
            ref={formCardRef}
            className="lg:col-span-7 rounded-3xl bg-[#14251D]/85 border border-[#B99A5B]/30 p-5 sm:p-7 md:p-10 shadow-2xl backdrop-blur-md relative"
          >
            {isReviewOpen ? (
              <div className="space-y-6" aria-live="polite">
                <p className="eyebrow">One last look</p>
                <h3 tabIndex={-1} className="text-3xl font-serif-editorial">Review your inquiry</h3>
                <p className="text-sm leading-relaxed text-[#FAF9F5]/75">Check your details, then open WhatsApp and tap Send. Our team will confirm availability and pricing there.</p>
                <dl className="booking-summary">
                  {[
                    ['Name', fullName], ['Phone', phoneNumber], ['Occasion', eventType],
                    ['Date', preferredDate || 'To be discussed'], ['Guests', guestCount], ['Slot', slotTime],
                    ...(message.trim() ? [['Notes', message]] : []),
                  ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                </dl>
                {bookingUrl ? <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="booking-primary"><MessageSquare size={18} /> Open WhatsApp to send</a>
                  : <p role="alert" className="text-sm text-amber-200">WhatsApp is unavailable. Please call {contactConfig.displayPhone}.</p>}
                <button type="button" className="min-h-11 text-sm text-[#B99A5B] underline underline-offset-4" onClick={() => { setIsReviewOpen(false); requestAnimationFrame(() => document.getElementById('booking-name')?.focus({ preventScroll: true })); }}>Edit inquiry details</button>
                <p className="text-xs leading-relaxed text-[#FAF9F5]/60">This is an inquiry, not a confirmed reservation. Your date is confirmed directly with the farmhouse team.</p>
              </div>
            ) : (
              /* Active Form View */
              <form onSubmit={handleDirectSubmit} className="booking-form space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#FAF9F5]/10">
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
                  <div role="alert" className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-sans-body">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ayesha Siddiqui"
                      className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] placeholder-[#FAF9F5]/30 focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 0321 4567890"
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
                        aria-pressed={eventType === type}
                        onClick={() => setEventType(type)}
                        className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs text-left transition-all border min-h-[48px] cursor-pointer ${
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
                    <label htmlFor="booking-date" className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={localDateToday()}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-guests" className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <Users size={13} />
                      <span>Expected Guests (Maximum 50)</span>
                    </label>
                    <select
                      id="booking-guests"
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
                  <div className="grid grid-cols-1 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={slotTime === slot}
                        onClick={() => setSlotTime(slot)}
                        className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs text-left transition-all border min-h-[48px] cursor-pointer ${
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
                  <label htmlFor="booking-notes" className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Setup requirements, catering space, photography timing..."
                    className="w-full bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 focus:border-[#B99A5B] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-xs text-[#FAF9F5] placeholder-[#FAF9F5]/30 focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="booking-primary"><Send size={18} /> Review WhatsApp inquiry</button>
                  <p className="text-xs leading-relaxed text-[#FAF9F5]/60 mt-3">Review your details before opening WhatsApp. No booking is made until our team confirms it.</p>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar: Direct Contact & Guarantees (5 Cols) */}
          <div
            data-reveal
            data-reveal-delay="200"
            ref={infoSidebarRef}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
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
                      <span className="text-[11px] sm:text-xs text-[#25D366] font-mono tabular-nums">
                        {contactConfig.displayPhone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-[#FAF9F5]/50 group-hover:text-[#25D366] transition-colors" />
                </a>

                {/* Phone Calls — both lines */}
                {[
                  { label: 'Direct Phone Call', tel: contactConfig.phone, display: contactConfig.displayPhone },
                  { label: 'Alternate Line', tel: contactConfig.phoneAlt, display: contactConfig.displayPhoneAlt },
                ].map((line) => (
                  <a
                    key={line.tel}
                    href={`tel:${line.tel}`}
                    data-cursor="explore"
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0B0F0D]/60 hover:bg-[#B99A5B]/10 border border-[#FAF9F5]/10 hover:border-[#B99A5B]/40 transition-all min-h-[44px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#B99A5B]/20 flex items-center justify-center text-[#B99A5B] shrink-0">
                        <Phone size={17} />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#FAF9F5] block">
                          {line.label}
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#B99A5B] font-mono tabular-nums">
                          {line.display}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[#FAF9F5]/50 group-hover:text-[#B99A5B] transition-colors" />
                  </a>
                ))}
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
