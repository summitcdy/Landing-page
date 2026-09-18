import React, { useState } from 'react';
import { Sparkles, Sun, Clock, Coffee, Film, Users, Moon, ArrowRight, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SUNDAY_MOMENTS, MomentItem } from '../data/snackData';
import { FlavourId, FlavourTheme } from '../types';

interface MomentGridSectionProps {
  currentFlavour: FlavourTheme;
  onSelectFlavour: (id: FlavourId) => void;
  onOpenComingSoon: (context: string) => void;
}

const MOMENT_ICONS: Record<string, React.ElementType> = {
  'lazy-breakfast': Sun,
  '4pm-craving': Coffee,
  'movie-night': Film,
  'house-party': Users,
  'late-night': Moon,
};

export const MomentGridSection: React.FC<MomentGridSectionProps> = ({
  currentFlavour,
  onSelectFlavour,
  onOpenComingSoon,
}) => {
  const [activeMomentId, setActiveMomentId] = useState<string>(SUNDAY_MOMENTS[0].id);

  const activeMoment = SUNDAY_MOMENTS.find((m) => m.id === activeMomentId) || SUNDAY_MOMENTS[0];
  const ActiveIcon = MOMENT_ICONS[activeMoment.id] || Sparkles;

  return (
    <section id="shop-by-moment" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl">
            <Clock className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
              Occasion-Led Food Assortment
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight mb-4">
            Shop by Sunday Moment
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean leading-relaxed">
            Snacks shouldn’t be chosen by random impulse. Discover recipes calibrated specifically for five moments that define our days.
          </p>
        </div>

        {/* 5 Moments Interactive Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {SUNDAY_MOMENTS.map((moment) => {
            const isSelected = moment.id === activeMomentId;
            const Icon = MOMENT_ICONS[moment.id] || Sparkles;

            return (
              <button
                key={moment.id}
                id={`moment-tab-${moment.id}`}
                onClick={() => setActiveMomentId(moment.id)}
                className={`group flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] shadow-lg border-transparent scale-105'
                    : 'bg-white/60 dark:bg-white/5 text-[#5A5A5A] dark:text-[#A8A29E] hover:bg-white dark:hover:bg-white/10 border-black/5 dark:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400 dark:text-amber-600' : 'text-[#8C8479]'}`} />
                <span>{moment.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Moment Spotlight Canvas */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/70 dark:bg-[#1C1814]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-xl overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: activeMoment.bgAccent }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMoment.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Moment Story */}
              <div className="lg:col-span-6 flex flex-col text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: activeMoment.bgAccent }}
                  >
                    {activeMoment.badge}
                  </span>
                  <span className="text-xs font-mono-tech text-[#8C8479] dark:text-[#A8A29E] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {activeMoment.timeSlot}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white mb-2">
                  {activeMoment.title}
                </h3>
                <p className="font-serif-luxury italic text-base sm:text-lg text-[#2B2B2B]/80 dark:text-[#F5F2EB]/80 mb-4">
                  "{activeMoment.subheading}"
                </p>
                <p className="text-sm text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean leading-relaxed mb-6">
                  {activeMoment.description}
                </p>

                {/* Pairing Guide Chip */}
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs mb-8">
                  <strong className="text-[#1A1A1A] dark:text-white block mb-1">Ritual Beverage Pairing:</strong>
                  <span className="text-[#5A5A5A] dark:text-[#A8A29E]">{activeMoment.pairingGuide}</span>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="#variant-matrix-pdp"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] hover:bg-[#1A1A1A] transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Bundle for {activeMoment.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => onOpenComingSoon(`Gift ${activeMoment.title} Box`)}
                    className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] dark:text-[#F5F2EB] hover:underline cursor-pointer"
                  >
                    Gift This Moment →
                  </button>
                </div>
              </div>

              {/* Right Column: Recommended Flavours for this Moment */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <span className="text-[11px] font-mono-tech font-bold uppercase tracking-widest text-[#8C8479] dark:text-[#A8A29E]">
                  Recommended Recipes For This Occasion
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeMoment.recommendedFlavours.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-5 rounded-2xl bg-white/80 dark:bg-[#1E1B17]/90 border border-black/5 dark:border-white/10 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">
                            {rec.name}
                          </span>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeMoment.bgAccent }} />
                        </div>
                        <p className="text-xs text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed mb-4">
                          {rec.note}
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectFlavour(rec.id as FlavourId)}
                        className="inline-flex items-center justify-between text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#2B2B2B] dark:text-[#F5F2EB] hover:text-black dark:hover:text-white pt-2 border-t border-black/5 dark:border-white/10 cursor-pointer"
                      >
                        <span>Preview Flavour</span>
                        <span>→</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
