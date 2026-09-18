import React, { useState, useEffect } from 'react';
import { FLAVOURS, PACK_PRICING } from './data/snackData';
import { FlavourId, ThemeMode, PackSize } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TwoPillarsSection } from './components/TwoPillarsSection';
import { MomentGridSection } from './components/MomentGridSection';
import { VariantMatrixPDP } from './components/VariantMatrixPDP';
import { ProvenanceSection } from './components/ProvenanceSection';
import { FlavourShift } from './components/FlavourShift';
import { InteractiveExperienceSection } from './components/InteractiveExperienceSection';
import { NutritionSection } from './components/NutritionSection';
import { IngredientsSection } from './components/IngredientsSection';
import { PackagingFreshness } from './components/PackagingFreshness';
import { FlavourQuizSection } from './components/FlavourQuizSection';
import { ReviewsConversionSection } from './components/ReviewsConversionSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { StickyATCBar } from './components/StickyATCBar';
import { DPDPBanner } from './components/DPDPBanner';
import { ComingSoonModal } from './components/ComingSoonModal';
import { ShoppingBag, CheckCircle2, X } from 'lucide-react';

interface CartToastItem {
  id: string;
  flavourName: string;
  size: PackSize;
  quantity: number;
  price: number;
  giftItem?: {
    name: string;
    price: number;
    badge?: string;
  };
}

