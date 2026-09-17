import { imagesConfig } from '../config/siteConfig';

export function ImageBreak() {

  return (
    <section
      className="relative w-full h-[58vh] min-h-[360px] max-h-[620px] overflow-hidden flex items-center justify-center bg-[#0B0F0D]"
    >
      <img
        src={imagesConfig.breakSection}
        alt="The open lawn at HS Valley Farmhouse at dusk"
        loading="lazy"
        decoding="async"
        data-cursor="view"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="absolute inset-0 bg-[#0B0F0D]/40" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0F0D]/20 to-[#0B0F0D]/60" />

      {/* Floating Statement */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial text-[#FAF9F5] font-light italic tracking-tight uppercase drop-shadow-2xl"
        >
          Escape the ordinary.
        </h2>
        <p className="mt-4 text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-[#B99A5B]">
          Gabol Abad Road • Bahria Town Karachi
        </p>
      </div>
    </section>
  );
}
