import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { 
  ArrowRight,
  Droplets,
  Activity,
  Eye,
  ShieldCheck,
  Cpu,
  Trophy,
  Sparkles,
  Radio,
  Zap,
  CheckCircle2,
  Sun,
  Crosshair,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Hero({ onOpenDemo, liveTelemetry }) {
  const navigate = useNavigate();
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const handleLaunchHUD = () => {
    navigate('/mission-control');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featureItems = [
    {
      id: 'safety',
      title: 'High-Performance Field Safety & AI Vision',
      kicker: 'ACTIVE STEREO VISION + ULTRASONIC SENSORS',
      description: 'The safety of your field crops and operators always comes first. Leveraging high-frame-rate stereo cameras, dual HC-SR04 ultrasonic collision sensors, and hardware fail-safe kill switches, AgriSarthi rovers maximize autonomous uptime without risk of crop damage.',
      badge: '24.2 FPS YOLOv8',
      visualStat: '99.8% Path Accuracy'
    },
    {
      id: 'weeding',
      title: 'Sub-Millimeter AI Micro-Weeding & Targeted Spray',
      kicker: 'MICRO-ACTUATION NOZZLES',
      description: 'Traditional boom sprayers blanket entire fields with chemicals. AgriSarthi spots invasive weeds in real-time and actuates sub-millimeter targeted micro-doses, reducing pesticide and herbicide volume by up to 72% while preserving soil microbial health.',
      badge: '72% Chemical Savings',
      visualStat: '< 2mm Precision'
    },
    {
      id: 'dual-brain',
      title: 'Dual-Brain Fail-Safe Architecture',
      kicker: 'ESP32 MOTOR KINEMATICS + RASPBERRY PI 4 EDGE AI',
      description: 'Separation of high-level AI inference from low-level real-time kinematics ensures your rover never locks up. While the Pi 4 processes neural networks and cloud telemetry, the dedicated ESP32 microcontroller maintains motor control, RPM PID loops, and obstacle braking.',
      badge: '14ms Telemetry Latency',
      visualStat: 'Zero Motor Lockups'
    },
    {
      id: 'charging',
      title: '24/7 Solar & Opportunistic Field Charging',
      kicker: 'BIFACIAL SOLAR CANOPY + LITHIUM-ION BMS',
      description: 'Built for continuous agricultural shifts. The onboard high-efficiency solar panel trickle-charges the battery pack during daylight row-patrols, and automatically navigates back to base stations during low-light hours for seamless battery swapping.',
      badge: '8-10h Single Charge',
      visualStat: 'Solar Supplement'
    }
  ];

  return (
    <div>
      {/* 
        HERO HEADING BLOCK 
        Styled after the industrial robotics hero banner (Rockwell Automation | OTTO)
      */}
      <section className="relative min-h-[90vh] sm:min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#070b09] text-white pt-28 pb-20">
        
        {/* Background Image: Frontal view of the autonomous AgriSarthi rover */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/agrisarthi_hero_rover.jpg" 
            alt="AgriSarthi Autonomous Smart Farm Rover in Crop Field" 
            className="w-full h-full object-cover object-[center_35%] lg:object-[68%_center]"
          />
          {/* Multi-stop gradient: strong left-hand contrast for white typography, transparent on right for sunny rover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b09] via-[#070b09]/75 via-42% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b09]/50 via-transparent to-[#070b09]/80"></div>
        </div>

        {/* Hero Content Left Column */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            
            {/* Upper Category Kicker */}
            <p className="kicker-label text-[11px] sm:text-xs tracking-[0.25em] text-emerald-400 mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              AGRISARTHI AUTONOMOUS MOBILE ROVERS
            </p>

            {/* Main Headline: Bold Grotesque Industrial Heading (Earth Rover / OTTO Style) */}
            <h1 className="heading-earth text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-white tracking-[-0.035em] leading-[0.98] mb-6">
              BUILD YOUR AUTONOMOUS<br className="hidden sm:inline" />
              <span className="text-[#22c55e]">FARM WORKFORCE</span>
            </h1>

            {/* Paragraph Sub-description */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-normal">
              Put AgriSarthi to work. There's an autonomous field rover for all of the common precision scouting, micro-weeding, and soil monitoring jobs on your farm, no matter how big or small.
            </p>

            {/* Action Buttons: Earth Rover styled solid green pill + industrial outlined pill */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleLaunchHUD}
                className="btn-earth-pill px-8 py-4 text-xs sm:text-sm tracking-wider flex items-center gap-2.5 cursor-pointer"
              >
                <span>WATCH DEMO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="bg-black/50 hover:bg-white/10 text-white border-2 border-white/60 hover:border-white font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-full transition-all flex items-center gap-2.5 backdrop-blur-sm cursor-pointer"
              >
                <span>GET STARTED NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* 
        EARTH ROVER STYLE HIGH-IMPACT EDITORIAL SECTION
        Features bold typography: PURE LIGHT. ZERO CHEMICALS & 3 Core Capabilities
      */}
      <section className="bg-[#fbfdfb] py-20 sm:py-24 border-b border-green-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Banner: Meet AgriSarthi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
            <div className="lg:col-span-6 space-y-4">
              <span className="kicker-label text-emerald-700 block">PRECISION AGRI-ROBOTICS</span>
              <h2 className="heading-earth text-4xl sm:text-6xl text-stone-950">
                MEET AGRISARTHI™
              </h2>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
                Your autonomous field companion equipped with precision edge image processing, Artificial Intelligence, and satellite RTK navigation. AgriSarthi can weed, scout, and analyze your fields all on its own.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('fleet');
                    el ? el.scrollIntoView({ behavior: 'smooth' }) : navigate('/rovers');
                  }}
                  className="btn-earth-pill px-8 py-3 text-xs tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>AGRISARTHI FLEET</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-2xl group">
                <img 
                  src="/images/rover_prototype.jpeg" 
                  alt="AgriSarthi Field Rover in crop rows"
                  className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    4WD ROCKER-BOGIE CHASSIS
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#16a34a] font-bold">
                    FIELD TESTED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Huge Editorial Statement: PURE LIGHT. ZERO CHEMICALS */}
          <ScrollReveal animation="fade" className="text-center max-w-4xl mx-auto my-16">
            <h2 className="heading-earth text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.92] text-stone-950">
              PURE LIGHT.<br />
              <span className="text-[#16a34a]">ZERO CHEMICALS</span>
            </h2>
            <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
              Battery and solar-powered, AgriSarthi is 100% electric, whisper-quiet, and eliminates toxic chemical overspray through precision laser & micro-dosing actuators.
            </p>
          </ScrollReveal>

          {/* 3 Core Capability Columns matching Earth Rover (WEEDING, SCOUTING, CONTROL) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-8 border-t border-stone-200">
            <div className="space-y-3">
              <h3 className="heading-earth text-2xl sm:text-3xl text-stone-950 tracking-tight">
                WEEDING
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                AgriSarthi uses proprietary edge YOLOv8 AI models to detect weeds, distinguishing invasive species from crops before targeting the growth point with precise micro-actuation to eliminate weeds without damaging crops.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                Patent-Pending Sub-2mm Actuator
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="heading-earth text-2xl sm:text-3xl text-stone-950 tracking-tight">
                SCOUTING
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Through multi-spectral deep-learning vision, our robot is able to inspect crops at leaf-level, collecting real-time and precise farm data, including detailed NDVI maps, plant health status, and canopy growth rates.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                Continuous Multi-Spectral Telemetry
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="heading-earth text-2xl sm:text-3xl text-stone-950 tracking-tight">
                CONTROL
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                AgriSarthi navigates furrow beds autonomously with centimeter accuracy using satellite-based navigation with RTK position correction and fail-safe dual-brain obstacle detection for reliable day & night shifts.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                Centimeter RTK-GPS Accuracy
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 
        TRANSITION SECTION: "WHY AGRISARTHI ROVERS"
        Matching the dynamic scrolling accordion from the reference video
      */}
      <section className="bg-[#eef5ee] pt-16 pb-20 border-b border-green-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Kicker Header */}
          <ScrollReveal animation="slide-up">
            <div className="flex items-center gap-4 mb-4">
              <span className="kicker-label text-emerald-800 whitespace-nowrap">
                WHY AGRISARTHI ROVERS
              </span>
              <div className="h-px bg-green-300 flex-grow"></div>
            </div>

            <div className="max-w-3xl mb-12">
              <h2 className="heading-otto text-3xl sm:text-4xl md:text-5xl text-stone-950">
                Your precision agriculture needs, built into every Rover
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                Every detail in the AgriSarthi autonomous fleet has been engineered to drive maximum crop yield, zero pesticide waste, and continuous soil intelligence for farms like yours.
              </p>
            </div>
          </ScrollReveal>

          {/* DYNAMIC SCROLLING 2-COLUMN ACCORDION (Matches 00:01 in video) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
            
            {/* Left Column: Dynamic Visual Showcase Card (Updates with active item) */}
            <div className="lg:col-span-6">
              <ScrollReveal animation="slide-left" className="h-full">
                <div className="bg-[#0b140e] rounded-2xl border border-green-800/40 p-6 md:p-8 text-white h-full flex flex-col justify-between relative overflow-hidden shadow-xl shadow-emerald-950/20">
                  
                  {/* Background Glow */}
                  <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none"></div>

                  {/* Header of Visual */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        {featureItems[activeFeatureIndex].kicker}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-gray-200 border border-white/15">
                      {featureItems[activeFeatureIndex].badge}
                    </span>
                  </div>

                  {/* Center Interactive Simulation Display */}
                  <div className="my-8 relative z-10 bg-[#060a07]/80 rounded-xl p-6 border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-400 font-mono">Simulated Field Telemetry:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{featureItems[activeFeatureIndex].visualStat}</span>
                    </div>

                    {/* Dynamic Graphic depending on selected feature */}
                    {activeFeatureIndex === 0 && (
                      <div className="space-y-3">
                        <div className="h-32 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-4 text-center">
                          <Eye className="w-8 h-8 text-emerald-400 mb-2 animate-pulse" />
                          <span className="text-xs font-mono text-emerald-200">Stereo AI Camera Active • 24.2 FPS</span>
                          <span className="text-[10px] text-gray-400">Bounding Boxes: [Weed: 94%] [Crop Row: 98%]</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="p-2 rounded bg-white/5">Front Radar: <strong className="text-emerald-400">Clear (128 cm)</strong></div>
                          <div className="p-2 rounded bg-white/5">Obstacle Stop: <strong className="text-emerald-400">ARMED (0ms)</strong></div>
                        </div>
                      </div>
                    )}

                    {activeFeatureIndex === 1 && (
                      <div className="space-y-3">
                        <div className="h-32 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-4 text-center">
                          <Crosshair className="w-8 h-8 text-emerald-400 mb-2 animate-spin" style={{ animationDuration: '6s' }} />
                          <span className="text-xs font-mono text-emerald-200">Targeted Micro-Sprayer Calibration</span>
                          <span className="text-[10px] text-gray-400">Precision: Sub-2mm direct droplet deposition</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="p-2 rounded bg-white/5">Chemical Waste: <strong className="text-emerald-400">-72% Runoff</strong></div>
                          <div className="p-2 rounded bg-white/5">Nozzle Pressure: <strong className="text-emerald-400">2.4 Bar Micro</strong></div>
                        </div>
                      </div>
                    )}

                    {activeFeatureIndex === 2 && (
                      <div className="space-y-3">
                        <div className="h-32 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-4 text-center">
                          <Cpu className="w-8 h-8 text-emerald-400 mb-2 animate-bounce" />
                          <span className="text-xs font-mono text-emerald-200">Dual-Brain Serial Communication Bus</span>
                          <span className="text-[10px] text-gray-400">ESP32 (Kinematics) ◄-► Raspberry Pi 4 (Vision)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="p-2 rounded bg-white/5">Motor PWM: <strong className="text-emerald-400">100% Real-time</strong></div>
                          <div className="p-2 rounded bg-white/5">Neural Latency: <strong className="text-emerald-400">14 ms Edge</strong></div>
                        </div>
                      </div>
                    )}

                    {activeFeatureIndex === 3 && (
                      <div className="space-y-3">
                        <div className="h-32 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-4 text-center">
                          <Sun className="w-8 h-8 text-amber-400 mb-2 animate-pulse" />
                          <span className="text-xs font-mono text-amber-200">Bifacial Solar Top Deck Charging</span>
                          <span className="text-[10px] text-gray-400">Solar Supplementation: +2.5 hours runtime per day</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="p-2 rounded bg-white/5">Battery Level: <strong className="text-emerald-400">84% (Li-ion)</strong></div>
                          <div className="p-2 rounded bg-white/5">Solar Output: <strong className="text-amber-400">42 Watts Peak</strong></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10 text-xs">
                    <span className="text-gray-400">Active Architecture Specification</span>
                    <button
                      onClick={handleLaunchHUD}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Simulate in Mission Control HUD</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Stacked Dynamic Feature Cards (Matching 00:01 in video) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
              {featureItems.map((item, index) => {
                const isActive = activeFeatureIndex === index;
                return (
                  <ScrollReveal key={item.id} animation="pop" delay={index * 80}>
                    <div
                      onClick={() => setActiveFeatureIndex(index)}
                      className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? 'bg-white shadow-lg border-emerald-500 ring-2 ring-emerald-500/20 translate-x-1.5'
                          : 'bg-white/70 hover:bg-white border-green-200/80 hover:border-green-300 hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                            isActive ? 'bg-emerald-500 text-slate-950' : 'bg-green-100 text-green-800'
                          }`}>
                            0{index + 1}
                          </div>
                          <h3 className={`text-base font-bold transition-colors ${
                            isActive ? 'text-green-950' : 'text-gray-700'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          isActive ? 'rotate-90 text-emerald-600' : 'text-gray-400'
                        }`} />
                      </div>

                      {/* Expandable Content that pops smoothly */}
                      {isActive && (
                        <div className="mt-4 pt-3 border-t border-green-100 animate-in fade-in duration-300">
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>

          {/* Awards & Distinctions Banner */}
          <ScrollReveal animation="slide-up">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold backdrop-blur-md">
                <Trophy className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
                <span>🏆 1st Prize Winners — Techathon 3.0 (₹2,00,000 Cash Award)</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-medium backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Eureka! Asia's Largest Startup Finalist</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Live Holographic Rover Telemetry Card (Pops into view on scroll) */}
          <ScrollReveal animation="pop">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-green-200/40 to-green-100/60 shadow-xl shadow-emerald-500/5 mb-8">
              <div className="bg-[#f5fbf5]/95 rounded-[22px] p-6 md:p-8 backdrop-blur-2xl border border-green-200">
                
                {/* Top Bar of Telemetry Card */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-green-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                    <div>
                      <h3 className="text-sm font-bold text-green-950 font-mono flex items-center gap-2">
                        AGRISARTHI-SENTINEL // UNIT-01
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-700 border border-emerald-500/30">
                          ONLINE • PATROLLING
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500">Autonomous Row Following (Zone B - South Orchard)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Activity className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Battery: <strong className="text-emerald-700">{liveTelemetry?.battery ?? 84}%</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Radio className="w-3.5 h-3.5 text-blue-700" />
                      <span>Signal: <strong className="text-blue-700">{liveTelemetry?.signal ?? 94}%</strong></span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-gray-600">
                      <Zap className="w-3.5 h-3.5 text-amber-700" />
                      <span>Speed: <strong className="text-green-900">{liveTelemetry?.speed ?? '1.2'} m/s</strong></span>
                    </div>
                  </div>
                </div>

                {/* Quick Live Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
                  
                  <div className="glass-card p-3.5 rounded-xl border border-green-200/80 bg-white">
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                      <span>Soil Moisture</span>
                      <Droplets className="w-3.5 h-3.5 text-blue-700" />
                    </div>
                    <div className="text-lg font-bold font-mono text-emerald-700">
                      {liveTelemetry?.moisture ?? 42}%
                    </div>
                    <div className="text-[10px] text-emerald-700">Optimal Hydration</div>
                  </div>

                  <div className="glass-card p-3.5 rounded-xl border border-green-200/80 bg-white">
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                      <span>Ambient Temp</span>
                      <Activity className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="text-lg font-bold font-mono text-green-900">
                      {liveTelemetry?.temp ?? 27.4}°C
                    </div>
                    <div className="text-[10px] text-gray-500">Humidity: {liveTelemetry?.humidity ?? 61}%</div>
                  </div>

                  <div className="glass-card p-3.5 rounded-xl border border-green-200/80 bg-white">
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                      <span>Air Quality (MQ-2)</span>
                      <Activity className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                    <div className="text-lg font-bold font-mono text-emerald-700">
                      {liveTelemetry?.gas ?? 48} <span className="text-xs text-gray-500 font-normal">PPM</span>
                    </div>
                    <div className="text-[10px] text-emerald-700">Normal Range</div>
                  </div>

                  <div className="glass-card p-3.5 rounded-xl border border-green-200/80 bg-white">
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                      <span>YOLOv8 Vision</span>
                      <Eye className="w-3.5 h-3.5 text-purple-700" />
                    </div>
                    <div className="text-lg font-bold font-mono text-purple-700">
                      24.2 <span className="text-xs text-gray-500 font-normal">FPS</span>
                    </div>
                    <div className="text-[10px] text-purple-700">Active Inference</div>
                  </div>

                  <div className="glass-card p-3.5 rounded-xl border border-green-200/80 bg-white">
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                      <span>Obstacle Range</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <div className="text-lg font-bold font-mono text-teal-700">
                      {liveTelemetry?.distance ?? 128} <span className="text-xs text-gray-500 font-normal">cm</span>
                    </div>
                    <div className="text-[10px] text-teal-700">Clear Path Ahead</div>
                  </div>

                  <div className="glass-card p-3.5 rounded-xl border border-green-200/80 bg-white flex flex-col justify-between">
                    <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
                      <span>Mission Action</span>
                      <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                    <button
                      onClick={handleLaunchHUD}
                      className="w-full py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-800 text-xs font-semibold border border-emerald-500/30 transition text-center cursor-pointer"
                    >
                      Open HUD →
                    </button>
                  </div>

                </div>

                {/* Value Proposition Highlights */}
                <div className="mt-6 pt-6 border-t border-green-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Dual-Brain Architecture: ESP32 + Raspberry Pi 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Real-time YOLOv8 Crop Health & Pest Inference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Robots-as-a-Service: Zero CapEx Subscription</span>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
