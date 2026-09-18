import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Truck, Sparkles, RefreshCw, Lock } from 'lucide-react';
import { FlavourTheme } from '../types';

interface FAQSectionProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Product & Ingredients',
    question: 'What makes Mithila Makhana superior to ordinary popped lotus seeds?',
    answer:
      'Our makhana is harvested strictly from the GI-tagged wetlands of Darbhanga and Madhubani in Northern Bihar. Deep sediment waters impart a naturally sweet, mineral-rich undertone. Seeds are popped over gentle open wood fire and graded for giant kernel density, resulting in an exceptionally crisp, brittle crunch that never turns rubbery.',
  },
  {
    category: 'Nutrition & Processing',
    question: 'Are The Sunday Basket makhanas fried or baked?',
    answer:
      'They are 100% slow air-roasted in small batches. We never deep-fry or use hydrogenated palm oils. Our recipes use pure Vedic A2 cow ghee or heart-healthy cold-pressed seed oils, seasoned only with natural whole spices, unrefined rock salt (Sendha Namak), and botanical extracts.',
  },
  {
    category: 'Freshness & Shelf Life',
    question: 'How long do the pouches stay fresh once opened?',
    answer:
      'Unopened pouches have a guaranteed shelf life of 9 months thanks to nitrogen-flush barrier packaging. Once opened, simply zip the airtight press-seal pouch tightly and store away from direct sunlight; your makhana will remain light and crisp for up to 30 days.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'What is the dispatch schedule and delivery timeframe?',
    answer:
      'Orders placed before 2:00 PM IST are dispatched the same day from our temperature-controlled facility. Metro deliveries (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai) arrive within 24 to 48 hours via premium express air partners. Rest of India arrives in 3 to 4 business days.',
  },
  {
    category: 'Data & Security',
    question: 'How is my privacy protected under India’s DPDP Act 2023?',
    answer:
      'The Sunday Basket strictly complies with India’s Digital Personal Data Protection Act 2023. We collect only minimal contact and address details necessary to dispatch your parcel. Your information is stored on encrypted Indian servers, never shared with third-party advertisers or telemarketers, and you retain the legal right to request complete data erasure at any moment.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ currentFlavour, onOpenComingSoon }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase mb-4 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
            <HelpCircle className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/75 dark:text-[#F5F2EB]/75">
              Support & Transparency
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1A1A1A] dark:text-white tracking-tight leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#A8A29E] font-sans-clean leading-relaxed">
            Everything you need to know about our sourcing, roasting, delivery, and data safeguards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-14">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/70 dark:bg-[#1C1814]/80 border border-black/5 dark:border-white/10 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[10px] font-mono-tech font-bold text-[#8C8479]">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#1A1A1A] dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  <div className="shrink-0 text-[#8C8479]">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5A5A5A] dark:text-[#A8A29E] leading-relaxed border-t border-black/5 dark:border-white/5 font-sans-clean">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Help Box */}
        <div className="p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#1A1A1A] dark:text-white mb-1">
              Have a question about allergen certifications or bulk orders?
            </h4>
            <p className="text-xs text-[#8C8479] dark:text-[#A8A29E]">
              Our concierge team in Bengaluru responds within 2 business hours.
            </p>
          </div>
          <button
            onClick={() => onOpenComingSoon('Concierge Support Desk')}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2B2B2B] text-white dark:bg-white dark:text-[#1A1A1A] hover:bg-black transition-all cursor-pointer shrink-0"
          >
            Chat with Concierge
          </button>
        </div>
      </div>
    </section>
  );
};
