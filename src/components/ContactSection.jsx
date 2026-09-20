import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Bot,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ContactSection({ onOpenDemo }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', role: 'Farmer / Estate Owner' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '', role: 'Farmer / Estate Owner' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#f7fcf7] text-green-900 relative overflow-hidden border-t border-green-100">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold mb-4">
            <Phone className="w-3.5 h-3.5" />
            <span>CONNECT WITH FOUNDERS & ROBOTICS LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight mb-4">
            Let’s Automate Your <span className="text-gradient-emerald">Farmland</span>
          </h2>
          <p className="text-base text-gray-500">
            Have questions about rover pricing, RaaS pilot deployment, or research collaboration? Reach out directly to our engineering team at JSPM Narhe Technical Campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Quick Contact & Action Cards (Col-Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct WhatsApp Callout Card */}
            <a 
              href="https://wa.me/919876543210?text=Hi%20AgriSarthi%20Team,%20I%20am%20interested%20in%20a%20smart%20farm%20monitoring%20rover%20pilot."
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-glow p-6 rounded-3xl border border-emerald-500/40 block hover:scale-[1.02] transition duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-700">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold border border-emerald-500/30">
                  INSTANT WHATSAPP
                </span>
              </div>
              <h3 className="text-lg font-bold text-green-950 mb-1">Chat on WhatsApp</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct channel to founders. Get quote estimates, telemetry screenshots, and pilot dates within minutes.
              </p>
            </a>

            {/* Location & Lab Coordinates Card */}
            <div className="glass-panel p-6 rounded-3xl border border-green-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-950 font-mono">Robotics Innovation Center</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Dept. of Electronics & Computer Engineering<br />
                    JSPM Narhe Technical Campus (JSPM NTC Pune)<br />
                    Narhe, Pune, Maharashtra 411041
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-green-200/80 pt-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-950 font-mono">Official Communications</h4>
                  <p className="text-xs text-gray-500 mt-0.5">contact@agrisarthi-robotics.ai</p>
                  <p className="text-xs text-gray-500">agrisarthi.robotics@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Quick Pilot Booking Trigger */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 font-mono block">Ready for on-field trials?</span>
                <span className="text-[11px] text-gray-500">Zero deposit required for verified farms.</span>
              </div>
              <button
                onClick={onOpenDemo}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
              >
                Book Pilot
              </button>
            </div>

          </div>

          {/* Right Direct Message Form (Col-Span 7) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-green-200">
            <h3 className="text-xl font-bold text-green-950 font-mono mb-2">
              Send Founder Inquiry
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Our team typically replies in less than 4 business hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-green-950 font-mono">Inquiry Received!</h4>
                <p className="text-xs text-gray-600">
                  Thank you, {form.name || 'Friend'}! Aryan and Priya from our robotics team will reach out via email/phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-500 block mb-1">Your Name:</label>
                    <input 
                      type="text"
                      placeholder="e.g. Vikram Deshmukh"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-500 block mb-1">Email Address:</label>
                    <input 
                      type="email"
                      placeholder="vikram@agrocorp.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-500 block mb-1">I am a:</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                  >
                    <option>Farmer / Estate Owner</option>
                    <option>Agricultural Cooperative / FPO Leader</option>
                    <option>Angel Investor / VC Analyst</option>
                    <option>Academic Researcher / University</option>
                    <option>Agronomy Distributor / Dealer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-500 block mb-1">Message / Requirements:</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your farm acreage, crops, or partnership proposal..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-green-200 text-xs text-green-950 focus:border-emerald-500 outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Lab</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
