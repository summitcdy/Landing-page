import React from 'react';
import { Sparkles, Calendar, Sun, Clock, Coffee, Heart, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { FlavourTheme } from '../types';

interface TwoPillarsSectionProps {
  currentFlavour: FlavourTheme;
  onSelectDoor: (door: 'shop-sunday' | 'shop-weekday') => void;
  onOpenComingSoon: (context: string) => void;
}

export const TwoPillarsSection: React.FC<TwoPillarsSectionProps> = ({
  currentFlavour,
  onSelectDoor,
  onOpenComingSoon,
}) => {
  return (
    <section id="two-pillars" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
              The Two Front Doors
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight mb-4">
            How Do You Want to Experience Sunday?
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean leading-relaxed">
            Whether you are curating an occasion-led feast or stocking the pantry for uninterrupted daily desk focus, The Sunday Basket serves two distinct rituals.
          </p>
        </div>

        {/* Two Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Pillar 01: Sunday Range */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white/70 dark:bg-[#1C1814]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-lg flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity"
              style={{ backgroundColor: '#D49E1E' }}
            />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-widest bg-[#D49E1E]/15 text-[#D49E1E] border border-[#D49E1E]/30">
                  Pillar 01 • Occasion-Led
                </span>
                <span className="text-xs font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">
                  Sunday Moments
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white mb-3">
                Shop Sunday
              </h3>
              <p className="text-sm text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed mb-6 font-sans-clean">
                Curated snack assortments designed around contemporary Indian weekend moments. From slow balcony breakfasts with warm filter coffee to late-night movie streaming and living room house parties.
              </p>

              {/* Occasion Checklist */}
              <div className="space-y-2.5 mb-8">
                {[
                  { title: 'Lazy Breakfast', note: 'Vedic Ghee Roasted paired with morning chai' },
                  { title: '4 PM Craving', note: 'Tangy Mint & Pudina digestive reset' },
                  { title: 'Movie Night', note: 'Aged Cheddar & Herb savory couch crunch' },
                  { title: 'House Party & Late Night', note: 'African Bird’s Eye Peri Peri crowd spark' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#D49E1E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A1A1A] dark:text-white font-semibold">{item.title}: </strong>
                      <span className="text-[#5A5A5A] dark:text-[#A8A29E]">{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] uppercase font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">Format</span>
                <span className="text-xs font-bold text-[#1A1A1A] dark:text-white">Curated Occasion Boxes & Multipacks</span>
              </div>
              <a
                href="#shop-by-moment"
                onClick={() => onSelectDoor('shop-sunday')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] hover:bg-[#1A1A1A] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Shop Sunday Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Pillar 02: Weekday Companion */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white/70 dark:bg-[#1C1814]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-lg flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity"
              style={{ backgroundColor: '#0D9488' }}
            />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-widest bg-[#0D9488]/15 text-[#0D9488] border border-[#0D9488]/30">
                  Pillar 02 • Daily Nutrition
                </span>
                <span className="text-xs font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">
                  Pantry Hero
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white mb-3">
                Shop the Week
              </h3>
              <p className="text-sm text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed mb-6 font-sans-clean">
                The Weekday Companion. Pure GI-tagged Mithila Makhana roasted to light, high-protein perfection. Stock your home pantry and office desk for guilt-free snacking between meetings with zero sugar crashes.
              </p>

              {/* Weekday Advantages */}
              <div className="space-y-2.5 mb-8">
                {[
                  { title: 'Desk Friendly', note: 'Zero greasy oil residue on keyboard or touchscreens' },
                  { title: 'High Plant Protein', note: 'Clean satiety without afternoon carbohydrate fatigue' },
                  { title: 'Low Glycemic Index', note: 'Sustained cognitive focus, safe for everyday habit' },
                  { title: 'Stock & Save Pricing', note: '100g Vaults and multi-week subscriptions' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A1A1A] dark:text-white font-semibold">{item.title}: </strong>
                      <span className="text-[#5A5A5A] dark:text-[#A8A29E]">{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] uppercase font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">Hero Product</span>
                <span className="text-xs font-bold text-[#1A1A1A] dark:text-white">Mithila Makhana Pantry Subscriptions</span>
              </div>
              <a
                href="#variant-matrix-pdp"
                onClick={() => onSelectDoor('shop-weekday')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-[#0D9488] text-white hover:bg-[#0f766e] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Stock the Week</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
