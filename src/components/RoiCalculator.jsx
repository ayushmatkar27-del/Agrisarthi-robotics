import React, { useState } from 'react';
import { 
  Calculator, 
  Droplets, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function RoiCalculator({ onOpenDemo }) {
  const [acres, setAcres] = useState(15);
  const [cropType, setCropType] = useState('horticulture');
  const [laborCostPerMonth, setLaborCostPerMonth] = useState(20000);
  const [activePreset, setActivePreset] = useState('grapes');

  const INDIAN_CROP_PRESETS = [
    { id: 'grapes', label: '🍇 Nashik Grapes', acres: 15, crop: 'horticulture', labor: 22000, desc: 'Canopy foliar blight & fungicide optimization' },
    { id: 'sugarcane', label: '🎋 Kolhapur Sugarcane', acres: 25, crop: 'cash', labor: 18000, desc: 'Furrow moisture & flood irrigation balancing' },
    { id: 'cotton', label: '☁️ Vidarbha Cotton', acres: 20, crop: 'cash', labor: 16000, desc: 'Bollworm pest early warning & weed scouting' },
    { id: 'polyhouse', label: '🍓 Polyhouse / Berries', acres: 6, crop: 'polyhouse', labor: 26000, desc: 'High-density micro-climate & humidity control' },
    { id: 'wheat', label: '🌾 Punjab Wheat / Paddy', acres: 35, crop: 'grains', labor: 15000, desc: 'Broad-acre moisture & nitrogen indexing' }
  ];

  const handleApplyPreset = (preset) => {
    setActivePreset(preset.id);
    setAcres(preset.acres);
    setCropType(preset.crop);
    setLaborCostPerMonth(preset.labor);
  };

  // Crop multiplier settings
  const cropMultipliers = {
    horticulture: { label: 'Horticulture & Fruits', pestRisk: 1.4, waterSensitivity: 1.3 },
    grains: { label: 'Grains & Cereals (Wheat/Rice)', pestRisk: 1.0, waterSensitivity: 1.1 },
    cash: { label: 'Cash Crops (Cotton/Sugarcane)', pestRisk: 1.5, waterSensitivity: 1.4 },
    polyhouse: { label: 'High-Tech Polyhouse / Flowers', pestRisk: 1.8, waterSensitivity: 1.6 }
  };

  const currentCrop = cropMultipliers[cropType] || cropMultipliers.horticulture;

  // Calculated ROI values
  const waterSavingsPerYear = Math.round(acres * 32000 * currentCrop.waterSensitivity); // Liters
  const waterCostSaved = Math.round(acres * 4500 * currentCrop.waterSensitivity); // Rupees
  const chemicalSavings = Math.round(acres * 6200 * currentCrop.pestRisk); // Rupees
  const laborSavedAnnual = Math.round(laborCostPerMonth * 12 * 0.45); // 45% manual scout labor reduction
  const diseaseLossPrevented = Math.round(acres * 12000 * currentCrop.pestRisk); // rupees saved from early detection

  const totalAnnualSavings = waterCostSaved + chemicalSavings + laborSavedAnnual + diseaseLossPrevented;
  
  // Approximate RaaS Cost for this acreage
  const annualRaasCost = Math.round(acres * 499 * 12);
  const netAnnualProfit = Math.max(0, totalAnnualSavings - annualRaasCost);
  const paybackMonths = Math.max(1.8, Math.min(6.5, parseFloat(((annualRaasCost / Math.max(totalAnnualSavings, 1)) * 12).toFixed(1))));

  return (
    <section id="roi-calc" className="py-24 bg-[#faf6ee] text-stone-900 relative overflow-hidden border-t border-amber-200/80">
      
      {/* Background warm solar glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/10 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-semibold mb-4 font-mono">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            <span>FARM SAVINGS & VALUE ENGINE</span>
          </div>
          <h2 className="heading-otto text-3xl sm:text-4xl md:text-5xl text-stone-950 tracking-tight mb-4">
            Interactive Farm <span className="text-gradient-emerald">ROI & Payback Calculator</span>
          </h2>
          <p className="text-base text-stone-600">
            Estimate how much your farm or agricultural estate saves annually through early pest alerts, precision irrigation scheduling, and automated field scouting.
          </p>
        </div>

        {/* Quick Regional Indian Farm Presets */}
        <div className="max-w-5xl mx-auto mb-8">
          <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider block mb-3 text-center sm:text-left">
            ⚡ Quick-Load Regional Farm Benchmarks:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {INDIAN_CROP_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                  activePreset === preset.id
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-[1.02]'
                    : 'bg-white text-stone-800 hover:bg-stone-50 border-stone-200'
                }`}
              >
                <div className="text-xs font-bold font-sans">{preset.label}</div>
                <div className={`text-[10px] font-mono mt-1 ${activePreset === preset.id ? 'text-emerald-100' : 'text-stone-500'}`}>
                  {preset.acres} Acres • {preset.desc.slice(0, 24)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Master Calculator Panel */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto bg-white/90 border border-stone-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Inputs Column (Col-Span 6) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Farm Size (Acres) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-stone-600 font-bold">Farm Acreage Size:</span>
                  <strong className="text-emerald-700 text-lg font-bold">{acres} Acres</strong>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="150"
                  step="1"
                  value={acres}
                  onChange={(e) => {
                    setAcres(parseInt(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full h-2 bg-stone-200 rounded-lg cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1.5">
                  <span>2 Acres (Smallholder)</span>
                  <span>75 Acres</span>
                  <span>150+ Acres (Estate)</span>
                </div>
              </div>

              {/* Input 2: Crop Classification */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="text-xs font-mono text-stone-600 font-bold block mb-2">
                  Primary Crop Category:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(cropMultipliers).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setCropType(key);
                        setActivePreset('');
                      }}
                      className={`p-3 rounded-xl text-xs font-medium text-left transition border cursor-pointer ${
                        cropType === key 
                          ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm' 
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Current Monthly Labor Cost */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-stone-600 font-bold">Monthly Manual Scouting Labor Expense:</span>
                  <strong className="text-stone-900 text-base font-bold">₹{laborCostPerMonth.toLocaleString('en-IN')} / mo</strong>
                </div>
                <input 
                  type="range"
                  min="5000"
                  max="60000"
                  step="1000"
                  value={laborCostPerMonth}
                  onChange={(e) => {
                    setLaborCostPerMonth(parseInt(e.target.value));
                    setActivePreset('');
                  }}
                  className="w-full h-2 bg-stone-200 rounded-lg cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1.5">
                  <span>₹5,000 (1 Worker)</span>
                  <span>₹30,000</span>
                  <span>₹60,000+ (Full Crew)</span>
                </div>
              </div>

            </div>

            {/* Right Output Column: Projected Savings & Payback (Col-Span 6) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0c1a11] to-[#07130b] text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6">
              
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider uppercase block mb-1">
                  PROJECTED ANNUAL FARM SAVINGS
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                    ₹{totalAnnualSavings.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">/ Year</span>
                </div>
                <p className="text-xs text-emerald-300/80 mt-1 font-sans">
                  Net Estimated Farm Profit Boost: <strong className="text-white">₹{netAnnualProfit.toLocaleString('en-IN')}</strong> after RaaS fees.
                </p>
              </div>

              {/* Breakdown Metric Bars */}
              <div className="space-y-3 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-300">Prevented Crop Blight & Foliar Loss:</span>
                  <strong className="text-emerald-400">₹{diseaseLossPrevented.toLocaleString('en-IN')}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-300">Targeted Chemical & Pesticide Savings:</span>
                  <strong className="text-emerald-400">₹{chemicalSavings.toLocaleString('en-IN')}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-300">Scout Labor Hours Automated (45%):</span>
                  <strong className="text-emerald-400">₹{laborSavedAnnual.toLocaleString('en-IN')}</strong>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-300">Irrigation Electricity & Water Pump Savings:</span>
                  <strong className="text-emerald-400">₹{waterCostSaved.toLocaleString('en-IN')} ({waterSavingsPerYear.toLocaleString('en-IN')} L)</strong>
                </div>
              </div>

              {/* Payback Period Highlight Pill */}
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-300 block">RaaS Investment Payback Period:</span>
                    <strong className="text-base text-emerald-300 font-mono font-bold">
                      {paybackMonths} Months
                    </strong>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-400 text-slate-950 font-bold">
                  HIGH ROI
                </span>
              </div>

              {/* CTA Action */}
              <button
                onClick={() => onOpenDemo(cropType)}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm font-mono tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/25"
              >
                <span>DEPLOY PILOT FOR {acres} ACRES</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
