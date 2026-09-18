import React from 'react';
import { ShieldCheck, MapPin, Sparkles, HeartHandshake, Flame, Droplets, Lock } from 'lucide-react';
import { PROVENANCE_DATA } from '../data/snackData';
import { FlavourTheme } from '../types';

interface ProvenanceSectionProps {
  currentFlavour: FlavourTheme;
}

export const ProvenanceSection: React.FC<ProvenanceSectionProps> = ({ currentFlavour }) => {
  return (
    <section id="provenance" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] dark:bg-[#151210] border-y border-black/5 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with Origin Proof */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
                Authentic Origin & Provenance Chain
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight">
              From Sacred Mithila Waters <br className="hidden sm:inline" />to Mindful Sunday Crunch
            </h2>
          </div>

          {/* Regional Proof Badge */}
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1E1B17] border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 max-w-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-tech font-bold uppercase text-amber-700 dark:text-amber-400">
                  GI-Tagged Regional Origin
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300">
                  Govt. of India Certified
                </span>
              </div>
              <p className="text-sm font-bold text-[#1A1A1A] dark:text-white mt-0.5">
                {PROVENANCE_DATA.region}
              </p>
              <p className="text-[11px] text-[#6B655D] dark:text-[#A8A29E] mt-1">
                Naturally nourished in northern Bihar oxbow wetlands without chemical fertilizers.
              </p>
            </div>
          </div>
        </div>

        {/* Story Chain: Source -> Freshness -> Growers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PROVENANCE_DATA.steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative p-8 rounded-3xl bg-white dark:bg-[#1C1814] border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
            >
              {/* Step indicator */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-3xl font-serif-luxury font-bold text-[#D4CEBF] dark:text-[#3E3832]">
                    {step.stepNumber}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#1A1A1A] dark:text-white">
                    Phase: {step.phase}
                  </span>
                </div>

                <h3 className="text-xl font-serif-luxury font-bold text-[#1A1A1A] dark:text-white mb-2">
                  {step.title}
                </h3>
                <span className="block text-xs font-mono-tech text-[#8C8479] dark:text-[#A8A29E] mb-4">
                  {step.sub}
                </span>

                <p className="text-xs sm:text-sm text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed mb-6 font-sans-clean">
                  {step.detail}
                </p>
              </div>

              {/* Metric Card */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-[#1A1A1A] dark:text-white block">
                    {step.metric}
                  </span>
                  <span className="text-[10px] text-[#8C8479] dark:text-[#A8A29E]">
                    {step.metricLabel}
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  {step.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Governance Callout (Honoring HARD CONSTRAINT on coordinates privacy) */}
        <div className="rounded-2xl p-4 sm:p-5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-start sm:items-center gap-3.5 text-xs text-[#5A5A5A] dark:text-[#A8A29E]">
          <Lock className="w-5 h-5 text-[#8C8479] dark:text-[#A8A29E] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-[#1A1A1A] dark:text-white font-semibold">Grower Community Protection Notice: </strong>
            To protect indigenous Mallah harvesting cooperatives and preserve the non-commercialized biodiversity of Mithila wetlands, exact satellite GPS pins and micro-village coordinates are strictly redacted. We guarantee 100% regional traceability to verified Bihar farmer federations.
          </p>
        </div>
      </div>
    </section>
  );
};
