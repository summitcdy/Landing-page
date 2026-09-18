import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  ShieldCheck,
  Zap,
  Layers,
  Gift,
  Check,
  ShoppingBag,
  ArrowRight,
  Package,
  Award,
  Sparkle,
} from 'lucide-react';
import { FlavourTheme, PackSize } from '../types';
import { PACK_PRICING, GWP_FREE_GIFT, UNFLAVOURED_PLAIN_THEME } from '../data/snackData';
import { InteractivePouch } from './InteractivePouch';

export interface InteractiveExperienceSectionProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
  onAddToCart?: (
    flavour: FlavourTheme,
    size: PackSize,
    quantity: number,
    giftItem?: { name: string; price: number; badge?: string }
  ) => void;
}

export interface CalibrationPackOption {
  size: PackSize;
  desc: string;
  calories: string;
  badge?: string;
  isBulk?: boolean;
  offerBadge?: string;
  variantType?: string;
}

export const CALIBRATION_PACK_OPTIONS: CalibrationPackOption[] = [
  {
    size: '20g',
    desc: 'Pocket / On-the-Go',
    calories: '~90 kcal • 1 Portion',
  },
  {
    size: '40g',
    desc: 'Signature Desk Pack (Zipper)',
    calories: '~180 kcal • 1-2 Servings',
    badge: 'Most Popular',
  },
  {
    size: '80g',
    desc: 'Weekend Sharing Pouch (Zipper)',
    calories: '~360 kcal • 2-3 Servings',
  },
  {
    size: '100g',
    desc: 'Family Discovery Vault',
    calories: '~450 kcal • 3-4 Servings',
    badge: 'Best Value',
  },
  {
    size: '150g',
    desc: 'Bulk Pantry Unflavoured Reserve',
    calories: '~650 kcal • 5-6 Servings',
    isBulk: true,
    offerBadge: 'Includes Free Pure A2 Ghee Pouch',
    variantType: 'Unflavoured Plain Makhana',
  },
  {
    size: '200g',
    desc: 'Jumbo Bulk Plain Reserve Pouch',
    calories: '~880 kcal • 8-10 Servings',
    isBulk: true,
    offerBadge: 'Includes Free Pure A2 Ghee Pouch',
    variantType: 'Unflavoured Plain Makhana',
    badge: 'Jumbo Value',
  },
];

