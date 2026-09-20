import React, { useState } from 'react';
import { ROVER_FLEET } from '../data/fleetData';
import { 
  Bot, 
  Cpu, 
  Check, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';

export default function FleetSection({ onOpenDemo, onSelectRover }) {
  const [activeRoverId, setActiveRoverId] = useState('sentinel');
  const [isMetric, setIsMetric] = useState(true);

  const activeRover = ROVER_FLEET.find(r => r.id === activeRoverId) || ROVER_FLEET[0];

  // Specific technical specs mapped to OTTO style display
  const modelSpecs = {
    sentinel: {
      modelCode: 'AGRISARTHI 100',
      tagline: 'Autonomous Crop Scouting & 24/7 Field Intelligence',
      payloadMetric: '45 kg',
      payloadImperial: '99 lbs',
      speedMetric: '1.8 m/s',
      speedImperial: '4.0 mph',
      footprintMetric: '650 x 480 x 320 mm',
      footprintImperial: '25.6 x 18.9 x 12.6 in',
      runtime: '8-10h + Solar Top',
      dailyCap: '15 Acres / Shift',
      chassis: '4WD Rocker-Bogie with 120mm ground clearance'
    },
    weeder: {
      modelCode: 'AGRISARTHI 600',
      tagline: 'Sub-Millimeter AI Micro-Weeding & Targeted Spray',
      payloadMetric: '65 kg (Fluid + Actuator)',
      payloadImperial: '143 lbs',
      speedMetric: '1.4 m/s',
      speedImperial: '3.1 mph',
      footprintMetric: '740 x 550 x 380 mm',
      footprintImperial: '29.1 x 21.6 x 15.0 in',
      runtime: '6-8h High-Pressure',
      dailyCap: '10 Acres / Shift',
      chassis: 'Wide-Track Mud Clearance with High-Torque DC'
    },
    scout: {
      modelCode: 'AGRISARTHI 1200',
      tagline: 'Sub-Surface Soil Core Probes & Multi-Spectral Telemetry',
      payloadMetric: '35 kg (Sensor Boom)',
      payloadImperial: '77 lbs',
      speedMetric: '2.0 m/s',
      speedImperial: '4.5 mph',
      footprintMetric: '600 x 440 x 300 mm',
      footprintImperial: '23.6 x 17.3 x 11.8 in',
      runtime: '12h Long-Range',
      dailyCap: '25 Acres / Shift',
      chassis: 'Ultra-Lightweight Carbon/Alloy High-Agility'
    }
  };

  const currentSpecs = modelSpecs[activeRoverId] || modelSpecs.sentinel;

  return (
    <section id="fleet" className="py-24 bg-[#dbe5db] relative overflow-hidden border-t border-stone-300/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Kicker & Heading Header — Exact OTTO Layout */}
        <div className="mb-10">
          <p className="kicker-label text-stone-600 mb-2">
            AUTONOMOUS MOBILE ROBOTS
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="heading-otto text-3xl sm:text-4xl md:text-5xl text-stone-900">
              There's an AgriSarthi for every job
            </h2>

            {/* Metric / Imperial Unit Toggle (Matches OTTO Switch in Screenshot) */}
            <div className="flex items-center gap-3 bg-white/70 border border-stone-300 px-3.5 py-1.5 rounded-full self-start sm:self-auto shadow-sm">
              <button
                onClick={() => setIsMetric(!isMetric)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                  isMetric ? 'bg-stone-900' : 'bg-stone-400'
                }`}
              >
                <span 
                  className={`block w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-md ${
                    isMetric ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </button>
              <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
                {isMetric ? 'METRIC' : 'IMPERIAL'}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Model Selector Stack (Left) + Detailed Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stack of Model Selection Cards (OTTO 100, 600, 1200 style) */}
          <div className="lg:col-span-4 space-y-3">
            {ROVER_FLEET.map((rover) => {
              const spec = modelSpecs[rover.id] || modelSpecs.sentinel;
              const isActive = activeRoverId === rover.id;
              
              return (
                <button
                  key={rover.id}
                  onClick={() => setActiveRoverId(rover.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer flex items-center justify-between group ${
                    isActive 
                      ? 'bg-white border-stone-400 shadow-md translate-x-1' 
                      : 'bg-white/50 hover:bg-white/80 border-stone-300/60 text-stone-600'
                  }`}
                >
                  <div className="pr-4">
                    <h3 className={`font-mono text-sm font-bold uppercase tracking-wide ${
                      isActive ? 'text-stone-950' : 'text-stone-700'
                    }`}>
                      {spec.modelCode}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 font-sans">
                      Moves loads up to {isMetric ? spec.payloadMetric : spec.payloadImperial}
                    </p>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-1">
                      {rover.name} • {rover.status}
                    </span>
                  </div>

                  {/* Icon Schematic Representation */}
                  <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-stone-900 text-white border-stone-900' 
                      : 'bg-white/80 text-stone-500 border-stone-300 group-hover:border-stone-400'
                  }`}>
                    <Bot className="w-5 h-5" />
                  </div>
                </button>
              );
            })}

            {/* Quick Fleet Guarantee Box */}
            <div className="p-5 rounded-2xl bg-stone-200/60 border border-stone-300/80 text-stone-700 text-xs font-sans space-y-2">
              <div className="font-mono font-bold uppercase text-[11px] text-stone-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-700" />
                All-Terrain Durability Standard
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Every chassis is field-rated for IP65 water/dust resistance, 35° incline stability, and zero soil compaction under wet furrow conditions.
              </p>
            </div>
          </div>

          {/* Right Column: High-Impact OTTO Showcase Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-300/90 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            
            {/* Top Row: Model Code, Explore Button & Spec Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-8 border-b border-stone-200">
              
              {/* Left Header & Explore Action */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest block mb-1">
                    {activeRover.name}
                  </span>
                  <h3 className="heading-otto text-3xl sm:text-4xl text-stone-950">
                    {currentSpecs.modelCode}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans leading-relaxed">
                    {currentSpecs.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectRover && onSelectRover(activeRover.id)}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-sm"
                  >
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenDemo(activeRover.id)}
                    className="btn-earth-pill px-6 py-2.5 text-xs tracking-wider cursor-pointer"
                  >
                    BOOK PILOT
                  </button>
                </div>
              </div>

              {/* Right Ruled Spec Table (Matches OTTO Exact Table) */}
              <div className="md:col-span-6 font-mono text-xs space-y-3 pt-1">
                <div className="border-b border-stone-200 pb-2">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                    PAYLOAD CAPACITY
                  </span>
                  <span className="text-sm font-bold text-stone-950 font-sans">
                    {isMetric ? currentSpecs.payloadMetric : currentSpecs.payloadImperial}
                  </span>
                </div>

                <div className="border-b border-stone-200 pb-2">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                    MAXIMUM TRAVEL SPEED
                  </span>
                  <span className="text-sm font-bold text-stone-950 font-sans">
                    {isMetric ? currentSpecs.speedMetric : currentSpecs.speedImperial}
                  </span>
                </div>

                <div className="pb-1">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                    TOTAL FOOTPRINT
                  </span>
                  <span className="text-sm font-bold text-stone-950 font-sans">
                    {isMetric ? currentSpecs.footprintMetric : currentSpecs.footprintImperial}
                  </span>
                </div>
              </div>

            </div>

            {/* Visual Hardware Display */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Rover Image with Callout HUD */}
              <div className="md:col-span-7 relative rounded-2xl overflow-hidden bg-stone-100/60 border border-stone-200 p-4 group">
                <img 
                  src="/images/rover_prototype.jpeg" 
                  alt={activeRover.name}
                  className="w-full h-56 sm:h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-6 left-6 px-2.5 py-1 rounded bg-stone-900/80 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider">
                  MODEL: AS-{activeRover.id.toUpperCase()}-2026
                </div>
                <div className="absolute bottom-6 right-6 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold">
                  ● ACTIVE TELEMETRY
                </div>
              </div>

              {/* Core Features & Pricing Breakdown */}
              <div className="md:col-span-5 space-y-4">
                <div className="space-y-2">
                  <span className="kicker-label text-stone-500 block text-[11px]">
                    INTEGRATED CAPABILITIES
                  </span>
                  {activeRover.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
                  <div className="font-mono text-[10px] uppercase text-stone-500">
                    Deployment Pricing
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-stone-600">RaaS Subscription:</span>
                    <strong className="font-mono text-emerald-800 font-bold">{activeRover.pricing.lease}</strong>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-stone-600">Pay-Per-Acre:</span>
                    <strong className="font-mono text-stone-900">{activeRover.pricing.perAcre}</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
