import React from 'react';
import { ShieldCheck, Zap, Radio, Sun, Compass, Activity, Bot } from 'lucide-react';

export default function LiveStatusTicker({ liveStats }) {
  return (
    <div className="bg-[#05080f] border-y border-green-200/80 py-2.5 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-mono text-gray-500">
        
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 pr-4 border-r border-green-200 text-emerald-700 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wider uppercase text-[11px]">Fleet Sentinel Live</span>
        </div>

        {/* Dynamic Telemetry Marquee Stats */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap px-4 py-0.5">
          <div className="flex items-center gap-2">
            <Bot className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-gray-400">Active Rovers:</span>
            <span className="text-green-800 font-semibold">{liveStats?.activeRovers || 14} Units Online</span>
          </div>

          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-gray-400">Monitored Farmland:</span>
            <span className="text-green-800 font-semibold">{liveStats?.totalAcres || '3,450+'} Acres</span>
          </div>

          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-purple-700" />
            <span className="text-gray-400">LoRa Mesh Latency:</span>
            <span className="text-green-800 font-semibold">{liveStats?.latency || '18 ms'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-gray-400">Solar Harvesting:</span>
            <span className="text-emerald-700 font-semibold">+4.2A Charging</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-gray-400">Security Breaches:</span>
            <span className="text-emerald-700 font-semibold">0 Detected (100% Secure)</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-gray-400">Dual Brain:</span>
            <span className="text-green-800 font-semibold">ESP32 + Pi 4 Sync</span>
          </div>
        </div>

        {/* Right Status */}
        <div className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-green-200 text-gray-500 shrink-0">
          <Activity className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-[11px]">System Status: <span className="text-emerald-700 font-bold">OPTIMAL</span></span>
        </div>

      </div>
    </div>
  );
}
