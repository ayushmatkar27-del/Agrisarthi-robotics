import React from 'react';
import { useNavigate } from 'react-router-dom';
import FleetSection from '../components/FleetSection';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function RoversPage({ onOpenDemo }) {
  const navigate = useNavigate();

  const handleSelectRover = (id) => {
    navigate('/services#tech-specs');
  };

  return (
    <div className="pt-20 min-h-screen bg-[#f0f9f0]">
      {/* Subnav / Header Bar */}
      <div className="bg-[#edf7ed]/90 border-b border-green-200/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-green-950 uppercase tracking-wider font-mono">
              Autonomous Fleet Portfolio
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => navigate('/services#tech-specs')}
              className="text-gray-600 hover:text-green-950 font-medium hidden sm:inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Compare Hardware Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onOpenDemo('sentinel')}
              className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition cursor-pointer shadow-sm"
            >
              Book Field Pilot
            </button>
          </div>
        </div>
      </div>

      {/* Main Rover Series Fleet Showcase */}
      <FleetSection 
        onOpenDemo={onOpenDemo}
        onSelectRover={handleSelectRover}
      />

      {/* Bottom Cross-Navigation Banner */}
      <div className="py-12 bg-[#e6f4e6] border-t border-green-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-green-950">
            Need a Custom Implement or Sensor Payload?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
            Our modular rocker-bogie chassis supports custom multi-spectral cameras, chemical micro-injectors, and LoRa mesh relays tailored to your crop geometry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/services')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-green-100 text-green-950 text-xs font-bold border border-green-300 shadow-sm cursor-pointer"
            >
              Explore RaaS Subscription Plans →
            </button>
            <button
              onClick={() => navigate('/mission-control')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Launch Live Mission Control HUD →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
