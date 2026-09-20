import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookDemoModal from './components/BookDemoModal';
import HomePage from './pages/HomePage';
import RoversPage from './pages/RoversPage';
import MissionControlPage from './pages/MissionControlPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';

// Automatic Scroll Restoration and Hash Jump Handler
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [preselectedRover, setPreselectedRover] = useState('sentinel');

  // Unified Live Background Telemetry Simulator Engine
  const [liveTelemetry, setLiveTelemetry] = useState({
    battery: 84,
    signal: 94,
    speed: '1.2',
    moisture: 42,
    temp: 27.4,
    humidity: 61,
    gas: 48,
    sound: 38,
    distance: 128
  });

  const [fleetStats] = useState({
    activeRovers: 14,
    totalAcres: '3,450+',
    latency: '14 ms'
  });

  // Background Telemetry Tick Engine (Updates every 2.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTelemetry(prev => ({
        ...prev,
        moisture: Math.min(80, Math.max(20, Math.round(prev.moisture + (Math.random() * 2 - 1)))),
        temp: parseFloat((27.4 + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        humidity: Math.round(61 + (Math.random() * 2 - 1)),
        gas: Math.round(48 + (Math.random() * 4 - 2)),
        sound: Math.round(38 + (Math.random() * 6 - 3)),
        distance: Math.min(300, Math.max(40, Math.round(prev.distance + (Math.random() * 10 - 5)))),
        signal: Math.min(100, Math.max(88, Math.round(prev.signal + (Math.random() * 2 - 1))))
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleOpenDemoModal = (roverId = 'sentinel') => {
    setPreselectedRover(typeof roverId === 'string' ? roverId : 'sentinel');
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f9f0] text-green-950 flex flex-col selection:bg-emerald-500 selection:text-white">
      <ScrollHandler />
      
      {/* Fixed High-Tech Navbar */}
      <Navbar 
        onOpenDemo={() => handleOpenDemoModal('sentinel')} 
      />

      <main className="flex-grow">
        <Routes>
          {/* Home Page: Hero, LiveStatusTicker, Fleet Teaser */}
          <Route 
            path="/" 
            element={
              <HomePage 
                onOpenDemo={handleOpenDemoModal} 
                liveTelemetry={liveTelemetry}
                fleetStats={fleetStats}
              />
            } 
          />

          {/* Dedicated Rovers Fleet Page */}
          <Route 
            path="/rovers" 
            element={
              <RoversPage 
                onOpenDemo={handleOpenDemoModal}
              />
            } 
          />
          <Route path="/fleet" element={<Navigate to="/rovers" replace />} />

          {/* Dedicated Mission Control HUD Simulator Route */}
          <Route 
            path="/mission-control" 
            element={
              <MissionControlPage 
                liveTelemetry={liveTelemetry}
                onOpenDemo={handleOpenDemoModal}
              />
            } 
          />

          {/* Grouped Services Route: RaaS, ROI Calculator, Tech Architecture */}
          <Route 
            path="/services" 
            element={
              <ServicesPage 
                onOpenDemo={handleOpenDemoModal}
              />
            } 
          />

          {/* Grouped About Route: Impact & Proof, Pitch Deck & TAM, Contact Lab */}
          <Route 
            path="/about" 
            element={
              <AboutPage 
                onOpenDemo={handleOpenDemoModal}
              />
            } 
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Comprehensive Footer */}
      <Footer 
        onOpenDemo={() => handleOpenDemoModal('sentinel')}
      />

      {/* Interactive 3-Step Pilot Deployment & Demo Booking Modal */}
      <BookDemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        preselectedRover={preselectedRover}
      />

    </div>
  );
}
