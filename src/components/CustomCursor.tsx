import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<'default' | 'view' | 'explore' | 'hidden'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch/mobile device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const imageHover = target.closest('[data-cursor="view"]') || target.closest('img');
      const ctaHover = target.closest('[data-cursor="explore"]') || target.closest('button, a[href]');

      if (imageHover && !target.closest('button, a')) {
        setCursorMode('view');
        setCursorText('VIEW');
      } else if (ctaHover) {
        setCursorMode('explore');
        setCursorText('EXPLORE');
      } else {
        setCursorMode('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setCursorMode('hidden');
    };

    const onMouseEnter = () => {
      setCursorMode('default');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      cursorX = lerp(cursorX, mouseX, 0.18);
      cursorY = lerp(cursorY, mouseY, 0.18);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  const isView = cursorMode === 'view';
  const isExplore = cursorMode === 'explore';
  const isHidden = cursorMode === 'hidden';

  return (
    <div
      ref={cursorDotRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out backdrop-blur-xs ${
          isView
            ? 'w-20 h-20 bg-[#FAF9F5]/90 text-[#0B0F0D] shadow-2xl scale-100'
            : isExplore
            ? 'w-24 h-24 bg-[#B99A5B]/90 text-[#0B0F0D] shadow-2xl scale-100'
            : 'w-4 h-4 bg-[#B99A5B] shadow-md'
        }`}
      >
        <span
          ref={cursorTextRef}
          className={`text-[10px] tracking-[0.2em] font-semibold uppercase text-center transition-opacity duration-200 ${
            isView || isExplore ? 'opacity-100 font-mono' : 'opacity-0 w-0 h-0 overflow-hidden'
          }`}
        >
          {cursorText}
        </span>
      </div>
    </div>
  );
}
