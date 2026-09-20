import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Droplets, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function RoiCalculator({ onOpenDemo }) {
  const [acres, setAcres] = useState(15);
  const [cropType, setCropType] = useState('horticulture'); // 'horticulture', 'grains', 'cash', 'polyhouse'
  const [laborCostPerMonth, setLaborCostPerMonth] = useState(18000);

  // Crop multiplier settings
  const cropMultipliers = {
    horticulture: { label: 'Horticulture & Fruits', pestRisk: 1.4, waterSensitivity: 1.3 },
    grains: { label: 'Grains & Cereals (Wheat/Rice)', pestRisk: 1.0, waterSensitivity: 1.1 },
    cash: { label: 'Cash Crops (Cotton/Sugarcane)', pestRisk: 1.5, waterSensitivity: 1.4 },
    polyhouse: { label: 'High-Tech Polyhouse / Flowers', pestRisk: 1.8, waterSensitivity: 1.6 }
  };

  const currentCrop = cropMultipliers[cropType];

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
  const paybackMonths = ((annualRaasCost / totalAnnualSavings) * 12).toFixed(1);

  return (
    <section id="roi-calc" className="py-24 bg-[#faf6ee] text-stone-900 relative overflow-hidden border-t border-amber-200/80">
      
      {/* Background warm solar glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/10 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            <span>FARM SAVINGS & VALUE ENGINE</span>
          </div>
          <h2 className="heading-otto text-3xl sm:text-4xl md:text-5xl text-stone-950 tracking-tight mb-4">
            Interactive Farm <span className="text-gradient-emerald">ROI & Payback Calculator</span>
          </h2>
          <p className="text-base text-stone-600">
            Estimate how much your farm or agricultural estate saves annually through early pest alerts, precision irrigation scheduling, and reduced manual scout labor.
          </p>
        </div>

        {/* Master Calculator Panel */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Inputs Column (Col-Span 6) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Farm Size (Acres) */}
              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-gray-500">Farm Acreage Size:</span>
                  <strong className="text-emerald-700 text-base font-bold">{acres} Acres</strong>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="150"
                  step="1"
                  value={acres}
                  onChange={(e) => setAcres(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-50 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>2 Acres (Smallholder)</span>
                  <span>75 Acres</span>
                  <span>150+ Acres (Estate)</span>
                </div>
              </div>

              {/* Input 2: Crop Classification */}
              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200">
                <label className="text-xs font-mono text-gray-500 block mb-2">
                  Primary Crop Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(cropMultipliers).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setCropType(key)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition border ${
                        cropType === key 
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm' 
                          : 'bg-white text-gray-600 border-green-200 hover:bg-green-100'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Current Monthly Labor Cost */}
              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-gray-500">Monthly Manual Labor Cost:</span>
                  <strong className="text-green-800 text-sm font-bold">₹{laborCostPerMonth.toLocaleString()} / mo</strong>
                </div>
                <input 
                  type="range"
                  min="5000"
                  max="60000"
                  step="1000"
                  value={laborCostPerMonth}
                  onChange={(e) => setLaborCostPerMonth(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-50 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>₹5,000</span>
                  <span>₹30,000</span>
                  <span>₹60,000+</span>
                </div>
              </div>

            </div>

            {/* Right Output Column: Instant Metrics Card (Col-Span 6) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Grand Total Estimated Net Savings Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl">
                <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider block mb-1">
                  Estimated Total Annual Savings
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-green-950 font-mono mb-1">
                  ₹{totalAnnualSavings.toLocaleString()} <span className="text-xs text-gray-500 font-normal">/ Year</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>Estimated Payback Period: <strong className="font-mono text-emerald-200">{paybackMonths} Months</strong></span>
                </div>
              </div>

              {/* Detailed Breakdown Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                
                <div className="p-3.5 rounded-xl bg-white/80 border border-green-200">
                  <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-700" />
                    <span>Water Conserved:</span>
                  </div>
                  <div className="text-sm font-bold text-blue-700">
                    {waterSavingsPerYear.toLocaleString()} L
                  </div>
                  <span className="text-[10px] text-gray-400 block">~₹{waterCostSaved.toLocaleString()} Saved</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 border border-green-200">
                  <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>Pesticide Reduction:</span>
                  </div>
                  <div className="text-sm font-bold text-teal-700">
                    ₹{chemicalSavings.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-gray-400 block">Micro-targeting</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 border border-green-200">
                  <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-purple-700" />
                    <span>Scout Labor Hours:</span>
                  </div>
                  <div className="text-sm font-bold text-purple-700">
                    {(acres * 24).toLocaleString()} Hrs
                  </div>
                  <span className="text-[10px] text-gray-400 block">Automated 24/7</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 border border-green-200">
                  <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Crop Loss Prevented:</span>
                  </div>
                  <div className="text-sm font-bold text-amber-700">
                    ₹{diseaseLossPrevented.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-gray-400 block">Early AI Detection</span>
                </div>

              </div>

              {/* Call to action button */}
              <button
                onClick={() => onOpenDemo()}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Lock In Estimated Savings — Book Pilot</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
