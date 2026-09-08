import React from 'react';
import { Sparkles, ArrowRight, Bell, Shield } from 'lucide-react';
import { FlavourTheme } from '../types';

interface FinalCTAProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="ambient-orb absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[650px] opacity-25 mix-blend-multiply pointer-events-none"
        style={{ backgroundColor: currentFlavour.accentColor }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Decorative Badge (Frosted Glass) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-widest uppercase mb-6 border border-white/60 bg-white/40 backdrop-blur-xl shadow-xs">
          <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">Join The First Batch • Limited Inaugural Roast</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight leading-[1.05] mb-6">
          MAKE EVERY DAY
          <br />
          <span
            className="italic font-light transition-colors duration-700"
            style={{ color: currentFlavour.accentColor }}
          >
            A LITTLE SUNDAY.
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-[#5A5A5A] font-sans-clean font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Three flavours. One irresistible crunch.
          <br />
          <span className="text-[#2B2B2B]/60 text-base sm:text-lg">
            Himalayan Salt • Aged Cheese • Fiery Peri Peri
          </span>
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <button
            id="final-cta-coming-soon-btn"
            onClick={() => onOpenComingSoon('Final Hero CTA Button')}
            className="w-full sm:w-auto px-10 py-5 rounded-full text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 group"
            style={{
              backgroundColor: currentFlavour.accentColor,
              boxShadow: `0 12px 35px ${currentFlavour.glowColor}`,
            }}
          >
            <Bell className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>COMING SOON — GET EARLY ACCESS</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold text-[#2B2B2B]/60 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            100% Roasted In Olive Oil
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Non-GMO Bihar Lotus Seeds
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/60 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Zero Artificial Preservatives
          </span>
        </div>
      </div>
    </section>
  );
};
