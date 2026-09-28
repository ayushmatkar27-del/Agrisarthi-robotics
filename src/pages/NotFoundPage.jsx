import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Compass, 
  ArrowLeft, 
  Home, 
  Bot, 
  Layers 
} from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-20 min-h-[85vh] flex items-center justify-center bg-[#07130b] text-white relative overflow-hidden px-4">
      {/* Background Radar Grid & Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-emerald-500/10 blur-[180px] pointer-events-none rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Animated Radar Pulse Icon */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border border-emerald-500/50"></div>
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* 404 Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>404: GPS TELEMETRY SIGNAL LOST</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono tracking-tight text-white">
          Rover Out of <span className="text-emerald-400">Sector</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-sans">
          The field coordinate or page you requested does not correspond to an active waypoint in the AgriSarthi telemetry grid. The autonomous navigation system has engaged fail-safe braking.
        </p>

        {/* Quick Route Recovery Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm font-mono shadow-[0_0_20px_rgba(16,185,129,0.3)] transition flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Fleet Base</span>
          </Link>

          <Link
            to="/mission-control"
            className="px-6 py-3 rounded-xl bg-black/60 hover:bg-emerald-950 text-gray-200 hover:text-white border border-emerald-500/40 font-mono text-xs sm:text-sm font-bold transition flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Mission Control HUD</span>
          </Link>

          <Link
            to="/rovers"
            className="px-6 py-3 rounded-xl bg-black/60 hover:bg-emerald-950 text-gray-200 hover:text-white border border-emerald-500/40 font-mono text-xs sm:text-sm font-bold transition flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Inspect Rovers</span>
          </Link>
        </div>

        {/* Lat/Long Telemetry Mock */}
        <div className="pt-8 text-[11px] font-mono text-emerald-500/60 flex items-center justify-center gap-4">
          <span>LAT: 18.4484° N</span>
          <span>•</span>
          <span>LON: 73.8188° E (JSPM NTC)</span>
          <span>•</span>
          <span>STATUS: FAILSAFE LOCKED</span>
        </div>

      </div>
    </div>
  );
}
