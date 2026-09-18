import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { FlavourTheme, ThemeMode } from '../types';

interface NavbarProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
  themeMode: ThemeMode;
  onSelectThemeMode: (mode: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentFlavour,
  onOpenComingSoon,
  themeMode,
  onSelectThemeMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop Sunday', href: '#shop-by-moment', highlight: 'sunday' },
    { name: 'Shop the Week', href: '#two-pillars', highlight: 'week' },
    { name: 'Gifting', href: '#reviews-conversion' },
    { name: 'Our Story', href: '#provenance' },
    { name: 'Sunday Notes', href: '#nutrition' },
    { name: 'Support / FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-white/70 dark:bg-[#12100E]/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-sm'
          : 'py-5 sm:py-7 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="brand-logo-link"
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 shadow-sm border border-white/50"
            style={{
              backgroundColor: currentFlavour.accentColor,
              boxShadow: `0 4px 14px ${currentFlavour.glowColor}`,
            }}
          >
            <span className="text-white text-xs font-serif-luxury font-bold">SB</span>
          </div>
          <div>
            <span className="block font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] dark:text-white leading-none">
              THE <span className="italic" style={{ color: currentFlavour.accentColor }}>SUNDAY</span> BASKET
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75 mt-0.5">
              Roasted Makhana
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center gap-1.5 lg:gap-2 px-5 py-2 rounded-full bg-white/70 dark:bg-[#1E1B17]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xs"
        >
          {navLinks.map((item) => {
            const isSunday = item.highlight === 'sunday';
            const isWeek = item.highlight === 'week';

            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-full cursor-pointer flex items-center gap-1.5 ${
                  isSunday
                    ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 border border-amber-500/30'
                    : isWeek
                    ? 'bg-teal-500/15 text-teal-800 dark:text-teal-300 hover:bg-teal-500/25 border border-teal-500/30'
                    : 'text-[#2B2B2B] dark:text-[#F5F2EB] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {isSunday && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                {isWeek && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                <span>{item.name}</span>
              </a>
            );
          })}
          <button
            onClick={() => onOpenComingSoon('Contact Concierge')}
            className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2B2B2B] dark:text-[#F5F2EB] hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right CTA & Real Theme Selector */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Mode: Light | Dark | System */}
          <div
            id="nav-theme-selector"
            aria-label="Theme mode selector"
            className="flex items-center p-1 rounded-full bg-white/70 dark:bg-[#1E1B17]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xs"
            title="Theme Mode: Light, Dark, System"
          >
            <button
              onClick={() => onSelectThemeMode('light')}
              className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                themeMode === 'light'
                  ? 'bg-white text-[#1A1A1A] shadow-sm ring-1 ring-black/5'
                  : 'text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70 hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
              title="Light Theme"
              aria-label="Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectThemeMode('dark')}
              className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] shadow-sm'
                  : 'text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70 hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
              title="Dark Theme"
              aria-label="Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onSelectThemeMode('system')}
              className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                themeMode === 'system'
                  ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] shadow-sm'
                  : 'text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70 hover:text-[#1A1A1A] dark:hover:text-white'
              }`}
              title="System Theme"
              aria-label="System Theme"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            id="nav-coming-soon-btn"
            onClick={() => onOpenComingSoon('Nav Header / Shop Launch')}
            className="group relative inline-flex items-center gap-2 bg-[#1A1A1A] dark:bg-[#F5F2EB] text-white dark:text-[#1A1A1A] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-black dark:hover:bg-white active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
            <span>Coming Soon</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/70 dark:bg-[#1E1B17]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-[#F5F2EB]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden mx-4 mt-3 p-6 rounded-3xl bg-white/95 dark:bg-[#1C1814]/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-4"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2B2B2B] dark:text-[#F5F2EB] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenComingSoon('Contact Concierge');
              }}
              className="text-left px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2B2B2B] dark:text-[#F5F2EB] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl"
            >
              Contact
            </button>
          </div>

          {/* Mobile Theme Mode (Light / Dark / System) */}
          <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70">
              Theme:
            </span>
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10">
              {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => {
                const isAct = themeMode === mode;
                const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;
                return (
                  <button
                    key={mode}
                    onClick={() => onSelectThemeMode(mode)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1 transition-all ${
                      isAct
                        ? 'bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] shadow-xs'
                        : 'text-[#2B2B2B]/70 dark:text-[#F5F2EB]/70'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{mode}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenComingSoon('Mobile Header CTA');
              }}
              className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white dark:text-[#1A1A1A] bg-[#1A1A1A] dark:bg-white shadow-md text-center cursor-pointer"
            >
              Join Sunday VIP Batch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
