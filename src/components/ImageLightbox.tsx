import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';
import { thumbFor } from '../config/siteConfig';

interface ImageLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export function ImageLightbox({
  isOpen,
  currentIndex,
  items,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}: ImageLightboxProps) {
  const currentItem = items[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  const total = items.length;
  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-[100000] bg-[#0B0F0D]/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 md:p-8 animate-in fade-in duration-300 select-none"
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between text-[#FAF9F5] z-10 pb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B99A5B]">
            HS VALLEY GALLERY
          </span>
          <span className="text-xs text-[#FAF9F5]/40 font-mono">•</span>
          <span className="text-[11px] sm:text-xs font-mono text-[#FAF9F5]/70">
            {formattedCurrent} / {formattedTotal}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          data-cursor="explore"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#FAF9F5]/20 flex items-center justify-center hover:bg-[#FAF9F5] hover:text-[#0B0F0D] transition-all duration-300 focus:outline-hidden cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X size={16} />
        </button>
      </div>

      {/* Center Image Stage with Navigation */}
      <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden">
        {/* Prev Button */}
        <button
          type="button"
          onClick={onPrev}
          data-cursor="explore"
          className="absolute left-1 sm:left-4 md:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#FAF9F5]/20 bg-[#0B0F0D]/70 hover:bg-[#B99A5B] hover:text-[#0B0F0D] flex items-center justify-center transition-all duration-300 backdrop-blur-md focus:outline-hidden cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Current Image */}
        <div className="relative max-w-5xl max-h-[70vh] sm:max-h-[75vh] flex flex-col items-center justify-center px-8 sm:px-12">
          <img
            key={currentItem.id}
            src={currentItem.image}
            alt={currentItem.caption}
            className="max-w-full max-h-[60vh] sm:max-h-[68vh] object-contain rounded-lg shadow-2xl transition-all duration-500 animate-in zoom-in-95"
          />
          {/* Caption */}
          <div className="mt-3 sm:mt-4 text-center">
            <h4 className="text-base sm:text-lg md:text-xl font-serif-editorial text-[#FAF9F5] font-light">
              {currentItem.title}
            </h4>
            <p className="text-[11px] sm:text-xs font-sans-body text-[#FAF9F5]/70 mt-0.5 sm:mt-1">
              {currentItem.caption}
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          data-cursor="explore"
          className="absolute right-1 sm:right-4 md:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#FAF9F5]/20 bg-[#0B0F0D]/70 hover:bg-[#B99A5B] hover:text-[#0B0F0D] flex items-center justify-center transition-all duration-300 backdrop-blur-md focus:outline-hidden cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-2 no-scrollbar">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`w-10 h-7 sm:w-14 sm:h-9 md:w-16 md:h-10 rounded-md overflow-hidden shrink-0 transition-all cursor-pointer ${
              idx === currentIndex
                ? 'ring-2 ring-[#B99A5B] opacity-100 scale-105'
                : 'opacity-40 hover:opacity-80'
            }`}
          >
            <img
              src={thumbFor(item.image)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
