import React from 'react';
import {
  ArrowUp,
  Instagram,
  Facebook,
  Sparkles,
  Heart,
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
} from 'lucide-react';
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

  const footerNavLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop Sunday (Occasions)', href: '#shop-by-moment' },
    { name: 'Shop the Week (Mithila Makhana)', href: '#two-pillars' },
    { name: 'Product Matrix PDP', href: '#variant-matrix-pdp' },
    { name: 'Our Provenance & Growers', href: '#provenance' },
    { name: 'Nutrition Architecture', href: '#nutrition' },
    { name: 'Customer Stories', href: '#reviews-conversion' },
    { name: 'Support & FAQs', href: '#faq' },
  ];

  return (
    <footer id="footer" className="relative bg-[#151210] text-[#EDE7DE] pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10">
      {/* Background glow orb */}
      <div
        className="ambient-orb absolute -top-40 right-10 w-96 h-96 opacity-15 pointer-events-none"
        style={{ backgroundColor: currentFlavour.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Trust Marks Bar */}
        <div className="mb-16 pb-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">FSSAI Certified</span>
              <span className="text-[10px] text-neutral-400 font-mono-tech">Lic. 10423000001290</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">DPDP Act 2023 Compliant</span>
              <span className="text-[10px] text-neutral-400 font-mono-tech">Zero 3P Data Sharing</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">PCI-DSS & Razorpay</span>
              <span className="text-[10px] text-neutral-400 font-mono-tech">256-Bit SSL Encryption</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">Express Dispatch</span>
              <span className="text-[10px] text-neutral-400 font-mono-tech">Pan-India Courier Network</span>
            </div>
          </div>
        </div>

        {/* Main Footer Navigation & Brand Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Identity */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-serif-luxury font-bold text-white text-xs shadow-sm"
                style={{ backgroundColor: currentFlavour.accentColor }}
              >
                SB
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-tight text-white">
                THE SUNDAY BASKET
              </span>
            </div>

            <p className="font-serif-luxury italic text-lg text-amber-200/80 mb-4">
              "Sunday hunger. All day."
            </p>

            <p className="text-xs text-neutral-400 font-sans-clean leading-relaxed max-w-sm mb-6">
              Authentic GI-tagged Mithila Makhana slow-roasted in small batches. Two distinct front doors: occasion-led weekend food assortments and mindful weekday desk fuel.
            </p>

            {/* Social Links & Handles */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenComingSoon('Instagram Profile')}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenComingSoon('Facebook Page')}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenComingSoon('Brand Story Video')}
                className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono-tech uppercase text-neutral-300 transition-colors cursor-pointer"
              >
                @thesundaybasket
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <span className="block font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-4">
              Explore The Sunday Basket
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans-clean">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors block py-1 hover:translate-x-0.5 transform duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Regulatory Credentials */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="block font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-3">
                Statutory Information
              </span>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-neutral-400 space-y-2 font-mono-tech">
                <div>
                  <strong className="text-white block font-sans-clean">FSSAI Central Registration:</strong>
                  <span>Lic. No. 10423000001290</span>
                </div>
                <div>
                  <strong className="text-white block font-sans-clean">Processing Facility:</strong>
                  <span>Mithila Agri-Park, Darbhanga, Bihar — 846004</span>
                </div>
                <div>
                  <strong className="text-white block font-sans-clean">Corporate Office:</strong>
                  <span>Indiranagar 100ft Rd, Bengaluru, KA — 560038</span>
                </div>
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="mt-6 self-start inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-neutral-400 hover:text-white transition-colors py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 shadow-xs cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal, Privacy & DPDP row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono-tech">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap">
            <span>© {new Date().getFullYear()} The Sunday Basket FMCG Ltd.</span>
            <span className="hidden sm:inline">•</span>
            <span>All Rights Reserved</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-amber-400/80">GI Tagged Mithila Makhana</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenComingSoon('DPDP Privacy Policy & Data Rights')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              DPDP Act 2023 Privacy
            </button>
            <button
              onClick={() => onOpenComingSoon('Terms & Conditions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenComingSoon('FSSAI Compliance Certificate')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FSSAI Info
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
