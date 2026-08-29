import { useState, useRef, useEffect } from 'react';
import { Plus, Minus, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqData, contactConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export function FAQSection() {
  // First item open by default for immediate context
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (listRef.current?.children) {
        gsap.fromTo(
          listRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      className="relative w-full py-20 sm:py-24 md:py-36 bg-[#0B0F0D] text-[#FAF9F5] overflow-hidden border-t border-[#14251D]"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-[#14251D]/60 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-[#B99A5B]/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#14251D] border border-[#B99A5B]/40 mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#B99A5B]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B99A5B] font-mono font-medium">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif-editorial font-light uppercase tracking-tight text-white leading-tight">
            Essential <span className="italic text-[#B99A5B]">Information</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-sans-body text-stone-300 font-light mt-2.5 sm:mt-3 max-w-lg mx-auto">
            Everything you need to know about reserving and experiencing HS Valley Farmhouse in Bahria Town Karachi.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div ref={listRef} className="space-y-3.5 sm:space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                layout
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
                    <span className="text-xs sm:text-sm md:text-base font-mono text-[#B99A5B] font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base md:text-xl font-serif-editorial text-white font-medium group-hover:text-[#B99A5B] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? 'bg-[#B99A5B] text-[#0B0F0D] border-[#B99A5B] shadow-md'
                        : 'bg-[#0B0F0D] text-[#FAF9F5] border-[#FAF9F5]/30 group-hover:border-[#B99A5B] group-hover:text-[#B99A5B]'
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.28, delay: 0.08, ease: 'easeOut' },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.2, ease: 'easeIn' },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 pt-1">
                        <motion.div
                          initial={{ y: -6, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -6, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="p-3.5 sm:p-5 rounded-xl bg-[#0B0F0D]/80 border border-[#FAF9F5]/15 text-xs sm:text-sm md:text-base font-sans-body text-stone-200 font-normal leading-relaxed whitespace-pre-line shadow-inner"
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Support & Direct WhatsApp Prompt */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-8 rounded-3xl bg-[#14251D]/90 border border-[#B99A5B]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 backdrop-blur-md shadow-xl">
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
