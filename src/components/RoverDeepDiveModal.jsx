import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Eye, 
  Droplets, 
  Radio, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  ExternalLink,
  Bot,
  Sparkles,
  ArrowRight,
  BatteryCharging,
  Gauge
} from 'lucide-react';

export default function RoverDeepDiveModal({ isOpen, onClose, onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedAccordion, setExpandedAccordion] = useState('scouting');
  const [selectedSlide, setSelectedSlide] = useState(1);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accordions = [
    {
      id: 'scouting',
      title: 'Autonomous 24/7 Field Scouting & Edge YOLOv8 Vision',
      subtitle: 'Continuous crop surveillance without human intervention',
      icon: Eye,
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            AgriSarthi traverses crop furrows autonomously using an onboard Raspberry Pi 4 running edge-optimized <strong className="text-emerald-700">YOLOv8n (Nano)</strong> and OpenCV path-following algorithms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white/90 border border-green-200">
              <span className="text-emerald-700 font-bold block text-xs uppercase font-mono">Real-Time Detections:</span>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                <li>Intruders & unauthorized night entries</li>
                <li>Stray cattle, wild boars & crop grazers</li>
                <li>Visible early-stage foliar blight & leaf spot</li>
                <li>Dynamic ground obstacles & ditch drop-offs</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-white/90 border border-green-200">
              <span className="text-blue-700 font-bold block text-xs uppercase font-mono">Edge Processing:</span>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1">
                <li>24+ FPS on-device inference via Pi 4</li>
                <li>Zero cloud latency for collision emergency braking</li>
                <li>Offline logging when GSM signal drops in remote rural areas</li>
                <li>Auto-syncs detections once 4G/Wi-Fi reconnects</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'soil',
      title: 'Multi-Depth Soil Hydration & Micro-Climate Diagnostics',
      subtitle: 'Precision irrigation advice preventing water stress & overwatering',
      icon: Droplets,
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Equipped with industrial corrosion-resistant capacitive soil probes and atmospheric sensors, the rover maps moisture gradients across zones A through D.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-white/80 border border-green-200">
              <strong className="text-green-900 block mb-1">Capacitive Moisture:</strong>
              <p className="text-gray-500">Frequency-based volumetric water content. Immune to soil salinity corrosion.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/80 border border-green-200">
              <strong className="text-green-900 block mb-1">DHT22 Micro-Climate:</strong>
              <p className="text-gray-500">Ambient temperature (-40 to 80°C) and relative humidity (0–100% RH).</p>
            </div>
            <div className="p-3 rounded-xl bg-white/80 border border-green-200">
              <strong className="text-green-900 block mb-1">Gas & Anomaly (MQ-2):</strong>
              <p className="text-gray-500">Detects greenhouse methane leaks, decomposing biomass smoke, and combustion hazards.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'weeding',
      title: 'Precision Micro-Targeting & Weed Neutralization (Earth Rover Style)',
      subtitle: 'Zero herbicide chemical drift & pinpoint elimination',
      icon: Zap,
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Following modern sustainable robotics principles like Earth Rover's CLAWS Lightweeder, AgriSarthi reduces toxic chemical usage by up to <strong className="text-emerald-700">80%</strong> through micro-targeted actuator modules.
          </p>
          <div className="p-4 rounded-xl bg-emerald-100/50 border border-emerald-500/30 text-xs leading-relaxed">
            <div className="font-bold text-emerald-700 mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Targeted Nozzle & Non-Contact Elimination</span>
            </div>
            Rather than blanket spraying acres of crops, the computer vision classifier pinpoints weed meristems with sub-centimeter accuracy, dispensing micro-droplets directly onto offending foliage or activating thermal weed coils.
          </div>
        </div>
      )
    },
    {
      id: 'emissions',
      title: 'Zero Diesel Emissions & Soil Structure Preservation',
      subtitle: 'Lightweight footprint preventing heavy tractor soil compaction',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Conventional diesel tractors weigh upwards of 3,000 kg, severely compacting agricultural topsoil, suffocating earthworms, and impeding root aeration.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/90 border border-green-200">
              <span className="text-emerald-700 font-bold block mb-1">Ultra-Lightweight (~4.2 kg):</span>
              <p className="text-gray-500">Exerts less than 0.15 kg/cm² ground pressure. Leaves soil biology completely undisturbed and aerated.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/90 border border-green-200">
              <span className="text-emerald-700 font-bold block mb-1">100% Electric & Solar Ready:</span>
              <p className="text-gray-500">Powered by 12V LiFePO4 cells with smart BMS. Zero GHG exhaust emissions, odorless and quiet for livestock.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const techSpecs = [
    { category: 'Computing Architecture', label: 'Primary Brain (High-Level)', val: 'Raspberry Pi 4 Model B (4GB LPDDR4)' },
    { category: 'Computing Architecture', label: 'Co-Processor (Low-Level)', val: 'ESP32 Dual-Core 240MHz 32-bit MCU' },
    { category: 'Computing Architecture', label: 'Edge Vision Inferencing', val: 'YOLOv8n (Nano) quantized model @ 24.2 FPS' },
    { category: 'Drivetrain & Chassis', label: 'Chassis Type', val: '4WD Rocker-Bogie All-Terrain Suspension' },
    { category: 'Drivetrain & Chassis', label: 'Motors & Drive', val: '4x High-Torque Metal Geared DC Motors' },
    { category: 'Drivetrain & Chassis', label: 'Motor Driver', val: 'L298N / BTS7960 Dual H-Bridge Modules' },
    { category: 'Drivetrain & Chassis', label: 'Ground Clearance', val: '120 mm (Furrow & Wet Soil Clearance)' },
    { category: 'Drivetrain & Chassis', label: 'Chassis Dimensions', val: '460 mm x 380 mm x 290 mm' },
    { category: 'Power & Battery', label: 'Battery Chemistry', val: '12V 6.0Ah LiFePO4 / Li-Ion with 3S Smart BMS' },
    { category: 'Power & Battery', label: 'Continuous Runtime', val: '8 – 10 Hours on single charge' },
    { category: 'Power & Battery', label: 'Solar Charging Option', val: '25W Foldable Monocrystalline Trickle Panel' },
    { category: 'Sensors & Telemetry', label: 'Soil Hydration', val: 'Corrosion-Proof Capacitive Soil Moisture Sensor' },
    { category: 'Sensors & Telemetry', label: 'Micro-Climate', val: 'DHT22 Digital Temperature & Humidity' },
    { category: 'Sensors & Telemetry', label: 'Hazard & Gas', val: 'MQ-2 Gas / Smoke / Methane Sensor' },
    { category: 'Sensors & Telemetry', label: 'Acoustic Monitor', val: 'High-Sensitivity Decibel Sound Anomaly Sensor' },
    { category: 'Sensors & Telemetry', label: 'Obstacle Avoidance', val: '3x HC-SR04 Ultrasonic Array (2cm – 400cm range)' },
    { category: 'Sensors & Telemetry', label: 'Camera & Optics', val: 'Pi Camera V2 / HD USB 120° Wide FOV' },
    { category: 'Connectivity', label: 'Long-Range Telemetry', val: 'LoRa SX1278 (433MHz) Mesh Network' },
    { category: 'Connectivity', label: 'Cloud Uplink', val: 'SIM7600 4G LTE High-Speed Uplink' },
    { category: 'Connectivity', label: 'Local Control', val: 'Direct Wi-Fi 802.11 b/g/n Access Point Mode' }
  ];

  const bomItems = [
    { item: 'Raspberry Pi 4 (4GB) + Heatsink Fan', cost: '₹4,500', note: 'Runs YOLOv8 & OpenCV' },
    { item: 'ESP32 Dual-Core Dev Board', cost: '₹450', note: 'Motor control & sensor loops' },
    { item: '4WD Rocker-Bogie Chassis & Wheels', cost: '₹1,800', note: 'Rugged all-terrain acrylic/alloy' },
    { item: '4x High-Torque Geared DC Motors + Driver', cost: '₹1,200', note: 'L298N dual H-bridge module' },
    { item: '12V Rechargeable Li-ion Battery & BMS', cost: '₹1,600', note: 'Overcharge & low-voltage protection' },
    { item: 'Sensor Suite (Soil, DHT22, MQ-2, Ultrasonic)', cost: '₹1,150', note: 'Calibrated analog & digital sensors' },
    { item: 'HD Camera Rig + Pan-Tilt Mount', cost: '₹850', note: 'Wide-angle lens for crop rows' },
    { item: 'Wiring, Connectors, Step-Down Buck Converters', cost: '₹450', note: '12V to 5V 3A stable rails' },
    { item: 'TOTAL PROTOTYPE HARDWARE BOM', cost: '₹12,000', note: '🏆 Lowest cost smart farm rover in India', highlight: true }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-green-100/60 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#f0f9f0] border border-green-300/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-green-200 bg-[#edf7ed] flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-700">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-green-950 font-mono">AgriSarthi Sentinel V1</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 border border-emerald-500/30">
                  FLAGSHIP PROTOTYPE
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-700 border border-amber-500/30">
                  🏆 Techathon 3.0 Winner
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Autonomous Smart Farm Monitoring, YOLOv8 Vision & Multi-Sensor Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDemo && onOpenDemo('sentinel');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Field Demo</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-green-100 text-gray-500 hover:text-green-950 border border-green-200 transition cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 border-b border-green-200/80 bg-[#e8f5e8] flex overflow-x-auto gap-2 py-2.5 scrollbar-thin">
          {[
            { id: 'overview', label: 'Hardware & Prototype', icon: Bot },
            { id: 'capabilities', label: 'Features & Capabilities', icon: Layers },
            { id: 'specs', label: 'Full Tech Specs Sheet', icon: Cpu },
            { id: 'economics', label: '₹12k BOM & Economics', icon: TrendingUp },
            { id: 'schematics', label: 'Slide Deck Schematics', icon: ExternalLink }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40'
                    : 'text-gray-500 hover:text-green-800 hover:bg-green-50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Modal Content Container */}
        <div className="p-6 overflow-y-auto space-y-8 text-green-800 flex-1 scrollbar-thin">
          
          {/* TAB 1: OVERVIEW & REAL PROTOTYPE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Featured Real Hardware Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl bg-white/70 border border-green-200 p-5">
                
                {/* Real Rover Photo with Overlays */}
                <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-emerald-500/30 bg-green-50 group shadow-xl">
                  <img
                    src="/images/rover_prototype.jpeg"
                    alt="AgriSarthi Smart Farm Monitoring Rover Prototype"
                    className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/30 to-transparent pointer-events-none"></div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-100/60 border border-emerald-500/40 text-emerald-700 font-mono text-[11px] backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>ACTUAL LAB PROTOTYPE V1</span>
                  </div>

                  {/* Floating Sensor Callouts */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="px-2 py-1 rounded bg-white/90 border border-green-300 text-green-800 backdrop-blur-md">
                      📷 Pi Camera Rig
                    </span>
                    <span className="px-2 py-1 rounded bg-white/90 border border-green-300 text-green-800 backdrop-blur-md">
                      📡 HC-SR04 Ultrasonic
                    </span>
                    <span className="px-2 py-1 rounded bg-white/90 border border-green-300 text-green-800 backdrop-blur-md">
                      ⚡ ESP32 + Pi 4 Dual Brain
                    </span>
                    <span className="px-2 py-1 rounded bg-white/90 border border-green-300 text-green-800 backdrop-blur-md">
                      🚜 4WD Rocker-Bogie
                    </span>
                  </div>
                </div>

                {/* Hardware Context & Key Attributes */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="text-emerald-700 font-mono text-xs font-semibold uppercase tracking-wider">
                      Physical Architecture
                    </span>
                    <h3 className="text-2xl font-bold text-green-950 font-mono mt-1">
                      AgriSarthi Sentinel Prototype
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      Constructed and tested at the <strong>JSPM Narhe Technical Campus Robotics Lab</strong>. Specifically engineered for rugged agricultural topography, wet furrows, and uneven soil profiles while keeping the bill-of-materials accessible for everyday Indian farming communities.
                    </p>
                  </div>

                  {/* Highlights Metric Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-green-100/50 border border-green-200">
                      <span className="text-[10px] uppercase font-mono text-gray-500 block">Chassis Architecture</span>
                      <span className="text-sm font-bold text-green-900">4WD High-Torque Geared</span>
                      <span className="text-[10px] text-emerald-700 block mt-0.5">120mm ground clearance</span>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100/50 border border-green-200">
                      <span className="text-[10px] uppercase font-mono text-gray-500 block">Dual Microcontroller</span>
                      <span className="text-sm font-bold text-green-900">ESP32 + Pi 4</span>
                      <span className="text-[10px] text-blue-700 block mt-0.5">Low-latency task split</span>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100/50 border border-green-200">
                      <span className="text-[10px] uppercase font-mono text-gray-500 block">Battery Endurance</span>
                      <span className="text-sm font-bold text-emerald-700">8 – 10 Hours Active</span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">12V LiFePO4 with BMS</span>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100/50 border border-green-200">
                      <span className="text-[10px] uppercase font-mono text-gray-500 block">Edge AI Inferencing</span>
                      <span className="text-sm font-bold text-purple-700">24+ FPS YOLOv8</span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">Zero cloud latency</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('specs')}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-700 transition"
                    >
                      <span>View Full Technical Specification Sheet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Challenges and How AgriSarthi Solves Them (Direct from SIH & Techathon deck) */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-green-950 font-mono flex items-center gap-2">
                  <span>Field Challenges & AgriSarthi Solutions</span>
                  <span className="text-xs font-normal text-gray-500">— Proven in testing</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { ch: 'Uneven terrain & mud furrows', sol: 'Robust 4WD Rocker-Bogie chassis & adaptive motor torque' },
                    { ch: 'Poor rural 4G connectivity', sol: 'Onboard Edge AI processing & offline buffering with local Wi-Fi fallback' },
                    { ch: 'Variable ambient lighting', sol: 'Dynamic image preprocessing & fine-tuned multi-condition YOLO models' },
                    { ch: 'Sensor noise & mud splatter', sol: 'Multi-sensor fusion, capacitive shielding & median filtering' },
                    { ch: 'Battery limitations in large fields', sol: 'Power optimization, automated return-to-dock & solar trickle charging' },
                    { ch: 'Dust & moisture exposure', sol: 'Rugged sealed enclosure protecting Pi 4, ESP32, and motor drivers' }
                  ].map((pair, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/80 border border-green-200 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-700 shrink-0 font-mono font-bold text-[10px]">
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 block">{pair.ch}</span>
                        <span className="text-emerald-700/90 block mt-0.5">{pair.sol}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CAPABILITIES & ACCORDIONS (Earth Rover style) */}
          {activeTab === 'capabilities' && (
            <div className="space-y-4">
              <div className="max-w-2xl mb-4">
                <h3 className="text-xl font-bold text-green-950 font-mono">
                  Autonomous Intelligence & Non-Invasive Farming
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Inspired by the world-class precision agriculture standards of Earth Rover's CLAWS platform. Pure data, zero diesel emissions, and zero indiscriminate chemical spraying.
                </p>
              </div>

              {/* Accordions */}
              <div className="space-y-3">
                {accordions.map(acc => {
                  const Icon = acc.icon;
                  const isExpanded = expandedAccordion === acc.id;
                  return (
                    <div 
                      key={acc.id}
                      className="rounded-2xl border border-green-200 bg-green-50/60 overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setExpandedAccordion(isExpanded ? null : acc.id)}
                        className="w-full p-4.5 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-green-50/80 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                            isExpanded 
                              ? 'bg-emerald-500 text-slate-950 font-bold' 
                              : 'bg-green-50 text-emerald-700'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-green-950">
                              {acc.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {acc.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="p-1 rounded-lg bg-green-50/80 text-gray-500 shrink-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-green-200/60 animate-fadeIn">
                          {acc.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: FULL TECH SPECS SHEET */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-green-950 font-mono">
                  Technical Specifications & Subsystems
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Comprehensive engineering metrics for the AgriSarthi dual-controller edge platform.
                </p>
              </div>

              {/* Specs Table */}
              <div className="rounded-2xl border border-green-200 overflow-hidden bg-white/40">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-green-200 bg-white/80 text-gray-500 font-mono uppercase text-[10px]">
                      <th className="py-3 px-4">Subsystem</th>
                      <th className="py-3 px-4">Parameter / Component</th>
                      <th className="py-3 px-4 text-right">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {techSpecs.map((row, idx) => (
                      <tr key={idx} className="hover:bg-green-50/50 transition">
                        <td className="py-2.5 px-4 text-emerald-700/90 font-semibold">{row.category}</td>
                        <td className="py-2.5 px-4 text-gray-600">{row.label}</td>
                        <td className="py-2.5 px-4 text-right text-green-900 font-bold">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ₹12k BOM & ECONOMICS */}
          {activeTab === 'economics' && (
            <div className="space-y-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 text-xs font-semibold mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Cost-Optimized Frugal Robotics Innovation</span>
                </div>
                <h3 className="text-xl font-bold text-green-950 font-mono">
                  Bill of Materials (BOM) & Economic Viability
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  While imported agricultural rovers cost upwards of ₹1,00,000 to ₹3,50,000, AgriSarthi’s dual-brain architecture enables fully autonomous operations for just <strong>~₹12,000</strong> prototype cost.
                </p>
              </div>

              {/* BOM Table */}
              <div className="rounded-2xl border border-green-200 overflow-hidden bg-white/40">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-green-200 bg-white/80 text-gray-500 uppercase text-[10px]">
                      <th className="py-3 px-4">Hardware Component</th>
                      <th className="py-3 px-4">Engineering Purpose</th>
                      <th className="py-3 px-4 text-right">Cost (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bomItems.map((item, idx) => (
                      <tr 
                        key={idx} 
                        className={`transition ${item.highlight ? 'bg-emerald-500/10 font-bold text-emerald-700' : 'hover:bg-green-50/50 text-gray-600'}`}
                      >
                        <td className="py-2.5 px-4">{item.item}</td>
                        <td className="py-2.5 px-4 text-gray-500">{item.note}</td>
                        <td className={`py-2.5 px-4 text-right ${item.highlight ? 'text-emerald-700 text-sm' : 'text-green-900'}`}>
                          {item.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Commercial vs AgriSarthi Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-white/80 border border-green-200">
                  <span className="text-gray-400 uppercase font-mono text-[10px] block mb-1">Imported Agri-Robots</span>
                  <div className="text-lg font-bold font-mono text-red-700">₹2.5L – ₹5.0L+</div>
                  <p className="text-gray-500 mt-1">High import tariffs, proprietary components, prohibitive for Indian smallholders.</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-100/60 border border-emerald-500/30">
                  <span className="text-emerald-700 uppercase font-mono text-[10px] block mb-1">AgriSarthi Field Unit</span>
                  <div className="text-lg font-bold font-mono text-emerald-700">₹12,000 (BOM)</div>
                  <p className="text-gray-600 mt-1">Locally sourced components, modular spares, serviceable by local ITI technicians.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-green-200">
                  <span className="text-blue-700 uppercase font-mono text-[10px] block mb-1">Robots-as-a-Service (RaaS)</span>
                  <div className="text-lg font-bold font-mono text-blue-700">₹499 / Acre / Mo</div>
                  <p className="text-gray-500 mt-1">Zero upfront capital expenditure for farmers. Full maintenance & cloud dashboard included.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SLIDE SCHEMATICS */}
          {activeTab === 'schematics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-green-950 font-mono">
                  Official SIH & Techathon Presentation Graphics
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  High-resolution system architecture, feasibility analysis, scalability, and workflow diagrams.
                </p>
              </div>

              {/* Slide Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { num: 1, label: 'Title & Team' },
                  { num: 2, label: 'Problem & Solution' },
                  { num: 3, label: 'Technical Approach' },
                  { num: 4, label: 'Feasibility & Scalability' },
                  { num: 5, label: 'Impact & Benefits' },
                  { num: 6, label: 'Conclusion' }
                ].map(slide => (
                  <button
                    key={slide.num}
                    onClick={() => setSelectedSlide(slide.num)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                      selectedSlide === slide.num
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-white text-gray-600 border-green-200 hover:bg-green-100'
                    }`}
                  >
                    Slide {slide.num}: {slide.label}
                  </button>
                ))}
              </div>

              {/* Large Slide Display */}
              <div className="rounded-2xl border border-green-200 overflow-hidden bg-green-50 shadow-2xl relative">
                <img
                  src={`/images/slide_${selectedSlide}.png`}
                  alt={`Slide ${selectedSlide}`}
                  className="w-full h-auto object-contain max-h-[550px]"
                />
                <div className="p-3 bg-white/90 border-t border-green-200 flex items-center justify-between text-xs text-gray-500 font-mono">
                  <span>Diagram: slide_{selectedSlide}.png (Smart India Hackathon / Techathon 3.0)</span>
                  <a
                    href={`/images/slide_${selectedSlide}.png`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>View full size</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Sticky Footer CTA Bar */}
        <div className="px-6 py-4 border-t border-green-200 bg-[#edf7ed] flex flex-wrap items-center justify-between gap-4 sticky bottom-0 z-20">
          <div className="text-xs text-gray-500 font-mono">
            AgriSarthi Robotics • JSPM Narhe Technical Campus Innovation
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-green-100 text-gray-600 font-semibold text-xs border border-green-300 transition cursor-pointer"
            >
              Close Window
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDemo && onOpenDemo('sentinel');
              }}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Schedule On-Site Farm Trial</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
