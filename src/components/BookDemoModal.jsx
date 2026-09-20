import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Bot, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  Phone,
  User,
  Mail
} from 'lucide-react';

export default function BookDemoModal({ isOpen, onClose, preselectedRover }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    roverModel: preselectedRover || 'sentinel',
    farmSize: '15',
    cropType: 'Horticulture & Fruits',
    location: '',
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    demoType: 'On-Farm Live Deployment'
  });

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerConfetti();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-50/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#f5fbf5] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white text-gray-500 hover:text-green-950 border border-green-200 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-mono mb-2 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PILOT FIELD DEPLOYMENT PORTAL</span>
              </div>
              <h3 className="text-2xl font-bold text-green-950 font-mono">
                Book Live Field Demo / RaaS Pilot
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Experience the AgriSarthi autonomous monitoring rover directly on your land.
              </p>
            </div>

            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between gap-2 mb-6 font-mono text-[11px]">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-green-50'}`}>1</span>
                <span>Select Rover</span>
              </div>
              <div className="w-8 h-0.5 bg-green-50"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-emerald-500 text-slate-950' : 'bg-green-50'}`}>2</span>
                <span>Farm Specs</span>
              </div>
              <div className="w-8 h-0.5 bg-green-50"></div>
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-emerald-500 text-slate-950' : 'bg-green-50'}`}>3</span>
                <span>Confirm</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* Step 1: Select Model */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <label className="text-xs font-mono text-gray-600 block">Choose AgriSarthi Configuration:</label>
                  
                  <div 
                    onClick={() => setFormData({ ...formData, roverModel: 'sentinel' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      formData.roverModel === 'sentinel' ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-white/70 border-green-200 hover:bg-green-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5 text-emerald-700" />
                        <div>
                          <h4 className="text-sm font-bold text-green-950">AgriSarthi Sentinel (Flagship)</h4>
                          <p className="text-xs text-gray-500">24/7 Smart Farm Monitoring + YOLOv8 Vision + Soil Probing</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-700">₹499/ac</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setFormData({ ...formData, roverModel: 'weeder' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      formData.roverModel === 'weeder' ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-white/70 border-green-200 hover:bg-green-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-purple-700" />
                        <div>
                          <h4 className="text-sm font-bold text-green-950">AgriSarthi Precision Weeder</h4>
                          <p className="text-xs text-gray-500">Sub-centimeter AI weed spotting & targeted micro-spray</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-700">₹799/ac</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setFormData({ ...formData, roverModel: 'fleet' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      formData.roverModel === 'fleet' ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-white/70 border-green-200 hover:bg-green-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-amber-700" />
                        <div>
                          <h4 className="text-sm font-bold text-green-950">Full Autonomous Swarm Pilot</h4>
                          <p className="text-xs text-gray-500">Multiple units for large estates & cooperatives (25+ Acres)</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-700">Custom</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                    >
                      <span>Next: Farm Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Farm Details */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-gray-500 block mb-1">Farm Size (Acres):</label>
                      <input 
                        type="number"
                        min="1"
                        max="1000"
                        value={formData.farmSize}
                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-gray-500 block mb-1">Crop Type:</label>
                      <select
                        value={formData.cropType}
                        onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                      >
                        <option>Horticulture & Fruits</option>
                        <option>Grains (Wheat/Rice)</option>
                        <option>Sugarcane / Cotton</option>
                        <option>Polyhouse Vegetables</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-500 block mb-1">Farm Location / District:</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="text"
                        placeholder="e.g. Baramati, Pune District, Maharashtra"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-500 block mb-1">Demo Format:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, demoType: 'On-Farm Live Deployment' })}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left transition ${
                          formData.demoType === 'On-Farm Live Deployment' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-white text-gray-600 border-green-200'
                        }`}
                      >
                        On-Farm Deployment
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, demoType: 'Live Video Teleoperation' })}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left transition ${
                          formData.demoType === 'Live Video Teleoperation' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-white text-gray-600 border-green-200'
                        }`}
                      >
                        Virtual Video Demo
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-white text-gray-500 hover:text-green-950 text-xs flex items-center gap-1.5 transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Next: Contact Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Submit */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="text-xs font-mono text-gray-500 block mb-1">Full Name / Farm Owner:</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="text"
                        placeholder="e.g. Ramesh Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-gray-500 block mb-1">WhatsApp / Phone:</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input 
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-gray-500 block mb-1">Email Address:</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input 
                          type="email"
                          placeholder="farmer@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-500 block mb-1">Preferred Date:</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input 
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-white text-gray-500 hover:text-green-950 text-xs flex items-center gap-1.5 transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Deploying Request...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Confirm & Book Pilot</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        ) : (
          
          /* Success Screen */
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-400">
              <CheckCircle className="w-10 h-10 animate-bounce" />
            </div>
            
            <h3 className="text-2xl font-bold text-green-950 font-mono">
              Pilot Booking Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-emerald-700">{formData.name || 'Farmer'}</strong>! Our field robotics team from <strong className="text-green-950">JSPM Narhe Technical Campus</strong> has logged your {formData.farmSize}-acre farm in {formData.location || 'your area'}.
            </p>

            <div className="p-4 rounded-2xl bg-white/80 border border-green-200 text-xs font-mono text-gray-500 max-w-sm mx-auto text-left space-y-1">
              <div>• Assigned Unit: <span className="text-emerald-700 uppercase font-bold">{formData.roverModel}</span></div>
              <div>• Format: <span className="text-green-800">{formData.demoType}</span></div>
              <div>• Dispatch Window: <span className="text-green-800">Within 48 Hours</span></div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
