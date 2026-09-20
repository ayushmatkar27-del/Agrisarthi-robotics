import React from 'react';
import RaaSPricing from '../components/RaaSPricing';
import RoiCalculator from '../components/RoiCalculator';
import TechArchitecture from '../components/TechArchitecture';

export default function ServicesPage({ onOpenDemo }) {
  return (
    <div className="pt-20">
      {/* Quick In-Page Anchor Bar for Services */}
      <div className="bg-[#edf7ed]/80 border-b border-green-200/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <span className="text-xs font-bold text-green-950 uppercase tracking-wider font-mono">
            Services & Engineering
          </span>
          <div className="flex items-center gap-2 text-xs">
            <a 
              href="#raas" 
              className="px-3 py-1 rounded-full bg-white text-green-900 border border-green-200 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              RaaS Plans
            </a>
            <a 
              href="#roi-calc" 
              className="px-3 py-1 rounded-full bg-white text-green-900 border border-green-200 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              ROI Calculator
            </a>
            <a 
              href="#tech-specs" 
              className="px-3 py-1 rounded-full bg-white text-green-900 border border-green-200 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Architecture & Specs
            </a>
          </div>
        </div>
      </div>

      {/* Robots as a Service Pricing */}
      <RaaSPricing onOpenDemo={onOpenDemo} />

      {/* ROI Calculator */}
      <RoiCalculator onOpenDemo={onOpenDemo} />

      {/* Technical Architecture & Specs */}
      <TechArchitecture />
    </div>
  );
}
