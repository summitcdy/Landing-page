import React, { useState, useEffect } from 'react';
import { FLAVOURS } from './data/snackData';
import { FlavourId, ThemeMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlavourShift } from './components/FlavourShift';
import { InteractiveExperienceSection } from './components/InteractiveExperienceSection';
import { NutritionSection } from './components/NutritionSection';
import { IngredientsSection } from './components/IngredientsSection';
import { BrandStorySection } from './components/BrandStorySection';
import { PackagingFreshness } from './components/PackagingFreshness';
import { FlavourQuizSection } from './components/FlavourQuizSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ComingSoonModal } from './components/ComingSoonModal';

export default function App() {
  const [currentFlavourId, setCurrentFlavourId] = useState<FlavourId>('himalayan-salt');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(false);
  const [comingSoonTrigger, setComingSoonTrigger] = useState<string>('');

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

  const currentFlavour = FLAVOURS[currentFlavourId];

  const handleOpenComingSoon = (context: string) => {
    setComingSoonTrigger(context);
    setIsComingSoonOpen(true);
  };

  const handleSelectFlavour = (id: FlavourId) => {
    if (id !== currentFlavourId) {
      setCurrentFlavourId(id);
    }
  };

  // Keyboard shortcut: 1, 2, 3 for instant flavour switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') setCurrentFlavourId('himalayan-salt');
      if (e.key === '2') setCurrentFlavourId('cheese');
      if (e.key === '3') setCurrentFlavourId('peri-peri');
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
      className={`min-h-screen bg-gradient-to-b ${activeBgGradient} transition-colors duration-1000 ease-in-out font-sans-clean relative selection:bg-[#B88746] selection:text-white`}
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

      {/* 01 & 02: CINEMATIC HERO & PRODUCT REVEAL */}
      <main>
        <HeroSection
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 03: FLAVOUR TRANSFORMATION SYSTEM */}
        <FlavourShift
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 04: INTERACTIVE PRODUCT EXPERIENCE & 3D MACRO ZOOM */}
        <InteractiveExperienceSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 05: NUTRITION / WHY ROASTED ("GOOD SNACK. BETTER CHOICE.") */}
        <NutritionSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 06: INGREDIENTS EXPERIENCE */}
        <IngredientsSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 07: BRAND STORY ("NOT JUST A SNACK. IT'S A LITTLE SUNDAY, EVERY DAY.") */}
        <BrandStorySection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 08: PACKAGING / PRODUCT SPECIFICATION ("BUILT FOR FRESHNESS.") */}
        <PackagingFreshness
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 09: FLAVOUR COLLECTION ("WHICH SUNDAY ARE YOU?") */}
        <FlavourQuizSection
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 10: PREMIUM FINAL CTA ("MAKE EVERY DAY A LITTLE SUNDAY.") */}
        <FinalCTA
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />
      </main>

      {/* 11: MINIMAL PREMIUM FOOTER */}
      <Footer
        currentFlavour={currentFlavour}
        onOpenComingSoon={handleOpenComingSoon}
      />

      {/* E-COMMERCE COMING SOON MODAL */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        currentFlavour={currentFlavour}
        triggerContext={comingSoonTrigger}
      />
    </div>
  );
}
