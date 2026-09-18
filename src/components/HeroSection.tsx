import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Flame,
  Wand2,
  Soup,
  Leaf,
  Wind,
  UtensilsCrossed,
  Zap,
  CookingPot,
  Cookie,
  Check,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FlavourTheme, FlavourId, PackSize } from '../types';
import { InteractivePouch } from './InteractivePouch';
import { ChooseYourSundayCrunch } from './ChooseYourSundayCrunch';

interface HeroSectionProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  selectedSize?: PackSize;
  onSelectSize?: (size: PackSize) => void;
  onAddToCart?: (flavour: FlavourTheme, size: PackSize, quantity: number) => void;
  onOpenComingSoon: (context: string) => void;
}

// Map distinct Lucide icons for each flavor
const FLAVOUR_ICONS: Record<FlavourId, React.ElementType> = {
  'peri-peri': Flame,
  'ghee-roasted': Sparkles,
  'salt-pepper': Sparkles,
  'cheese-herbs': Cookie,
  'mint-pudina': Wind,
  'himalayan-salt': Sparkles,
  'cheese': Cookie,
  'magic-masala': Wand2,
  'chettinad-tomato': Soup,
  'cream-onion': Leaf,
  'mint': Wind,
  'garlic': UtensilsCrossed,
  'sweet-chilli': Zap,
  'barbecue': CookingPot,
};

// Keyboard shortcut hints for quick tactile access
const FLAVOUR_SHORTCUTS: Record<FlavourId, string> = {
  'peri-peri': '1',
  'ghee-roasted': '2',
  'salt-pepper': '3',
  'cheese-herbs': '4',
  'mint-pudina': '5',
  'himalayan-salt': '6',
  'cheese': '7',
  'magic-masala': '8',
  'chettinad-tomato': '9',
  'cream-onion': '0',
  'mint': 'M',
  'garlic': 'G',
  'sweet-chilli': 'S',
  'barbecue': 'B',
};

