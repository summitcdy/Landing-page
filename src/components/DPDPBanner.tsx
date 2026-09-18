import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, ChevronRight, Check } from 'lucide-react';

export const DPDPBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [essential] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState<boolean>(true);
  const [marketing, setMarketing] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('the_sunday_basket_dpdp_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'the_sunday_basket_dpdp_consent',
      JSON.stringify({ essential: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'the_sunday_basket_dpdp_consent',
      JSON.stringify({ essential, analytics, marketing, timestamp: Date.now() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Digital Personal Data Protection Act Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 p-5 rounded-3xl bg-white/95 dark:bg-[#1C1814]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl text-left"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#1A1A1A] dark:text-white">
            DPDP Act 2023 Consent Notice
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[#8C8479] hover:text-black dark:hover:text-white p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed mb-4 font-sans-clean">
        In compliance with India’s <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>, we process your personal data solely for basket fulfillment, dispatch alerts, and secure transactions. No third-party data broker sales.
      </p>

      {showPreferences && (
        <div className="space-y-2 mb-4 p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1A1A1A] dark:text-white">Essential (Cart & Checkout)</span>
            <span className="text-[10px] font-mono-tech uppercase text-emerald-600 font-bold">Required</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5">
            <span className="font-semibold text-[#1A1A1A] dark:text-white">Analytics & Performance</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="rounded accent-black dark:accent-white"
            />
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5">
            <span className="font-semibold text-[#1A1A1A] dark:text-white">Occasion & Tasting Alerts</span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="rounded accent-black dark:accent-white"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={handleAcceptAll}
          className="flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] hover:bg-[#1A1A1A] transition-all cursor-pointer text-center"
        >
          Accept & Continue
        </button>

        {showPreferences ? (
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setShowPreferences(true)}
            className="px-3 py-2.5 rounded-full text-[11px] font-mono-tech text-[#8C8479] hover:text-black dark:hover:text-white transition-all cursor-pointer underline"
          >
            Preferences
          </button>
        )}
      </div>
    </div>
  );
};
