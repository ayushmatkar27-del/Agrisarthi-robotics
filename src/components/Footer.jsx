import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Trophy, 
  ArrowUp
} from 'lucide-react';

export default function Footer({ onOpenDemo }) {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (path) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else if (path.includes('#')) {
      const [route, hash] = path.split('#');
      navigate(route);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#edf7ed] text-gray-600 text-xs border-t border-green-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-green-200/80">
          
          {/* Col 1: Brand & Tagline (Col-Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center"
            >
              <img 
                src="/images/agrisarthi_logo_full.png" 
                alt="AgriSarthi — Farm Smarter Together" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>

            <p className="text-gray-600 text-xs leading-relaxed max-w-sm">
              Empowering farmers with autonomous dual-controller field rovers, edge YOLOv8 computer vision, and zero-CapEx Robots-as-a-Service (RaaS) deployments.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 text-[11px] font-mono">
              <Trophy className="w-3.5 h-3.5 text-amber-700" />
              <span>🏆 1st Prize Winners — Techathon 3.0 (₹2,00,000)</span>
            </div>
          </div>

          {/* Col 2: The Fleet */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-green-950 font-mono uppercase tracking-wider">Rovers Fleet</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/rovers')} className="hover:text-emerald-700 transition cursor-pointer">
                  AgriSarthi Sentinel (Flagship)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/rovers')} className="hover:text-emerald-700 transition cursor-pointer">
                  Precision Weeder & Striker
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/rovers')} className="hover:text-emerald-700 transition cursor-pointer">
                  Soil Core & Canopy Scout
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services#tech-specs')} className="hover:text-emerald-700 transition cursor-pointer">
                  Dual-Brain Tech Specs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-green-950 font-mono uppercase tracking-wider">Services & Tools</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/mission-control')} className="hover:text-emerald-700 transition cursor-pointer">
                  Live Mission Control HUD
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services#raas')} className="hover:text-emerald-700 transition cursor-pointer">
                  Robots as a Service (RaaS)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services#roi-calc')} className="hover:text-emerald-700 transition cursor-pointer">
                  Farm ROI & Savings Engine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services#tech-specs')} className="hover:text-emerald-700 transition cursor-pointer">
                  Hardware Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Ventures */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-green-950 font-mono uppercase tracking-wider">About & Contact</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('/about#impact')} className="hover:text-emerald-700 transition cursor-pointer">
                  Impact, Awards & Proof
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about#investors')} className="hover:text-emerald-700 transition cursor-pointer">
                  Pitch Deck, TAM & Team
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about#contact')} className="hover:text-emerald-700 transition cursor-pointer">
                  Contact Robotics Lab
                </button>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenDemo}
                className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 border border-emerald-500/30 text-xs font-bold transition cursor-pointer"
              >
                Book Farm Pilot →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} AgriSarthi Robotics. All rights reserved. Developed by Ayush Matkar & Atharva Pachpol (JSPM Narhe Technical Campus).</p>
          
          <div className="flex items-center gap-4">
            <span>Built with Precision Robotics & Edge AI</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-green-100 text-gray-600 hover:text-green-950 border border-green-200 transition cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
