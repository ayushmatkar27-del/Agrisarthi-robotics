import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MissionControlDemo from '../components/MissionControlDemo';
import SimulationViewer from '../components/SimulationViewer';
import { Sparkles, Radio, Layers, Eye, ShieldCheck, Crosshair } from 'lucide-react';

export default function MissionControlPage({ liveTelemetry, onOpenDemo }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Default to HUD view or read from query param ?view=...
  const viewParam = searchParams.get('view');
  const [activeView, setActiveView] = useState(viewParam === 'simulation' ? 'simulation' : 'hud');

  // Sync state if URL param changes
  useEffect(() => {
    if (viewParam === 'simulation') {
      setActiveView('simulation');
    } else {
      setActiveView('hud');
    }
  }, [viewParam]);

  const handleSelectView = (view) => {
    setActiveView(view);
    if (view === 'hud') {
      setSearchParams({});
    } else {
      setSearchParams({ view });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 bg-[#09170e] min-h-screen text-gray-200">


      {/* Main View Area */}
      {activeView === 'simulation' ? (
        <SimulationViewer 
          onSwitchToHud={() => handleSelectView('hud')}
        />
      ) : (
        <MissionControlDemo 
          liveTelemetry={liveTelemetry}
          onOpenDemo={() => onOpenDemo('sentinel')}
          onShowSimulation={() => handleSelectView('simulation')}
        />
      )}

    </div>
  );
}
