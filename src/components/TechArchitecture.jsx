import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Eye, 
  Radio, 
  Battery, 
  Droplets, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Server,
  ArrowRight
} from 'lucide-react';

export default function TechArchitecture() {
  const [activeTab, setActiveTab] = useState('dual-brain'); // 'dual-brain' | 'sensors' | 'vision-pipeline'

  return (
    <section id="tech-specs" className="py-24 bg-[#edf7ed] relative overflow-hidden border-t border-green-100">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>HARDWARE & EDGE AI ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight mb-4">
            Engineered for <span className="text-gradient-blue">Rugged Reliability</span>
          </h2>
          <p className="text-base text-gray-500">
            A split dual-microcontroller architecture decouples real-time motor control from compute-heavy YOLOv8 computer vision inferencing.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-white border border-green-200">
            <button
              onClick={() => setActiveTab('dual-brain')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'dual-brain' ? 'bg-blue-600 text-green-950 shadow-md' : 'text-gray-500 hover:text-green-950'
              }`}
            >
              Dual-Brain Architecture
            </button>
            <button
              onClick={() => setActiveTab('sensors')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'sensors' ? 'bg-blue-600 text-green-950 shadow-md' : 'text-gray-500 hover:text-green-950'
              }`}
            >
              Multi-Sensor Suite
            </button>
            <button
              onClick={() => setActiveTab('vision-pipeline')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'vision-pipeline' ? 'bg-blue-600 text-green-950 shadow-md' : 'text-gray-500 hover:text-green-950'
              }`}
            >
              Edge AI Vision Pipeline
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'dual-brain' && (
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-green-200 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Controller 1: ESP32 Low-Level */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-green-100/60 border border-green-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-green-200">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-green-950 font-mono">ESP32-WROOM-32</h3>
                      <span className="text-xs text-emerald-700 font-semibold">Low-Level Drivetrain & Sensor RTOS</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-50 text-gray-600">240 MHz Dual-Core</span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Dedicated microcontroller running real-time deterministic tasks with microsecond precision. Isolates safety-critical motor control from operating system crashes.
                </p>

                <div className="space-y-2 text-xs font-mono text-gray-500">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>4WD High-Torque DC PWM:</span>
                    <strong className="text-green-800">BTS7960 43A Drivers</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Sensor Bus Acquisition:</span>
                    <strong className="text-green-800">I2C, SPI & 12-bit ADC</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Inter-Processor Link:</span>
                    <strong className="text-emerald-700">High-Speed UART (115,200 baud)</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Power Management:</span>
                    <strong className="text-green-800">Deep-Sleep & Battery BMS Telemetry</strong>
                  </div>
                </div>
              </div>

              {/* Controller 2: Raspberry Pi 4 Compute */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-green-100/60 border border-green-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-green-200">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-700 border border-blue-500/20">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-green-950 font-mono">Raspberry Pi 4 (4GB / 8GB)</h3>
                      <span className="text-xs text-blue-700 font-semibold">High-Level Edge AI & Telemetry Node</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-50 text-gray-600">Quad-Core 1.8 GHz</span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  High-level compute computer executing real-time computer vision inference, cloud synchronization via WebSockets, and OpenCV path-planning algorithms.
                </p>

                <div className="space-y-2 text-xs font-mono text-gray-500">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Computer Vision Engine:</span>
                    <strong className="text-purple-700">YOLOv8 Nano (ONNX Runtime)</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Video Streaming Engine:</span>
                    <strong className="text-green-800">Low-Latency WebRTC / RTSP (24 FPS)</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Navigation Stack:</span>
                    <strong className="text-green-800">OpenCV Hough Line & Waypoint Pathing</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/80">
                    <span>Connectivity Node:</span>
                    <strong className="text-blue-700">Dual 4G LTE + LoRa 868/915 MHz</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Sensor Suite Tab */}
        {activeTab === 'sensors' && (
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-green-200 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200 space-y-2">
                <div className="flex items-center justify-between text-blue-700">
                  <Droplets className="w-5 h-5" />
                  <span className="text-[10px] font-mono bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Capacitive V2.0</span>
                </div>
                <h4 className="text-sm font-bold text-green-950 font-mono">Soil Moisture Probe</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Corrosion-resistant capacitive sensing. Monitors volumetric water content at root level without galvanic degradation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200 space-y-2">
                <div className="flex items-center justify-between text-amber-700">
                  <Activity className="w-5 h-5" />
                  <span className="text-[10px] font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">DHT11 / DHT22</span>
                </div>
                <h4 className="text-sm font-bold text-green-950 font-mono">Ambient Temperature & Humidity</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Measures microclimate heat index, dew point, and frost risk to alert farmers before crop freezing or heat stress occurs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200 space-y-2">
                <div className="flex items-center justify-between text-emerald-700">
                  <Zap className="w-5 h-5" />
                  <span className="text-[10px] font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">MQ-2 Analog</span>
                </div>
                <h4 className="text-sm font-bold text-green-950 font-mono">Gas & Smoke Detection</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Detects methane, smoke, and hazardous crop decomposition gas spikes in polyhouses, crop canopies, and field storage.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200 space-y-2">
                <div className="flex items-center justify-between text-purple-700">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">PIR HC-SR501</span>
                </div>
                <h4 className="text-sm font-bold text-green-950 font-mono">Passive Infrared (PIR) Security</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  360° nocturnal intrusion detection. Triggers instant spotlight and siren beacons when wild boars or intruders breach fences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200 space-y-2">
                <div className="flex items-center justify-between text-teal-700">
                  <Activity className="w-5 h-5" />
                  <span className="text-[10px] font-mono bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">HC-SR04 Sonar</span>
                </div>
                <h4 className="text-sm font-bold text-green-950 font-mono">Ultrasonic Collision Avoidance</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Real-time 2cm - 400cm obstacle rangefinder. Guarantees rover automatic stop if stones, farm tools, or livestock block paths.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-green-100/60 border border-green-200 space-y-2">
                <div className="flex items-center justify-between text-yellow-400">
                  <Battery className="w-5 h-5" />
                  <span className="text-[10px] font-mono bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">12V LiFePO4</span>
                </div>
                <h4 className="text-sm font-bold text-green-950 font-mono">Smart BMS & Solar Charging</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Integrated Battery Management System with cell balancing, over-current cutoff, and automated solar trickle-charging port.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Vision Pipeline Tab */}
        {activeTab === 'vision-pipeline' && (
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-green-200 animate-in fade-in duration-300">
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-green-100/60 border border-green-200">
                <h4 className="text-base font-bold text-green-950 font-mono mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-700" />
                  <span>Real-Time Edge Computer Vision Pipeline</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
                  <div className="p-3 rounded-xl bg-white border border-green-200">
                    <span className="text-gray-400 block mb-1">Step 1: Ingestion</span>
                    <strong className="text-green-800">1080p PiCam Feed (24 FPS)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-green-200">
                    <span className="text-gray-400 block mb-1">Step 2: Preprocess</span>
                    <strong className="text-green-800">RGB-to-Tensor & Normalization</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-green-200">
                    <span className="text-gray-400 block mb-1">Step 3: Inference</span>
                    <strong className="text-purple-700">YOLOv8n ONNX (~38ms latency)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-green-200">
                    <span className="text-gray-400 block mb-1">Step 4: Action</span>
                    <strong className="text-emerald-700">Bypass / Micro-Spray / Alert</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
