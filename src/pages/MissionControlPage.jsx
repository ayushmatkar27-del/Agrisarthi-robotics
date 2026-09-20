import React from 'react';
import MissionControlDemo from '../components/MissionControlDemo';

export default function MissionControlPage({ liveTelemetry, onOpenDemo }) {
  return (
    <div className="pt-20">
      <MissionControlDemo 
        liveTelemetry={liveTelemetry}
        onOpenDemo={() => onOpenDemo('sentinel')}
      />
    </div>
  );
}
