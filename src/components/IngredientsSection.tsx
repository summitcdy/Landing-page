import React, { useState } from 'react';
import { Sparkles, Gem, Cookie, Flame, Droplet, Feather, Info, ArrowUpRight } from 'lucide-react';
import { FlavourTheme } from '../types';
import { INGREDIENTS } from '../data/snackData';

interface IngredientsSectionProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gem':
        return Gem;
      case 'Cookie':
        return Cookie;
      case 'Flame':
        return Flame;
      case 'Droplet':
        return Droplet;
      case 'Feather':
        return Feather;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="ingredients" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-white/60 bg-white/40 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">Ethically Sourced • Uncompromised Origins</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight leading-tight">
            Nature’s Cleanest Harvest.
          </h2>

          <p className="mt-4 text-[#5A5A5A] font-sans-clean text-base sm:text-lg max-w-xl mx-auto">
            Hover over any ingredient node to reveal its geological origin, culinary profile, and physical texture note.
          </p>
        </div>

        {/* Interactive Floating Ingredients Grid (Frosted Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS.map((ing) => {
            const IconComp = getIcon(ing.iconName);
            const isExpanded = selectedIngredient === ing.id;
            const isFlavourMatch = ing.flavourTie === 'all' || ing.flavourTie === currentFlavour.id;

            return (
              <div
                key={ing.id}
                id={`ingredient-card-${ing.id}`}
                onMouseEnter={() => setSelectedIngredient(ing.id)}
                onMouseLeave={() => setSelectedIngredient(null)}
                onClick={() => setSelectedIngredient(isExpanded ? null : ing.id)}
                className={`group relative p-7 rounded-[32px] transition-all duration-400 cursor-pointer overflow-hidden border ${
                  isFlavourMatch
                    ? 'bg-white/70 backdrop-blur-2xl shadow-md hover:shadow-2xl border-white hover:-translate-y-1.5'
                    : 'bg-white/40 hover:bg-white/60 backdrop-blur-xl border-white/60'
                }`}
                style={{
                  boxShadow: isExpanded
                    ? `0 20px 40px -15px ${ing.glowColor}40, 0 0 0 1px ${ing.glowColor}40 inset`
                    : undefined,
                }}
              >
                {/* Flavour Match Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-xs border border-white/50"
                    style={{
                      backgroundColor: `${ing.glowColor}18`,
                      color: ing.glowColor,
                    }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  {isFlavourMatch && (
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-xs"
                      style={{ backgroundColor: ing.glowColor }}
                    >
                      Signature Note
                    </span>
                  )}
                </div>

                {/* Name & Subtitle */}
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/40 mb-1">
                  {ing.subheading}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A] mb-3">
                  {ing.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans-clean leading-relaxed mb-6">
                  {ing.description}
                </p>

                {/* Origin & Texture tags */}
                <div className="pt-4 border-t border-black/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2B2B2B]/40 text-[10px] font-bold uppercase tracking-widest">ORIGIN:</span>
                    <span className="font-medium text-[#2B2B2B] text-right">{ing.origin}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2B2B2B]/40 text-[10px] font-bold uppercase tracking-widest">TEXTURE:</span>
                    <span className="font-medium text-[#2B2B2B] text-right">{ing.textureNote}</span>
                  </div>
                </div>

                {/* Expand Indicator */}
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#2B2B2B]/60 group-hover:text-[#1A1A1A] transition-colors">
                  <span className="text-[10px] uppercase tracking-wider">Explore Harvest Story</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Sourcing Guarantee Banner */}
        <div className="mt-12 p-7 sm:p-10 rounded-[36px] bg-white/40 backdrop-blur-2xl border border-white/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A]">
              100% Direct Wetland Farmer Partnerships
            </h4>
            <p className="text-sm text-[#5A5A5A] font-sans-clean mt-1 max-w-xl">
              We eliminate middle traders to ensure our lotus harvesters receive fair living wages while selecting only the largest Grade-A lotus seed blossoms.
            </p>
          </div>
          <button
            onClick={() => onOpenComingSoon('Direct Sourcing Verification')}
            className="whitespace-nowrap px-6 py-3.5 rounded-full border border-white/60 bg-white/60 hover:bg-white text-[#2B2B2B] font-bold text-xs uppercase tracking-widest transition-all shadow-xs"
          >
            Read Transparency Report
          </button>
        </div>
      </div>
    </section>
  );
};
