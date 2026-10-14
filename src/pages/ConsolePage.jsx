import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

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

      {/* Floating Control Pill (Back & Open in Separate Tab) */}
      <div className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1 rounded-full bg-[#080d0a]/90 border border-white/10 shadow-xl backdrop-blur-md">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#102416] text-gray-200 hover:text-emerald-400 transition-all cursor-pointer group"
          title="Go Back"
          aria-label="Go Back within console"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <div className="w-[1px] h-4 bg-white/15" />
        <a
          href="/console/dashboard.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#102416] text-gray-200 hover:text-emerald-400 transition-all cursor-pointer group"
          title="Open in Separate Tab"
          aria-label="Open console in separate tab"
        >
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
        </a>
      </div>

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
