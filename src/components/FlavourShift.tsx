import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Zap, Check, Eye } from 'lucide-react';
import { FlavourTheme, FlavourId } from '../types';
import { InteractivePouch } from './InteractivePouch';

interface FlavourShiftProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  onOpenComingSoon: (context: string) => void;
}

export const FlavourShift: React.FC<FlavourShiftProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
  onOpenComingSoon,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const flavourList: FlavourTheme[] = Object.values(allFlavours) as FlavourTheme[];

  const handleFlavourChange = (id: FlavourId) => {
    if (id === currentFlavour.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onSelectFlavour(id);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 250);
    }, 200);
  };

  return (
    <section
      id="flavours"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 transition-all duration-1000 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${currentFlavour.accentColor}18 0%, transparent 70%)`,
      }}
    >
      {/* Background Ambience Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="ambient-orb absolute top-1/3 left-10 w-96 h-96 opacity-40 mix-blend-multiply"
          style={{ backgroundColor: currentFlavour.accentColor }}
        />
        <div
          className="ambient-orb absolute bottom-10 right-10 w-[420px] h-[420px] opacity-30 mix-blend-multiply"
          style={{ backgroundColor: currentFlavour.accentSecondary }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-widest uppercase mb-4 border border-white/60 dark:border-white/15 bg-white/40 dark:bg-white/5 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">The Flavour Shift • Three Personalities</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight">
            One Sacred Seed.
            <br />
            <span
              className="italic transition-colors duration-700 font-light"
              style={{ color: currentFlavour.accentColor }}
            >
              Three Masterpiece Roasts.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#5A5A5A] dark:text-[#D4CEBF] font-sans-clean max-w-xl mx-auto">
            Click any flavour card below to watch the entire atmosphere morph in real time.
          </p>
        </div>

        {/* Floating Frosted Flavour Switcher Buttons (State 01, 02, 03) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {flavourList.map((flv, idx) => {
            const isSelected = flv.id === currentFlavour.id;
            return (
              <button
                key={flv.id}
                id={`flavour-shift-card-${flv.id}`}
                onClick={() => handleFlavourChange(flv.id)}
                className={`group relative text-left p-7 sm:p-8 rounded-[32px] transition-all duration-500 overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-white/90 dark:bg-[#25211B] backdrop-blur-2xl shadow-xl scale-[1.02] border-2 border-white dark:border-white/25'
                    : 'bg-white/50 hover:bg-white/80 dark:bg-[#1A1714]/80 dark:hover:bg-[#25211B] backdrop-blur-xl border border-white/60 dark:border-white/10 hover:shadow-md'
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 30px 60px -15px ${flv.glowColor}, 0 0 0 1px rgba(255,255,255,0.9) inset`
                    : undefined,
                }}
              >
                {/* State index badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50 dark:text-[#F5F2EB]/50">
                    STATE 0{idx + 1}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isSelected ? 'text-white' : 'bg-black/5 dark:bg-white/10 text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60'
                    }`}
                    style={{
                      backgroundColor: isSelected ? flv.accentColor : undefined,
                    }}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : idx + 1}
                  </span>
                </div>

                {/* Flavour Name & Tagline */}
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1A1A1A] dark:text-white mb-1.5">
                  {flv.name}
                </h3>
                <p
                  className="text-xs sm:text-sm font-semibold mb-3"
                  style={{ color: flv.accentColor }}
                >
                  "{flv.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#D4CEBF] line-clamp-2 mb-4 leading-relaxed">
                  {flv.description}
                </p>

                {/* Mood Tag */}
                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60">
                    {flv.mood}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: flv.accentColor }}
                  >
                    {isSelected ? 'ACTIVE' : 'SWITCH →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Large Floating Showcase Card with Interactive 3D Pouch */}
        <div
          id="active-flavour-stage"
          className={`relative rounded-[40px] p-7 sm:p-10 lg:p-14 overflow-hidden transition-all duration-700 bg-white/50 dark:bg-[#1A1714]/80 backdrop-blur-2xl border border-white/70 dark:border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.06)] ${
            isTransitioning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Center-Left: Big 3D Interactive Pouch */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <InteractivePouch currentFlavour={currentFlavour} showExploreHint={false} />
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50 dark:text-[#F5F2EB]/50">
                Live Package Model • 3D Cursor Responsive
              </p>
            </div>

            {/* Right: Rich Narrative Showcase & Product Details */}
            <div className="lg:col-span-6 flex flex-col text-left">
              {/* Badge & Mood */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span
                  className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-xs"
                  style={{ backgroundColor: currentFlavour.accentColor }}
                >
                  {currentFlavour.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/70 dark:bg-white/10 border border-white/70 dark:border-white/15 text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
                  {currentFlavour.mood}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight mb-2">
                {currentFlavour.name}
              </h3>

              {/* Tagline */}
              <p
                className="text-lg sm:text-xl font-serif-luxury italic font-medium mb-4"
                style={{ color: currentFlavour.accentColor }}
              >
                "{currentFlavour.tagline}"
              </p>

              {/* Description */}
              <p className="text-base text-[#5A5A5A] dark:text-[#D4CEBF] font-sans-clean leading-relaxed mb-6">
                {currentFlavour.description}
              </p>

              {/* Supporting Visual Ingredients List */}
              <div className="mb-6 p-4 rounded-3xl bg-white/45 dark:bg-white/5 backdrop-blur-xl border border-white/70 dark:border-white/10 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60 mb-2">
                  Gourmet Flavour Architecture:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentFlavour.supportingVisuals.map((vis, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-white/10 border border-white/80 dark:border-white/15 text-[#2B2B2B] dark:text-[#F5F2EB] shadow-xs"
                    >
                      • {vis}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Taste Notes */}
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60 mr-2">
                  Tasting Notes:
                </span>
                {currentFlavour.keyNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/10 border border-white/80 dark:border-white/15 text-[#1A1A1A] dark:text-[#F5F2EB]"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id={`pre-order-${currentFlavour.id}-btn`}
                  onClick={() => onOpenComingSoon(`Pre-Order ${currentFlavour.name}`)}
                  className="bg-[#2B2B2B] dark:bg-[#F5F2EB] text-white dark:text-[#1A1A1A] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-[#1A1A1A] dark:hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Request Sample Pack</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#ingredients"
                  className="border border-[#2B2B2B]/20 dark:border-white/20 bg-white/40 dark:bg-white/10 backdrop-blur-md px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#2B2B2B] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-white/20 hover:border-[#2B2B2B] dark:hover:border-white/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60" />
                  <span>Inspect Ingredients</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