// Taste categories for quick filtering within the hero showcase
type TasteCategory = 'all' | 'spicy' | 'savory' | 'fresh';

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
  selectedSize = '40g',
  onSelectSize,
  onAddToCart,
  onOpenComingSoon,
}) => {
  // Reveal sequence stages (1 to 9)
  const [revealStage, setRevealStage] = useState(0);

  useEffect(() => {
    // Cinematic timed reveal sequence
    const timers = [
      setTimeout(() => setRevealStage(1), 100), // Background
      setTimeout(() => setRevealStage(2), 350), // Brand
      setTimeout(() => setRevealStage(3), 600), // Typography
      setTimeout(() => setRevealStage(4), 850), // Ambient light
      setTimeout(() => setRevealStage(5), 1100), // Silhouette
      setTimeout(() => setRevealStage(6), 1300), // Pouch rises
      setTimeout(() => setRevealStage(7), 1600), // Product sharp
      setTimeout(() => setRevealStage(8), 1850), // Flavour badge
      setTimeout(() => setRevealStage(9), 2100), // CTA active
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const CurrentIcon = FLAVOUR_ICONS[currentFlavour.id] || Sparkles;

  return (
    <section
      id="hero-cinematic-section"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-1000"
    >
      {/* Dynamic Atmospheric Gradient Mesh & Ambient Blobs */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          revealStage >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft Ambient Blobs changing with currentFlavour */}
        <div
          className={`ambient-orb absolute -top-20 -left-20 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] opacity-40 mix-blend-multiply ${currentFlavour.ambientBlob1}`}
          style={{
            transform: revealStage >= 4 ? 'translate(20px, 30px)' : 'translate(0, 0)',
          }}
        />
        <div
          className={`ambient-orb absolute top-1/4 -right-20 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] opacity-35 mix-blend-multiply ${currentFlavour.ambientBlob2}`}
          style={{
            transform: revealStage >= 4 ? 'translate(-30px, 20px)' : 'translate(0, 0)',
          }}
        />
        <div
          className={`ambient-orb absolute -bottom-24 left-1/3 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] opacity-30 mix-blend-multiply ${currentFlavour.ambientBlob3}`}
        />

        {/* Delicate subtle grain */}
        <div className="absolute inset-0 bg-grain-texture opacity-60" />
      </div>

      {/* Main Grid Content (Top Section) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Typography & Story Hook */}
        <div className="lg:col-span-6 flex flex-col text-left">
          {/* Small Label */}
          <div
            className={`transition-all duration-700 delay-100 ${
              revealStage >= 2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-white/60 dark:border-white/15 bg-white/40 dark:bg-[#1E1B17]/60 backdrop-blur-xl shadow-xs">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: currentFlavour.accentColor }}
              />
              <span
                className="text-[10px] font-bold tracking-[0.3em] uppercase"
                style={{ color: currentFlavour.accentColor }}
              >
                10 Artisan Recipes • Slow Roasted • Pure Crunch
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              revealStage >= 3
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-serif-luxury font-normal leading-[1.05] tracking-tight text-[#1A1A1A] dark:text-white mb-6">
              SUNDAY HUNGER.<br />
              <span
                className="italic transition-colors duration-700 font-light"
                style={{ color: currentFlavour.accentColor }}
              >
                ALL DAY.
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <div
            className={`transition-all duration-700 delay-300 ${
              revealStage >= 3
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-base sm:text-lg text-[#5A5A5A] dark:text-[#D4CEBF] font-sans-clean leading-relaxed max-w-xl mb-6">
              Two front doors to pure snacking delight. Occasion-led weekend food assortments for lazy mornings and midnight parties, paired with your clean weekday desk companion.
            </p>
          </div>

          {/* Interactive Flavour Pill Switcher directly in Hero Section */}
          <div
            className={`mb-5 transition-all duration-700 delay-350 ${
              revealStage >= 7
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#8C8479] dark:text-[#A8A29E] font-semibold">
                Select Flavour
              </span>
              <span className="w-1 h-1 rounded-full bg-[#8C8479]/50" />
              <span className="text-[10px] font-sans-clean text-[#8C8479] dark:text-[#A8A29E]">
                5 Core Launch Blends
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Hero flavour switcher">
              {(['peri-peri', 'ghee-roasted', 'salt-pepper', 'cheese-herbs', 'mint-pudina'] as FlavourId[]).map((fid, idx) => {
                const flv = allFlavours[fid];
                if (!flv) return null;
                const isActive = currentFlavour.id === fid;
                const Icon = FLAVOUR_ICONS[fid] || Sparkles;
                return (
                  <button
                    key={fid}
                    id={`hero-flavour-pill-${fid}`}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectFlavour(fid)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 active:scale-95 cursor-pointer border ${
                      isActive
                        ? 'bg-white dark:bg-[#1E1B17] text-[#1A1A1A] dark:text-white shadow-md'
                        : 'bg-white/40 dark:bg-white/5 text-[#5A5A5A] dark:text-[#D4CEBF] border-transparent hover:bg-white/70 dark:hover:bg-white/10'
                    }`}
                    style={{
                      borderColor: isActive ? flv.accentColor : 'transparent',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300"
                      style={{
                        backgroundColor: flv.accentColor,
                        transform: isActive ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                    <span className="font-semibold whitespace-nowrap">{flv.name}</span>
                    <span className="text-[9px] opacity-40 font-mono-tech hidden sm:inline">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Flavour Spotlight Chip */}
          <div
            className={`mb-8 transition-all duration-700 delay-400 ${
              revealStage >= 8
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/65 dark:bg-[#1E1B17]/85 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-xs flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                  style={{
                    backgroundColor: `${currentFlavour.accentColor}20`,
                    color: currentFlavour.accentColor,
                  }}
                >
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] dark:text-white truncate">
                      {currentFlavour.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase font-mono-tech transition-colors duration-500"
                      style={{
                        backgroundColor: `${currentFlavour.accentColor}20`,
                        color: currentFlavour.accentColor,
                      }}
                    >
                      {currentFlavour.profileBadge || currentFlavour.badge}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#6B655D] dark:text-[#A8A29E] truncate">
                    {currentFlavour.tagline}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[10px] font-mono-tech text-[#8C8479] dark:text-[#A8A29E] bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg">
                <span>Key</span>
                <kbd className="px-1 py-0.5 rounded bg-white dark:bg-black/40 font-bold text-[#1A1A1A] dark:text-white shadow-2xs">
                  {FLAVOUR_SHORTCUTS[currentFlavour.id]}
                </kbd>
              </div>
            </div>
          </div>

          {/* Primary & Secondary Dual CTAs for Two Front Doors */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 delay-500 ${
              revealStage >= 9
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <a
              href="#shop-by-moment"
              id="hero-primary-cta"
              className="bg-[#2B2B2B] dark:bg-[#F5F2EB] text-white dark:text-[#1A1A1A] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-[#1A1A1A] dark:hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Shop Sunday</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#two-pillars"
              id="hero-secondary-cta"
              className="border border-[#2B2B2B]/20 dark:border-white/20 bg-white/40 dark:bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 text-[#2B2B2B] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-white/20 hover:border-[#2B2B2B] dark:hover:border-white/40 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70" />
              <span>Shop the Week</span>
            </a>
          </div>

          {/* Micro-Features Frosted Card */}
          <div className="mt-10 p-5 rounded-[28px] bg-white/50 dark:bg-[#1E1B17]/80 backdrop-blur-xl border border-white/70 dark:border-white/15 shadow-xs grid grid-cols-3 gap-4 text-left">
            <div>
              <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
                100%
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60">
                Slow Roasted
              </span>
            </div>
            <div>
              <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
                0g
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60">
                Trans Fats
              </span>
            </div>
            <div>
              <span className="block font-serif-luxury text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white">
                10
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60">
                Artisan Profiles
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: LARGE Hero Pouch Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          {/* Animated Glow Aura Behind Pouch */}
          <div
            className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none blur-3xl transition-all duration-1000 ${
              revealStage >= 4 ? 'opacity-70 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              backgroundColor: currentFlavour.accentColor,
              opacity: 0.25,
            }}
          />

          {/* Pouch Container with Reveal Transitions */}
          <div
            className={`w-full max-w-md transition-all duration-1000 ${
              revealStage >= 6
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-90'
            }`}
          >
            <InteractivePouch
              currentFlavour={currentFlavour}
              selectedSize={selectedSize}
              showExploreHint={revealStage >= 8}
            />
          </div>

          {/* Quick Order Sample Teaser Bar (Frosted Glass) */}
          <div
            className={`mt-6 w-full max-w-md bg-white/40 dark:bg-[#1E1B17]/70 backdrop-blur-xl border border-white/60 dark:border-white/15 rounded-[28px] p-4 flex items-center justify-between shadow-xs transition-all duration-700 delay-500 ${
              revealStage >= 8
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-widest text-[#2B2B2B]/50 dark:text-[#F5F2EB]/50">
                Inaugural Collector Box
              </span>
              <span className="text-sm font-semibold text-[#1A1A1A] dark:text-white">
                10-Flavour Discovery Vault
              </span>
            </div>
            <button
              id="hero-reserve-sample-btn"
              onClick={() => onOpenComingSoon('10-Flavour Discovery Vault')}
              className="bg-[#2B2B2B] dark:bg-[#F5F2EB] text-white dark:text-[#1A1A1A] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-[#1A1A1A] dark:hover:bg-white transition-all active:scale-95 cursor-pointer"
            >
              Reserve Pack
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5 CORE LAUNCH FLAVOURS GRID & UNRELEASED SKUs PIPELINE */}
      {/* ========================================================================= */}
      <ChooseYourSundayCrunch
        currentFlavour={currentFlavour}
        allFlavours={allFlavours}
        onSelectFlavour={onSelectFlavour}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
        onAddToCart={onAddToCart}
        onOpenComingSoon={onOpenComingSoon}
      />
    </section>
  );
};
