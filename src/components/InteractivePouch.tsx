import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, Sparkles, Compass } from 'lucide-react';
import { FlavourTheme } from '../types';

interface InteractivePouchProps {
  currentFlavour: FlavourTheme;
  isZoomed?: boolean;
  onInspectDetails?: () => void;
  className?: string;
  showExploreHint?: boolean;
}

export const InteractivePouch: React.FC<InteractivePouchProps> = ({
  currentFlavour,
  className = '',
  showExploreHint = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 50, y: 30 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mouse Move Handler for 3D Tilt & Specular Lighting
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg max)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    // Specular light position in percentage
    const lightX = Math.round((x / rect.width) * 100);
    const lightY = Math.round((y / rect.height) * 100);
    setLightPos({ x: lightX, y: lightY });

    if (!hasInteracted) setHasInteracted(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsZoomActive(false);
    setRotateX(0);
    setRotateY(0);
    setLightPos({ x: 50, y: 30 });
  };

  // Touch handlers for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleTouchEnd = () => {
    setRotateX(0);
    setRotateY(0);
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [currentFlavour.id]);

  return (
    <div
      ref={containerRef}
      id={`pouch-interactive-container-${currentFlavour.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => setIsZoomActive(!isZoomActive)}
      className={`relative select-none perspective-1200 cursor-grab active:cursor-grabbing ${className}`}
      style={{ minHeight: '440px' }}
    >
      {/* Dynamic Ambient Shadow (shifts opposite to cursor) */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 rounded-[100%] transition-all duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 50%, transparent 75%)`,
          transform: `translate3d(calc(-50% + ${-rotateY * 3}px), ${rotateX * 1.5}px, 0px) scale(${
            isZoomActive ? 1.25 : isHovered ? 1.08 : 1
          })`,
          filter: isZoomActive ? 'blur(16px)' : 'blur(10px)',
        }}
      />

      {/* Floating 3D Pouch Card with Frosted Glass Backplate */}
      <div
        className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
            isZoomActive ? 1.15 : isHovered ? 1.05 : 1
          }) translate3d(0, ${isHovered ? -8 : 0}px, ${isZoomActive ? '60px' : '20px'})`,
        }}
      >
        {/* Signature Frosted Glass Backplate (Theme Token) */}
        <div
          className="absolute w-[300px] sm:w-[360px] md:w-[400px] h-[440px] sm:h-[490px] md:h-[530px] bg-white/20 backdrop-blur-2xl rounded-[40px] border border-white/40 shadow-[0_40px_80px_rgba(0,0,0,0.08)] pointer-events-none transition-transform duration-300 -z-10"
          style={{
            transform: `rotate(-2deg) translate3d(${rotateY * 0.4}px, ${-rotateX * 0.4}px, -20px)`,
          }}
        />

        {/* Floating Rotated Frosted Stat Badge */}
        <div
          className="absolute -top-7 -right-4 sm:-right-8 bg-white/40 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/60 shadow-lg flex flex-col items-center space-y-1 pointer-events-none z-30 transition-transform duration-300"
          style={{
            transform: `rotate(6deg) translate3d(${rotateY * 1.6}px, ${-rotateX * 1.6}px, 60px)`,
          }}
        >
          <span className="text-2xl font-serif-luxury italic font-medium" style={{ color: currentFlavour.accentColor }}>
            9g
          </span>
          <span className="text-[8px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 text-center leading-tight">
            Plant<br />Protein
          </span>
        </div>

        {/* Pouch Container */}
        <div className="relative w-[270px] sm:w-[310px] md:w-[340px] max-w-full aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl transition-shadow duration-500 border-4 border-white/50">
          {/* Real Pouch Artwork */}
          <img
            src={currentFlavour.pouchImage}
            alt={`${currentFlavour.name} roasted makhana pouch`}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${isZoomActive ? 'scale-110' : ''}`}
          />

          {/* Fallback skeleton if loading */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-pulse"
              style={{
                backgroundColor: currentFlavour.cardBg,
                border: `2px solid ${currentFlavour.accentColor}30`,
              }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: currentFlavour.accentColor }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold text-[#2B2B2B]">
                {currentFlavour.name}
              </span>
              <span className="text-xs text-[#2B2B2B]/60 mt-2">Loading Studio Render...</span>
            </div>
          )}

          {/* Real-time Specular Light Sheen (reacts to cursor) */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.75 : 0.35,
              background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 30%, transparent 65%)`,
            }}
          />

          {/* Physical Pouch Edge Reflection */}
          <div className="absolute inset-0 pointer-events-none rounded-[26px] ring-1 ring-white/60 shadow-inner" />

          {/* Subtle tactile Frosted Glass Foil Badge indicator */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-mono-tech tracking-[0.2em] uppercase font-bold bg-white/40 backdrop-blur-md text-[#2B2B2B] border border-white/60 shadow-xs">
            80G NET WT.
          </div>

          {/* Zoom In Active Indicator */}
          {isZoomActive && (
            <div className="absolute bottom-4 left-4 right-4 py-2.5 px-3 rounded-2xl bg-[#2B2B2B]/85 backdrop-blur-md text-white text-xs flex items-center justify-between animate-in fade-in border border-white/20">
              <span className="font-mono-tech uppercase tracking-wider text-[10px]">Macro Inspection</span>
              <span className="text-white/70 text-[11px]">Click to reset</span>
            </div>
          )}
        </div>

        {/* Floating Decorative Frosted Cards around Pouch */}
        <div
          className="absolute -bottom-4 -left-3 sm:-left-6 p-4 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg pointer-events-none transition-all duration-300 z-20"
          style={{
            transform: `translate3d(${-rotateY * 1.3}px, ${rotateX * 1.3}px, 45px)`,
          }}
        >
          <span className="text-xs font-serif-luxury italic text-[#2B2B2B] block">
            "{currentFlavour.tagline}"
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#D27D59] mt-0.5 block">
            Slow Roasted • Never Fried
          </span>
        </div>
      </div>

      {/* Floating Exploration Hint (fades after interaction) */}
      {showExploreHint && !hasInteracted && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-xs shadow-lg animate-bounce">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>Move cursor to tilt • Click to inspect details</span>
        </div>
      )}

      {/* Quick Zoom Tooltip Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomActive(!isZoomActive);
        }}
        className="absolute bottom-2 right-2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 backdrop-blur-md border border-black/5 shadow-md transition-all active:scale-95"
        title={isZoomActive ? 'Reset zoom' : 'Inspect packaging close-up'}
        aria-label="Toggle zoom view"
      >
        <ZoomIn className={`w-4 h-4 ${isZoomActive ? 'text-amber-600' : ''}`} />
      </button>
    </div>
  );
};
