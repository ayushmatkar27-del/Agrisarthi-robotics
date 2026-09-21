import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import LiveStatusTicker from '../components/LiveStatusTicker';
import FleetSection from '../components/FleetSection';
import ScrollReveal from '../components/ScrollReveal';
import { 
  Radio, 
  Eye, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Cpu,
  Calculator
} from 'lucide-react';

export default function HomePage({ onOpenDemo, liveTelemetry, fleetStats }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section with Heading Block, Industrial Row Patrol Section & Pinned Accordion */}
      <Hero 
        onOpenDemo={() => onOpenDemo('sentinel')}
        liveTelemetry={liveTelemetry}
      />

      {/* Real-time Fleet Status Ticker */}
      <LiveStatusTicker liveStats={fleetStats} />

      {/* 
        ZONE 2: THE AGRISARTHI ROVER LINEUP (OTTO Industrial Field Stone Gamut)
        Features Metric / Imperial Toggle, Vertical Model Selector, and Ruled Specs Table
      */}
      <FleetSection 
        onOpenDemo={onOpenDemo}
        onSelectRover={(id) => {
          navigate('/rovers');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 
        ZONE 3: AUTONOMOUS SOFTWARE, MISSION CONTROL & ROI ENGINE HUBS
        Clean 3-column discovery cards guiding visitors to dedicated pages
      */}
      <section className="py-20 bg-[#eef5ee] border-t border-stone-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="kicker-label text-emerald-800 mb-2">
                AUTONOMOUS FLEET INTELLIGENCE & VALUE
              </p>
              <h2 className="heading-otto text-3xl sm:text-4xl md:text-5xl text-stone-950 font-extrabold">
                Engineered for autonomy, built for profitability
              </h2>
              <p className="text-base sm:text-lg text-stone-600 mt-3 font-normal max-w-2xl mx-auto leading-relaxed">
                Explore our dedicated interactive portals: launch real-time rover teleoperation and 3D simulation, calculate your farm's ROI, or dive into edge AI architecture.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Interactive Cards Linking to Dedicated Pages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Dedicated Mission Control & 3D Simulation */}
            <ScrollReveal animation="slide-up" delay={100}>
              <div 
                onClick={() => {
                  navigate('/mission-control');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md hover:shadow-2xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full transform hover:-translate-y-1.5"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>3D SIMULATION + HUD</span>
                  </div>
                  <h3 className="heading-otto text-xl sm:text-2xl text-stone-950 mb-3 group-hover:text-emerald-700 transition font-bold">
                    Mission Control & 3D Farm Scout
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Experience the working WebGL 3D farm environment with real-time physics and sensor inspection, or switch to live 2D HUD telemetry and YOLOv8 camera feeds.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform pt-4 border-t border-stone-100">
                  <span>LAUNCH MISSION CONTROL</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Dedicated Farm Savings & ROI Calculator */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div 
                onClick={() => {
                  navigate('/services#roi-calc');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md hover:shadow-2xl hover:border-amber-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full transform hover:-translate-y-1.5"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                    <Calculator className="w-7 h-7" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-800 border border-amber-500/30 mb-3">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>FINANCIAL MODEL</span>
                  </div>
                  <h3 className="heading-otto text-xl sm:text-2xl text-stone-950 mb-3 group-hover:text-amber-700 transition font-bold">
                    Farm Savings & ROI Calculator
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Model your exact acreage, crop type, and labor expenses to view payback periods, projected chemical cost reductions, and net yield revenue lift.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform pt-4 border-t border-stone-100">
                  <span>CALCULATE FARM SAVINGS</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Dedicated Technical Architecture & Edge AI */}
            <ScrollReveal animation="slide-up" delay={300}>
              <div 
                onClick={() => {
                  navigate('/services#tech-specs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md hover:shadow-2xl hover:border-purple-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full transform hover:-translate-y-1.5"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-700 mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-800 border border-purple-500/30 mb-3">
                    <Eye className="w-3.5 h-3.5" />
                    <span>DUAL-BRAIN SPECS</span>
                  </div>
                  <h3 className="heading-otto text-xl sm:text-2xl text-stone-950 mb-3 group-hover:text-purple-700 transition font-bold">
                    Dual-Brain AI Architecture
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Inspect the hardware decoupling between real-time ESP32 kinematics and the Raspberry Pi 4 edge compute module running on-device neural inference.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-700 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform pt-4 border-t border-stone-100">
                  <span>EXPLORE TECH SPECS</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>
    </>
  );
}
