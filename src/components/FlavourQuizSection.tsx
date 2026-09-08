import React from 'react';
import { Sparkles, Sun, Film, Flame, ArrowRight, Heart } from 'lucide-react';
import { FlavourTheme, FlavourId } from '../types';

interface FlavourQuizSectionProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  onOpenComingSoon: (context: string) => void;
}

export const FlavourQuizSection: React.FC<FlavourQuizSectionProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
  onOpenComingSoon,
}) => {
  const flavourList: FlavourTheme[] = Object.values(allFlavours) as FlavourTheme[];

  const getMoodIcon = (id: FlavourId) => {
    switch (id) {
      case 'himalayan-salt':
        return Sun;
      case 'cheese':
        return Film;
      case 'peri-peri':
        return Flame;
    }
  };

  return (
    <section id="collection" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background mood lighting */}
      <div
        className="ambient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-25 mix-blend-multiply"
        style={{ backgroundColor: currentFlavour.accentColor }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-white/60 bg-white/40 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">Signature Interactive Moment</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight leading-tight">
            WHICH SUNDAY
            <br />
            <span
              className="italic font-light transition-colors duration-700"
              style={{ color: currentFlavour.accentColor }}
            >
              ARE YOU?
            </span>
          </h2>

          <p className="mt-4 text-[#5A5A5A] font-sans-clean text-base sm:text-lg max-w-xl mx-auto">
            Snacking is an emotional wavelength. Select the mood that defines your present Sunday state of mind.
          </p>
        </div>

        {/* 3 Distinct Personality Cards (Frosted Glass) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {flavourList.map((flv) => {
            const isSelected = flv.id === currentFlavour.id;
            const MoodIcon = getMoodIcon(flv.id);

            return (
              <div
                key={flv.id}
                id={`quiz-mood-card-${flv.id}`}
                onClick={() => onSelectFlavour(flv.id)}
                className={`group relative rounded-[36px] p-8 sm:p-10 transition-all duration-500 cursor-pointer overflow-hidden border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/80 backdrop-blur-2xl shadow-2xl scale-[1.02] border-white'
                    : 'bg-white/40 hover:bg-white/60 backdrop-blur-xl border-white/60 shadow-xs hover:-translate-y-1.5'
                }`}
                style={{
                  boxShadow: isSelected
                    ? `0 25px 60px -15px ${flv.glowColor}, 0 0 0 1px ${flv.accentColor}40 inset`
                    : undefined,
                }}
              >
                {/* Background soft glow inside card */}
                {isSelected && (
                  <div
                    className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-40 pointer-events-none"
                    style={{ backgroundColor: flv.accentColor }}
                  />
                )}

                <div>
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs border border-white/60 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${flv.accentColor}18`,
                        color: flv.accentColor,
                      }}
                    >
                      <MoodIcon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all shadow-xs ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-white/60 border border-white/60 text-[#2B2B2B]/60'
                      }`}
                    >
                      {isSelected ? 'CURRENT VIBE' : 'SELECT MOOD'}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40 mb-1">
                    {flv.name} Edition
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A] mb-2">
                    {flv.sundayPersonality.title}
                  </h3>
                  <p
                    className="text-sm font-medium font-serif-luxury italic mb-4"
                    style={{ color: flv.accentColor }}
                  >
                    "{flv.sundayPersonality.tagline}"
                  </p>

                  <p className="text-sm text-[#5A5A5A] font-sans-clean leading-relaxed mb-6">
                    {flv.sundayPersonality.vibe}
                  </p>

                  <div className="p-4 rounded-[20px] bg-white/50 border border-white/60 text-xs text-[#5A5A5A] leading-relaxed mb-6 shadow-xs">
                    <strong className="text-[#1A1A1A] block mb-1 text-[11px] font-bold uppercase tracking-wider">Ideal Scenario:</strong>
                    {flv.sundayPersonality.scenario}
                  </div>
                </div>

                {/* Bottom Pouch Mini-Preview & Shift Button */}
                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shadow-xs"
                      style={{ backgroundColor: flv.accentColor }}
                    />
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      {flv.name}
                    </span>
                  </div>

                  <span
                    className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
                    style={{ color: flv.accentColor }}
                  >
                    <span>{isSelected ? 'EXPERIENCING NOW' : 'ACTIVATE THEME'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Sharing & Curated Basket Recommendation (Frosted Glass) */}
        <div className="rounded-[40px] p-8 sm:p-12 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Can’t Decide on One Sunday?
            </h4>
            <p className="text-sm text-[#5A5A5A] font-sans-clean mt-1 max-w-xl">
              Our inaugural release includes the "Complete Sunday Trio" — containing Himalayan Salt, Aged Cheese, and Peri Peri in bespoke 40g stand-up zipper pouches.
            </p>
          </div>
          <button
            onClick={() => onOpenComingSoon('Complete Sunday Discovery Trio')}
            className="whitespace-nowrap px-8 py-4 rounded-full text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-xl transition-all active:scale-95"
            style={{ backgroundColor: currentFlavour.accentColor }}
          >
            Claim Trio Launch Alert
          </button>
        </div>
      </div>
    </section>
  );
};
