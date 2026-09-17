import { useState, useRef } from 'react';
import { Plus, Minus, MessageSquare, Sparkles } from 'lucide-react';
import { faqData, contactConfig } from '../config/siteConfig';

import { useReveal } from '../hooks/useReveal';

export function FAQSection() {
  // First item open by default for immediate context
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full py-14 sm:py-18 md:py-24 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden border-t border-[#14251D]"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-[#14251D]/60 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-[#B99A5B]/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Section Header */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 text-center lg:text-left">
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#14251D] border border-[#B99A5B]/40 mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B99A5B] font-mono font-medium">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl font-serif-editorial font-light uppercase tracking-tight text-white leading-tight">
            Essential <span className="italic text-[#B99A5B]">Information</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-sans-body text-stone-300 font-light mt-2.5 sm:mt-3 max-w-lg mx-auto lg:mx-0">
            Everything you need to know about reserving and experiencing HS Valley Farmhouse in Bahria Town Karachi.
          </p>

          {/* Support prompt travels with the heading on wide screens */}
          <div className="hidden lg:block mt-8 p-6 rounded-3xl bg-[#14251D]/90 border border-[#B99A5B]/30 backdrop-blur-md shadow-xl">
            <h4 className="text-base font-serif-editorial text-white font-medium mb-1.5">
              Something specific to ask?
            </h4>
            <p className="text-xs font-sans-body text-stone-300 mb-4">
              Our on-site team answers on WhatsApp, usually within minutes.
            </p>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="explore"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 min-h-[44px] rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-lg"
            >
              <MessageSquare size={15} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div data-reveal ref={listRef} className="lg:col-span-8 space-y-3 sm:space-y-3.5 w-full">
          {faqData.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-colors duration-300 border overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? 'bg-[#14251D] border-[#B99A5B] shadow-2xl ring-1 ring-[#B99A5B]/30'
                    : 'bg-[#14251D]/80 hover:bg-[#14251D] border-[#FAF9F5]/15 hover:border-[#B99A5B]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  data-cursor="explore"
                  className="w-full py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 flex items-center justify-between text-left focus:outline-hidden group cursor-pointer"
                  id={`question-${faq.id}`}
                  aria-controls={`answer-${faq.id}`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
                    <span className="text-xs sm:text-sm md:text-base font-mono text-[#B99A5B] font-bold shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm sm:text-base md:text-xl font-serif-editorial text-white font-medium group-hover:text-[#B99A5B] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? 'bg-[#B99A5B] text-[#0B0F0D] border-[#B99A5B] shadow-md'
                        : 'bg-[#0B0F0D] text-[#FAF9F5] border-[#FAF9F5]/30 group-hover:border-[#B99A5B] group-hover:text-[#B99A5B]'
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div id={`answer-${faq.id}`} role="region" aria-labelledby={`question-${faq.id}`} className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 text-sm sm:text-base text-[#FAF9F5]/80 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support & Direct WhatsApp Prompt (narrow screens only) */}
        <div className="lg:hidden mt-2 p-5 sm:p-7 rounded-3xl bg-[#14251D]/90 border border-[#B99A5B]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 backdrop-blur-md shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg md:text-xl font-serif-editorial text-white font-medium mb-1">
              Have a customized requirement or special question?
            </h4>
            <p className="text-xs sm:text-sm font-sans-body text-stone-300">
              Our on-site hospitality team is available on WhatsApp to answer instantly.
            </p>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold transition-all shadow-lg shrink-0"
          >
            <MessageSquare size={15} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
