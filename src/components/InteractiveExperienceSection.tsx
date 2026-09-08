import React, { useState } from 'react';
import { Sparkles, Maximize2, ShieldCheck, RefreshCw, Zap, Sliders, Layers } from 'lucide-react';
import { FlavourTheme } from '../types';
import { InteractivePouch } from './InteractivePouch';

interface InteractiveExperienceSectionProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const InteractiveExperienceSection: React.FC<InteractiveExperienceSectionProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  const [selectedPackSize, setSelectedPackSize] = useState<'20g' | '40g' | '80g'>('40g');
  const [showWireframe, setShowWireframe] = useState(false);

  const packSizes = [
    { size: '20g', desc: 'Pocket / On-the-Go', calories: '~90 kcal placeholder' },
    { size: '40g', desc: 'Signature Desk Pack (Zipper)', calories: '~180 kcal placeholder' },
    { size: '80g', desc: 'Weekend Sharing Pouch (Zipper)', calories: '~360 kcal placeholder' },
  ];

  return (
    <section
      id="interactive"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black/[0.02] border-y border-black/[0.04] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-white/60 bg-white/40 backdrop-blur-xl">
            <Maximize2 className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">Macro Packaging Lab • Digital Twin</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight">
            Inspect Every Contour of the Craft.
          </h2>
          <p className="mt-3 text-[#5A5A5A] font-sans-clean text-base max-w-xl mx-auto">
            Drag, tilt, or click the pouch to explore the tactile soft-touch matte lamination, tear-notch precision, and foil highlights.
          </p>
        </div>

        {/* Studio Inspection Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Canvas Viewport (Frosted Glass) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative p-6 sm:p-12 rounded-[40px] bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_30px_70px_rgba(0,0,0,0.05)]">
            {/* Studio Environment Glow */}
            <div
              className="absolute inset-0 rounded-[40px] opacity-15 pointer-events-none transition-colors duration-700"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${currentFlavour.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* Wireframe Grid Overlay Mode */}
            {showWireframe && (
              <div
                className="absolute inset-0 rounded-[40px] pointer-events-none opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, ${currentFlavour.accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${currentFlavour.accentColor} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
            )}

            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentFlavour.accentColor }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/60">
                  3D Simulator • {selectedPackSize}
                </span>
              </div>
              <button
                onClick={() => setShowWireframe(!showWireframe)}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/60 bg-white/60 hover:bg-white text-[#2B2B2B] flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showWireframe ? 'Wireframe: ON' : 'Wireframe: OFF'}</span>
              </button>
            </div>

            {/* 3D Pouch Instance */}
            <div className="w-full max-w-sm py-4">
              <InteractivePouch currentFlavour={currentFlavour} showExploreHint={true} />
            </div>

            {/* Bottom Controls Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-black/5 z-10 text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50">
              <span>Rotogravure HD Print</span>
              <span>Ultra-Resistant Aroma Barrier</span>
              <span>Hermetic Heat Seal 120°C</span>
            </div>
          </div>

          {/* Right: Technical Inspection Parameters */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Size Selector Widget (Frosted Card) */}
            <div className="p-7 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xs">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40 mb-3">
                Pack Calibration Options:
              </span>
              <div className="flex flex-col gap-2.5">
                {packSizes.map((item) => {
                  const isCur = selectedPackSize === item.size;
                  return (
                    <button
                      key={item.size}
                      onClick={() => setSelectedPackSize(item.size as any)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isCur
                          ? 'border-[#2B2B2B] bg-[#2B2B2B] text-white shadow-md'
                          : 'border-white/60 bg-white/50 hover:bg-white/80 text-[#2B2B2B]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{item.size}</span>
                          <span className={`text-xs ${isCur ? 'text-neutral-300' : 'text-[#5A5A5A]'}`}>
                            — {item.desc}
                          </span>
                        </div>
                        <span className={`text-[10px] block mt-0.5 font-mono-tech ${isCur ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {item.calories}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isCur ? 'bg-white/20 text-white' : 'bg-black/5 text-[#2B2B2B]/70'
                        }`}
                      >
                        {isCur ? 'Selected' : 'Select'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Physical Architecture Features */}
            <div className="p-7 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div
                  className="p-2 rounded-xl text-white mt-0.5 shadow-xs"
                  style={{ backgroundColor: currentFlavour.accentColor }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1A] font-sans-clean">
                    Tactile Soft-Touch Matte Lamination
                  </h4>
                  <p className="text-xs text-[#5A5A5A] mt-1 leading-relaxed">
                    Pleasant velvety surface feel that resists fingerprint smudges and catches warm ambient room lighting naturally.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div
                  className="p-2 rounded-xl text-white mt-0.5 shadow-xs"
                  style={{ backgroundColor: currentFlavour.accentColor }}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1A1A1A] font-sans-clean">
                    Micro-Scored Easy Tear Notch
                  </h4>
                  <p className="text-xs text-[#5A5A5A] mt-1 leading-relaxed">
                    Engineered tear channels guarantee a straight clean open every single time without mangling the packaging.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Coming Soon Action */}
            <button
              onClick={() => onOpenComingSoon(`Interactive Pouch Sample — ${selectedPackSize}`)}
              className="w-full py-4 rounded-full bg-[#2B2B2B] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:bg-[#1A1A1A] transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Brand Sample Kit</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
