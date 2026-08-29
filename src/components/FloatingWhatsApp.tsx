import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { contactConfig } from '../config/siteConfig';

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappDirectUrl = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(
    contactConfig.whatsappPrefilledMessage
  )}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip badge */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-[#0B0F0D]/90 text-[#FAF9F5] text-xs font-sans-body px-3.5 py-2 rounded-full border border-[#B99A5B]/30 backdrop-blur-md shadow-xl transition-all duration-300 ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span className="whitespace-nowrap font-medium">Chat with us</span>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="explore"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0B0F0D] flex items-center justify-center shadow-2xl animate-soft-pulse transition-transform duration-300 hover:scale-110 focus:outline-hidden"
        aria-label="Chat on WhatsApp with HS Valley Farmhouse"
      >
        <MessageSquare size={26} className="fill-current" />
      </a>
    </div>
  );
}
