import React from 'react';
import { Sparkles, Sun, Coffee, Users, HeartHandshake } from 'lucide-react';
import { FlavourTheme } from '../types';

interface BrandStorySectionProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  return (
    <section id="story" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Food Photography with Parallax Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3] sm:aspect-[16/10]">
              <img
                src="/assets/brand-story.png"
                alt="Mindful slow Sunday morning with roasted makhana"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge (Frosted Glass) */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[24px] bg-white/70 backdrop-blur-2xl border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/50">
                    The Ritual
                  </span>
                  <span className="text-sm font-semibold text-[#1A1A1A] font-sans-clean">
                    Slow Mornings • Mindful Crisp
                  </span>
                </div>
                <Sun className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            {/* Subtle Offset Decorative Backing Frame */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-[36px] -z-10 border border-white/60 pointer-events-none hidden sm:block"
              style={{ borderColor: `${currentFlavour.accentColor}30` }}
            />
          </div>

          {/* Right: Emotional Brand Copy */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-5 border border-white/60 bg-white/40 backdrop-blur-xl self-start">
              <Sparkles className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75">The Sunday Philosophy</span>
            </div>

            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-serif-luxury font-normal text-[#1A1A1A] tracking-tight leading-[1.08] mb-6">
              NOT JUST A SNACK.
              <br />
              <span
                className="italic font-light transition-colors duration-700"
                style={{ color: currentFlavour.accentColor }}
              >
                IT’S A LITTLE SUNDAY,
                <br />
                EVERY DAY.
              </span>
            </h2>

            <p className="text-xl sm:text-2xl font-serif-luxury italic text-[#2B2B2B]/80 mb-6 leading-relaxed">
              "Made for slow mornings, quick breaks, family moments and everything in between."
            </p>

            <p className="text-base text-[#5A5A5A] font-sans-clean leading-relaxed mb-8">
              In India, Sunday isn’t merely a calendar date; it’s an emotion. It’s when the clock slows down, conversations stretch across the living room carpet, and snacking is enjoyed without rushing.
              <br /><br />
              We founded <strong className="text-[#1A1A1A]">The Sunday Basket</strong> to bottle that relaxed, warm, unhurried feeling into everyday life. By taking the age-old sacred superfood of roasted lotus seeds and seasoning them with modern gastronomy, we give you permission to pause.
            </p>

            {/* Three Pillars of Sunday */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/5 mb-8">
              <div>
                <Coffee className="w-5 h-5 text-[#2B2B2B]/50 mb-2" />
                <span className="block font-serif-luxury font-bold text-base text-[#1A1A1A]">Unrushed</span>
                <span className="text-[11px] text-[#5A5A5A]">Mindful presence</span>
              </div>
              <div>
                <Users className="w-5 h-5 text-[#2B2B2B]/50 mb-2" />
                <span className="block font-serif-luxury font-bold text-base text-[#1A1A1A]">Shared</span>
                <span className="text-[11px] text-[#5A5A5A]">All generations</span>
              </div>
              <div>
                <HeartHandshake className="w-5 h-5 text-[#2B2B2B]/50 mb-2" />
                <span className="block font-serif-luxury font-bold text-base text-[#1A1A1A]">Honest</span>
                <span className="text-[11px] text-[#5A5A5A]">Pure ingredients</span>
              </div>
            </div>

            <button
              onClick={() => onOpenComingSoon('Brand Manifesto & Origin Story')}
              className="self-start px-7 py-3.5 rounded-full border border-white/60 bg-white/60 hover:bg-white text-[#2B2B2B] font-bold text-xs uppercase tracking-widest transition-all shadow-xs"
            >
              Read Our Brand Manifesto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
