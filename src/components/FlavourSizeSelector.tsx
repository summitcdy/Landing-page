import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Flame,
  Cookie,
  Wind,
  Layers,
  ZoomIn,
  Package,
  Check,
  ArrowRight,
  ChevronRight,
  Info,
  Clock,
  Sparkle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FlavourId, FlavourTheme, PackSize, FlavourGalleryAsset } from '../types';
import { PACK_PRICING, getVariantData, FLAVOUR_GALLERIES, UNFLAVOURED_PLAIN_THEME, GWP_FREE_GIFT } from '../data/snackData';

export interface FlavourSizeSelectorProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  selectedSize: PackSize;
  onSelectSize: (size: PackSize) => void;
  onAddToCart: (flavour: FlavourTheme, size: PackSize, quantity: number, giftItem?: { name: string; price: number; badge?: string }) => void;
}

// 5 Core Flavours strictly per Master Brief
export const CORE_5_FLAVOURS: {
  id: FlavourId;
  name: string;
  tagline: string;
  badge: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: 'peri-peri',
    name: 'Peri Peri',
    tagline: 'African Bird’s Eye Chili',
    badge: 'Fiery & Electric',
    icon: Flame,
    color: '#EB5757',
  },
  {
    id: 'ghee-roasted',
    name: 'Ghee Roasted',
    tagline: 'Pure A2 Bilona Cow Ghee',
    badge: 'Golden Vedic Comfort',
    icon: Sparkles,
    color: '#C48A18',
  },
  {
    id: 'salt-pepper',
    name: 'Salt & Pepper',
    tagline: 'Cracked Malabar Tellicherry',
    badge: 'Crisp & Minimalist',
    icon: Sparkles,
    color: '#4A4A4A',
  },
  {
    id: 'cheese-herbs',
    name: 'Cheese & Herbs',
    tagline: 'Artisan Cheddar & Oregano',
    badge: 'Velvety Umami Melt',
    icon: Cookie,
    color: '#D49E1E',
  },
  {
    id: 'mint-pudina',
    name: 'Mint & Pudina',
    tagline: 'Shade-Dried Desi Spearmint',
    badge: 'Cool Botanical Crunch',
    icon: Wind,
    color: '#0D9488',
  },
];

export const PACK_SIZES_DATA: {
  size: PackSize;
  title: string;
  idealFor: string;
  badge?: string;
  grams: string;
  offerBadge?: string;
  isBulk?: boolean;
  variantType?: string;
}[] = [
  {
    size: '20g',
    title: 'Grab & Go Pocket',
    idealFor: 'Midday desk bites & travel pouches',
    grams: '20 Grams Net',
  },
  {
    size: '40g',
    title: 'Standard Sunday',
    idealFor: '1-2 mindful afternoon tea servings',
    badge: 'Most Popular',
    grams: '40 Grams Net',
  },
  {
    size: '80g',
    title: 'Weekend Sharing Pouch',
    idealFor: 'Casual gatherings & long weekend chats',
    grams: '80 Grams Net',
  },
  {
    size: '100g',
    title: 'Family Discovery Vault',
    idealFor: 'House parties, movie nights & weekly pantry',
    badge: 'Best Value',
    grams: '100 Grams Net',
  },
  {
    size: '150g',
    title: 'Bulk Pantry Unflavoured',
    idealFor: 'Home culinary roasts & sacred fasting rituals',
    offerBadge: 'Includes Free Pure A2 Ghee Pouch',
    variantType: 'Unflavoured Plain Makhana',
    isBulk: true,
    grams: '150 Grams Net',
  },
  {
    size: '200g',
    title: 'Jumbo Reserve Unflavoured',
    idealFor: 'Family bulk pantry & bilona ghee roasting',
    badge: 'Jumbo Value',
    offerBadge: 'Includes Free Pure A2 Ghee Pouch',
    variantType: 'Unflavoured Plain Makhana',
    isBulk: true,
    grams: '200 Grams Net',
  },
];

