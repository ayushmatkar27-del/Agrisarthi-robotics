import React, { useState } from 'react';
import { AWARDS_DATA } from '../data/teamData';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ShieldCheck, 
  Droplets, 
  Star,
  Quote
} from 'lucide-react';

export default function ImpactAndProof() {
  const [comparisonMode, setComparisonMode] = useState('with-agrisarthi'); // 'with-agrisarthi' | 'traditional'

  return (
    <section id="impact" className="py-24 bg-[#f7fcf7] text-green-900 relative overflow-hidden border-t border-green-100">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>VALIDATED IMPACT & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight mb-4">
            Field-Proven & <span className="text-gradient-amber">Award-Winning</span>
          </h2>
          <p className="text-base text-gray-500">
            Backed by national innovation grants, academic rigor at JSPM Narhe Technical Campus (Pune), and real-world farm trials.
          </p>
        </div>

        {/* Awards Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {AWARDS_DATA.map((award, idx) => (
            <div 
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 border border-amber-500/30">
                  {award.prize}
                </span>
              </div>

              <h3 className="text-lg font-bold text-green-950 mb-1 font-mono">{award.title}</h3>
              <span className="text-xs text-amber-700/80 font-medium block mb-3">{award.org}</span>
              <p className="text-xs text-gray-500 leading-relaxed">{award.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Before vs After Comparison Card */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider block mb-1">
                Comparative Field Analysis
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-green-950">
                Traditional Manual Scouting vs. <span className="text-emerald-700">AgriSarthi Autonomy</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Traditional Approach Card */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-red-900/30">
                  <h4 className="text-sm font-bold text-red-700 font-mono flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span>Traditional Manual Scouting</span>
                  </h4>
                  <span className="text-[10px] text-red-700 font-mono">Slow & Reactive</span>
                </div>

                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                    <span>Inspection occurs once every 3–7 days, missing early disease outbreaks.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                    <span>High human labor costs (~₹15k–₹30k/mo) with inconsistent visual notes.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                    <span>No night security patrol; vulnerable to wild boar and animal intrusion.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                    <span>Blanket chemical spraying wastes up to 70% of expensive herbicides.</span>
                  </div>
                </div>
              </div>

              {/* AgriSarthi Autonomous Approach Card */}
              <div className="p-6 rounded-2xl bg-emerald-100/60 border border-emerald-500/40 space-y-4 shadow-lg shadow-emerald-500/5">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                  <h4 className="text-sm font-bold text-emerald-700 font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AgriSarthi Robotics Fleet</span>
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-mono">24/7 Proactive AI</span>
                </div>

                <div className="space-y-3 text-xs text-green-800">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Continuous 24/7 patrol with YOLOv8 sub-centimeter edge detection.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Saves up to 60% in scouting labor via automated cloud dashboards.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>PIR motion & thermal sensors trigger instant night intruder alarms.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Root-level capacitive soil probing conserves up to 38% irrigation water.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pilot Farm Impact Numbers Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center font-mono">
          <div className="glass-panel p-6 rounded-2xl border border-green-200">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 block mb-1">38%</span>
            <span className="text-xs text-gray-500">Irrigation Water Conserved</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-green-200">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 block mb-1">&lt;35ms</span>
            <span className="text-xs text-gray-500">YOLOv8 Inference Latency</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-green-200">
            <span className="text-3xl sm:text-4xl font-extrabold text-purple-700 block mb-1">100%</span>
            <span className="text-xs text-gray-500">Nocturnal Perimeter Vigilance</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-green-200">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-700 block mb-1">₹2,00,000</span>
            <span className="text-xs text-gray-500">Techathon 3.0 Grant Won</span>
          </div>
        </div>

      </div>
    </section>
  );
}
