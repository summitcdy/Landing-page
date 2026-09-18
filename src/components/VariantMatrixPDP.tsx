import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { FlavourId, FlavourTheme, PackSize } from '../types';
import { FlavourSizeSelector } from './FlavourSizeSelector';

interface VariantMatrixPDPProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  selectedSize: PackSize;
  onSelectSize: (size: PackSize) => void;
  onAddToCart: (flavour: FlavourTheme, size: PackSize, quantity: number) => void;
}

export const VariantMatrixPDP: React.FC<VariantMatrixPDPProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
  selectedSize,
  onSelectSize,
  onAddToCart,
}) => {
  return (
    <section id="variant-matrix-pdp" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
              The Dynamic Product Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight mb-3">
            Mithila Makhana Flavour & Size Matrix
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean leading-relaxed">
            Instant multi-angle gallery, pouch size switching, and transparent real-time pricing without page reloads.
          </p>
        </div>

        {/* The Standalone Interactive Flavour & Size Selector Component */}
        <FlavourSizeSelector
          currentFlavour={currentFlavour}
          allFlavours={allFlavours}
          onSelectFlavour={onSelectFlavour}
          selectedSize={selectedSize}
          onSelectSize={onSelectSize}
          onAddToCart={onAddToCart}
        />

        {/* The 10-Point PDP Checklist Bar (Master Brief Requirement) */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm font-mono-tech font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-white">
              The 10-Point Buyer Checklist (Transparent Food Standard)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {[
              { q: '1. What is it?', a: 'Slow-roasted popped gorgon nut (Mithila Makhana)' },
              { q: '2. Why want it?', a: 'High plant protein, zero trans fats, zero palm oil' },
              { q: '3. How does it taste?', a: `${currentFlavour.name}: ${currentFlavour.tagline}` },
              { q: '4. What is inside?', a: 'Cold-pressed oils, rock salt, authentic culinary spices' },
              { q: '5. Where from?', a: 'GI-tagged Darbhanga & Madhubani wetlands, Bihar' },
              { q: '6. How made?', a: 'Hand-popped, slow air-roasted in small batches' },
              { q: '7. How fresh?', a: 'Nitrogen-flushed multi-layer barrier foil pouch' },
              { q: '8. How to enjoy?', a: `${currentFlavour.sundayPersonality.scenario}` },
              { q: '9. Social proof?', a: '4.9★ rating from 1,200+ verified snackers' },
              { q: '10. Delivery ETA?', a: 'Dispatched within 24 hours across India' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/70 dark:bg-black/20 border border-black/5 dark:border-white/5 flex flex-col justify-between"
              >
                <strong className="block text-[#1A1A1A] dark:text-white font-semibold mb-1">
                  {item.q}
                </strong>
                <span className="text-[11px] text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed">
                  {item.a}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
