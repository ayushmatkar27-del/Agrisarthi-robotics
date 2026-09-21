import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Play, 
  Square, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Radio, 
  Eye, 
  EyeOff, 
  Sun, 
  Moon, 
  Flame, 
  ShieldAlert, 
  ShieldCheck, 
  BatteryCharging, 
  Droplets, 
  Thermometer, 
  Wind, 
  Volume2, 
  Crosshair, 
  Camera, 
  Compass, 
  AlertTriangle, 
  Layers, 
  RefreshCw,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export default function MissionControlDemo({ liveTelemetry, onOpenDemo, onShowSimulation }) {
  const navigate = useNavigate();

  // Navigation & Control States
  const [controlMode, setControlMode] = useState('autonomous'); // 'autonomous' | 'manual'
  const [roverSpeed, setRoverSpeed] = useState(1.2);
  const [isEmergencyBrake, setIsEmergencyBrake] = useState(false);
  const [lastCommand, setLastCommand] = useState('AUTONOMOUS_PATROL');
  
  // Camera & Visualizer States (Camera vs 3D Simulation Stream)
  const [streamSource, setStreamSource] = useState('camera'); // 'camera' | 'simulation'
  const [cameraFilter, setCameraFilter] = useState('rgb'); // 'rgb' | 'ir' | 'thermal'
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [capturedSnaps, setCapturedSnaps] = useState(0);

  const handleGoSimulation = () => {
    if (onShowSimulation) {
      onShowSimulation();
    } else {
      navigate('/mission-control?view=simulation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Zone Map State
  const [activeZone, setActiveZone] = useState('Zone B (South Orchard)');
  const [roverCoords, setRoverCoords] = useState({ x: 45, y: 55 });

  // Dynamic Alert Logs
  const [alertLogs, setAlertLogs] = useState([
    { id: 1, time: '23:28:10', type: 'security', msg: 'PIR Sensor: Minor vibration detected near Zone B fence.' },
    { id: 2, time: '23:26:45', type: 'agronomy', msg: 'Soil Moisture in Sector 4 dropped to 34% (Triggering Irrigation Alert).' },
    { id: 3, time: '23:24:12', type: 'system', msg: 'YOLOv8 Edge Model: 24.2 FPS average inference across 12 targets.' },
    { id: 4, time: '23:20:00', type: 'battery', msg: 'Solar Trickle Charge active: +3.8A replenishment.' }
  ]);

  // Handle Steering D-Pad commands
  const handleSteer = (direction) => {
    if (isEmergencyBrake) return;
    setControlMode('manual');
    setLastCommand(`MANUAL_${direction.toUpperCase()}`);
    
    // Simulate slight coordinate movement
    setRoverCoords(prev => {
      let nx = prev.x;
      let ny = prev.y;
      if (direction === 'forward') ny = Math.max(15, ny - 6);
      if (direction === 'backward') ny = Math.min(85, ny + 6);
      if (direction === 'left') nx = Math.max(15, nx - 6);
      if (direction === 'right') nx = Math.min(85, nx + 6);
      return { x: nx, y: ny };
    });
  };

  const toggleEmergencyBrake = () => {
    setIsEmergencyBrake(!isEmergencyBrake);
    if (!isEmergencyBrake) {
      setLastCommand('EMERGENCY_BRAKE_ENGAGED');
      setAlertLogs(prev => [
        { id: Date.now(), time: new Date().toLocaleTimeString(), type: 'security', msg: 'EMERGENCY BRAKE ENGAGED BY OPERATOR.' },
        ...prev
      ]);
    } else {
      setLastCommand('SYSTEM_DISENGAGED_NORMAL');
    }
  };

  const handleSnapshot = () => {
    setCapturedSnaps(prev => prev + 1);
    setAlertLogs(prev => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), type: 'system', msg: `Telephoto Snapshot #${capturedSnaps + 1} saved to Cloud Vault.` },
      ...prev
    ]);
  };

  return (
    <section id="mission-control" className="py-24 bg-[#09170e] text-gray-200 relative overflow-hidden border-t border-emerald-900/50">
      
      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Crosshair className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>LIVE TELEOPERATION & VISION SIMULATOR</span>
            </div>
            <h2 className="heading-earth text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              MISSION CONTROL <span className="text-[#22c55e]">HUD TELEMETRY</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl font-sans">
              Interact directly with the real-time rover simulator. Test YOLOv8 computer vision detection, steer the 4WD chassis, inspect live sensor telemetry, and dispatch patrols.
            </p>
          </div>

          {/* Quick HUD Telemetry Status Bar & Highlighted Show Simulation Button */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* SEPARATE HIGHLIGHTED SHOW SIMULATION OPTION */}
            <button
              onClick={handleGoSimulation}
              className="relative group px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 hover:from-emerald-400 hover:to-green-300 text-slate-950 font-bold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.55)] ring-2 ring-emerald-300 transition-all transform hover:scale-105 active:scale-95"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
              </span>
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span className="tracking-wide">SHOW 3D SIMULATION</span>
              <span className="px-1.5 py-0.5 rounded bg-black/25 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                3D Live
              </span>
            </button>

            <div className="flex flex-wrap items-center gap-3 bg-[#0f2416] border border-emerald-500/30 p-3 rounded-2xl font-mono text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className={`w-2 h-2 rounded-full ${isEmergencyBrake ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
                <span className="text-gray-400">Mode:</span>
                <strong className={isEmergencyBrake ? 'text-red-400' : 'text-emerald-400 uppercase'}>
                  {isEmergencyBrake ? 'HALTED' : controlMode}
                </strong>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-gray-300">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span>Latency: <strong className="text-blue-400">14ms</strong></span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/20 text-gray-300">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                <span>BMS: <strong className="text-emerald-400">{liveTelemetry?.battery ?? 84}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Master HUD Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visualizer: YOLOv8 Live Camera Stream / 3D Simulation (Col-Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl bg-[#08140b] border border-emerald-500/30 overflow-hidden shadow-2xl">
              
              {/* Camera Header Overlay */}
              <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-white font-bold tracking-wider">
                    {streamSource === 'simulation' ? '3D FARM SCOUT SIMULATION' : 'LIVE CAM // 1080p @ 24.2 FPS'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/30 text-purple-300 border border-purple-500/40">
                    {streamSource === 'simulation' ? 'THREE.JS 3D' : 'YOLOv8n-AGRI'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Inline 3D Simulation Switcher Button */}
                  <button
                    onClick={() => setStreamSource(streamSource === 'camera' ? 'simulation' : 'camera')}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1 transition ${
                      streamSource === 'simulation'
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    }`}
                    title="Toggle Camera Stream or Interactive 3D Farm Simulation"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{streamSource === 'simulation' ? '📹 YOLO Cam' : '🌱 3D Sim'}</span>
                  </button>

                  {streamSource === 'camera' && (
                    <>
                      <button
                        onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition ${
                          showBoundingBoxes ? 'bg-purple-500/30 text-purple-300 border-purple-500/40' : 'bg-black/60 text-gray-400 border-white/20'
                        }`}
                      >
                        {showBoundingBoxes ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>AI Tags</span>
                      </button>

                      <button
                        onClick={() => setFlashlightOn(!flashlightOn)}
                        className={`p-1.5 rounded-lg border transition ${
                          flashlightOn ? 'bg-amber-500/30 text-amber-300 border-amber-500/40' : 'bg-black/60 text-gray-400 border-white/20'
                        }`}
                        title="Toggle Aux Spotlight"
                      >
                        <Sun className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Visualizer Canvas: Inline 3D Simulation OR Simulated Camera Feed */}
              {streamSource === 'simulation' ? (
                <div className="relative h-[380px] sm:h-[440px] w-full bg-[#08140b]">
                  <iframe 
                    src="/simulation/index.html" 
                    title="Inline 3D Simulation"
                    className="w-full h-full border-0 block"
                    allow="fullscreen"
                  />
                  <div className="absolute bottom-3 right-3 z-20">
                    <button
                      onClick={handleGoSimulation}
                      className="px-3 py-1.5 rounded-xl bg-black/80 hover:bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-500/40 text-[11px] font-mono flex items-center gap-1 shadow-lg transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Full Simulation View ↗</span>
                    </button>
                  </div>
                </div>
              ) : (
              <div className={`relative h-[340px] sm:h-[400px] w-full flex items-center justify-center transition-colors duration-500 overflow-hidden ${
                cameraFilter === 'ir' ? 'bg-[#031c0c]' : cameraFilter === 'thermal' ? 'bg-gradient-to-tr from-purple-950 via-red-950 to-amber-950' : 'bg-[#07130a]'
              }`}>
                
                {/* Simulated Field Visual Elements */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Simulated Horizon / Furrows */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
                <div className="w-full h-0.5 bg-emerald-500/30 absolute top-1/2 transform -translate-y-1/2"></div>
                <div className="h-full w-0.5 bg-emerald-500/30 absolute left-1/2 transform -translate-x-1/2"></div>

                {/* Central Crosshair HUD */}
                <div className="relative w-32 h-32 border border-emerald-500/30 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border border-dashed border-emerald-400/50 rounded-full animate-spin"></div>
                  <Crosshair className="w-6 h-6 text-emerald-700 absolute" />
                </div>

                {/* Simulated YOLOv8 Bounding Boxes */}
                {showBoundingBoxes && (
                  <>
                    {/* Bounding Box 1: Crop Row & Soil Condition */}
                    <div className="absolute top-20 left-12 sm:left-20 p-1 border-2 border-emerald-400 bg-emerald-500/10 rounded font-mono text-[10px] animate-pulse">
                      <div className="bg-emerald-500 text-slate-950 font-bold px-1 py-0.5 rounded-sm flex items-center gap-1">
                        <span>Healthy Crop Row</span>
                        <span>98.6%</span>
                      </div>
                      <div className="text-emerald-700 text-[9px] mt-1 font-semibold">Moisture: 42% (Normal)</div>
                    </div>

                    {/* Bounding Box 2: Detected Obstacle / Animal */}
                    <div className="absolute bottom-16 right-12 sm:right-24 p-1 border-2 border-amber-400 bg-amber-500/10 rounded font-mono text-[10px]">
                      <div className="bg-amber-400 text-slate-950 font-bold px-1 py-0.5 rounded-sm flex items-center gap-1">
                        <span>Field Hazard / Stray Cattle</span>
                        <span>94.2%</span>
                      </div>
                      <div className="text-amber-700 text-[9px] mt-1">Dist: 1.28m • Auto-Bypass Ready</div>
                    </div>

                    {/* Bounding Box 3: Potential Weed Cluster */}
                    <div className="absolute top-28 right-8 sm:right-16 p-1 border-2 border-purple-400 bg-purple-500/10 rounded font-mono text-[10px]">
                      <div className="bg-purple-500 text-green-950 font-bold px-1 py-0.5 rounded-sm flex items-center gap-1">
                        <span>Weed Sprout (Pigweed)</span>
                        <span>89.4%</span>
                      </div>
                      <div className="text-purple-700 text-[9px] mt-1">Target for Striker Rover</div>
                    </div>
                  </>
                )}

                {/* HUD Telemetry Corner Overlays */}
                <div className="absolute bottom-3 left-4 font-mono text-[11px] text-emerald-700/90 space-y-0.5 bg-green-50/60 p-2 rounded-lg backdrop-blur">
                  <div>ALT: 0.35m | HEADING: 142° SE</div>
                  <div>GPS: 18.5204° N, 73.8567° E</div>
                  <div>DIST TO OBSTACLE: {liveTelemetry?.distance ?? 128} cm</div>
                </div>

                <div className="absolute bottom-3 right-4 font-mono text-[11px] text-gray-600 bg-green-50/60 p-2 rounded-lg backdrop-blur flex items-center gap-2">
                  <button
                    onClick={handleSnapshot}
                    className="p-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Capture</span>
                  </button>
                </div>

              </div>
            )}

            {/* Camera Filter Selection Footer */}
              <div className="p-3 bg-[#0c1c11] border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-mono text-[11px]">Vision Spectrum:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCameraFilter('rgb')}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition ${
                        cameraFilter === 'rgb' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-black/50 text-gray-300 hover:text-white'
                      }`}
                    >
                      RGB Daylight
                    </button>
                    <button
                      onClick={() => setCameraFilter('ir')}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition ${
                        cameraFilter === 'ir' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-black/50 text-gray-300 hover:text-white'
                      }`}
                    >
                      Night Vision IR
                    </button>
                    <button
                      onClick={() => setCameraFilter('thermal')}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition ${
                        cameraFilter === 'thermal' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-black/50 text-gray-300 hover:text-white'
                      }`}
                    >
                      FLIR Thermal
                    </button>
                  </div>
                </div>

                <div className="text-gray-400 font-mono text-[11px]">
                  Snaps Saved: <span className="text-emerald-400 font-bold">{capturedSnaps}</span>
                </div>
              </div>

            </div>

            {/* Interactive Steering & Control Deck */}
            <div className="p-5 rounded-3xl bg-[#0e2114] border border-emerald-500/25">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    Teleoperation Drivetrain & Speed Deck
                  </h3>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center gap-2 bg-black/50 p-1 rounded-xl border border-emerald-500/30 text-xs font-mono">
                  <button
                    onClick={() => {
                      setControlMode('autonomous');
                      setLastCommand('AUTONOMOUS_ROW_PATROL');
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      controlMode === 'autonomous' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Autonomous Mode
                  </button>
                  <button
                    onClick={() => {
                      setControlMode('manual');
                      setLastCommand('MANUAL_TELEOP_STANDBY');
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      controlMode === 'manual' ? 'bg-blue-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Manual Remote
                  </button>
                </div>
              </div>

              {/* Controls Layout: D-Pad + Speed Slider + Emergency Stop */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* D-Pad Controller (Col-Span 5) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 w-44">
                    <div></div>
                    <button
                      disabled={isEmergencyBrake}
                      onClick={() => handleSteer('forward')}
                      className="p-3.5 rounded-xl bg-[#132a1b] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition active:scale-95 disabled:opacity-30 cursor-pointer"
                      title="Forward (W)"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <div></div>

                    <button
                      disabled={isEmergencyBrake}
                      onClick={() => handleSteer('left')}
                      className="p-3.5 rounded-xl bg-[#132a1b] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition active:scale-95 disabled:opacity-30 cursor-pointer"
                      title="Steer Left (A)"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      disabled={isEmergencyBrake}
                      onClick={() => {
                        setLastCommand('HALT_HOLD_POSITION');
                      }}
                      className="p-3.5 rounded-xl bg-black/60 hover:bg-black/80 text-gray-300 border border-amber-500/30 flex items-center justify-center font-mono text-xs font-bold active:scale-95 disabled:opacity-30 cursor-pointer"
                      title="Hold"
                    >
                      <Square className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </button>
                    <button
                      disabled={isEmergencyBrake}
                      onClick={() => handleSteer('right')}
                      className="p-3.5 rounded-xl bg-[#132a1b] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition active:scale-95 disabled:opacity-30 cursor-pointer"
                      title="Steer Right (D)"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <div></div>
                    <button
                      disabled={isEmergencyBrake}
                      onClick={() => handleSteer('backward')}
                      className="p-3.5 rounded-xl bg-[#132a1b] hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center transition active:scale-95 disabled:opacity-30 cursor-pointer"
                      title="Reverse (S)"
                    >
                      <ArrowDown className="w-5 h-5" />
                    </button>
                    <div></div>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono mt-2">
                    Active Command: <span className="text-emerald-400 font-bold">{lastCommand}</span>
                  </span>
                </div>

                {/* Speed Slider & Emergency Brake (Col-Span 7) */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-gray-400">Drive Speed Governor:</span>
                      <strong className="text-emerald-400 font-bold">{roverSpeed} m/s ({Math.round(roverSpeed * 3.6)} km/h)</strong>
                    </div>
                    <input 
                      type="range"
                      min="0.2"
                      max="2.5"
                      step="0.1"
                      value={roverSpeed}
                      onChange={(e) => setRoverSpeed(parseFloat(e.target.value))}
                      className="w-full h-2 bg-black/60 rounded-lg cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>0.2 m/s (Crop Precision)</span>
                      <span>2.5 m/s (Transit Max)</span>
                    </div>
                  </div>

                  {/* Big Emergency Brake Button */}
                  <button
                    onClick={toggleEmergencyBrake}
                    className={`w-full py-3.5 rounded-2xl font-mono text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-lg cursor-pointer ${
                      isEmergencyBrake 
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20' 
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    <span>{isEmergencyBrake ? 'DISENGAGE EMERGENCY BRAKE' : 'EMERGENCY HARD STOP (ALL MOTORS)'}</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Multi-Sensors Telemetry + Interactive Zone Map (Col-Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Real-time Sensors HUD Grid */}
            <div className="p-5 rounded-3xl bg-[#0e2114] border border-emerald-500/25">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    ESP32 Multi-Sensor Suite
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  REFRESH 1.0s
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                
                {/* Soil Moisture */}
                <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Soil Hydration</span>
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-xl font-bold text-blue-400">
                    {liveTelemetry?.moisture ?? 42}%
                  </div>
                  <div className="w-full bg-black/60 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${liveTelemetry?.moisture ?? 42}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 block">Capacitive Sensor (10-bit ADC)</span>
                </div>

                {/* Ambient Temp & Humidity */}
                <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Temp / Humidity</span>
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-amber-400">
                    {liveTelemetry?.temp ?? 27.4}°C
                  </div>
                  <span className="text-xs text-gray-400 block">RH: {liveTelemetry?.humidity ?? 61}%</span>
                  <span className="text-[9px] text-gray-400 mt-1 block">DHT11 / DHT22 Digital</span>
                </div>

                {/* Gas & Air Quality (MQ-2) */}
                <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Gas / Smoke</span>
                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl font-bold text-emerald-400">
                    {liveTelemetry?.gas ?? 48} <span className="text-xs text-gray-400 font-normal">PPM</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold block">Air Pure • No Smoke</span>
                  <span className="text-[9px] text-gray-400 mt-1 block">MQ-2 Analog Gas Rig</span>
                </div>

                {/* Sound & Security Decibels */}
                <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>Ambient Decibel</span>
                    <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-purple-400">
                    {liveTelemetry?.sound ?? 38} <span className="text-xs text-gray-400 font-normal">dB</span>
                  </div>
                  <span className="text-[10px] text-purple-400 font-semibold block">Normal Night Ambient</span>
                  <span className="text-[9px] text-gray-400 mt-1 block">Electret Acoustic Sensor</span>
                </div>

              </div>
            </div>

            {/* Farm Zone Map with Live Rover Pin */}
            <div className="p-5 rounded-3xl bg-[#0e2114] border border-emerald-500/25">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white font-mono uppercase">
                    Interactive Farm Waypoint Map
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-gray-500">
                  Click zone to dispatch
                </span>
              </div>

              {/* Map SVG / Graphical Surface */}
              <div className="relative h-48 rounded-2xl bg-[#050e08] border border-emerald-500/30 p-2 overflow-hidden">
                
                {/* 4 Farm Quadrants / Zones */}
                <div className="grid grid-cols-2 grid-rows-2 h-full gap-2">
                  <button
                    onClick={() => setActiveZone('Zone A (Polyhouse A1)')}
                    className={`rounded-xl border p-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      activeZone.includes('Zone A') ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-black/80 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-mono">ZONE A: POLYHOUSE</span>
                    <span className="text-[9px] text-gray-400">Hydration: 48% (Optimal)</span>
                  </button>

                  <button
                    onClick={() => setActiveZone('Zone B (South Orchard)')}
                    className={`rounded-xl border p-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      activeZone.includes('Zone B') ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-black/80 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-mono">ZONE B: SOUTH ORCHARD</span>
                    <span className="text-[9px] text-emerald-400 font-semibold">Active Rover Position</span>
                  </button>

                  <button
                    onClick={() => setActiveZone('Zone C (Wheat Sector)')}
                    className={`rounded-xl border p-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      activeZone.includes('Zone C') ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-black/80 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-mono">ZONE C: GRAIN SECTOR</span>
                    <span className="text-[9px] text-gray-400">Scheduled: 02:00 AM</span>
                  </button>

                  <button
                    onClick={() => setActiveZone('Zone D (Perimeter Fence)')}
                    className={`rounded-xl border p-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      activeZone.includes('Zone D') ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300' : 'bg-black/50 border-white/10 text-gray-400 hover:bg-black/80 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-mono">ZONE D: PERIMETER FENCE</span>
                    <span className="text-[9px] text-amber-400">PIR Guard Active</span>
                  </button>
                </div>

                {/* Animated Rover Pin on Map */}
                <div 
                  className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center transition-all duration-700 pointer-events-none"
                  style={{ left: `${roverCoords.x}%`, top: `${roverCoords.y}%` }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                </div>

              </div>
              <div className="text-[11px] text-gray-400 font-mono mt-2 flex items-center justify-between">
                <span>Selected Destination: <strong className="text-emerald-400">{activeZone}</strong></span>
                <span className="text-gray-500">Coords: ({roverCoords.x}, {roverCoords.y})</span>
              </div>
            </div>

            {/* Live Security & Event Log */}
            <div className="p-4 rounded-3xl bg-[#0e2114] border border-emerald-500/25 font-mono text-xs">
              <div className="flex items-center justify-between mb-3 text-gray-400">
                <span className="font-bold uppercase text-gray-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Real-time Field Alert Stream
                </span>
                <span className="text-[10px] text-gray-500">Auto-logging</span>
              </div>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {alertLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded-lg bg-black/40 border border-emerald-500/20 text-[11px] flex items-start gap-2">
                    <span className="text-gray-500 text-[10px] shrink-0 font-mono">[{log.time}]</span>
                    <span className={log.type === 'security' ? 'text-amber-400' : log.type === 'agronomy' ? 'text-blue-400' : 'text-gray-300'}>
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
