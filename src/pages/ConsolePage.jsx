import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ConsolePage() {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const handleBack = () => {
    // Try to go back within the console iframe's own history
    try {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (iframeWindow && iframeWindow.history.length > 1) {
        iframeWindow.history.back();
      } else {
        // If no console history, navigate back in main app
        navigate(-1);
      }
    } catch (e) {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#070d18] overflow-hidden z-50">

      {/* Minimal Floating Back Button (navigates within console) */}
      <button
        onClick={handleBack}
        className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-[#080d0a]/90 hover:bg-[#102416] text-gray-200 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer group"
        title="Go Back"
        aria-label="Go Back within console"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Fullscreen Embedded Console Viewport */}
      <iframe
        ref={iframeRef}
        src="/console/dashboard.html"
        title="AgriSarthi Smart Farm Dashboard & Telemetry Console"
        className="w-full h-full border-0 absolute inset-0"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
