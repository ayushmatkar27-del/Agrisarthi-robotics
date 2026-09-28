import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Search, 
  ArrowRight, 
  Menu, 
  X,
  Sparkles,
  Compass,
  Calculator,
  Layers,
  FileText,
  Trophy,
  Phone,
  ShieldCheck,
  Command,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Listener for Cmd+K / Ctrl+K Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/rovers', label: 'ROVERS' },
    { path: '/mission-control', label: 'MISSION CONTROL' },
    { path: '/services', label: 'SERVICES' },
    { path: '/about', label: 'ABOUT' }
  ];

  const searchDirectory = [
    { id: 'console', title: 'AgriSarthi Farm Console & Telemetry Dashboard', category: 'Live Systems', desc: 'Full telemetry console with Plant Health, Soil Moisture, Temp & Roller controls', path: '/console', icon: LayoutDashboard },
    { id: 'sentinel', title: 'AgriSarthi Sentinel 100', category: 'Rovers Fleet', desc: 'Flagship autonomous 24/7 crop scout & YOLOv8 edge vision', path: '/rovers', icon: Bot },
    { id: 'striker', title: 'AgriSarthi Striker 600', category: 'Rovers Fleet', desc: 'Precision micro-weeding & targeted spot-sprayer', path: '/rovers', icon: Bot },
    { id: 'scout', title: 'AgriSarthi Soil Core 1200', category: 'Rovers Fleet', desc: 'Hydraulic depth soil sampling & NDVI canopy profiler', path: '/rovers', icon: Bot },
    { id: '3d-sim', title: '3D WebGL Farm Scout Simulation', category: 'Live Systems', desc: 'Interactive 3D Three.js farm field & rover physics', path: '/mission-control?view=simulation', icon: Sparkles },
    { id: 'hud', title: 'Mission Control 2D Telemetry HUD', category: 'Live Systems', desc: 'Real-time YOLOv8 camera, sensor suite & manual steer', path: '/mission-control', icon: Compass },
    { id: 'roi', title: 'Farm ROI & Savings Calculator', category: 'Financials & Tools', desc: 'Estimate annual chemical, water & labor cost savings', path: '/services#roi-calc', icon: Calculator },
    { id: 'raas', title: 'Robots as a Service (RaaS) Plans', category: 'Financials & Tools', desc: 'Zero-CapEx monthly subscription tiers from ₹499/acre', path: '/services#raas', icon: Layers },
    { id: 'specs', title: 'Dual-Brain Tech Architecture', category: 'Engineering', desc: 'ESP32 telemetry + Raspberry Pi 4 edge compute specs', path: '/services#tech-specs', icon: Layers },
    { id: 'techathon', title: 'Techathon 3.0 (₹2,00,000 Cash Grant)', category: 'Validation', desc: '1st prize national award & university validation', path: '/about#impact', icon: Trophy },
    { id: 'investors', title: 'Pitch Deck & ₹42,000 Cr TAM', category: 'Company', desc: 'Market analysis, business model & expansion roadmap', path: '/about#investors', icon: FileText },
    { id: 'team', title: 'Founding Team (Ayush & Atharva)', category: 'Company', desc: 'JSPM Narhe Technical Campus robotics engineering lab', path: '/about#investors', icon: Bot },
    { id: 'contact', title: 'Contact Robotics Lab & Founders', category: 'Connect', desc: 'Direct WhatsApp & official inquiry channel', path: '/about#contact', icon: Phone },
    { id: 'legal', title: 'Privacy Policy & Field Safety Standards', category: 'Governance', desc: 'Agricultural telemetry ownership & rover fail-safe terms', path: '/legal', icon: ShieldCheck }
  ];

  const filteredItems = searchQuery.trim() === ''
    ? searchDirectory.slice(0, 6)
    : searchDirectory.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
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

  const isCurrentRoute = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === `#${path.substring(2)}`;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#090e0b]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5' 
          : 'bg-[#070b09]/80 backdrop-blur-sm border-b border-white/10 py-4 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo with AgriSarthi Autonomous Robotics Emblem */}
            <Link 
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center cursor-pointer group shrink-0"
            >
              <img 
                src="/images/agrisarthi_logo_transparent.png" 
                alt="AgriSarthi Robotics" 
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(34,197,94,0.4)] transition-transform group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 shrink-0">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs font-bold tracking-[0.12em] transition-colors duration-200 cursor-pointer py-1 relative whitespace-nowrap ${
                    isCurrentRoute(link.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isCurrentRoute(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full animate-in fade-in" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Command Palette Search Trigger + Contact Button + Console Button */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Search Trigger Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white border border-white/10 transition cursor-pointer text-xs font-mono shadow-sm shrink-0"
                title="Search"
                aria-label="Open Search"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xl:inline text-gray-300">Search</span>
              </button>

              {/* Earth Rover Styled Green Action Button ("CONTACT US →") */}
              <button
                onClick={() => {
                  navigate('/about#contact');
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="btn-earth-pill hidden sm:flex px-3.5 sm:px-4 py-2.5 text-xs tracking-wider items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* CONSOLE Button (Right side of CONTACT US) */}
              <button
                onClick={() => {
                  navigate('/console');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hidden sm:flex px-3.5 sm:px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 transition-all duration-200 border ${
                  location.pathname.startsWith('/console')
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/30'
                    : 'bg-[#0a170e] hover:bg-[#102617] text-emerald-400 hover:text-white border-emerald-500/40 hover:border-emerald-400/80 shadow-sm'
                }`}
                title="Autonomous Farm Console & Telemetry Dashboard"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>CONSOLE</span>
                <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white border border-white/10 cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0f0d]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top duration-200 text-white">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left py-3 text-sm font-semibold tracking-[0.15em] transition cursor-pointer border-b border-white/5 flex items-center justify-between ${
                    isCurrentRoute(link.path)
                      ? 'text-emerald-400 font-bold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isCurrentRoute(link.path) ? 'text-emerald-400' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/console');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-emerald-300 bg-[#0a170e] hover:bg-[#102617] border border-emerald-500/40 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CONSOLE DASHBOARD</span>
                <LayoutDashboard className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/about#contact');
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="btn-earth-pill w-full py-3 text-center text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BOOK PILOT DEMO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modern Command Palette Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-[#09150d] border border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Top Input */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rovers, 3D simulation, ROI calculator, specs, team..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-gray-400 text-sm sm:text-base outline-none font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-md text-gray-400 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="p-3 max-h-[60vh] overflow-y-auto divide-y divide-white/5 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full text-left p-3.5 rounded-2xl hover:bg-emerald-500/10 flex items-center justify-between group transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2 rounded-xl bg-white/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <Bot className="w-8 h-8 mx-auto text-gray-500 animate-pulse" />
                  <p className="text-sm font-mono">No matching AgriSarthi system found for "{searchQuery}"</p>
                  <p className="text-xs text-gray-500">Try searching "Sentinel", "Simulation", "ROI", or "Techathon"</p>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-5 py-3 bg-[#060f09] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <div className="flex items-center gap-4">
                <span>Navigate: <strong className="text-white">Click</strong> or <strong className="text-white">Enter</strong></span>
                <span>Close: <strong className="text-white">ESC</strong></span>
              </div>
              <span className="text-emerald-400 font-bold">AgriSarthi Quick Nav</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
