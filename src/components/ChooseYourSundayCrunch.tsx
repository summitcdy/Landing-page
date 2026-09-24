import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Flame,
  Cookie,
  Wind,
  Check,
  Clock,
  ArrowRight,
  Info,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FlavourId, FlavourTheme, PackSize } from '../types';
import { PACK_PRICING, getVariantData } from '../data/snackData';

// ---------------------------------------------------------------------------
// 1. DATA MODEL & SCHEMA FOR THE 5 CORE LAUNCH FLAVOURS
// ---------------------------------------------------------------------------
export interface CoreFlavourItem {
  id: FlavourId;
  name: string;
  tagline: string;
  badge: string;
  accentColor: string;
  category: 'spicy' | 'savory' | 'fresh';
  icon: React.ElementType;
  description: string;
  pouchImage: string;
  availableSizes: PackSize[];
  ratings: { average: number; count: number };
}

export const CORE_LAUNCH_FLAVOURS: CoreFlavourItem[] = [
  {
    id: 'peri-peri',
    name: 'Peri Peri',
    tagline: 'African Bird’s Eye Chili & Tangy Citrus',
    badge: 'Fiery & Electric',
    accentColor: '#EB5757',
    category: 'spicy',
    icon: Flame,
    description: 'Crushed bird’s eye chili, smoked sun-dried paprika, and vibrant citrus zest for an electric crunch.',
    pouchImage: '/assets/makhana-peri-peri.png',
    availableSizes: ['20g', '40g', '100g'],
    ratings: { average: 4.9, count: 480 },
  },
  {
    id: 'ghee-roasted',
    name: 'Ghee Roasted',
    tagline: 'Pure A2 Bilona Cow Ghee & Sendha Namak',
    badge: 'Golden Vedic Comfort',
    accentColor: '#C48A18',
    category: 'savory',
    icon: Sparkles,
    description: 'Slow hand-roasted in sacred bilona cow ghee and finished with Himalayan pink rock salt crystals.',
    pouchImage: '/assets/makhana-ghee-roasted.jpg',
    availableSizes: ['20g', '40g', '100g'],
    ratings: { average: 5.0, count: 620 },
  },
  {
    id: 'salt-pepper',
    name: 'Salt & Pepper',
    tagline: 'Cracked Malabar Tellicherry & Sea Minerals',
    badge: 'Crisp & Minimalist',
    accentColor: '#4A4A4A',
    category: 'savory',
    icon: Sparkles,
    description: 'Sun-dried Malabar black tellicherry peppercorns ground coarse over hand-harvested mineral salt.',
    pouchImage: '/assets/makhana-salt-pepper.jpg',
    availableSizes: ['20g', '40g', '100g'],
    ratings: { average: 4.8, count: 310 },
  },
  {
    id: 'cheese-herbs',
    name: 'Cheese & Herbs',
    tagline: 'Aged English Cheddar & Mediterranean Oregano',
    badge: 'Velvety Umami Melt',
    accentColor: '#D49E1E',
    category: 'savory',
    icon: Cookie,
    description: 'Cultured sharp cheddar dust folded with cracked dried thyme, sweet oregano, and toasted garlic.',
    pouchImage: '/assets/makhana-cheese.png',
    availableSizes: ['20g', '40g', '100g'],
    ratings: { average: 4.9, count: 540 },
  },
  {
    id: 'mint-pudina',
    name: 'Mint & Pudina',
    tagline: 'Shade-Dried Desi Spearmint & Rock Salt',
    badge: 'Cool Botanical Crunch',
    accentColor: '#0D9488',
    category: 'fresh',
    icon: Wind,
    description: 'Aromatic garden spearmint leaves shade-dried and stone-ground with black salt and amchur mango.',
    pouchImage: '/assets/makhana-mint-pudina.jpg',
    availableSizes: ['20g', '40g', '100g'],
    ratings: { average: 4.8, count: 290 },
  },
];