export const InteractiveExperienceSection: React.FC<InteractiveExperienceSectionProps> = ({
  currentFlavour,
  onOpenComingSoon,
  onAddToCart,
}) => {
  const [selectedPackSize, setSelectedPackSize] = useState<PackSize>('40g');
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  // Business Rule 2 & 3: 150g & 200g automatically set the variant type to "Unflavoured Plain Makhana"
  const isBulkUnflavoured = selectedPackSize === '150g' || selectedPackSize === '200g';

  // Dynamic GWP Logic in state:
  // When 150g or 200g is selected, automatically attach a free "Artisanal A2 Ghee Pouch (50ml)" at ₹0.
  // When switching back to standard flavoured sizes (20g, 40g, 80g, 100g), detach the ghee gift and revert 3D pouch texture.
  const activePouchTheme = isBulkUnflavoured ? UNFLAVOURED_PLAIN_THEME : currentFlavour;
  const attachedGwpGift = isBulkUnflavoured ? GWP_FREE_GIFT : null;

  const currentPricing = PACK_PRICING[selectedPackSize] || PACK_PRICING['40g'];
  const totalPrice = currentPricing.price * quantity;
  const totalMrp = currentPricing.mrp * quantity;
  const savings = totalMrp - totalPrice;

  const handleSelectSize = (size: PackSize) => {
    setSelectedPackSize(size);
    setIsAddedSuccess(false);
  };

  const handleAddToBasket = () => {
    if (onAddToCart) {
      onAddToCart(
        activePouchTheme,
        selectedPackSize,
        quantity,
        attachedGwpGift
          ? {
              name: attachedGwpGift.name,
              price: attachedGwpGift.price,
              badge: 'FREE GWP GIFT',
            }
          : undefined
      );
    }
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 3000);
  };

  return (
    <section
      id="interactive"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black/[0.02] dark:bg-white/[0.01] border-y border-black/[0.04] dark:border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-white/60 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-xs">
            <Maximize2 className="w-3.5 h-3.5" style={{ color: activePouchTheme.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
              Product Customizer & Pack Calibration
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight">
            Inspect Every Contour of the Craft.
          </h2>
          <p className="mt-3 text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Drag, tilt, or click the digital twin pouch to test tactile soft-touch matte lamination, calibrate pack weights, and preview bulk unflavoured reserves with Vedic A2 Ghee gifts.
          </p>
        </div>

        {/* Studio Inspection Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================
              LEFT: 3D CANVAS VIEWPORT & DYNAMIC POUCH TEXTURE
             ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative p-6 sm:p-10 rounded-[40px] bg-white/50 dark:bg-[#1A1614]/80 backdrop-blur-2xl border border-white/70 dark:border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.05)]">
            {/* Studio Environment Glow */}
            <div
              className="absolute inset-0 rounded-[40px] opacity-20 pointer-events-none transition-colors duration-700"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${activePouchTheme.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* Wireframe Grid Overlay Mode */}
            {showWireframe && (
              <div
                className="absolute inset-0 rounded-[40px] pointer-events-none opacity-20"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activePouchTheme.accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${activePouchTheme.accentColor} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
            )}

            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: activePouchTheme.accentColor }}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70 font-mono-tech">
                  3D Simulator • {selectedPackSize}
                </span>
                {isBulkUnflavoured && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono-tech font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Unflavoured Plain
                  </span>
                )}
              </div>

              <button
                onClick={() => setShowWireframe(!showWireframe)}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/60 dark:border-white/10 bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#2B2B2B] dark:text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showWireframe ? 'Wireframe: ON' : 'Wireframe: OFF'}</span>
              </button>
            </div>

            {/* 3D Pouch Canvas Instance */}
            <div className="w-full max-w-sm py-4 relative flex flex-col items-center">
              <InteractivePouch
                currentFlavour={activePouchTheme}
                selectedSize={selectedPackSize}
                showExploreHint={true}
              />

              {/* Floating Free A2 Ghee Gift Badge Overlay when bulk size active */}
              {isBulkUnflavoured && (
                <div className="mt-4 w-full max-w-xs p-3 rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 shadow-xs">
                  <img
                    src="/assets/ghee-gift-pouch.jpg"
                    alt="Free Artisanal A2 Ghee Pouch 50ml"
                    className="w-10 h-10 rounded-xl object-cover border border-amber-500/40 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <Gift className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="text-[10px] font-bold font-mono-tech uppercase tracking-wider text-amber-800 dark:text-amber-200">
                        Free Gift Attached
                      </span>
                    </div>
                    <span className="block text-xs font-semibold text-[#1A1A1A] dark:text-white truncate">
                      Artisanal A2 Ghee Pouch (50ml)
                    </span>
                    <span className="text-[10px] font-mono-tech font-bold text-emerald-600 dark:text-emerald-400">
                      ₹0 (Worth ₹120)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Technical Spec Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-black/5 dark:border-white/10 z-10 text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/60 dark:text-[#F5F2EB]/60 font-mono-tech">
              <span>Rotogravure HD Print</span>
              <span>Ultra-Resistant Aroma Barrier</span>
              <span>Hermetic Heat Seal 120°C</span>
            </div>
          </div>

          {/* =========================================================
              RIGHT: TECHNICAL INSPECTION & PACK CALIBRATION PANEL
             ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            {/* Active Variant Identity Chip */}
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 shadow-xs">
              <div className="min-w-0">
                <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#8C8479] dark:text-[#A8A29E] block">
                  Active Variant Configuration
                </span>
                <span className="text-sm font-bold text-[#1A1A1A] dark:text-white truncate block">
                  {isBulkUnflavoured
                    ? 'Unflavoured Plain Makhana (Raw Roasted)'
                    : `${currentFlavour.name} Roasted Fox Nuts`}
                </span>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-mono-tech font-bold uppercase tracking-wider shrink-0 text-white shadow-xs"
                style={{ backgroundColor: activePouchTheme.accentColor }}
              >
                {isBulkUnflavoured ? 'Unflavoured Plain' : currentFlavour.profileBadge || 'Flavoured'}
              </span>
            </div>

            {/* PACK CALIBRATION PANEL */}
            <div className="p-6 sm:p-7 rounded-[32px] bg-white/45 dark:bg-[#1E1B17]/85 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="block text-[11px] font-bold uppercase tracking-widest text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70 font-mono-tech">
                  Pack Calibration Options:
                </span>
                <span className="text-[10px] font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">
                  6 Precision Sizes
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {CALIBRATION_PACK_OPTIONS.map((item) => {
                  const isCur = selectedPackSize === item.size;
                  const itemPricing = PACK_PRICING[item.size];

                  return (
                    <button
                      key={item.size}
                      id={`calibration-pack-btn-${item.size}`}
                      onClick={() => handleSelectSize(item.size)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer relative ${
                        isCur
                          ? 'border-[#2B2B2B] dark:border-amber-400/60 bg-[#2B2B2B] text-white shadow-md ring-2 ring-black/5 dark:ring-amber-500/20'
                          : 'border-white/60 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-[#2B2B2B] dark:text-white'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm font-sans-clean">{item.size}</span>
                          <span
                            className={`text-xs ${
                              isCur ? 'text-neutral-300' : 'text-[#5A5A5A] dark:text-[#A8A29E]'
                            }`}
                          >
                            — {item.desc}
                          </span>

                          {/* Dynamic Badge for Popular / Value */}
                          {item.badge && !item.offerBadge && (
                            <span
                              className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full font-mono-tech ${
                                isCur
                                  ? 'bg-amber-400 text-black'
                                  : 'bg-black/10 dark:bg-white/10 text-[#1A1A1A] dark:text-white'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Special Offer Badge for 150g & 200g */}
                        {item.offerBadge && (
                          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-mono-tech inline-flex items-center gap-1 ${
                                isCur
                                  ? 'bg-amber-400 text-black shadow-xs font-black'
                                  : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              <Gift className="w-2.5 h-2.5" />
                              {item.offerBadge}
                            </span>
                            {item.variantType && (
                              <span
                                className={`text-[9px] font-mono-tech ${
                                  isCur ? 'text-neutral-400' : 'text-[#8C8479] dark:text-[#A8A29E]'
                                }`}
                              >
                                • {item.variantType}
                              </span>
                            )}
                          </div>
                        )}

                        <span
                          className={`text-[10px] block mt-1 font-mono-tech ${
                            isCur ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {item.calories} • ₹{itemPricing.price}{' '}
                          <span className="line-through opacity-70">₹{itemPricing.mrp}</span>
                        </span>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full font-mono-tech ${
                            isCur
                              ? 'bg-white/20 text-white'
                              : 'bg-black/5 dark:bg-white/10 text-[#2B2B2B]/70 dark:text-white/70'
                          }`}
                        >
                          {isCur ? 'Selected' : 'Select'}
                        </span>
                        <span
                          className={`text-xs font-bold font-mono-tech mt-1 ${
                            isCur ? 'text-amber-300' : 'text-[#1A1A1A] dark:text-white'
                          }`}
                        >
                          ₹{itemPricing.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* =========================================================
                  GWP PROMINENT CALLOUT BANNER (Condition: 150g or 200g)
                 ========================================================= */}
              {isBulkUnflavoured && (
                <div
                  id="gwp-bulk-callout-banner"
                  className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-emerald-500/20 border-2 border-amber-500/40 shadow-sm animate-in fade-in slide-in-from-top-2"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src="/assets/ghee-gift-pouch.jpg"
                      alt="Artisanal A2 Ghee Pouch 50ml"
                      className="w-12 h-12 rounded-xl object-cover border border-amber-500/50 shadow-xs shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-amber-900 dark:text-amber-100 font-sans-clean leading-snug">
                          🎁 GWP OFFER: Free A2 Ghee Pouch included with this bulk size!
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5A5A] dark:text-[#D4CEBF] mt-1 leading-relaxed">
                        Pure Bilona A2 Desi Cow Ghee (50ml pouch) added to your cart basket at <span className="font-bold text-emerald-600 dark:text-emerald-400">₹0</span> (original value ₹120). Perfect for slow-roasting pristine white lotus seeds at home.
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-mono-tech font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Auto-Attached to Basket
                        </span>
                        <span className="text-[9px] font-mono-tech font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200">
                          100% Vedic A2 Bilona
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DYNAMIC CART BASKET ENGINE & PRICING BAR */}
            <div className="p-5 rounded-[28px] bg-white/50 dark:bg-[#1E1B17]/85 border border-white/60 dark:border-white/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white">
                      ₹{totalPrice}
                    </span>
                    <span className="text-xs line-through text-[#8C8479] dark:text-[#6E6862]">
                      ₹{totalMrp}
                    </span>
                    <span className="text-[10px] font-bold font-mono-tech text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      Save ₹{savings}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C8479] dark:text-[#A8A29E] font-mono-tech block mt-0.5">
                    {isBulkUnflavoured
                      ? 'Includes Free 50ml A2 Ghee Pouch • Zero Extra Cost'
                      : 'Nitrogen Flushed • 24h Express Dispatch'}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full bg-black/5 dark:bg-white/5 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-[#1A1A1A] dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                    aria-label="Decrease pack quantity"
                  >
                    -
                  </button>
                  <span className="w-7 text-center text-xs font-mono-tech font-bold text-[#1A1A1A] dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-[#1A1A1A] dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                    aria-label="Increase pack quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Basket Dynamic Add CTA */}
              <div className="space-y-2">
                <button
                  id="calibration-add-to-basket-btn"
                  onClick={handleAddToBasket}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-98 cursor-pointer ${
                    isAddedSuccess
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-[#2B2B2B] dark:bg-white text-white dark:text-[#1A1A1A] hover:bg-black dark:hover:bg-neutral-100 shadow-black/10'
                  }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket {isBulkUnflavoured ? '+ Free A2 Ghee!' : ''}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Add {quantity}x {activePouchTheme.name} ({selectedPackSize}) • ₹{totalPrice}
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    onOpenComingSoon(
                      `Interactive Pack Calibration — ${selectedPackSize} (${activePouchTheme.name})`
                    )
                  }
                  className="w-full py-2.5 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#5A5A5A] dark:text-[#A8A29E] hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Custom Bulk Sample Spec Kit</span>
                </button>
              </div>
            </div>

            {/* Key Physical Architecture Features */}
            <div className="p-6 rounded-[28px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs space-y-3.5">
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-xl text-white mt-0.5 shadow-xs shrink-0 transition-colors duration-500"
                  style={{ backgroundColor: activePouchTheme.accentColor }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1A1A] dark:text-white font-sans-clean">
                    Tactile Soft-Touch Matte Lamination
                  </h4>
                  <p className="text-[11px] text-[#5A5A5A] dark:text-[#A8A29E] mt-0.5 leading-relaxed">
                    Velvety anti-fingerprint surface that resists shelf smudges and preserves aroma integrity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-xl text-white mt-0.5 shadow-xs shrink-0 transition-colors duration-500"
                  style={{ backgroundColor: activePouchTheme.accentColor }}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1A1A] dark:text-white font-sans-clean">
                    Micro-Scored Easy Tear Notch
                  </h4>
                  <p className="text-[11px] text-[#5A5A5A] dark:text-[#A8A29E] mt-0.5 leading-relaxed">
                    Engineered laser-scored channels guarantee a clean, straight open across the pouch top without mangling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
