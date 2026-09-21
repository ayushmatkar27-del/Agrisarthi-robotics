import React, { useState, useRef } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  RotateCcw, 
  Eye, 
  Layers, 
  Cpu, 
  Droplets, 
  Compass, 
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function SimulationViewer({ onSwitchToHud }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef(null);

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Fullscreen request error:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Exit fullscreen error:', err);
      });
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="bg-[#09170e] text-gray-200 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 blur-[180px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Simulation Viewer Frame Container */}
        <div 
          ref={containerRef}
          className={`relative rounded-3xl bg-[#08140b] border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''
          }`}
        >
          {/* Top Control Header Bar */}
          <div className="px-5 py-4 bg-[#0a1e11]/90 border-b border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left Title & Status */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 relative"></span>
              </div>
              
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-white font-bold tracking-wide text-base sm:text-lg md:text-xl flex items-center gap-2 font-mono">
                    AGRISARTHI 3D ROVER & FARM SIMULATION
                  </h3>
                  <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    WebGL Three.js
                  </span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mt-1 font-sans">
                  Real-Time 4WD Autonomous Scouting & Precision Spraying Simulation
                </p>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {onSwitchToHud && (
                <button
                  onClick={onSwitchToHud}
                  className="px-4 py-2 rounded-xl bg-black/60 hover:bg-emerald-950 text-gray-200 hover:text-white border border-emerald-500/40 text-xs sm:text-sm font-mono font-semibold transition flex items-center gap-1.5"
                  title="Switch to 2D HUD Telemetry"
                >
                  <span>🛰️ Telemetry HUD</span>
                </button>
              )}

              <button
                onClick={handleReload}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-black/60 hover:bg-emerald-950 text-gray-200 hover:text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-mono font-semibold transition flex items-center gap-1.5"
                title="Reload Simulation Scene"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reload</span>
              </button>

              <a
                href="/simulation/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-black/60 hover:bg-emerald-950 text-gray-200 hover:text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-mono font-semibold transition flex items-center gap-1.5"
                title="Open in Full Browser Tab"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">New Tab</span>
              </a>

              <button
                onClick={handleToggleFullscreen}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm font-mono transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden sm:inline font-bold">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Interaction Guide Bar */}
          <div className="px-5 py-3 bg-[#07150c]/90 border-b border-emerald-500/20 text-xs sm:text-sm font-mono text-gray-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Controls:
              </span>
              <span>🖱️ Drag to Orbit View</span>
              <span className="text-gray-500">•</span>
              <span>🔍 Scroll to Zoom</span>
              <span className="text-gray-500">•</span>
              <span className="text-amber-300 font-semibold">🎯 Click any rover part to inspect specs</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Camera: Orbit • Follow • POV • Field Map</span>
            </div>
          </div>

          {/* Live Three.js Simulation Iframe */}
          <div className="relative w-full bg-[#08140b]">
            <iframe
              key={iframeKey}
              src="/simulation/index.html"
              title="AgriSarthi 3D Farm Scout Rover Simulation"
              className={`w-full border-0 block ${
                isFullscreen ? 'h-[calc(100vh-100px)]' : 'h-[620px] sm:h-[720px] lg:h-[780px]'
              }`}
              allow="fullscreen"
            />
          </div>
        </div>

        {/* Feature Highlights & Specifications */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs sm:text-sm">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0f2416]/80 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm sm:text-base">
              <Layers className="w-4 h-4" />
              <span>4WD ROCKER CHASSIS</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
              Differential 4-wheel drive designed for uneven soil, crop furrows, mud, and low-clearance crop rows.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0f2416]/80 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm sm:text-base">
              <Eye className="w-4 h-4" />
              <span>ON-DEVICE EDGE AI</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
              Raspberry Pi 4 running YOLOv8 for weed classification, crop row tracking, and obstacle avoidance.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0f2416]/80 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm sm:text-base">
              <Droplets className="w-4 h-4" />
              <span>PRECISION SPRAY SYSTEM</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
              Targeted dual-nozzle micro-dosing sprays weeds directly, cutting chemical runoff and costs by 60%.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0f2416]/80 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm sm:text-base">
              <Cpu className="w-4 h-4" />
              <span>MULTISENSOR ARRAY</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
              Ultrasonic distance sensors, PIR motion detectors, capacitive soil probe, and GPS telemetry bridge.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