// Unreleased SKUs reserved strictly for the "Coming Soon" pipeline
export const COMING_SOON_SKUS = [
  { name: 'Magie Masala', profile: 'Toasted Cumin & Kashmiri Chili', releaseTarget: 'Batch 02' },
  { name: 'Chettinad Tomato', profile: 'Curry Leaf & Black Fennel', releaseTarget: 'Batch 02' },
  { name: 'Cream & Onion', profile: 'Sweet Spring Shallot & cultured sour cream', releaseTarget: 'Batch 03' },
  { name: 'Sweet Chilli', profile: 'Thai Sriracha Glaze & palm jaggery', releaseTarget: 'Batch 03' },
  { name: 'Barbecue Smoke', profile: 'Smoked Hickory & charred applewood', releaseTarget: 'Batch 03' },
];

export interface ChooseYourSundayCrunchProps {
  currentFlavour: FlavourTheme;
  allFlavours: Record<string, FlavourTheme>;
  onSelectFlavour: (id: FlavourId) => void;
  selectedSize: PackSize;
  onSelectSize?: (size: PackSize) => void;
  onAddToCart?: (flavour: FlavourTheme, size: PackSize, quantity: number) => void;
  onOpenComingSoon: (context: string) => void;
}

export const ChooseYourSundayCrunch: React.FC<ChooseYourSundayCrunchProps> = ({
  currentFlavour,
  allFlavours,
  onSelectFlavour,
  selectedSize: globalSelectedSize,
  onSelectSize,
  onAddToCart,
  onOpenComingSoon,
}) => {
  // Local pack size state per card to allow individual pack size browsing before adding
  const [cardSizes, setCardSizes] = useState<Partial<Record<FlavourId, PackSize>>>({
    'peri-peri': '40g',
    'ghee-roasted': '40g',
    'salt-pepper': '40g',
    'cheese-herbs': '40g',
    'mint-pudina': '40g',
  });

  const [filterCategory, setFilterCategory] = useState<'all' | 'spicy' | 'savory' | 'fresh'>('all');
  const [showComingSoon, setShowComingSoon] = useState<boolean>(false);

  const handleCardSizeChange = (flvId: FlavourId, size: PackSize, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardSizes((prev) => ({ ...prev, [flvId]: size }));
    if (onSelectSize && flvId === currentFlavour.id) {
      onSelectSize(size);
    }
  };

  const handleQuickAdd = (flv: CoreFlavourItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenSize = cardSizes[flv.id] || '40g';
    const targetTheme = allFlavours[flv.id] || currentFlavour;
    if (onAddToCart) {
      onAddToCart(targetTheme, chosenSize, 1);
    } else {
      onOpenComingSoon(`Add ${flv.name} (${chosenSize}) to Basket`);
    }
  };

  const filteredFlavours = CORE_LAUNCH_FLAVOURS.filter((flv) => {
    if (filterCategory === 'all') return true;
    return flv.category === filterCategory;
  });

  return (
    <div className="relative z-10 max-w-7xl w-full mx-auto mt-16 sm:mt-20 pt-10 border-t border-[#2B2B2B]/10 dark:border-white/10">
      {/* --------------------------------------------------------------------------- */}
      {/* SECTION HEADER & TASTE CATEGORY CONTROLS */}
      {/* --------------------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-[0.25em] mb-3 bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span>The 5 Core Launch Editions • GI-Tagged Mithila Origin</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white tracking-tight">
            Choose Your Sunday Crunch
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#A8A29E] mt-1 font-sans-clean max-w-2xl leading-relaxed">
            Slow air-roasted in small batches. Select your preferred pouch format (20g, 40g, 100g) on any card to update live pricing and add directly to your basket.
          </p>
        </div>

        {/* Taste Profile Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono-tech uppercase transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] shadow-xs'
                : 'bg-white/50 dark:bg-white/5 text-[#5A5A5A] dark:text-[#A8A29E] hover:bg-white dark:hover:bg-white/10 border border-white/60 dark:border-white/10'
            }`}
          >
            All 5 Core
          </button>
          <button
            onClick={() => setFilterCategory('spicy')}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono-tech uppercase transition-all cursor-pointer ${
              filterCategory === 'spicy'
                ? 'bg-[#DC2626] text-white shadow-xs'
                : 'bg-white/50 dark:bg-white/5 text-[#5A5A5A] dark:text-[#A8A29E] hover:bg-white dark:hover:bg-white/10 border border-white/60 dark:border-white/10'
            }`}
          >
            Spicy & Testy
          </button>
          <button
            onClick={() => setFilterCategory('savory')}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono-tech uppercase transition-all cursor-pointer ${
              filterCategory === 'savory'
                ? 'bg-[#D49E1E] text-white shadow-xs'
                : 'bg-white/50 dark:bg-white/5 text-[#5A5A5A] dark:text-[#A8A29E] hover:bg-white dark:hover:bg-white/10 border border-white/60 dark:border-white/10'
            }`}
          >
            Savory & Vedic
          </button>
          <button
            onClick={() => setFilterCategory('fresh')}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono-tech uppercase transition-all cursor-pointer ${
              filterCategory === 'fresh'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'bg-white/50 dark:bg-white/5 text-[#5A5A5A] dark:text-[#A8A29E] hover:bg-white dark:hover:bg-white/10 border border-white/60 dark:border-white/10'
            }`}
          >
            Botanical Mint
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
      {/* 5 CORE LAUNCH FLAVOURS: REFINED RESPONSIVE GRID */}
      {/* --------------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filteredFlavours.map((flv, idx) => {
            const isActive = flv.id === currentFlavour.id;
            const Icon = flv.icon;
            const chosenSize = cardSizes[flv.id] || '40g';
            const pricing = PACK_PRICING[chosenSize];
            const variant = getVariantData(flv.id, chosenSize);

            // Dynamic pouch image scale based on pack size: 20g (compact), 40g (medium), 100g (tall)
            const pouchScaleClass =
              chosenSize === '20g'
                ? 'h-32 sm:h-36 scale-90'
                : chosenSize === '100g'
                ? 'h-40 sm:h-44 scale-105'
                : 'h-36 sm:h-40 scale-100';

            return (
              <motion.div
                key={flv.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => onSelectFlavour(flv.id)}
                id={`sunday-crunch-card-${flv.id}`}
                className={`group relative rounded-3xl p-5 sm:p-5.5 flex flex-col justify-between transition-all duration-300 border cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-white dark:bg-[#1E1B17] shadow-xl ring-2 ring-amber-500/40 border-black/20 dark:border-white/30'
                    : 'bg-white/70 hover:bg-white dark:bg-[#1C1814]/85 dark:hover:bg-[#25201A] border-black/5 dark:border-white/10 shadow-xs hover:shadow-lg backdrop-blur-md'
                }`}
                style={{
                  boxShadow: isActive ? `0 16px 36px -10px ${flv.accentColor}30` : undefined,
                }}
              >
                {/* Accent Color Band */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-opacity"
                  style={{
                    backgroundColor: flv.accentColor,
                    opacity: isActive ? 1 : 0.6,
                  }}
                />

                {/* CARD TOP: Header Badges & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono-tech uppercase tracking-wider text-white shadow-2xs"
                      style={{ backgroundColor: flv.accentColor }}
                    >
                      {flv.badge}
                    </span>

                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${flv.accentColor}18`,
                        color: flv.accentColor,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Product Title & Tagline */}
                  <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                    {flv.name}
                  </h3>
                  <p className="text-[11px] text-[#6B655D] dark:text-[#A8A29E] line-clamp-2 leading-relaxed mt-0.5 min-h-[32px]">
                    {flv.tagline}
                  </p>
                </div>

                {/* CARD CENTER: DYNAMIC PACKAGING VISUAL (UPDATES WITH PACK SIZE) */}
                <div className="my-3 py-2 flex flex-col items-center justify-center relative min-h-[160px]">
                  {/* Flavour color glow aura behind pouch */}
                  <div
                    className="absolute w-28 h-28 rounded-full blur-2xl opacity-25 pointer-events-none transition-transform duration-500 group-hover:scale-125"
                    style={{ backgroundColor: flv.accentColor }}
                  />

                  <motion.div
                    key={`${flv.id}-${chosenSize}`}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative flex flex-col items-center"
                  >
                    <img
                      src={flv.pouchImage}
                      alt={`${flv.name} Roasted Fox Nut ${chosenSize} Pouch`}
                      className={`object-contain filter drop-shadow-xl transition-all duration-300 ${pouchScaleClass} group-hover:rotate-1`}
                    />
                    <span className="mt-2 text-[10px] font-mono-tech text-[#8C8479] dark:text-[#A8A29E] bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-full">
                      {chosenSize} Net Pouch
                    </span>
                  </motion.div>
                </div>

                {/* CARD BOTTOM: INLINE PACK SIZE BUTTONS + DYNAMIC PRICE + ADD CTA */}
                <div className="pt-3 border-t border-black/5 dark:border-white/5">
                  {/* Size Selector Tabs (20g, 40g, 100g) */}
                  <div className="grid grid-cols-3 gap-1 mb-3 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
                    {(['20g', '40g', '100g'] as PackSize[]).map((size) => {
                      const isSizeSelected = chosenSize === size;
                      return (
                        <button
                          key={size}
                          id={`size-btn-${flv.id}-${size}`}
                          onClick={(e) => handleCardSizeChange(flv.id, size, e)}
                          className={`py-1 text-[10px] font-bold font-mono-tech rounded-lg transition-all cursor-pointer ${
                            isSizeSelected
                              ? 'bg-white dark:bg-[#2B2B2B] text-[#1A1A1A] dark:text-white shadow-xs'
                              : 'text-[#8C8479] hover:text-[#1A1A1A] dark:hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Price Row & Direct Add to Basket CTA */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] dark:text-white">
                          ₹{pricing.price}
                        </span>
                        <span className="text-[10px] line-through text-[#8C8479]">
                          ₹{pricing.mrp}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono-tech text-emerald-600 dark:text-emerald-400 font-semibold block">
                        {variant.stockStatus.badge}
                      </span>
                    </div>

                    <button
                      id={`card-add-btn-${flv.id}`}
                      onClick={(e) => handleQuickAdd(flv, e)}
                      className="px-3.5 py-2 rounded-full text-[10px] font-bold font-mono-tech uppercase tracking-wider bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] hover:bg-black dark:hover:bg-neutral-100 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add +</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* --------------------------------------------------------------------------- */}
      {/* SEPARATE "COMING SOON" SECTION FOR UNRELEASED FLAVOURS */}
      {/* --------------------------------------------------------------------------- */}
      <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold font-mono-tech uppercase tracking-wider text-[#1A1A1A] dark:text-white">
                Upcoming R&D Roasts (Batch 02 & 03 Pipeline)
              </h4>
              <p className="text-[11px] text-[#6B655D] dark:text-[#A8A29E]">
                5 unreleased recipes currently in small-batch testing. Reserve your tasting pass.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowComingSoon(!showComingSoon)}
            className="px-4 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#1A1A1A] dark:text-white transition-all cursor-pointer self-start sm:self-auto"
          >
            {showComingSoon ? 'Hide Vault' : 'View 5 Upcoming Flavours'}
          </button>
        </div>

        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-5 border-t border-black/5 dark:border-white/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {COMING_SOON_SKUS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white/70 dark:bg-[#1A1614] border border-black/5 dark:border-white/5 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono-tech font-bold uppercase text-amber-600 dark:text-amber-400">
                    {item.releaseTarget}
                  </span>
                  <h5 className="text-xs font-bold text-[#1A1A1A] dark:text-white mt-0.5">
                    {item.name}
                  </h5>
                  <p className="text-[10px] text-[#8C8479] dark:text-[#A8A29E] mt-1 leading-snug">
                    {item.profile}
                  </p>
                </div>
                <button
                  onClick={() => onOpenComingSoon(`Reserve ${item.name} Sample`)}
                  className="mt-3 text-[9px] font-mono-tech font-bold uppercase text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Notify Me</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
