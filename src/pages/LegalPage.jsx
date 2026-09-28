import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Lock, 
  CheckCircle, 
  Bot, 
  Cpu, 
  Compass, 
  ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    if (location.pathname.includes('terms')) {
      setActiveTab('terms');
    } else if (location.pathname.includes('safety')) {
      setActiveTab('safety');
    } else {
      setActiveTab('privacy');
    }
  }, [location.pathname]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f0f6f0]">
      {/* Glow */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-mono font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>TRUST, PRIVACY & FIELD SAFETY POLICIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight mb-3">
            Legal & Operational <span className="text-emerald-700">Standards</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Official operational governance, agricultural data ownership, and hardware safety standards for AgriSarthi autonomous fleet deployments.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 border-b border-stone-200 pb-4">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'safety'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Rover Safety & Field Protocol</span>
          </button>
        </div>

        {/* Tab 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-lg space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono text-emerald-700 uppercase font-bold tracking-wider">SECTION 01</span>
              <h2 className="text-2xl font-bold text-stone-950 mt-1 mb-3">Farm Data Privacy & Ownership</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                At AgriSarthi Robotics (developed in collaboration with JSPM Narhe Technical Campus, Pune), we believe that farmland telemetry belongs solely to the farmer. When our rovers patrol your crops, all soil moisture indices, thermal feeds, and yield estimates remain your confidential proprietary assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
              <div className="p-5 rounded-2xl bg-[#f7fcf7] border border-emerald-100">
                <h3 className="text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Telemetry Collected
                </h3>
                <ul className="text-xs sm:text-sm text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>Soil volumetric water content & salinity</li>
                  <li>Canopy NDVI multispectral camera imagery</li>
                  <li>GPS field perimeter coordinates & elevation</li>
                  <li>Atmospheric gas, temperature & ambient lux</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#f7fcf7] border border-emerald-100">
                <h3 className="text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  What We Never Do
                </h3>
                <ul className="text-xs sm:text-sm text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>Never sell your crop yield data to commodity brokers</li>
                  <li>Never disclose your geo-coordinates to third parties</li>
                  <li>Never access private home networks without authorization</li>
                  <li>No ad trackers or invasive behavioral advertising</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600 space-y-3">
              <h3 className="text-base font-bold text-stone-900">Security & Encryption Architecture</h3>
              <p>
                All data transmission between the rover's dual controllers (ESP32 telemetry board and Raspberry Pi 4 edge compute) and the cloud Mission Control server is secured via TLS 1.3 protocol and AES-256 data-at-rest encryption.
              </p>
              <p>
                For questions regarding data export or account deletion, contact our robotics engineering team at{' '}
                <a href="mailto:agrisarthi.robotics@gmail.com" className="text-emerald-700 font-bold underline">
                  agrisarthi.robotics@gmail.com
                </a>.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-lg space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono text-emerald-700 uppercase font-bold tracking-wider">SECTION 02</span>
              <h2 className="text-2xl font-bold text-stone-950 mt-1 mb-3">Robots-as-a-Service (RaaS) Terms</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                These terms govern subscription agreements, hardware pilot trials, and cloud mission control dashboard access provided by AgriSarthi Robotics.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <h3 className="text-base font-bold text-stone-900 mb-2">1. Pilot Deployments & Trials</h3>
                <p>
                  Zero-deposit trial runs are scheduled for verified agricultural landholders and FPO members. Field technicians will arrive on-site with the rover, configure perimeter geofencing, and complete initial field baseline mapping.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <h3 className="text-base font-bold text-stone-900 mb-2">2. Hardware Maintenance & Care</h3>
                <p>
                  Under RaaS subscription agreements, all routine wear-and-tear, battery degradation, and sensor recalibrations are handled entirely by AgriSarthi technicians without additional cost to the subscriber. Subscribers are responsible for providing safe docking shelter during extreme monsoon cloudbursts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <h3 className="text-base font-bold text-stone-900 mb-2">3. Subscription Billing & Cancellations</h3>
                <p>
                  RaaS plans are billed on a flexible monthly or seasonal harvest cycle. Farmers may pause or terminate subscriptions with a 15-day notice before the start of the next crop season.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Safety & Field Protocol */}
        {activeTab === 'safety' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-lg space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-mono text-amber-700 uppercase font-bold tracking-wider">SECTION 03</span>
              <h2 className="text-2xl font-bold text-stone-950 mt-1 mb-3">Field Safety & Autonomous Operation</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                AgriSarthi rovers weigh approximately 18–26 kg and operate high-torque planetary DC motors. To ensure zero farm hazards, strict fail-safe kinematics are hardcoded into every unit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-300">
                <Bot className="w-6 h-6 text-amber-800 mb-2" />
                <h3 className="text-sm font-bold text-stone-900 mb-1">Human & Animal Detection</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Real-time YOLOv8 edge vision automatically halts rover movement within a 2.5-meter safety perimeter upon identifying farm workers, livestock, or obstacles.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-300">
                <Compass className="w-6 h-6 text-emerald-800 mb-2" />
                <h3 className="text-sm font-bold text-stone-900 mb-1">Geofence Lock</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Autonomous navigation halts immediately if GPS RTK fixes drift outside the pre-programmed agricultural parcel boundary.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-red-500/10 border border-red-300">
                <AlertTriangle className="w-6 h-6 text-red-800 mb-2" />
                <h3 className="text-sm font-bold text-stone-900 mb-1">Emergency Kill Switch</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Both physical high-visibility red pushbuttons on the rover chassis and instantaneous one-tap software kill switches on Mission Control cut drive motor power.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2">
              <h3 className="text-base font-bold text-stone-900">Environmental Limits</h3>
              <p>• Max Incline Gradient: 25° slope</p>
              <p>• Water Ingress Protection: IP65 (Mud & spray splash resistant; avoid complete canal submersion)</p>
              <p>• Operating Temperature: -5°C to 50°C</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
