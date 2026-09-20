import React, { useState } from 'react';
import { TEAM_DATA } from '../data/teamData';
import { 
  Briefcase, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  PieChart, 
  Users, 
  Bot, 
  CheckCircle, 
  DollarSign, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function InvestorRoom({ onOpenDemo }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const pitchSlides = [
    {
      title: 'Problem: The Smallholder Agriculture Crisis',
      subtitle: 'Inefficient Manual Scouting & Rising Input Costs',
      points: [
        'Over 85% of Indian farmers lack access to precision monitoring tools.',
        'Manual crop inspection fails to catch pest infestations until 30–40% foliage is lost.',
        'Rising farm labor costs (~₹600/day) and acute seasonal worker shortages.',
        'Tractors (₹6L+) and Agri-Drones (₹4L+) are prohibitively expensive.'
      ],
      tag: 'MARKET PAIN'
    },
    {
      title: 'Solution: The AgriSarthi Robotics Swarm',
      subtitle: 'Modular, Low-Cost Autonomous Rovers with RaaS Model',
      points: [
        'Dual-Controller Architecture reduces bill-of-materials by 65% compared to industrial AGVs.',
        'Real-time edge YOLOv8 computer vision for instant disease & pest tagging.',
        'Capacitive soil & environmental telemetry optimizes irrigation by 38%.',
        'Robots-as-a-Service (RaaS) pricing allows farmers to subscribe from just ₹499/acre/mo.'
      ],
      tag: 'OUR SOLUTION'
    },
    {
      title: 'Market Opportunity & Unit Economics',
      subtitle: '₹42,000 Cr ($5.2B) Indian Precision Ag Market by 2028',
      points: [
        'TAM: 140M+ Hectares of cultivable farmland in India.',
        'SAM: 28M Hectares under commercial cash crops & horticulture.',
        'Hardware Manufacturing Cost: ~₹38,000 / unit (High gross margins).',
        'RaaS Annual Recurring Revenue (ARR): ₹60,000 - ₹1,20,000 / active rover.'
      ],
      tag: 'MARKET & ECONOMICS'
    },
    {
      title: 'Traction, Validation & Roadmap',
      subtitle: 'From SIU Techathon Champions to Commercial Pilots',
      points: [
        '🏆 1st Prize Winners — Techathon 3.0 (Awarded ₹2,00,000 cash grant).',
        'Eureka! Asia\'s Largest Startup Competition Finalist.',
        'Pilot deployments active across 4 grape & sugarcane estates in Pune district.',
        'Next Milestone: Scale fleet to 50 active units across Maharashtra & Gujarat.'
      ],
      tag: 'TRACTION & MILESTONES'
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  return (
    <section id="investors" className="py-24 bg-[#edf7ed] relative overflow-hidden border-t border-green-100">
      
      {/* Background radial */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-purple-500/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>INVESTOR HUB & FOUNDING STORY</span>
          </div>
          <h2 className="heading-earth text-3xl sm:text-4xl md:text-5xl text-stone-950 tracking-tight mb-4">
            STARTUP PITCH DECK & <span className="text-[#16a34a]">TEAM</span>
          </h2>
          <p className="text-base text-gray-500">
            Backed by robotics engineering from JSPM Narhe Technical Campus (Pune). We are scaling deep-tech robotics for the 500 million farmers who feed the world.
          </p>
        </div>

        {/* Interactive Pitch Deck Slide Viewer */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 mb-16 max-w-4xl mx-auto">
          
          {/* Slide Navigation Header */}
          <div className="flex items-center justify-between pb-6 border-b border-green-200 mb-6 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-700 font-bold border border-purple-500/30">
                {pitchSlides[currentSlide].tag}
              </span>
              <span className="text-gray-500">Slide {currentSlide + 1} of {pitchSlides.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white hover:bg-green-100 text-green-900 border border-green-200 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-xl bg-white hover:bg-green-100 text-green-900 border border-green-200 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Main Body Content */}
          <div className="min-h-[220px] flex flex-col justify-center py-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold text-purple-700">KEYSTONE SLIDE // 0{currentSlide + 1}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-green-950 mb-3">
              {pitchSlides[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 font-mono">
              {pitchSlides[currentSlide].subtitle}
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              {pitchSlides[currentSlide].points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide Dots and Quick Action */}
          <div className="flex items-center justify-between pt-6 border-t border-green-200 mt-6">
            <div className="flex items-center gap-2">
              {pitchSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === i ? 'w-8 bg-purple-700' : 'bg-green-300 hover:bg-green-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => onOpenDemo('pitch-deck')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-green-100 text-green-800 hover:text-green-950 font-semibold text-xs border border-green-300 flex items-center gap-2 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Request Full Pitch Deck (PDF)</span>
            </button>
          </div>

        </div>

        {/* Founding Engineering Team Showcase (2 Co-Founders) */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <span className="kicker-label text-emerald-800 block mb-1">
              JSPM NARHE TECHNICAL CAMPUS, PUNE
            </span>
            <h3 className="heading-earth text-3xl sm:text-4xl text-stone-950">
              THE FOUNDING TEAM
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-8">
            {TEAM_DATA.map((member, idx) => (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-green-200 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 group text-center bg-white"
              >
                <div className="relative w-28 h-28 mx-auto mb-5 rounded-2xl overflow-hidden border-2 border-emerald-500/30 group-hover:border-emerald-400 shadow-md transition">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h4 className="text-lg font-bold text-green-950 font-mono">{member.name}</h4>
                <p className="text-xs text-emerald-700 font-semibold mb-1 mt-0.5">{member.role}</p>
                <span className="text-[11px] text-gray-400 block mb-3 font-mono">{member.dept}</span>
                <p className="text-xs text-gray-600 leading-relaxed border-t border-green-200/80 pt-4">
                  {member.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