export default function App() {
  const [currentFlavourId, setCurrentFlavourId] = useState<FlavourId>('peri-peri');
  const [selectedSize, setSelectedSize] = useState<PackSize>('40g');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(false);
  const [comingSoonTrigger, setComingSoonTrigger] = useState<string>('');
  const [cartToast, setCartToast] = useState<CartToastItem | null>(null);

  // Real Theme Mode: Light, Dark, System
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tsb-theme-mode');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    }
    return 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Watch OS color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);

  // Sync dark class with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('tsb-theme-mode', themeMode);
  }, [isDark, themeMode]);

  const currentFlavour = FLAVOURS[currentFlavourId] || FLAVOURS['peri-peri'];

  const handleOpenComingSoon = (context: string) => {
    setComingSoonTrigger(context);
    setIsComingSoonOpen(true);
  };

  const handleSelectFlavour = (id: FlavourId) => {
    if (FLAVOURS[id] && id !== currentFlavourId) {
      setCurrentFlavourId(id);
    }
  };

  const handleAddToCart = (
    flavour: typeof currentFlavour,
    size: PackSize,
    quantity: number,
    giftItem?: { name: string; price: number; badge?: string }
  ) => {
    const itemPrice = PACK_PRICING[size].price * quantity;
    const isBulk = size === '150g' || size === '200g';
    const effectiveFlavourName = isBulk ? 'Unflavoured Plain Makhana' : flavour.name;
    const effectiveGift =
      giftItem ||
      (isBulk
        ? {
            name: 'Artisanal A2 Ghee Pouch (50ml)',
            price: 0,
            badge: 'FREE GWP GIFT',
          }
        : undefined);

    setCartToast({
      id: `${flavour.id}-${size}-${Date.now()}`,
      flavourName: effectiveFlavourName,
      size,
      quantity,
      price: itemPrice,
      giftItem: effectiveGift,
    });
  };

  const handleScrollToPDP = () => {
    const el = document.getElementById('variant-matrix-pdp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut: 1-0 for instant flavour switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') setCurrentFlavourId('peri-peri');
      if (e.key === '2') setCurrentFlavourId('ghee-roasted');
      if (e.key === '3') setCurrentFlavourId('salt-pepper');
      if (e.key === '4') setCurrentFlavourId('cheese-herbs');
      if (e.key === '5') setCurrentFlavourId('mint-pudina');
      if (e.key === '6') setCurrentFlavourId('himalayan-salt');
      if (e.key === '7') setCurrentFlavourId('cheese');
      if (e.key === '8') setCurrentFlavourId('magic-masala');
      if (e.key === '9') setCurrentFlavourId('chettinad-tomato');
      if (e.key === '0') setCurrentFlavourId('cream-onion');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeBgGradient = isDark
    ? (currentFlavour.bgGradientDark || 'from-[#14110E] via-[#1B1512] to-[#13100D]')
    : currentFlavour.bgGradient;

  const activeTextColor = isDark
    ? (currentFlavour.textColorDark || '#F5F2EB')
    : currentFlavour.textColor;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${activeBgGradient} transition-colors duration-1000 ease-in-out font-sans-clean relative selection:bg-[#B88746] selection:text-white pb-20 sm:pb-0`}
      style={{
        color: activeTextColor,
      }}
    >
      {/* Dynamic Ambient Background Canvas Lighting */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-1000"
        style={{
          background: isDark
            ? `radial-gradient(circle at 50% 20%, ${currentFlavour.accentColor}18 0%, transparent 60%)`
            : `radial-gradient(circle at 50% 20%, ${currentFlavour.accentColor}12 0%, transparent 60%)`,
        }}
      />

      {/* Global Minimal Navigation */}
      <Navbar
        currentFlavour={currentFlavour}
        onOpenComingSoon={handleOpenComingSoon}
        themeMode={themeMode}
        onSelectThemeMode={setThemeMode}
      />

      <main>
        {/* 1. HERO SECTION: "Sunday hunger. All day." + Dual CTAs + Choose Your Sunday Crunch Grid */}
        <HeroSection
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onAddToCart={handleAddToCart}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 2. TWO PILLARS SECTION: Shop Sunday (Occasions) vs. Shop the Week (Mithila Makhana) */}
        <TwoPillarsSection
          currentFlavour={currentFlavour}
          onSelectDoor={(door) => {
            if (door === 'shop-sunday') {
              document.getElementById('shop-by-moment')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              document.getElementById('variant-matrix-pdp')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 3. SHOP BY MOMENT GRID: Lazy Breakfast, 4 PM Craving, Movie Night, House Party, Late Night */}
        <MomentGridSection
          currentFlavour={currentFlavour}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 4. DYNAMIC VARIANT MATRIX PDP: 5 Flavours + 3 Sizes + 10-Pt Checklist + FSSAI */}
        <VariantMatrixPDP
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onAddToCart={handleAddToCart}
        />

        {/* 5. PROVENANCE & GROWERS: Source -> Freshness -> Growers (Protected coordinates constraint) */}
        <ProvenanceSection currentFlavour={currentFlavour} />

        {/* 6. FLAVOUR TRANSFORMATION ENGINE & TASTE WHEEL */}
        <FlavourShift
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 7. INTERACTIVE PRODUCT EXPERIENCE & 3D MACRO ZOOM */}
        <InteractiveExperienceSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
          onAddToCart={handleAddToCart}
        />

        {/* 8. NUTRITION ARCHITECTURE ("GOOD SNACK. BETTER CHOICE.") */}
        <NutritionSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 9. INGREDIENTS BOTANICAL DEEP DIVE */}
        <IngredientsSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 10. PACKAGING / FRESHNESS BARRIER ARCHITECTURE */}
        <PackagingFreshness
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 11. OCCASION FINDER QUIZ */}
        <FlavourQuizSection
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 12. REVIEWS -> CONVERSION BLOCK: Social proof immediately before final vault trigger */}
        <ReviewsConversionSection
          currentFlavour={currentFlavour}
          onAddToCart={handleAddToCart}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 13. SUPPORT & TRANSPARENT FAQ ACCORDION */}
        <FAQSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />
      </main>

      {/* 14. SITEWIDE FOOTER WITH FSSAI, DPDP, PCI-DSS & TRUST MARKS */}
      <Footer
        currentFlavour={currentFlavour}
        onOpenComingSoon={handleOpenComingSoon}
      />

      {/* MOBILE STICKY ADD-TO-BASKET BAR */}
      <StickyATCBar
        currentFlavour={currentFlavour}
        selectedSize={selectedSize}
        onAddToCart={handleAddToCart}
        onScrollToPDP={handleScrollToPDP}
      />

      {/* DPDP ACT 2023 COMPLIANCE BANNER / CONSENT MODAL */}
      <DPDPBanner />

      {/* E-COMMERCE COMING SOON MODAL */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        currentFlavour={currentFlavour}
        triggerContext={comingSoonTrigger}
      />

      {/* CART NOTIFICATION POPUP */}
      {cartToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-6 z-50 p-4 rounded-2xl bg-[#1A1A1A] text-white shadow-2xl border border-white/15 flex items-center gap-4 animate-in slide-in-from-top-3 max-w-sm"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1 text-left text-xs">
            <span className="block font-bold">Added to Sunday Basket!</span>
            <span className="text-neutral-300 block truncate">
              {cartToast.quantity}x {cartToast.flavourName} ({cartToast.size}) • ₹{cartToast.price}
            </span>
            {cartToast.giftItem && (
              <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono-tech border border-amber-500/30">
                <span>🎁</span>
                <span className="font-bold truncate">{cartToast.giftItem.name}</span>
                <span className="text-emerald-400 font-bold shrink-0">(₹0 FREE)</span>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setCartToast(null);
              handleOpenComingSoon('Cart Checkout Flow');
            }}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-amber-500 text-black hover:bg-amber-400 cursor-pointer shrink-0"
          >
            Checkout
          </button>
          <button
            onClick={() => setCartToast(null)}
            className="text-neutral-400 hover:text-white p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
