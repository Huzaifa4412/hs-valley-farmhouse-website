import { useState, useEffect } from 'react';
import { X, MessageSquare, Calendar, Users, Sparkles, Send } from 'lucide-react';
import { contactConfig } from '../config/siteConfig';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [eventType, setEventType] = useState<string>('Family Gathering');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('20 - 40 Guests');
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const eventTypes = [
    'Family Gathering',
    'Birthday / Celebration',
    'Private Event / Retreat',
    'Weekend Day-Out',
  ];

  const guestRanges = ['10 - 20 Guests', '20 - 40 Guests', '40 - 70 Guests', '70+ Guests'];

  const handleWhatsAppSend = () => {
    let customMsg = `*Inquiry - HS Valley Farmhouse (Bahria Town Karachi)*\n\n`;
    if (eventType) customMsg += `• *Occasion:* ${eventType}\n`;
    if (preferredDate) customMsg += `• *Preferred Date:* ${preferredDate}\n`;
    if (guestCount) customMsg += `• *Estimated Guests:* ${guestCount}\n`;
    if (note) customMsg += `• *Notes:* ${note}\n`;
    customMsg += `\nPlease share availability and package pricing for our gathering. Thank you!`;

    const url = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(customMsg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-[100000] bg-[#0B0F0D]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-lg bg-[#14251D] border border-[#B99A5B]/30 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl text-[#FAF9F5] my-auto max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-cursor="explore"
          className="absolute top-4 sm:top-6 right-4 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FAF9F5]/20 flex items-center justify-center hover:bg-[#FAF9F5] hover:text-[#0B0F0D] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Title & Header */}
        <div className="mb-6 sm:mb-8 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0F0D]/60 border border-[#B99A5B]/30 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B99A5B] mb-2.5 sm:mb-3">
            <Sparkles size={12} />
            <span>Private Sanctuary Reservation</span>
          </div>
          <h3
            id="inquiry-modal-title"
            className="text-xl sm:text-2xl md:text-3xl font-serif-editorial font-light text-[#FAF9F5]"
          >
            Inquire for HS Valley
          </h3>
          <p className="text-xs sm:text-sm font-sans-body text-[#FAF9F5]/70 mt-1">
            Specify your gathering details to connect directly with our reservations desk.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Event Type Selection */}
          <div>
            <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-2">
              Occasion / Event Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={`py-2 px-2.5 sm:px-3 rounded-xl text-xs font-sans-body text-left transition-all border min-h-[38px] cursor-pointer ${
                    eventType === type
                      ? 'bg-[#B99A5B] text-[#0B0F0D] font-semibold border-[#B99A5B]'
                      : 'bg-[#0B0F0D]/50 border-[#FAF9F5]/10 text-[#FAF9F5]/80 hover:bg-[#0B0F0D]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Guest Count */}
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
                className="w-full bg-[#0B0F0D]/70 border border-[#FAF9F5]/15 rounded-xl px-3.5 sm:px-4 py-2.5 text-sm sm:text-xs text-[#FAF9F5] focus:outline-hidden focus:border-[#B99A5B]"
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
                className="w-full bg-[#0B0F0D]/70 border border-[#FAF9F5]/15 rounded-xl px-3.5 sm:px-4 py-2.5 text-sm sm:text-xs text-[#FAF9F5] focus:outline-hidden focus:border-[#B99A5B] cursor-pointer"
              >
                {guestRanges.map((range) => (
                  <option key={range} value={range} className="bg-[#0B0F0D] text-[#FAF9F5]">
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#B99A5B] mb-1.5 sm:mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Lawn setup, catering requirement, specific timings..."
              className="w-full bg-[#0B0F0D]/70 border border-[#FAF9F5]/15 rounded-xl px-3.5 sm:px-4 py-2.5 text-sm sm:text-xs text-[#FAF9F5] placeholder-[#FAF9F5]/30 focus:outline-hidden focus:border-[#B99A5B]"
            />
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleWhatsAppSend}
              data-cursor="explore"
              className="w-full py-3.5 sm:py-4 px-6 min-h-[44px] rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Inquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
