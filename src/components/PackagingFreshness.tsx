import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Lock, Wind, Flame, Layers, Package, Check, ArrowRight } from 'lucide-react';
import { FlavourTheme } from '../types';
import { PACKAGING_SPECS } from '../data/snackData';

interface PackagingFreshnessProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const PackagingFreshness: React.FC<PackagingFreshnessProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Lock':
        return Lock;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Wind':
        return Wind;
      case 'Flame':
        return Flame;
      case 'Layers':
        return Layers;
      default:
        return Package;
    }
  };

  return (
    <section id="freshness" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-white/60 bg-white/40 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">Engineered Architecture • Zero Compromise</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight leading-tight">
            BUILT FOR FRESHNESS.
          </h2>

          <p className="mt-4 text-[#5A5A5A] font-sans-clean text-base sm:text-lg max-w-xl mx-auto">
            A snack is only as crisp as the barrier that guards it. Explore the microscopic multi-layer physics that lock in our roasted crunch.
          </p>
        </div>

        {/* Interactive Diagram Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Specification Tabs (Frosted Glass) */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {PACKAGING_SPECS.map((spec, idx) => {
              const IconComp = getIcon(spec.icon);
              const isActive = activeSpecIndex === idx;

              return (
                <button
                  key={idx}
                  id={`packaging-spec-tab-${idx}`}
                  onClick={() => setActiveSpecIndex(idx)}
                  className={`text-left p-6 rounded-[28px] border transition-all duration-300 flex items-start gap-4 ${
                    isActive
                      ? 'bg-white/80 backdrop-blur-2xl shadow-xl border-white scale-[1.01]'
                      : 'bg-white/40 hover:bg-white/60 backdrop-blur-xl border-white/60 shadow-xs'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? `0 16px 36px -10px ${currentFlavour.accentColor}25`
                      : undefined,
                  }}
                >
                  <div
                    className="p-3 rounded-2xl shrink-0 transition-colors shadow-xs border border-white/50"
                    style={{
                      backgroundColor: isActive ? currentFlavour.accentColor : 'rgba(255,255,255,0.6)',
                      color: isActive ? '#FFFFFF' : '#2B2B2B',
                    }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                        {spec.feature}
                      </h4>
                      {spec.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/60 border border-white/60 text-[#2B2B2B]/70">
                          {spec.badge}
                        </span>
                      )}
                    </div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40 mt-0.5">
                      {spec.subtitle}
                    </span>
                    <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans-clean mt-2 leading-relaxed">
                      {spec.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Barrier Cross-Section Visualizer (Frosted Glass) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-10 rounded-[36px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xs relative overflow-hidden">
            {/* Background Ambient Tint */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: currentFlavour.accentColor }}
            />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40">
                  Microscopic Barrier Laminate
                </span>
                <span
                  className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-xs"
                  style={{ backgroundColor: currentFlavour.accentColor }}
                >
                  Active Spec 0{activeSpecIndex + 1}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#1A1A1A] mb-2">
                {PACKAGING_SPECS[activeSpecIndex].feature}
              </h3>

              <p className="text-sm sm:text-base text-[#5A5A5A] font-sans-clean leading-relaxed mb-8">
                {PACKAGING_SPECS[activeSpecIndex].detail}
              </p>

              {/* Graphical Packaging Layer Diagram */}
              <div className="space-y-3 p-5 rounded-[24px] bg-white/50 border border-white/60 mb-8 shadow-xs">
                <span className="block text-[10px] font-bold uppercase text-[#2B2B2B]/40 tracking-widest mb-2">
                  Layer Cross-Section:
                </span>
                <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1A1A]">1. Soft-Touch Matte Outer BOPP</span>
                  <span className="text-[#2B2B2B]/50 text-[10px] uppercase font-bold tracking-wider">Printing & Anti-Scratch</span>
                </div>
                <div
                  className="p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between text-white shadow-xs"
                  style={{ backgroundColor: currentFlavour.accentColor }}
                >
                  <span>2. Vacuum Metalized High Barrier Layer</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">Zero Oxygen & UV Ingress</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1A1A]">3. Food-Grade Virgin PE Heat Seal</span>
                  <span className="text-[#2B2B2B]/50 text-[10px] uppercase font-bold tracking-wider">100% Non-Toxic Airtight Weld</span>
                </div>
              </div>

              {/* Manufacturing Standards Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono-tech">
                <div className="p-3.5 rounded-2xl bg-white/60 border border-white/60">
                  <span className="text-[#2B2B2B]/40 text-[9px] uppercase font-bold tracking-wider block mb-0.5">PRINT PROCESS</span>
                  <span className="font-bold text-[#1A1A1A]">Rotogravure / Digital</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/60 border border-white/60">
                  <span className="text-[#2B2B2B]/40 text-[9px] uppercase font-bold tracking-wider block mb-0.5">COLOUR PROFILE</span>
                  <span className="font-bold text-[#1A1A1A]">CMYK + Special Pantone</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/60 border border-white/60">
                  <span className="text-[#2B2B2B]/40 text-[9px] uppercase font-bold tracking-wider block mb-0.5">FLAVOURED SIZES</span>
                  <span className="font-bold text-[#1A1A1A]">20g • 40g • 80g</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/60 border border-white/60">
                  <span className="text-[#2B2B2B]/40 text-[9px] uppercase font-bold tracking-wider block mb-0.5">RAW MAKHANA SIZES</span>
                  <span className="font-bold text-[#1A1A1A]">100g • 200g</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <span className="text-xs text-[#5A5A5A]">
                Opening: Zipper + Tear Notch on 40g & 80g
              </span>
              <button
                onClick={() => onOpenComingSoon('Packaging Tech Specs Sheet')}
                className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B] bg-white/60 border border-white/60 hover:bg-white transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>Download Tech Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
