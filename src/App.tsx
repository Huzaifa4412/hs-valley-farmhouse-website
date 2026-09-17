import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EditorialIntro } from './components/EditorialIntro';
import { ImageBreak } from './components/ImageBreak';
import { AboutSection } from './components/AboutSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { HorizontalScrollSection } from './components/HorizontalScrollSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CinematicStatement } from './components/CinematicStatement';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ImageLightbox } from './components/ImageLightbox';
import { InquiryModal } from './components/InquiryModal';
import { galleryItemsData } from './config/siteConfig';
import { LightboxState } from './types';

export default function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
  });

  const handleOpenInquiry = useCallback(() => {
    // Scroll directly to on-page Contact Section
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } else {
      setIsInquiryModalOpen(true);
    }
  }, []);

  const handleCloseInquiry = useCallback(() => {
    setIsInquiryModalOpen(false);
  }, []);

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handlePrevLightbox = useCallback(() => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + galleryItemsData.length) % galleryItemsData.length,
    }));
  }, []);

  const handleNextLightbox = useCallback(() => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % galleryItemsData.length,
    }));
  }, []);

  const handleSelectLightboxIndex = useCallback((index: number) => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: index,
    }));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0F0D] text-[#FAF9F5] selection:bg-[#B99A5B]/30 selection:text-[#FAF9F5]">
      {/* Keyboard users land here first */}
      <a
        href="#main-content"
        className="skip-link rounded-full bg-[#B99A5B] text-[#0B0F0D] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
      >
        Skip to content
      </a>

      {/* Film grain over the whole page */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* 3. Floating Minimal Luxury Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Cinematic Scroll Journey */}
      <main id="main-content">
        {/* 4. Cinematic 100svh Hero Section */}
        <HeroSection onOpenInquiry={handleOpenInquiry} />

        {/* 5. Editorial Statement (Warm Cream Background) */}
        <EditorialIntro />

        {/* 6. Parallax Image Break */}
        <ImageBreak />

        {/* 7. Asymmetrical Editorial About Section */}
        <AboutSection />

        {/* 8. Estate Facilities & Resident Wildlife */}
        <AmenitiesSection />

        {/* 9. Pinned Horizontal Image Journey */}
        <HorizontalScrollSection />

        {/* 9. Curated Experience Moments */}
        <ExperienceSection onOpenInquiry={handleOpenInquiry} />

        {/* 10. Cinematic Statement (Gather. Celebrate. Escape.) */}
        <CinematicStatement />

        {/* 11. Interactive Property Gallery */}
        <GallerySection onOpenLightbox={handleOpenLightbox} />

        {/* 12. Location & Interactive Map Section (Above Contact Form) */}
        <LocationSection />

        {/* 13. Prominent Visible Contact & Reservation Inquiry Form */}
        <ContactSection />

        {/* 14. Essential Information / Luxury FAQ Accordion */}
        <FAQSection />
      </main>

      {/* 15. Monumental Editorial Footer */}
      <Footer />

      {/* 16. Floating WhatsApp Contact Action */}
      <FloatingWhatsApp />

      {/* 17. Fullscreen Interactive Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxState.isOpen}
        currentIndex={lightboxState.currentIndex}
        items={galleryItemsData}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        onSelectIndex={handleSelectLightboxIndex}
      />

      {/* 18. Quick Reservation Drawer Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={handleCloseInquiry}
      />
    </div>
  );
}
