import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { FlavourTheme, PackSize } from '../types';
import { PACK_PRICING, getVariantData } from '../data/snackData';

interface StickyATCBarProps {
  currentFlavour: FlavourTheme;
  selectedSize: PackSize;
  onAddToCart: (flavour: FlavourTheme, size: PackSize, quantity: number) => void;
  onScrollToPDP: () => void;
}

export const StickyATCBar: React.FC<StickyATCBarProps> = ({
  currentFlavour,
  selectedSize,
  onAddToCart,
  onScrollToPDP,
}) => {
  const pricing = PACK_PRICING[selectedSize];
  const variant = getVariantData(currentFlavour.id, selectedSize);

  return (
    <div
      id="mobile-sticky-atc-bar"
      role="region"
      aria-label="Sticky Add to Basket Bar"
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-[#1A1614]/95 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] transition-transform duration-300"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Active Variant & Real-Time Synchronized Price */}
        <button
          onClick={onScrollToPDP}
          className="flex items-center gap-2.5 text-left min-w-0 flex-1 focus:outline-none cursor-pointer"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden border border-black/5 dark:border-white/10"
            style={{
              backgroundColor: `${currentFlavour.accentColor}20`,
            }}
          >
            <img
              src={currentFlavour.pouchImage}
              alt={currentFlavour.name}
              className="w-7 h-7 object-contain drop-shadow-xs"
            />
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-bold text-[#1A1A1A] dark:text-white truncate flex items-center gap-1">
              <span>{currentFlavour.name} • {selectedSize}</span>
              <ArrowUpRight className="w-3 h-3 text-[#8C8479]" />
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-[#1A1A1A] dark:text-white">
                ₹{pricing.price}
              </span>
              <span className="text-[10px] line-through text-[#8C8479]">
                ₹{pricing.mrp}
              </span>
              <span className="text-[9px] font-mono-tech text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                {variant.stockStatus.badge}
              </span>
            </div>
          </div>
        </button>

        {/* Right: Instant Add to Basket Action */}
        <button
          id="sticky-atc-add-btn"
          onClick={() => onAddToCart(currentFlavour, selectedSize, 1)}
          className="shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] active:scale-95 transition-transform shadow-md flex items-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

