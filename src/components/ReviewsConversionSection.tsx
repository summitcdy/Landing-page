import React from 'react';
import { Star, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Heart, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data/snackData';
import { FlavourTheme } from '../types';

interface ReviewsConversionSectionProps {
  currentFlavour: FlavourTheme;
  onAddToCart: (flavour: FlavourTheme, size: '20g' | '40g' | '100g', quantity: number) => void;
  onOpenComingSoon: (context: string) => void;
}

export const ReviewsConversionSection: React.FC<ReviewsConversionSectionProps> = ({
  currentFlavour,
  onAddToCart,
  onOpenComingSoon,
}) => {
  return (
    <section id="reviews-conversion" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
              4.92 / 5.0 Rating • 1,240+ Verified Households
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight mb-3">
            Loved Across Balconies & Boardrooms
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean leading-relaxed">
            Real stories from slow Sunday mornings, movie couch marathons, and everyday 4 PM desk cravings.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white/70 dark:bg-[#1C1814]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono-tech font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Verified
                  </span>
                </div>

                {/* Review Title & Snippet */}
                <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white mb-2 leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed mb-4 font-sans-clean">
                  {rev.comment}
                </p>
              </div>

              {/* Author Details & Occasion Tag */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-bold text-[#1A1A1A] dark:text-white">
                      {rev.author}
                    </span>
                    <span className="text-[10px] text-[#8C8479] dark:text-[#A8A29E]">
                      {rev.role} • {rev.location}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">
                  <span className="bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">
                    Moment: {rev.moment}
                  </span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Immediate High-Conversion Block: The Sunday Discovery Vault */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#2B2724] to-[#1A1614] text-white shadow-2xl overflow-hidden border border-white/10">
          {/* Subtle Golden Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#D49E1E' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
                Inaugural Collector Starter Pack
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold mb-3">
                The 5-Flavour Sunday Discovery Vault
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-xl mb-6">
                Cannot decide between fiery Peri Peri, rich Vedic Ghee Roasted, or savory Cheese & Herbs? Experience all five artisan recipe expressions in our custom gift vault with complimentary shipping.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  5x 40g Artisan Pouches
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  100% Free Shipping India-wide
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Nitrogen Freshness Sealed
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="text-center lg:text-right mb-4">
                <div className="flex items-baseline gap-2 justify-center lg:justify-end">
                  <span className="text-4xl font-serif-luxury font-bold text-white">₹499</span>
                  <span className="text-base line-through text-neutral-500">₹700</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    Save 28%
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono-tech">
                  Special introductory bundle pricing
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  id="final-conversion-vault-btn"
                  onClick={() => onAddToCart(currentFlavour, '40g', 5)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500 text-black hover:bg-amber-400 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Add Vault to Basket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenComingSoon('Custom Corporate / Wedding Gifting')}
                  className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 text-neutral-200 transition-all cursor-pointer text-center"
                >
                  Custom Gifting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
