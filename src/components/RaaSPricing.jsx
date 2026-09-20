import React, { useState } from 'react';
import { RAAS_PLANS } from '../data/fleetData';
import { 
  Bot, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  TrendingDown,
  Wrench,
  Cloud
} from 'lucide-react';

export default function RaaSPricing({ onOpenDemo }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'seasonal'

  return (
    <section id="raas" className="py-24 bg-[#edf7ed] relative overflow-hidden border-t border-green-100">
      
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>ROBOTS AS A SERVICE (RaaS)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight mb-4">
            Deploy Robotics with <span className="text-gradient-emerald">Zero CapEx</span>
          </h2>
          <p className="text-base text-gray-500">
            Why spend lakhs on industrial machinery? Subscribe to AgriSarthi on an affordable monthly or seasonal plan. Hardware, autonomous maintenance, sensor repairs, and cloud intelligence included.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-white border border-green-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition ${
                billingCycle === 'monthly' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-gray-500 hover:text-green-950'
              }`}
            >
              Monthly Subscription
            </button>
            <button
              onClick={() => setBillingCycle('seasonal')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                billingCycle === 'seasonal' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-gray-500 hover:text-green-950'
              }`}
            >
              <span>Seasonal (Harvest/Sowing)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-700 font-bold">
                Save 18%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {RAAS_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl flex flex-col justify-between p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'glass-panel-glow border-emerald-500/40 bg-white/90 shadow-2xl shadow-emerald-500/10 md:-translate-y-2'
                  : 'glass-panel border-green-200/80 hover:border-green-300 bg-green-50/60'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold font-mono text-emerald-700 uppercase tracking-wider block mb-1">
                    {plan.target}
                  </span>
                  <h3 className="text-2xl font-bold text-green-950 mb-2">{plan.name}</h3>
                </div>

                <div className="mb-6 pb-6 border-b border-green-200">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-green-950 font-mono">{plan.price}</span>
                    <span className="text-gray-500 text-sm font-medium">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Includes rover hardware, battery swaps, and cloud telemetry.</p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-gray-500 font-mono uppercase">What’s Included:</div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onOpenDemo(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlight
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-green-50 hover:bg-slate-700 text-green-950 border border-green-300'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Why RaaS Benefit Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-green-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-700 shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-green-950 mb-1">Zero Capital Expenditure</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Avoid hefty ₹5L–₹15L tractor/drone purchase costs. Pay only for active monitoring seasons.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-700 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-green-950 mb-1">Free Maintenance & Repairs</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Damaged sensor or motor? Our field engineers replace parts on-farm within 24 hours at no extra cost.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-700 shrink-0">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-green-950 mb-1">Continuous AI OTA Updates</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your rover gets smarter every month with over-the-air YOLOv8 model updates for new crop diseases.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
