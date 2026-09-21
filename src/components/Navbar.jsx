import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Search,
  ArrowRight,
  Menu, 
  X
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

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/rovers', label: 'ROVERS' },
    { path: '/mission-control', label: 'MISSION CONTROL' },
    { path: '/services', label: 'SERVICES' },
    { path: '/about', label: 'ABOUT' }
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('sim') || q.includes('3d') || q.includes('farm')) {
      navigate('/mission-control?view=simulation');
    } else if (q.includes('rover') || q.includes('fleet') || q.includes('sentinel') || q.includes('weeder') || q.includes('scout')) {
      navigate('/rovers');
    } else if (q.includes('control') || q.includes('hud') || q.includes('camera') || q.includes('drive')) {
      navigate('/mission-control');
    } else if (q.includes('price') || q.includes('raas') || q.includes('cost') || q.includes('roi') || q.includes('spec')) {
      navigate('/services');
    } else if (q.includes('about') || q.includes('team') || q.includes('award') || q.includes('contact')) {
      navigate('/about');
    } else {
      navigate('/');
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090e0b]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5' 
        : 'bg-[#070b09]/80 backdrop-blur-sm border-b border-white/10 py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with New AgriSarthi Autonomous Robotics Emblem */}
          <Link 
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2 transition-all transform group-hover:scale-105">
              <img 
                src="/images/agrisarthi_logo_transparent.png" 
                alt="AgriSarthi Robotics" 
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_16px_rgba(34,197,94,0.45)]"
              />
            </div>

            <span className="hidden sm:inline text-white/20 font-light text-lg">|</span>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-emerald-400 uppercase font-mono">
                ROBOTICS
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-widest">
                AI FLEET
              </span>
            </div>
          </Link>

          {/* Center: Clean Uppercase Tracked Navigation Options */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isCurrentRoute(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs font-semibold tracking-[0.15em] transition-colors relative py-1 cursor-pointer ${
                    active
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 rounded-full animate-in fade-in"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search Icon + Contact Button */}
          <div className="flex items-center gap-4">
            
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-300 hover:text-white transition cursor-pointer"
                title="Search AgriSarthi fleet & specs"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {searchOpen && (
                <form 
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 top-10 w-72 bg-[#0c140e] border border-emerald-500/30 p-2 rounded-lg shadow-2xl z-50 animate-in fade-in zoom-in-95"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search HUD, RaaS, Specs..."
                    autoFocus
                    className="w-full bg-[#16231a] text-white text-xs px-3 py-2 rounded border border-green-800/60 focus:outline-none focus:border-emerald-400 placeholder:text-gray-500 font-mono"
                  />
                </form>
              )}
            </div>

            {/* Earth Rover Styled Green Action Button ("CONTACT US →") */}
            <button
              onClick={() => {
                navigate('/about#contact');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="btn-earth-pill px-5 sm:px-6 py-2.5 text-xs tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <span>CONTACT US</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded bg-white/10 text-gray-300 hover:text-white border border-white/10 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f0d]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top duration-200 text-white">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-left py-2.5 text-xs font-semibold tracking-[0.18em] transition cursor-pointer border-b border-white/5 ${
                  isCurrentRoute(link.path)
                    ? 'text-emerald-400 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-3 rounded-sm text-center text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-gray-200 shadow-md flex items-center justify-center gap-2"
            >
              <span>BOOK PILOT DEMO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