export const FlavourSizeSelector: React.FC<FlavourSizeSelectorProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
  selectedSize,
  onSelectSize,
  onAddToCart,
}) => {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Business Rule 2 & 3: 150g & 200g automatically set variant type to "Unflavoured Plain Makhana"
  const isBulkUnflavoured = selectedSize === '150g' || selectedSize === '200g';
  const effectiveFlavour = isBulkUnflavoured ? UNFLAVOURED_PLAIN_THEME : currentFlavour;
  const attachedGift = isBulkUnflavoured ? GWP_FREE_GIFT : undefined;

  // Variant Data resolving: Product -> Flavour Option -> Size Option -> Image Assets Set -> Price -> Stock Status
  const variant = getVariantData(effectiveFlavour.id, selectedSize);
  const gallery = variant.gallery;
  const activeAsset: FlavourGalleryAsset = gallery[selectedAssetIndex] || gallery[0];

  const pricing = PACK_PRICING[selectedSize];
  const totalPrice = pricing.price * quantity;
  const totalMrp = pricing.mrp * quantity;
  const savings = totalMrp - totalPrice;

  const handleFlavourChange = (flvId: FlavourId) => {
    onSelectFlavour(flvId);
    setSelectedAssetIndex(0); // Reset to front view when flavour shifts
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeMessage(`Express dispatch in 24 hrs. Delivery to ${pincode} by Sun, 2 PM.`);
    } else {
      setPincodeMessage('Please enter a valid 6-digit Indian PIN code (e.g. 560001, 110001).');
    }
  };

  return (
    <div
      id="mithila-makhana-selector"
      className="relative rounded-3xl p-6 sm:p-10 transition-colors duration-700 border border-black/10 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-[#1A1614]/85 backdrop-blur-2xl"
    >
      {/* Background Ambient Color Wash tied to current flavour */}
      <div
        className="absolute inset-0 -z-10 opacity-15 blur-3xl transition-colors duration-700 pointer-events-none rounded-3xl"
        style={{ backgroundColor: currentFlavour.accentColor }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* =========================================================
            LEFT: DYNAMIC MULTI-ANGLE IMAGE GALLERY & POUCH SHOWCASE
           ========================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Main Showcase Canvas */}
          <div className="relative w-full aspect-[4/5] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between border border-black/5 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#14100D] shadow-inner overflow-hidden group">
            {/* Ambient Flavour Spot Behind Pouch */}
            <div
              className="absolute inset-0 opacity-30 blur-2xl transition-colors duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 45%, ${currentFlavour.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* Top Bar Badges */}
            <div className="relative z-10 w-full flex items-center justify-between gap-2">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: currentFlavour.accentColor }}
              >
                {currentFlavour.profileBadge || currentFlavour.badge}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-tech font-bold text-[#1A1A1A] dark:text-white bg-white/80 dark:bg-white/10 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5">
                  {selectedSize} Pouch
                </span>
                <span className="text-[10px] font-mono-tech font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2 py-1 rounded-full">
                  {variant.stockStatus.badge}
                </span>
              </div>
            </div>

            {/* Main Stage: Dynamic Pouch / Macro Image */}
            <div className="relative z-10 my-auto w-full flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentFlavour.id}-${selectedSize}-${selectedAssetIndex}`}
                  initial={{ opacity: 0, scale: 0.94, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={activeAsset.imageUrl}
                    alt={`${currentFlavour.name} - ${activeAsset.title}`}
                    className={`max-h-64 sm:max-h-76 w-auto object-contain filter drop-shadow-2xl transition-transform duration-500 ${
                      isZoomed ? 'scale-110' : 'hover:scale-105'
                    }`}
                  />
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#8C8479] dark:text-[#A8A29E] font-mono-tech">
                    <ZoomIn className="w-3 h-3" />
                    <span>{isZoomed ? 'Click to reset' : 'Click to inspect macro detail'}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Caption Bar */}
            <div className="relative z-10 w-full pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] text-[#6B655D] dark:text-[#A8A29E] font-mono-tech">
              <span className="truncate max-w-[240px]">{activeAsset.caption}</span>
              <span className="shrink-0 font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-white">
                {activeAsset.badge || 'Verified Batch'}
              </span>
            </div>
          </div>

          {/* Dynamic Thumbnail Gallery: 4 Angles (Studio Front, 3D Macro, Botanicals, Lifestyle) */}
          <div className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-3 w-full">
            {gallery.map((asset, idx) => {
              const isSelected = idx === selectedAssetIndex;
              return (
                <button
                  key={asset.id}
                  id={`gallery-thumb-${currentFlavour.id}-${idx}`}
                  onClick={() => setSelectedAssetIndex(idx)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-black/60 dark:border-white/60 bg-white dark:bg-white/10 shadow-sm ring-2 ring-amber-500/30'
                      : 'border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10'
                  }`}
                >
                  <img
                    src={asset.imageUrl}
                    alt={asset.title}
                    className="w-10 h-10 object-contain drop-shadow-xs"
                  />
                  <span className="mt-1 text-[9px] font-mono-tech font-bold truncate max-w-full text-[#1A1A1A] dark:text-white">
                    {asset.type.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Micro Trust Indicators below gallery */}
          <div className="mt-6 grid grid-cols-3 gap-2.5 w-full text-center">
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="block text-xs font-bold text-[#1A1A1A] dark:text-white">9.2g</span>
              <span className="text-[9px] uppercase font-mono-tech text-[#8C8479]">Plant Protein</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="block text-xs font-bold text-[#1A1A1A] dark:text-white">0g</span>
              <span className="text-[9px] uppercase font-mono-tech text-[#8C8479]">Palm Oil / Trans Fat</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="block text-xs font-bold text-[#1A1A1A] dark:text-white">100%</span>
              <span className="text-[9px] uppercase font-mono-tech text-[#8C8479]">Air Popped</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT: FLAVOUR & SIZE VARIANT SELECTOR + REAL-TIME PRICING
           ========================================================= */}
        <div className="lg:col-span-6 flex flex-col text-left">
          {/* Header Metadata */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: currentFlavour.accentColor }}
              >
                GI-Tagged Mithila Makhana
              </span>
              <span className="text-xs font-mono-tech text-[#8C8479] dark:text-[#A8A29E]">
                SKU: {variant.sku}
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white tracking-tight">
              {isBulkUnflavoured
                ? 'Unflavoured Plain Makhana (Bulk)'
                : `${currentFlavour.name} Roasted Fox Nuts`}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#A8A29E] mt-1 font-sans-clean leading-relaxed">
              {isBulkUnflavoured
                ? '100% Jumbo 6-suta Raw Popped Lotus Seeds straight from Mithila wetlands. Includes a complimentary 50ml Artisanal A2 Vedic Bilona Ghee Pouch for fresh home pan-roasting.'
                : currentFlavour.description}
            </p>
          </div>

          {/* STEP 1: FLAVOUR SELECTION MATRIX (5 Core Master Brief Flavours) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-white">
                Step 1: Choose Flavour Recipe
              </label>
              <span
                className="text-xs font-bold font-mono-tech"
                style={{ color: effectiveFlavour.accentColor }}
              >
                {isBulkUnflavoured ? 'Unflavoured Plain (Bulk Reserve)' : `${currentFlavour.name} (${CORE_5_FLAVOURS.find((f) => f.id === currentFlavour.id)?.badge})`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CORE_5_FLAVOURS.map((flv) => {
                const isSelected = flv.id === currentFlavour.id;
                const Icon = flv.icon;

                return (
                  <button
                    key={flv.id}
                    id={`selector-flavour-btn-${flv.id}`}
                    onClick={() => handleFlavourChange(flv.id)}
                    className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#25201A] border-black/40 dark:border-white/40 shadow-sm ring-2 ring-black/5 dark:ring-white/10'
                        : 'bg-white/60 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${flv.color}20`,
                        color: flv.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="block text-xs font-bold text-[#1A1A1A] dark:text-white truncate">
                          {flv.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                      </div>
                      <span className="block text-[10px] text-[#8C8479] dark:text-[#A8A29E] truncate">
                        {flv.tagline}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: PACK SIZE SELECTION (20g, 40g, 100g) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-white">
                Step 2: Choose Pack Size
              </label>
              <span className="text-xs text-[#8C8479] dark:text-[#A8A29E] font-mono-tech">
                {pricing.idealFor}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PACK_SIZES_DATA.map((pack) => {
                const isSelected = pack.size === selectedSize;
                const sizePricing = PACK_PRICING[pack.size];

                return (
                  <button
                    key={pack.size}
                    id={`selector-size-btn-${pack.size}`}
                    onClick={() => onSelectSize(pack.size)}
                    className={`relative p-3.5 rounded-2xl text-center transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] shadow-md border-transparent ring-2 ring-amber-500/30'
                        : 'bg-white/60 dark:bg-white/5 text-[#1A1A1A] dark:text-white border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
                    }`}
                  >
                    {pack.badge && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-amber-500 text-black shrink-0 whitespace-nowrap shadow-xs">
                        {pack.badge}
                      </span>
                    )}
                    <span className="block text-sm font-bold">{pack.size}</span>
                    <span
                      className={`block text-xs font-mono-tech mt-0.5 ${
                        isSelected ? 'text-amber-300 dark:text-amber-700 font-bold' : 'text-[#8C8479]'
                      }`}
                    >
                      ₹{sizePricing.price}
                    </span>
                    <span className="block text-[9px] opacity-75 font-mono-tech truncate mt-0.5">
                      ₹{sizePricing.mrp} MRP
                    </span>
                    {pack.offerBadge && (
                      <span
                        className={`block text-[8px] font-mono-tech font-bold uppercase tracking-wider mt-1.5 px-1.5 py-0.5 rounded truncate ${
                          isSelected
                            ? 'bg-amber-400 text-black font-extrabold'
                            : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {pack.offerBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Prominent GWP Callout Banner under the size selector */}
            {isBulkUnflavoured && (
              <div
                id="gwp-bulk-selector-banner"
                className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-emerald-500/20 border-2 border-amber-500/40 shadow-xs flex items-start gap-3 animate-in fade-in"
              >
                <img
                  src="/assets/ghee-gift-pouch.jpg"
                  alt="Artisanal A2 Ghee Pouch 50ml"
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/50 shadow-xs shrink-0 mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-100 font-sans-clean leading-snug block">
                    🎁 GWP OFFER: Free A2 Ghee Pouch included with this bulk size!
                  </span>
                  <p className="text-[11px] text-[#5A5A5A] dark:text-[#D4CEBF] mt-0.5 leading-relaxed">
                    Pure Bilona A2 Desi Cow Ghee (50ml pouch) automatically attached to your basket at <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹0</strong> (worth ₹120). Ideal for slow pan-roasting fresh raw makhana.
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[9px] font-mono-tech font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      Auto-Attached Free Gift (₹0)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: DYNAMIC PRICING BOX & INSTANT ADD TO BASKET */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1B17] border border-black/5 dark:border-white/10 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white">
                    ₹{totalPrice}
                  </span>
                  <span className="text-sm line-through text-[#8C8479] dark:text-[#6E6862]">
                    ₹{totalMrp}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save ₹{savings}
                  </span>
                </div>
                <span className="text-[10px] text-[#8C8479] dark:text-[#A8A29E] font-mono-tech block mt-0.5">
                  {isBulkUnflavoured
                    ? 'Includes Free 50ml A2 Ghee Pouch (₹0) • Dispatched in 24h'
                    : 'Inclusive of all taxes • Dispatched in 24h from Darbhanga'}
                </span>
              </div>

              {/* Quantity increment/decrement controls */}
              <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full bg-black/5 dark:bg-white/5 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-[#1A1A1A] dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono-tech font-bold text-[#1A1A1A] dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-[#1A1A1A] dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Instant Add to Basket Button */}
            <button
              id="selector-add-to-basket-btn"
              onClick={() =>
                onAddToCart(
                  effectiveFlavour,
                  selectedSize,
                  quantity,
                  attachedGift
                    ? {
                        name: attachedGift.name,
                        price: attachedGift.price,
                        badge: 'FREE GWP GIFT',
                      }
                    : undefined
                )
              }
              className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] hover:bg-black dark:hover:bg-neutral-100 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                Add {quantity}x {effectiveFlavour.name} ({selectedSize}) • ₹{totalPrice}
              </span>
            </button>
          </div>

          {/* STEP 4: INDIAN PIN CODE DELIVERY ESTIMATOR */}
          <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6">
            <form onSubmit={handlePincodeCheck} className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#8C8479] shrink-0" />
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Indian PIN code"
                className="bg-transparent text-xs font-mono-tech text-[#1A1A1A] dark:text-white placeholder-[#8C8479] focus:outline-none flex-1"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono-tech font-bold uppercase bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] cursor-pointer"
              >
                Check ETA
              </button>
            </form>
            {pincodeMessage && (
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-2 font-mono-tech">
                {pincodeMessage}
              </p>
            )}
          </div>

          {/* TRUST BADGE FOOTNOTE: FSSAI & Certified Origin */}
          <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-[#6B655D] dark:text-[#A8A29E] font-mono-tech">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1A1A1A] dark:text-white uppercase">fssai</span>
              <span>Lic. No. 10423000001290</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              100% Non-GMO • Air Roasted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
