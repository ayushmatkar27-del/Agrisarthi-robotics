import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Maximize2,
  Filter,
  Check,
  X
} from 'lucide-react';

export default function RoversPage({ onOpenDemo, onOpenRoverDeepDive }) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const rovers = [
    {
      id: 'sentinel',
      name: 'AgriSarthi Sentinel 100',
      category: 'scouting',
      categoryLabel: 'Crop Scouting & AI',
      tagline: 'Flagship Autonomous 24/7 Field Scout & Intruder Deterrent',
      status: 'Operational in Pune & Nashik',
      statusColor: 'emerald',
      image: '/images/rover_prototype.jpeg',
      description: 'Traverses furrow beds autonomously with edge YOLOv8 computer vision. Tags leaf blight, monitors soil hydration gradients, and deters night wild boar intrusions with ultrasonic audio beacons.',
      specs: {
        payload: '45 kg',
        speed: '1.8 m/s (6.5 km/h)',
        runtime: '8–10 Hours (Solar Docking ready)',
        aiModel: 'YOLOv8n Nano @ 24 FPS (Edge Pi 4)',
        drivetrain: '4WD Rocker-Bogie with High-Torque DC Geared Motors',
        sensors: 'Capacitive Moisture, DHT22 Temp/Humidity, MQ-2 Gas, HC-SR04 Radar',
        protection: 'IP65 Weather & Mud Ingress Sealed',
        raasPrice: '₹8,500 / Month'
      },
      highlights: [
        'Real-time foliar pest & disease identification (<35ms latency)',
        'Zero soil compaction lightweight articulated chassis',
        'Direct LoRa/GSM automated farmer WhatsApp alerts'
      ]
    },
    {
      id: 'striker',
      name: 'AgriSarthi Striker 600',
      category: 'weeding',
      categoryLabel: 'Micro-Weeding & Spray',
      tagline: 'Precision Spot-Weeding & Targeted Micro-Dose Spraying',
      status: 'Pilot Trials in Maharashtra',
      statusColor: 'blue',
      image: '/images/agrisarthi_hero_rover.jpg',
      description: 'Equipped with a dual-nozzle precision micro-injection sprayer and delta-arm mechanical weeder. Eradicates pigweed and unwanted seedlings with 90% chemical volume reduction.',
      specs: {
        payload: '65 kg (Fluid Tank + Arm)',
        speed: '1.2 m/s (4.3 km/h)',
        runtime: '6–8 Hours continuous spraying',
        aiModel: 'YOLOv8s Weed vs Crop Classifier (94.6% Accuracy)',
        drivetrain: 'Heavy-Duty 4WD Planetary Gearbox with Mud Grippers',
        sensors: 'Sub-canopy RGB-D depth vision, Flowmeter, Pressure telemetry',
        protection: 'IP66 Chemical & High-Pressure Washdown Rated',
        raasPrice: '₹14,500 / Month'
      },
      highlights: [
        'Cuts herbicide consumption by up to 90% via targeted spot pulsing',
        'Down-looking micro-cameras track row centerline within 15mm',
        'Dual 25L interchangeable quick-refill liquid chemical reservoirs'
      ]
    },
    {
      id: 'scout',
      name: 'AgriSarthi Soil Core 1200',
      category: 'soil',
      categoryLabel: 'Soil Coring & Depth',
      tagline: 'Deep Root Hydration & Multi-Spectral Canopy Profiler',
      status: 'Commercial Trials & Pre-Orders',
      statusColor: 'purple',
      image: '/images/agrisarthi_field_rover_center.jpg',
      description: 'Automated hydraulic vertical soil probe that measures root-zone salinity, volumetric moisture at 15cm and 30cm depths, and extends an elevated multispectral NDVI sensor mast.',
      specs: {
        payload: '35 kg (Sensor Boom + Hydraulic Drill)',
        speed: '1.4 m/s (5.0 km/h)',
        runtime: '12 Hours (High-Density LiFePO4 battery pack)',
        aiModel: 'Spatial Interpolation & Irrigation Decision Tree Algorithm',
        drivetrain: '4WD Articulated Skid-Steer with High Ground Clearance (280mm)',
        sensors: 'Vertical Penetrometer, NPK Colorimetric Probe, 5-Band NDVI Mast',
        protection: 'IP65 All-Weather Dust & Rainproof',
        raasPrice: '₹11,000 / Month'
      },
      highlights: [
        'Automated 30cm hydraulic depth soil probe sampling every 50 meters',
        'Generates thermal canopy NDVI heatmaps for drip irrigation balancing',
        'Conserves up to 38% irrigation water across orchards and vineyards'
      ]
    }
  ];

  const filteredRovers = selectedFilter === 'all' 
    ? rovers 
    : rovers.filter(r => r.category === selectedFilter);

  return (
    <div className="pt-20 min-h-screen bg-[#f0f6f0]">
      {/* Subnav Sticky Anchor Bar */}
      <div className="bg-[#edf7ed]/90 border-b border-green-200/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
              AUTONOMOUS FLEET CATALOG • 3 FIELD PLATFORMS
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a
              href="#comparison-matrix"
              className="text-stone-700 hover:text-emerald-800 font-mono font-bold hidden sm:inline-flex items-center gap-1 transition"
            >
              <span>Compare Full Specs Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onOpenDemo('sentinel')}
              className="px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition cursor-pointer shadow-sm text-xs font-mono"
            >
              Book Field Pilot
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-[#eaf4ea] to-[#f0f6f0] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-mono font-bold mb-4">
            <Bot className="w-4 h-4 text-emerald-700" />
            <span>COMMERCIAL FIELD ROBOTICS PLATFORMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight mb-4 font-display">
            Built for Extreme Soil & <span className="text-emerald-700">All-Weather Autonomy</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            AgriSarthi rovers are engineered to replace dangerous manual labor, conserve costly farm inputs, and safeguard smallholder crops day and night.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All Fleet Models (3)' },
              { id: 'scouting', label: 'Crop Scouting & AI' },
              { id: 'weeding', label: 'Micro-Weeding & Spray' },
              { id: 'soil', label: 'Soil Coring & Depth' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rovers Detailed Showcase Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredRovers.map((rover, idx) => (
          <div 
            key={rover.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Image & Media (Col-Span 5) */}
              <div className="lg:col-span-5 relative bg-stone-100 p-6 flex flex-col justify-between overflow-hidden">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-200 shadow-inner">
                  <img 
                    src={rover.image} 
                    alt={rover.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white font-mono text-[10px] font-bold tracking-wider">
                    MODEL: AS-{rover.id.toUpperCase()}-2026
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-mono font-bold text-stone-800">{rover.status}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rover.specs.raasPrice}
                  </span>
                </div>
              </div>

              {/* Right Column: Specs, Details & Actions (Col-Span 7) */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {rover.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-stone-500 font-semibold">
                      IP65 ALL-WEATHER CHASSIS
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-1 mb-2 font-display">
                    {rover.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-3">
                    {rover.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {rover.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    {rover.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* 4-Stat Metric Box */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#f7fcf7] border border-emerald-100 font-mono text-xs mb-6">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block">Payload</span>
                      <strong className="text-stone-900 text-sm">{rover.specs.payload}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block">Max Speed</span>
                      <strong className="text-stone-900 text-sm">{rover.specs.speed}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block">Battery Runtime</span>
                      <strong className="text-stone-900 text-sm">{rover.specs.runtime}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block">AI Edge Vision</span>
                      <strong className="text-emerald-700 text-sm">YOLOv8 Active</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenRoverDeepDive && onOpenRoverDeepDive(rover.id)}
                    className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open Technical Blueprint & Slides</span>
                  </button>

                  <button
                    onClick={() => onOpenDemo(rover.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Deploy on Farm (RaaS Pilot)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate('/mission-control')}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-mono font-bold border border-stone-200 transition"
                  >
                    Launch Live HUD
                  </button>
                </div>

              </div>

            </div>
          </div>
        ))}
      </section>

      {/* Side-by-Side Technical Comparison Matrix Table */}
      <section id="comparison-matrix" className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              CROSS-FLEET HARDWARE BENCHMARKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 mt-3 mb-2 font-display">
              Technical Comparison Matrix
            </h2>
            <p className="text-sm text-stone-600">
              Compare robotics capabilities across scouting, mechanical weeding, and deep-soil diagnostics.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-stone-200 shadow-md">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white font-mono uppercase text-[11px] tracking-wider">
                  <th className="p-4 sm:p-5 font-bold w-1/4">Hardware Specification</th>
                  <th className="p-4 sm:p-5 font-bold text-emerald-400 w-1/4">Sentinel 100 (Scout)</th>
                  <th className="p-4 sm:p-5 font-bold text-blue-400 w-1/4">Striker 600 (Weeder)</th>
                  <th className="p-4 sm:p-5 font-bold text-purple-400 w-1/4">Soil Core 1200 (Hydraulic)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-4 font-bold font-mono text-stone-950">Primary Agricultural Role</td>
                  <td className="p-4">24/7 Crop Blight & Pest Patrol</td>
                  <td className="p-4">Micro-Spot Weeding & Chemical Spray</td>
                  <td className="p-4">Hydraulic Soil Depth & NDVI Heatmaps</td>
                </tr>
                <tr className="hover:bg-stone-50 transition bg-[#fafcfa]">
                  <td className="p-4 font-bold font-mono text-stone-950">Drivetrain Kinematics</td>
                  <td className="p-4">Articulated 4WD Rocker-Bogie</td>
                  <td className="p-4">High-Torque Planetary Planetary Gear 4WD</td>
                  <td className="p-4">High-Clearance Skid-Steer (280mm)</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-4 font-bold font-mono text-stone-950">Edge AI Processing</td>
                  <td className="p-4 text-emerald-800 font-bold">Raspberry Pi 4 + YOLOv8n (24 FPS)</td>
                  <td className="p-4 text-emerald-800 font-bold">Pi 4 + Coral TPU (30 FPS Weed ID)</td>
                  <td className="p-4 text-emerald-800 font-bold">Pi 4 Edge Interpolator</td>
                </tr>
                <tr className="hover:bg-stone-50 transition bg-[#fafcfa]">
                  <td className="p-4 font-bold font-mono text-stone-950">Maximum Payload</td>
                  <td className="p-4 font-mono font-bold">45 kg</td>
                  <td className="p-4 font-mono font-bold">65 kg (Fluid tank + Actuators)</td>
                  <td className="p-4 font-mono font-bold">35 kg (Hydraulic Core Rig)</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-4 font-bold font-mono text-stone-950">Battery & Solar Dock</td>
                  <td className="p-4 font-mono">8–10h (Solar Swappable)</td>
                  <td className="p-4 font-mono">6–8h (Quick-Exchange Battery)</td>
                  <td className="p-4 font-mono">12h (High-Capacity LiFePO4)</td>
                </tr>
                <tr className="hover:bg-stone-50 transition bg-[#fafcfa]">
                  <td className="p-4 font-bold font-mono text-stone-950">Soil Probing Depth</td>
                  <td className="p-4">Surface to 10 cm</td>
                  <td className="p-4">Visual Root Inspection</td>
                  <td className="p-4 font-bold text-emerald-800">Hydraulic Core: 0 to 30 cm depth</td>
                </tr>
                <tr className="hover:bg-stone-50 transition">
                  <td className="p-4 font-bold font-mono text-stone-950">Weather Ingress Rating</td>
                  <td className="p-4 font-mono">IP65 (Rain & Mud Sealed)</td>
                  <td className="p-4 font-mono">IP66 (Chemical Washdown)</td>
                  <td className="p-4 font-mono">IP65 (Dust & Splash Proof)</td>
                </tr>
                <tr className="hover:bg-stone-50 transition bg-[#fafcfa]">
                  <td className="p-4 font-bold font-mono text-stone-950">RaaS Monthly Subscription</td>
                  <td className="p-4 font-mono font-bold text-emerald-800">₹8,500 / Month</td>
                  <td className="p-4 font-mono font-bold text-emerald-800">₹14,500 / Month</td>
                  <td className="p-4 font-mono font-bold text-emerald-800">₹11,000 / Month</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Bottom Cross-Navigation Banner */}
      <div className="py-14 bg-[#e6f4e6] border-t border-green-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-green-950 font-display">
            Need a Custom Implement or Sensor Payload for Your Crops?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Our modular chassis architecture supports custom optical weed burners, pneumatic micro-injectors, and LoRa mesh relays tailored specifically to grape trellises, sugarcane furrows, or cotton rows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onOpenDemo('custom')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-mono font-bold shadow-md cursor-pointer transition"
            >
              Request Custom R&D Pilot →
            </button>
            <button
              onClick={() => navigate('/services#roi-calc')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-green-950 text-xs sm:text-sm font-mono font-bold border border-green-300 shadow-sm cursor-pointer transition"
            >
              Calculate Farm Savings & ROI →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
