import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BookOpen, Flame, Compass } from 'lucide-react';
import { FlavourTheme, FlavourId } from '../types';
import { InteractivePouch } from './InteractivePouch';

interface HeroSectionProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  onOpenComingSoon: (context: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
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

  const flavourList: FlavourTheme[] = Object.values(allFlavours) as FlavourTheme[];

  return (
    <section
      id="hero-cinematic-section"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-1000"
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

      {/* Main Grid Content */}
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-white/60 bg-white/40 backdrop-blur-xl shadow-xs">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentFlavour.accentColor }}
              />
              <span
                className="text-[10px] font-bold tracking-[0.3em] uppercase"
                style={{ color: currentFlavour.accentColor }}
              >
                Roasted • Crispy • Made With Love
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
              A LITTLE <br />SUNDAY.<br />
              <span
                className="italic transition-colors duration-700 font-light"
                style={{ color: currentFlavour.accentColor }}
              >
                EVERY DAY.
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
            <p className="text-base sm:text-lg text-[#5A5A5A] dark:text-[#D4CEBF] font-sans-clean leading-relaxed max-w-xl mb-8">
              Premium roasted makhana crafted for mindful snacking. Popped gently from sacred water lily seeds, slow-roasted in cold-pressed oil, and dressed in artisanal spices.
            </p>
          </div>

          {/* Flavour Quick Switcher Pills (Frosted Glass) */}
          <div
            className={`mb-8 transition-all duration-700 delay-400 ${
              revealStage >= 8
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70 mb-3">
              Flavour Expression:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {flavourList.map((flv) => {
                const isActive = flv.id === currentFlavour.id;
                return (
                  <button
                    key={flv.id}
                    id={`hero-flavour-pill-${flv.id}`}
                    onClick={() => onSelectFlavour(flv.id)}
                    className={`group relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 border cursor-pointer ${
                      isActive
                        ? 'shadow-md scale-105 bg-white dark:bg-white text-[#1A1A1A] dark:text-[#1A1A1A] border-2 ring-1 ring-black/5'
                        : 'bg-white/70 hover:bg-white text-[#2B2B2B] hover:text-[#1A1A1A] border-white/80 shadow-xs hover:shadow-sm hover:scale-[1.02] dark:bg-[#1E1B17] dark:hover:bg-[#2A2520] dark:text-[#F5F2EB] dark:hover:text-white dark:border-white/15 backdrop-blur-md'
                    }`}
                    style={{
                      borderColor: isActive ? flv.accentColor : undefined,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 shrink-0"
                      style={{ backgroundColor: flv.accentColor }}
                    />
                    <span>{flv.name}</span>
                    {isActive && (
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-black/10 text-[#2B2B2B]/80 dark:text-[#1A1A1A]/80 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 delay-500 ${
              revealStage >= 9
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <button
              onClick={() => onOpenComingSoon('Hero Primary CTA')}
              id="hero-primary-cta"
              className="bg-[#2B2B2B] dark:bg-[#F5F2EB] text-white dark:text-[#1A1A1A] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-[#1A1A1A] dark:hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Coming Soon</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#story"
              id="hero-secondary-cta"
              className="border border-[#2B2B2B]/20 dark:border-white/20 bg-white/40 dark:bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 text-[#2B2B2B] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-white/20 hover:border-[#2B2B2B] dark:hover:border-white/40 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70" />
              <span>Our Story</span>
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
                Sacred
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60">
                Water Lily Kernels
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
              showExploreHint={revealStage >= 8}
            />
          </div>

          {/* Quick Order Sample Teaser Bar (Frosted Glass) */}
          <div
            className={`mt-6 w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 rounded-[28px] p-4 flex items-center justify-between shadow-xs transition-all duration-700 delay-500 ${
              revealStage >= 8
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-widest text-[#2B2B2B]/50">
                Inaugural Release
              </span>
              <span className="text-sm font-semibold text-[#1A1A1A]">
                Triple-Pack Discovery Trio
              </span>
            </div>
            <button
              id="hero-reserve-sample-btn"
              onClick={() => onOpenComingSoon('Triple-Pack Discovery Trio')}
              className="bg-[#2B2B2B] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-[#1A1A1A] transition-all active:scale-95"
            >
              Reserve Pack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
