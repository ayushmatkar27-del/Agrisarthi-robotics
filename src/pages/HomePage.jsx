import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import LiveStatusTicker from '../components/LiveStatusTicker';
import FleetSection from '../components/FleetSection';
import MissionControlDemo from '../components/MissionControlDemo';
import RoiCalculator from '../components/RoiCalculator';
import ScrollReveal from '../components/ScrollReveal';
import { 
  Radio, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function HomePage({ onOpenDemo, liveTelemetry, fleetStats }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section with Heading Block, Earth Rover Pure Light Section & Accordion */}
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
        ZONE 3: MISSION CONTROL HUD (AgriTech Night / Obsidian Cockpit Gamut)
        Breaks the light theme with deep night telemetry, live camera, and LiDAR radar
      */}
      <MissionControlDemo 
        liveTelemetry={liveTelemetry}
        onOpenDemo={onOpenDemo}
      />

      {/* 
        ZONE 4: FARM SAVINGS & ROI ENGINE (Warm Loam & Solar Harvest Gamut)
        Amber and terracotta soil warmth to break up the color monotony
      */}
      <RoiCalculator 
        onOpenDemo={onOpenDemo}
      />

      {/* 
        ZONE 5: AUTONOMOUS SOFTWARE & EDGE INTELLIGENCE
        Clean dual cards with hover pop
      */}
      <section className="py-20 bg-[#eef5ee] border-t border-stone-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="kicker-label text-emerald-800 mb-2">
                AUTONOMOUS EDGE COMPUTING & SOFTWARE
              </p>
              <h2 className="heading-otto text-3xl sm:text-4xl md:text-5xl text-stone-950">
                The secret to efficiency is in the software
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-3 font-normal">
                AgriSarthi combines edge YOLOv8 computer vision, real-time motor kinematics firmware, and cloud telemetry into a unified autonomous ecosystem.
              </p>
            </div>
          </ScrollReveal>

          {/* 2 Big Software Cards with Hover Pop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <ScrollReveal animation="slide-left" delay={100}>
              <div 
                onClick={() => {
                  navigate('/mission-control');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-110 transition-transform">
                    <Radio className="w-6 h-6" />
                  </div>
                  <h3 className="heading-otto text-xl sm:text-2xl text-stone-950 mb-3 group-hover:text-emerald-700 transition">
                    Next-Gen Teleoperation with Mission Control HUD
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Manage multi-rover swarms, view live camera video streams, trigger emergency waypoint adjustments, and monitor battery discharge and telemetry in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                  <span>DISCOVER MISSION CONTROL</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={200}>
              <div 
                onClick={() => {
                  navigate('/services#tech-specs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-700 mb-6 group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="heading-otto text-xl sm:text-2xl text-stone-950 mb-3 group-hover:text-emerald-700 transition">
                    Navigate Uneven Furrows with YOLOv8 Edge AI
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Our on-rover deep learning engine classifies crop rows, detects leaf diseases, and differentiates weeds from cash crops at 24.2 FPS with zero cloud connection required.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                  <span>EXPLORE DUAL-BRAIN SPECS</span>
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
