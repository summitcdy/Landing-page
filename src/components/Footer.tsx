import React from 'react';
import { ArrowUp, Instagram, Facebook, Sparkles, Heart } from 'lucide-react';
import { FlavourTheme } from '../types';

interface FooterProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'Flavours', href: '#flavours' },
    { name: 'Interactive Pouch', href: '#interactive' },
    { name: 'Nutrition Story', href: '#nutrition' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Brand Philosophy', href: '#story' },
    { name: 'Packaging Architecture', href: '#freshness' },
  ];

  return (
    <footer className="relative bg-[#1A1614] text-[#EDE7DE] pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow orb */}
      <div
        className="ambient-orb absolute -top-40 right-10 w-96 h-96 opacity-15 pointer-events-none"
        style={{ backgroundColor: currentFlavour.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-serif-luxury font-bold text-white text-xs"
                style={{ backgroundColor: currentFlavour.accentColor }}
              >
                SB
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-tight text-white">
                THE SUNDAY BASKET
              </span>
            </div>

            <p className="font-serif-luxury italic text-lg text-neutral-400 mb-6">
              "A little Sunday, every day."
            </p>

            <p className="text-xs text-neutral-400 font-sans-clean leading-relaxed max-w-sm mb-6">
              Mindfully roasted makhana (fox nut) superfood snacks. Designed for contemporary Indian families, unhurried mornings, and mindful snacking.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenComingSoon('Instagram Profile')}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenComingSoon('Facebook Page')}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenComingSoon('Brand Video')}
                className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono-tech uppercase text-neutral-300 transition-colors"
              >
                @thesundaybasket
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <span className="block font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm font-sans-clean">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Prototype / Portfolio Context */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="block font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Prototype Preview
              </span>
              <div className="p-5 rounded-[24px] bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-neutral-400 leading-relaxed mb-4">
                This experience is a high-performance brand landing page and interactive 3D digital packaging prototype for The Sunday Basket.
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="self-start inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-neutral-400 hover:text-white transition-colors py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Craft row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono-tech">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} The Sunday Basket FMCG Ltd.</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenComingSoon('Privacy Policy')}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => onOpenComingSoon('Terms of Service')}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => onOpenComingSoon('Wholesale & Distribution')}
              className="hover:text-white transition-colors"
            >
              Wholesale
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
