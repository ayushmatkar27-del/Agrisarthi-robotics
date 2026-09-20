import React from 'react';
import ImpactAndProof from '../components/ImpactAndProof';
import InvestorRoom from '../components/InvestorRoom';
import ContactSection from '../components/ContactSection';

export default function AboutPage({ onOpenDemo }) {
  return (
    <div className="pt-20">
      {/* Quick In-Page Anchor Bar for About */}
      <div className="bg-[#edf7ed]/80 border-b border-green-200/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <span className="text-xs font-bold text-green-950 uppercase tracking-wider font-mono">
            About & Ventures
          </span>
          <div className="flex items-center gap-2 text-xs">
            <a 
              href="#impact" 
              className="px-3 py-1 rounded-full bg-white text-green-900 border border-green-200 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Impact & Awards
            </a>
            <a 
              href="#investors" 
              className="px-3 py-1 rounded-full bg-white text-green-900 border border-green-200 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Pitch Deck & TAM
            </a>
            <a 
              href="#contact" 
              className="px-3 py-1 rounded-full bg-white text-green-900 border border-green-200 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Contact Lab
            </a>
          </div>
        </div>
      </div>

      {/* Field Impact, Awards & Before/After Proof */}
      <ImpactAndProof />

      {/* Startup Pitch Deck, TAM & Team */}
      <InvestorRoom onOpenDemo={onOpenDemo} />

      {/* Contact & Robotics Lab Channel */}
      <ContactSection onOpenDemo={onOpenDemo} />
    </div>
  );
}
