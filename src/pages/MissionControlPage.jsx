import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MissionControlDemo from '../components/MissionControlDemo';
import SimulationViewer from '../components/SimulationViewer';
import { Sparkles, Radio, Layers, Eye, ShieldCheck, Crosshair } from 'lucide-react';

export default function MissionControlPage({ liveTelemetry, onOpenDemo }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Default to simulation view or read from query param ?view=...
  const viewParam = searchParams.get('view');
  const [activeView, setActiveView] = useState(viewParam === 'hud' ? 'hud' : 'simulation');

  // Sync state if URL param changes
  useEffect(() => {
    if (viewParam === 'hud') {
      setActiveView('hud');
    } else if (viewParam === 'simulation') {
      setActiveView('simulation');
    }
  }, [viewParam]);

  const handleSelectView = (view) => {
    setActiveView(view);
    setSearchParams({ view });
  };

  return (
    <div className="pt-20 bg-[#09170e] min-h-screen text-gray-200">
      
      {/* Top Highlighted Command Header & View Selector Bar */}
      <div className="border-b border-emerald-900/60 bg-[#07150c]/95 backdrop-blur sticky top-16 sm:top-20 z-30 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              {activeView === 'simulation' ? (
                <Sparkles className="w-5 h-5 animate-pulse text-emerald-400" />
              ) : (
                <Radio className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="bg-white/95 px-2.5 py-1 rounded-lg border border-white/40 shadow-sm flex items-center">
                  <img 
                    src="/images/agrisarthi_wordmark.png" 
                    alt="AgriSarthi" 
                    className="h-5 sm:h-6 w-auto object-contain"
                  />
                </div>
                <h1 className="text-lg sm:text-xl font-bold font-mono tracking-wide text-white">
                  MISSION CONTROL
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
                  Dual-Engine
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Switch between the Real-Time 3D Farm Field Simulation and Live 2D HUD Teleoperation
              </p>
            </div>
          </div>

          {/* Prominently Highlighted Option Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#050e08] p-1.5 rounded-2xl border border-emerald-500/40 shadow-xl">
            
            {/* HIGHLIGHTED SHOW SIMULATION OPTION */}
            <button
              onClick={() => handleSelectView('simulation')}
              className={`relative px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${
                activeView === 'simulation'
                  ? 'bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-slate-950 shadow-[0_0_25px_rgba(34,197,94,0.6)] ring-2 ring-emerald-300 scale-105'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  activeView === 'simulation' ? 'bg-slate-950' : 'bg-emerald-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  activeView === 'simulation' ? 'bg-slate-950' : 'bg-emerald-400'
                }`}></span>
              </span>
              
              <span className="tracking-wide">🌱 SHOW 3D SIMULATION</span>
              
              <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-extrabold ${
                activeView === 'simulation' 
                  ? 'bg-black/20 text-slate-900' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                Featured
              </span>
            </button>

            {/* MISSION CONTROL HUD OPTION */}
            <button
              onClick={() => handleSelectView('hud')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
                activeView === 'hud'
                  ? 'bg-[#0f2818] text-white border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-emerald-950/40'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              <span>🛰️ MISSION CONTROL HUD</span>
            </button>

          </div>

        </div>
      </div>

      {/* Main View Area */}
      {activeView === 'simulation' ? (
        <SimulationViewer 
          onSwitchToHud={() => handleSelectView('hud')}
        />
      ) : (
        <MissionControlDemo 
          liveTelemetry={liveTelemetry}
          onOpenDemo={() => onOpenDemo('sentinel')}
          onShowSimulation={() => handleSelectView('simulation')}
        />
      )}

    </div>
  );
}
