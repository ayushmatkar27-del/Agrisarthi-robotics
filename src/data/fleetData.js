export const ROVER_FLEET = [
  {
    id: 'sentinel',
    name: 'AgriSarthi Sentinel',
    subtitle: 'Autonomous 24/7 Smart Farm Monitoring & Surveillance Rover',
    badge: 'Flagship Unit',
    status: 'Operational & Deploying',
    tagline: 'Your field guardian. Continuous telemetry, soil diagnostics & AI security.',
    imageType: 'sentinel',
    specs: {
      speed: '1.2 m/s (Adjustable)',
      runtime: '8–10 Hours per Charge',
      sensors: '6 Environmental + Night Vision Camera',
      coverage: 'Up to 25 Acres / Unit / Day',
      connectivity: 'Dual 4G LTE + LoRa Mesh + WiFi',
      brain: 'Dual Architecture: ESP32 + Raspberry Pi 4'
    },
    features: [
      'Real-time Soil Moisture & NPK hydration tracking',
      'YOLOv8 Edge Object Detection (Intruders, Stray cattle, Pests)',
      'Autonomous OpenCV Row Navigation & HC-SR04 Obstacle Avoidance',
      'Integrated Gas (MQ-2), Decibel Sound & Thermal anomaly sensors',
      'Solar trickle-charging dock compatibility'
    ],
    pricing: {
      perAcre: '₹499 / Acre / Month',
      lease: '₹8,500 / Month (Includes AMC)',
      buy: '₹68,000 (Hardware + 1-Yr Cloud Suite)'
    }
  },
  {
    id: 'weeder',
    name: 'AgriSarthi Precision Weeder & Striker',
    subtitle: 'AI Micro-Targeted Weed & Pest Neutralization Unit',
    badge: 'Series Gen-2',
    status: 'Pilot Testing in Maharashtra',
    tagline: 'Pinpoint laser & micro-spray precision. Reduces herbicide costs by 80%.',
    imageType: 'weeder',
    specs: {
      speed: '0.8 m/s Precision Crawl',
      runtime: '6 Hours Active Spraying',
      sensors: 'Stereo RGB-D + Weed Classifier AI',
      coverage: '15 Acres / Day',
      connectivity: '4G LTE + RTK GPS (Sub-inch accuracy)',
      brain: 'Jetson Orin Nano + Dual ESP32 Sub-controllers'
    },
    features: [
      'Sub-centimeter weed identification and localized micro-spray nozzles',
      'Zero-drift droplet mechanism for volatile weather',
      'Real-time weed density heatmaps synced to mobile app',
      'Chemical tank level telemetry & automatic return-to-dock'
    ],
    pricing: {
      perAcre: '₹799 / Acre / Season',
      lease: '₹14,000 / Month (Seasonal Lease)',
      buy: '₹1,25,000 (Full Commercial Unit)'
    }
  },
  {
    id: 'scout',
    name: 'AgriSarthi Soil Core & Canopy Scout',
    subtitle: 'Deep Root Hydration & Micro-Climate Profiler',
    badge: 'Specialized Modular',
    status: 'Pre-Order / Commercial Trials',
    tagline: 'Extensible telescoping mast & automated soil penetrometer drill.',
    imageType: 'scout',
    specs: {
      speed: '1.0 m/s',
      runtime: '12 Hours Hybrid Solar',
      sensors: 'Soil Core Drill + NPK Spectral Probe + Canopy Cam',
      coverage: '35 Acres / Day',
      connectivity: 'Satellite IoT + 4G Fallback',
      brain: 'ESP32-S3 + Edge AI Soil ML model'
    },
    features: [
      'Automated robotic probe insertion up to 30cm depth',
      'Instant NPK (Nitrogen, Phosphorus, Potassium) analysis',
      'Telescoping 2-meter camera mast for under-canopy fruit & leaf inspection',
      'Autonomous solar recharge docking station compatibility'
    ],
    pricing: {
      perAcre: '₹599 / Acre / Run',
      lease: '₹11,000 / Month',
      buy: '₹89,000'
    }
  }
];

export const RAAS_PLANS = [
  {
    id: 'starter',
    name: 'Smallholder Scout',
    target: 'Ideal for 1 - 10 Acre Farms & Polyhouses',
    price: '₹4,999',
    period: '/ month',
    highlight: false,
    badge: 'Pay-as-You-Grow',
    features: [
      '1x AgriSarthi Sentinel Rover Deployment',
      'Daily 2x Scheduled Field Patrols',
      'Live Sensor Telemetry & Soil Moisture alerts',
      'WhatsApp Intruder & Pest Instant Notifications',
      'Cloud Dashboard access (Mobile & Web)',
      'Free rover maintenance & hardware replacement'
    ],
    cta: 'Select Starter Plan'
  },
  {
    id: 'pro',
    name: 'Commercial Farm Pro',
    target: 'Best for 10 - 50 Acre Commercial Plantations',
    price: '₹14,999',
    period: '/ month',
    highlight: true,
    badge: 'Most Popular for RaaS',
    features: [
      '2x AgriSarthi Rovers (1 Sentinel + 1 Weeder)',
      'Continuous 24/7 Autonomous Patrol & Security',
      'YOLOv8 Edge AI Vision & Thermal Anomaly Detection',
      'Automated Weed Micro-Spraying & Moisture Mapping',
      'Priority Field Technician Support (within 4 hours)',
      'Solar Automated Charging Station included',
      'Custom Agronomist PDF reports weekly'
    ],
    cta: 'Deploy Pro Fleet'
  },
  {
    id: 'enterprise',
    name: 'Estate & Cooperative',
    target: 'For 50+ Acres, Agro-Corporates & Universities',
    price: 'Custom',
    period: 'Tailored SLA',
    highlight: false,
    badge: 'Enterprise Fleet',
    features: [
      'Custom Fleet (5+ Multi-Purpose Rovers)',
      'Dedicated On-Site RTK-GPS Base Station',
      'Custom API Integration with Farm Management ERP',
      'Dedicated Robotics Field Engineer & SLA',
      'Custom AI Model Training for regional crop diseases',
      'Perimeter Security & Night Patrol Thermal Beacons'
    ],
    cta: 'Contact Enterprise Team'
  }
];
