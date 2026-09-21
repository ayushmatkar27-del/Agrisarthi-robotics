import React, { useState, useEffect, useRef } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollSectionRef = useRef(null);

  // Responsive mobile screen check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pinned scroll-driven stepper engine (active on desktop)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024 || !scrollSectionRef.current) return;
      const rect = scrollSectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      // Scrolled distance from when the top of the container hits top of viewport
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Determine which of the 4 features is currently active (0, 1, 2, 3)
      const index = Math.min(Math.floor(progress * 4), 3);
      setActiveFeatureIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectFeature = (index) => {
    setActiveFeatureIndex(index);
    if (!isMobile && scrollSectionRef.current) {
      const rect = scrollSectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetProgress = (index + 0.15) / 4;
      const targetY = window.scrollY + rect.top + (targetProgress * totalScrollable);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

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
              BUILD YOUR AUTONOMOUS{' '}
              <br className="hidden sm:inline" />
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
              <div className="flex items-center gap-3.5 flex-wrap">
                <span className="heading-earth text-3xl sm:text-5xl text-stone-950 font-extrabold">
                  MEET
                </span>
                <img 
                  src="/images/agrisarthi_wordmark.png" 
                  alt="AgriSarthi" 
                  className="h-10 sm:h-14 w-auto object-contain inline-block"
                />
              </div>
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
        PINNED SCROLL-DRIVEN SECTION: "WHY AGRISARTHI ROVERS"
        Stops/pins page scrolling down when reached. As user continues scrolling,
        all 4 features are displayed one by one (01 -> 02 -> 03 -> 04), 
        updating the visual telemetry card in real time. Once all 4 are completed,
        normal page scrolling smoothly proceeds to the remaining sections.
      */}
      <section 
        ref={scrollSectionRef} 
        className="relative bg-[#eef5ee] py-8 lg:py-0" 
        style={{ height: isMobile ? 'auto' : '340vh' }}
      >
        <div className="lg:sticky lg:top-0 lg:min-h-screen pt-4 sm:pt-6 lg:pt-16 pb-6 flex flex-col justify-start border-b border-green-200/80 overflow-visible lg:overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* Section Kicker Header with Dynamic Step Pill */}
            <div className="flex items-center justify-between gap-4 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-3">
                <span className="kicker-label text-emerald-800 whitespace-nowrap text-xs sm:text-sm font-bold">
                  WHY AGRISARTHI ROVERS
                </span>
                <div className="h-px bg-green-300 w-16 sm:w-28"></div>
              </div>

              {/* Dynamic Step Tracker Badge */}
              <div className="flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-950 text-xs sm:text-sm font-mono font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>STEP {activeFeatureIndex + 1} OF 4</span>
                <span className="text-gray-500 font-medium hidden sm:inline">• Scroll to proceed</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="max-w-3xl mb-3 sm:mb-4">
              <h2 className="heading-otto text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-stone-950 tracking-tight font-extrabold leading-tight">
                Your precision agriculture needs, built into every Rover
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mt-1.5 sm:mt-2 leading-relaxed font-normal">
                Every detail in the AgriSarthi autonomous fleet has been engineered to drive maximum crop yield, zero pesticide waste, and continuous soil intelligence for farms like yours.
              </p>
            </div>

            {/* Interactive Scroll Progress Bar */}
            <div className="w-full bg-green-200/80 h-2 rounded-full mb-4 sm:mb-5 relative overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-200 rounded-full"
                style={{ width: `${Math.min(100, Math.max(10, scrollProgress * 100))}%` }}
              />
            </div>

            {/* DYNAMIC SCROLLING 2-COLUMN ACCORDION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
              
              {/* Left Column: Dynamic Visual Showcase Card (Updates with active item) */}
              <div className="lg:col-span-6">
                <div className="bg-[#0b140e] rounded-2xl border border-green-800/40 p-5 md:p-6 text-white h-full flex flex-col justify-between relative overflow-hidden shadow-xl shadow-emerald-950/20">
                  
                  {/* Background Glow */}
                  <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none"></div>

                  {/* Header of Visual */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-emerald-400">
                        {featureItems[activeFeatureIndex].kicker}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-mono font-bold bg-white/15 text-gray-100 border border-white/20">
                      {featureItems[activeFeatureIndex].badge}
                    </span>
                  </div>

                  {/* Center Interactive Simulation Display */}
                  <div className="my-3 sm:my-4 relative z-10 bg-[#060a07]/80 rounded-xl p-4 sm:p-5 border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-xs sm:text-sm text-gray-300 font-mono font-semibold">Simulated Field Telemetry:</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-emerald-300">{featureItems[activeFeatureIndex].visualStat}</span>
                    </div>

                    {/* Dynamic Graphic depending on selected feature */}
                    {activeFeatureIndex === 0 && (
                      <div className="space-y-2.5">
                        <div className="h-24 sm:h-28 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-2.5 text-center">
                          <Eye className="w-6 h-6 text-emerald-400 mb-1 animate-pulse" />
                          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-200">Stereo AI Camera Active • 24.2 FPS</span>
                          <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Bounding Boxes: [Weed: 94%] [Crop Row: 98%]</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-mono">
                          <div className="p-2 rounded bg-white/10 text-gray-200">Front Radar: <strong className="text-emerald-300 font-bold">Clear (128 cm)</strong></div>
                          <div className="p-2 rounded bg-white/10 text-gray-200">Obstacle Stop: <strong className="text-emerald-300 font-bold">ARMED (0ms)</strong></div>
                        </div>
                      </div>
                    )}

                    {activeFeatureIndex === 1 && (
                      <div className="space-y-2.5">
                        <div className="h-24 sm:h-28 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-2.5 text-center">
                          <Crosshair className="w-6 h-6 text-emerald-400 mb-1 animate-spin" style={{ animationDuration: '6s' }} />
                          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-200">Targeted Micro-Sprayer Calibration</span>
                          <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Precision: Sub-2mm direct droplet deposition</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-mono">
                          <div className="p-2 rounded bg-white/10 text-gray-200">Chemical Waste: <strong className="text-emerald-300 font-bold">-72% Runoff</strong></div>
                          <div className="p-2 rounded bg-white/10 text-gray-200">Nozzle Pressure: <strong className="text-emerald-300 font-bold">2.4 Bar Micro</strong></div>
                        </div>
                      </div>
                    )}

                    {activeFeatureIndex === 2 && (
                      <div className="space-y-2.5">
                        <div className="h-24 sm:h-28 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-2.5 text-center">
                          <Cpu className="w-6 h-6 text-emerald-400 mb-1 animate-bounce" />
                          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-200">Dual-Brain Serial Communication Bus</span>
                          <span className="text-[11px] sm:text-xs text-gray-300 font-medium">ESP32 (Kinematics) ◄-► Raspberry Pi 4 (Vision)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-mono">
                          <div className="p-2 rounded bg-white/10 text-gray-200">Motor PWM: <strong className="text-emerald-300 font-bold">100% Real-time</strong></div>
                          <div className="p-2 rounded bg-white/10 text-gray-200">Neural Latency: <strong className="text-emerald-300 font-bold">14 ms Edge</strong></div>
                        </div>
                      </div>
                    )}

                    {activeFeatureIndex === 3 && (
                      <div className="space-y-2.5">
                        <div className="h-24 sm:h-28 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center p-2.5 text-center">
                          <Sun className="w-6 h-6 text-amber-400 mb-1 animate-pulse" />
                          <span className="text-xs sm:text-sm font-mono font-bold text-amber-200">Bifacial Solar Top Deck Charging</span>
                          <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Solar Supplementation: +2.5 hours runtime per day</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-mono">
                          <div className="p-2 rounded bg-white/10 text-gray-200">Battery Level: <strong className="text-emerald-300 font-bold">84% (Li-ion)</strong></div>
                          <div className="p-2 rounded bg-white/10 text-gray-200">Solar Output: <strong className="text-amber-300 font-bold">42 Watts Peak</strong></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 relative z-10 text-xs sm:text-sm">
                    <span className="text-gray-300 font-medium">Active Architecture Specification</span>
                    <button
                      onClick={handleLaunchHUD}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Simulate in Mission Control HUD</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Column: Stacked Dynamic Feature Cards (Activated step by step) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-2 sm:space-y-2.5">
                {featureItems.map((item, index) => {
                  const isActive = activeFeatureIndex === index;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectFeature(index)}
                      className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? 'bg-white shadow-xl border-emerald-500 ring-2 ring-emerald-500/25 translate-x-2'
                          : 'bg-white/80 hover:bg-white border-green-200/80 hover:border-green-300 hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold font-mono transition-colors ${
                            isActive ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-extrabold' : 'bg-green-100 text-green-800'
                          }`}>
                            0{index + 1}
                          </div>
                          <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                            isActive ? 'text-green-950' : 'text-gray-800'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? 'rotate-90 text-emerald-600' : 'text-gray-400'
                        }`} />
                      </div>

                      {/* Expandable Content that smoothly appears */}
                      {isActive && (
                        <div className="mt-2.5 pt-2.5 border-t border-green-100 animate-in fade-in duration-300">
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 
        FOLLOWING SECTION: AWARDS & LIVE ROVER TELEMETRY
        Seamlessly proceeds after the pinned 4-option accordion completes
      */}
      <section className="bg-[#eef5ee] pt-14 pb-20 border-b border-green-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
