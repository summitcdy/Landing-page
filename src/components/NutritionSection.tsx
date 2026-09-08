import React from 'react';
import { Sparkles, Heart, Activity, CheckCircle, ShieldAlert, Award, Flame } from 'lucide-react';
import { FlavourTheme } from '../types';
import { NUTRITION_BENCHMARKS } from '../data/snackData';

interface NutritionSectionProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const NutritionSection: React.FC<NutritionSectionProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  const nutritionPillars = [
    {
      title: 'Plant Protein',
      metric: '-- g Protein',
      subtitle: 'Placeholder Benchmark',
      description:
        'Natural plant protein derived straight from pure popped water lily seeds. Sustains muscular recovery without heavy whey.',
      icon: Activity,
    },
    {
      title: 'Gluten Free',
      metric: '100% Free',
      subtitle: 'Naturally Grainless',
      description:
        'Grown in sacred wetland water gardens with no wheat, rye, or barley contamination. Ideal for sensitive digestions.',
      icon: CheckCircle,
    },
    {
      title: 'No Added Preservatives',
      metric: '0 Artificials',
      subtitle: 'Pure Clean Label',
      description:
        'No MSG, no artificial food colorants, and no chemical anti-caking agents. What you taste is genuine roasted spice.',
      icon: Award,
    },
    {
      title: 'Roasted, Not Fried',
      metric: '0g Trans Fat',
      subtitle: 'Slow Gentle Roasting',
      description:
        'Never plunged into boiling industrial palm oil vats. Gently tumble-roasted with cold-pressed olive oil mist.',
      icon: Flame,
    },
    {
      title: 'Light & Crunchy',
      metric: '-- kcal',
      subtitle: 'Placeholder Energy Load',
      description:
        'Airy puff structure that fills the bowl generously, providing profound crunch gratification with minimal calorie density.',
      icon: Heart,
    },
  ];

  return (
    <section id="nutrition" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-white/60 bg-white/40 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">Mindful Nourishment • Proven Purity</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight leading-tight">
            GOOD SNACK.
            <br />
            <span
              className="italic font-light transition-colors duration-700"
              style={{ color: currentFlavour.accentColor }}
            >
              BETTER CHOICE.
            </span>
          </h2>

          <p className="mt-4 text-[#5A5A5A] font-sans-clean text-base sm:text-lg max-w-xl mx-auto">
            Snacking without the afternoon crash. Pure fox nut power that honors your body and satisfies your crunch craving.
          </p>

          <div className="mt-3 inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/50 border border-white/60 text-[#2B2B2B]/60">
            * Numerical metrics displayed below are prototype placeholders pending final laboratory certificate testing.
          </div>
        </div>

        {/* 5 Main Nutrition Cards (Frosted Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6 mb-16">
          {nutritionPillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/60 hover:border-white hover:bg-white/60 shadow-xs hover:shadow-xl transition-all duration-400 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-xs border border-white/50"
                    style={{
                      backgroundColor: `${currentFlavour.accentColor}18`,
                      color: currentFlavour.accentColor,
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40 mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5A5A5A] font-sans-clean leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <span
                    className="block text-xl sm:text-2xl font-serif-luxury font-bold"
                    style={{ color: currentFlavour.accentColor }}
                  >
                    {item.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contrast Table: The Sunday Basket Roasted Makhana vs Traditional Fried Snacks */}
        <div className="rounded-[40px] p-7 sm:p-12 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xs overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40 block mb-1">
                Comparative Clarity
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1A1A1A]">
                Why Slow-Roasted Beats Deep-Fried
              </h4>
            </div>
            <button
              onClick={() => onOpenComingSoon('Nutrition Lab Dossier')}
              className="self-start md:self-auto px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/60 bg-white/60 hover:bg-white text-[#2B2B2B] transition-all shadow-xs"
            >
              Request Lab Test Certificate
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[28px] bg-white/50 border border-white/60 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50 block mb-1">
                Oil Treatment
              </span>
              <span className="text-base font-bold text-[#1A1A1A] block font-sans-clean">
                Light Cold-Pressed Olive Mist
              </span>
              <p className="text-xs text-[#5A5A5A] mt-2 leading-relaxed">
                Conventional chips are submerged in re-used industrial palm oil at 190°C. We gently roast dry with an olive mist.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-white/50 border border-white/60 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50 block mb-1">
                Digestion Comfort
              </span>
              <span className="text-base font-bold text-[#1A1A1A] block font-sans-clean">
                Naturally Alkaline & Ethereal
              </span>
              <p className="text-xs text-[#5A5A5A] mt-2 leading-relaxed">
                Fox nuts have a mild glycemic profile and gentle fiber that prevents heavy bloating and sluggishness.
              </p>
            </div>

            <div className="p-6 rounded-[28px] bg-white/50 border border-white/60 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50 block mb-1">
                Active Flavour Profile
              </span>
              <span className="text-base font-bold text-[#1A1A1A] block font-sans-clean">
                {currentFlavour.name}: {currentFlavour.tagline}
              </span>
              <p className="text-xs text-[#5A5A5A] mt-2 leading-relaxed">
                Real food seasonings with no bitter chemical aftertaste. Clean crunch from the first kernel to the last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
