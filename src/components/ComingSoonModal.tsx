import React, { useEffect, useState } from 'react';
import { X, Sparkles, Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import { FlavourTheme } from '../types';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFlavour: FlavourTheme;
  triggerContext?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  currentFlavour,
  triggerContext = 'Order',
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        onClose();
      }, 2200);
    }
  };

  return (
    <div
      id="coming-soon-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xl transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        id="coming-soon-panel"
        className="relative w-full max-w-lg overflow-hidden rounded-[36px] p-8 sm:p-10 text-center shadow-2xl transition-all duration-300 bg-white/75 backdrop-blur-3xl border border-white/80"
        style={{
          boxShadow: `0 25px 60px -15px ${currentFlavour.accentColor}35, 0 0 0 1px rgba(255,255,255,0.8) inset`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow orb */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-40"
          style={{ backgroundColor: currentFlavour.accentColor }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-30"
          style={{ backgroundColor: currentFlavour.accentSecondary }}
        />

        {/* Close Button */}
        <button
          id="close-coming-soon-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/60 hover:bg-white text-[#2B2B2B] border border-white/60 transition-colors focus:outline-none shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5 border border-white/60 bg-white/50 text-[#2B2B2B]/75 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
          <span>The Sunday Basket • Prototype Preview</span>
        </div>

        {/* Title */}
        <h3
          id="modal-title"
          className="text-3xl sm:text-4xl font-serif-luxury font-medium tracking-tight text-[#1A1A1A] mb-3"
        >
          COMING SOON
        </h3>

        {/* Subtitle / message */}
        <p className="text-base sm:text-lg text-[#5A5A5A] font-sans-clean leading-relaxed mb-6 max-w-sm mx-auto">
          We’re preparing something delicious for you.
          <br />
          <span className="text-[#1A1A1A] font-medium">The Sunday Basket</span> will be available online soon.
        </p>

        {/* Context badge if triggered by specific action */}
        {triggerContext && (
          <div className="mb-6 inline-block px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full bg-white/60 border border-white/60 text-[#2B2B2B]/60">
            Requested action: {triggerContext}
          </div>
        )}

        {/* Email VIP Notification form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for VIP early batch drop"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/80 border border-white/80 text-[#1A1A1A] text-xs placeholder:text-[#2B2B2B]/40 focus:outline-none focus:border-white shadow-xs transition-all"
              />
              <button
                type="submit"
                id="submit-vip-notification"
                className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-white flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 hover:opacity-95"
                style={{ backgroundColor: currentFlavour.accentColor }}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notify Me</span>
              </button>
            </div>
            <p className="text-[10px] text-[#2B2B2B]/50 font-sans-clean">
              Zero spam. Only an invite when the ovens fire up for the inaugural batch.
            </p>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-white/70 border border-white/80 text-emerald-800 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider mb-6 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>You’re on the exclusive Sunday Batch list!</span>
          </div>
        )}

        {/* Primary Modal CTA: EXPLORE FLAVOURS */}
        <button
          id="modal-explore-flavours-btn"
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-full border border-white/60 bg-white/60 hover:bg-white text-[#2B2B2B] font-bold text-xs uppercase tracking-widest transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <span>EXPLORE FLAVOURS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
