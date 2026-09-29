# AgriSarthi — Autonomous AI-Powered Smart Farm Monitoring Rover
## Full Project Report · Agro-Yantra Initiative

---

> **"Your Farm. Monitored Continuously."**
>
> *AgriSarthi is an autonomous, low-cost agricultural rover platform empowering Indian farmers with 24/7 AI-driven field intelligence, real-time telemetry, and cloud-connected precision monitoring.*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Team & Institution](#2-team--institution)
3. [Awards & Recognition](#3-awards--recognition)
4. [Problem Statement](#4-problem-statement)
5. [Solution — AgriSarthi Platform Overview](#5-solution--agrisarthi-platform-overview)
6. [Hardware Architecture](#6-hardware-architecture)
7. [Sensor & Actuator Suite](#7-sensor--actuator-suite)
8. [AI & Computer Vision](#8-ai--computer-vision)
9. [Autonomous Navigation System](#9-autonomous-navigation-system)
10. [Software & Web Platform](#10-software--web-platform)
11. [AgriSarthi Command Console (Dashboard)](#11-agrisarthi-command-console-dashboard)
12. [Cloud Infrastructure & Deployment](#12-cloud-infrastructure--deployment)
13. [Bill of Materials & Cost Analysis](#13-bill-of-materials--cost-analysis)
14. [Business Model](#14-business-model)
15. [Market Opportunity](#15-market-opportunity)
16. [Scalability Roadmap](#16-scalability-roadmap)
17. [Impact & Benefits](#17-impact--benefits)
18. [Technology Stack Summary](#18-technology-stack-summary)
19. [Repository & Links](#19-repository--links)
20. [Appendix — File & Component Index](#20-appendix--file--component-index)

---

## 1. Executive Summary

**AgriSarthi** (translating to "Farming Companion" in Hindi) is a full-stack autonomous agricultural robotics platform developed under the **Agro-Yantra** initiative at **JSPM Narhe Technical Campus, Pune**. The project addresses a critical gap in Indian precision agriculture: the near-complete absence of affordable, intelligent, and continuous field monitoring tools for small-to-medium scale farmers.

The platform consists of three deeply integrated layers:

| Layer | Description |
|-------|-------------|
| **Rover Hardware** | Dual-controller (ESP32 + Raspberry Pi 4) 4WD autonomous chassis with a multi-sensor suite |
| **Edge AI Engine** | YOLOv8 Nano computer vision model running real-time inference on-device for pest, disease, and intruder detection |
| **Cloud Platform** | Full-stack React 19 web application with a 5-page public website, a fullscreen Firebase-connected telemetry console, and a RaaS business dashboard |

The project has been validated at prestigious national competitions — winning **Rs 2,00,000 in prize money at Techathon 3.0**, reaching the finals of **Eureka! (IIT Bombay)**, and receiving a **Regional Innovation Award at Smart India Hackathon (SIH)**.

---

## 2. Team & Institution

### Institution
**JSPM Narhe Technical Campus, Pune**
Department of Electronics & Computer Engineering

### Founding Team

| Name | Role | Focus Areas |
|------|------|-------------|
| **Ayush Matkar** | Co-Founder & Robotics Tech Developer | Robotics systems architecture, dual-brain hardware (ESP32 + Raspberry Pi 4), power electronics, motor control, mission control telemetry, full-stack web platform, cloud deployment |
| **Atharva Pachpol** | Co-Founder — Market Analysis, Research & AI Developer | Agricultural market research, Edge YOLOv8 AI vision inference, autonomous navigation kinematics, field deployment testing |

### Responsibilities in Detail

**Ayush Matkar** is responsible for:
- End-to-end rover hardware design and PCB layout planning
- ESP32 firmware development (motor loops, sensor polling, BMS integration)
- WebSocket real-time telemetry bridge between ESP32 and cloud
- React 19 multi-page web platform (full UI/UX design and development)
- Firebase Realtime Database integration for live sensor data
- Vercel cloud deployment pipeline and GitHub CI/CD

**Atharva Pachpol** is responsible for:
- Competitive agricultural market research and business modeling
- YOLOv8 Nano model training and optimization for Raspberry Pi edge inference
- OpenCV path-following and obstacle evasion algorithm development
- Field prototype testing and performance benchmarking
- Investor pitch deck and commercialization strategy

---

## 3. Awards & Recognition

### 1st Prize — Techathon 3.0
- **Prize:** Rs 2,00,000 Cash Grant
- **Host:** JSPM Narhe Technical Campus & Industry Partners
- **Reason:** *"Awarded for fully autonomous field navigation, innovative cost-effective dual-controller IoT architecture, and demonstrated real-time crop telemetry."*

### Eureka! — Asia's Largest Business Model Competition
- **Stage:** Top Agri-Tech Finalist
- **Host:** E-Cell, IIT Bombay
- **Reason:** *"Selected for high-scalability Robots-as-a-Service (RaaS) commercialization model targeting the Rs 42,000 Cr Indian precision agriculture market."*

### Smart India Hackathon (SIH) — Regional Innovation Award
- **Host:** Ministry of Education & AICTE, Government of India
- **Reason:** *"Recognized for edge computer vision pest detection pipeline and real-time farmer security alert architecture using passive infrared + YOLOv8 threat classification."*

---

## 4. Problem Statement

Over **85% of Indian farmers** lack access to any form of precision monitoring technology. The Indian agricultural sector faces a compound crisis that AgriSarthi is designed to solve:

### 4.1 Late Disease & Pest Detection
Traditional manual field inspection misses early-stage crop disease. By the time symptoms are visible to the naked eye, **30-40% foliage loss** has typically already occurred. Delayed intervention means reduced yield and increased pesticide spending.

### 4.2 Manual Monitoring Is Not Scalable
A single farmer cannot physically patrol a large field — especially during extreme heat, night hours, monsoon flooding, or multiple harvest cycles simultaneously. Human limitations create dangerous blind spots in crop health.

### 4.3 Irrigation Inefficiency
Without real-time soil moisture data, farmers rely on intuition or fixed schedules for irrigation. This leads to **over-irrigation** (soil waterlogging, root rot, water waste) or **under-irrigation** (drought stress, yield loss). India wastes an estimated **40% of irrigation water** due to poor timing.

### 4.4 Absence of Early Climate Risk Alerts
Droughts, heat waves, flash floods, and erratic rainfall directly damage crops with no early warning system in place. Farmers have no sensor-based mechanism to react to microclimate changes in real time.

### 4.5 Limited Connectivity & Expert Advisory
Remote farming areas often lack reliable internet and on-ground expert advisory. Farmers operate in an information vacuum — with no access to soil health data, pest libraries, or agronomist support.

### 4.6 Prohibitive Cost of Existing Solutions

| Existing Solution | Cost |
|------------------|------|
| Conventional Tractor | Rs 6,00,000+ |
| Commercial Agri-Drone | Rs 4,00,000+ |
| Imported Agri-Robot | Rs 2,50,000 – Rs 5,00,000 |
| **AgriSarthi Prototype** | **Rs 12,000** |
| **AgriSarthi Field-Ready V1** | **Rs 75,000 – Rs 1,00,000** |

AgriSarthi offers **10-40x cost reduction** compared to alternatives while delivering equivalent or superior monitoring capability.

---

## 5. Solution — AgriSarthi Platform Overview

AgriSarthi provides an autonomous rover platform that delivers:

### 5.1 Continuous 24/7 Field Monitoring
The autonomous rover collects real-time field data from multiple zones — soil moisture levels, ambient temperature, humidity, gas concentration, sound anomalies, and live camera footage — completely without human intervention.

### 5.2 Early Detection via Edge AI
The YOLOv8 Nano model runs directly on the Raspberry Pi 4 at the edge. It classifies:
- Human presence / farm workers
- Stray animals, pests, and invasive cattle
- Field hazards and physical obstacles
- Crop disease signatures and weed patches (expansion module)

This edge-first approach enables detection within milliseconds — even in low or no connectivity environments.

### 5.3 Works in Low Connectivity Zones
On-device Edge AI inference means the rover does not require an active internet connection to analyze threats. All sensor data is cached and synced to Firebase Realtime Database when connection becomes available.

### 5.4 Precision Resource Management
Real-time soil moisture intelligence enables data-driven irrigation timing. The rover identifies which field zones are critically dry vs. adequately irrigated, supporting targeted intervention and significant water savings.

### 5.5 Farmer Security & Nocturnal Alerts
The PIR motion sensor + YOLOv8 camera system detects intruders, stray livestock, and wildlife during night hours. Alerts are pushed immediately to the farmer's mobile dashboard.

---

## 6. Hardware Architecture

AgriSarthi uses a **Dual-Controller (Dual-Brain) design** — separating low-level real-time motor and sensor control from high-level AI and networking. This separation improves reliability, reduces latency, and allows independent hardware upgrades.

### 6.1 Dual-Controller Architecture

| Layer | Controller | Core Responsibilities |
|-------|-----------|----------------------|
| **Low-Level Control** | ESP32 Dual-Core (240 MHz) | Motor control via H-Bridge, sensor polling (soil, DHT22, MQ-2, PIR, ultrasonic), battery monitoring, BMS communication, low-latency serial telemetry to RPi4 |
| **High-Level Control** | Raspberry Pi 4 (4GB RAM) | 1080p/24 FPS video streaming, YOLOv8 Nano edge inference, OpenCV path-following algorithm, WebSocket server, Firebase HTTP sync, remote command decoding |

### 6.2 Communication Architecture

```
[Farm Field]                         [Cloud / Dashboard]
+-------------+   Serial/UART   +-----------------+   WebSocket/HTTP
|   ESP32     |<--------------->|  Raspberry Pi 4  |<-----------------> Firebase Realtime DB
|  (Firmware) |                 |   (Python + CV)  |                    Web Dashboard
+-------------+                 +-----------------+
      |                                 |
   Sensors                          Camera
 (Soil, DHT, MQ2,              (YOLOv8 Vision
  PIR, Ultrasonic)               Processing)
```

### 6.3 Chassis & Drivetrain

- **Platform:** 4WD Rocker-Bogie inspired all-terrain chassis
- **Motor Type:** High-torque DC geared motors (4x)
- **Motor Driver:** L298N dual H-Bridge / BTS7960 high-current driver
- **Wheels:** Large-diameter rubber-tread off-road wheels
- **Terrain Capability:** Soil furrows, grass, gravel, mild inclines (up to 15 degrees)

### 6.4 Power System

| Component | Specification |
|-----------|--------------|
| Battery | 12V 6.0Ah LiFePO4 / Li-Ion pack |
| BMS | 3S Smart Battery Management System with overcharge & over-discharge protection |
| Solar Charging | 25W flexible solar trickle-charge panel (rooftop mounted on chassis) |
| Onboard Regulators | 12V to 5V buck converters for RPi4 and ESP32 rails |
| Estimated Runtime | 4-6 hours continuous operation (8+ hours with solar assist) |

---

## 7. Sensor & Actuator Suite

| Sensor / Component | Model | Parameter Measured | Range |
|-------------------|-------|--------------------|-------|
| Soil Moisture | Capacitive Sensor | Volumetric water content | 0-100% |
| Temperature & Humidity | DHT22 | Ambient temp & RH | -40C to +80C / 0-100% RH |
| Gas Detection | MQ-2 | LPG, smoke, methane, CO, H2 | 200-10,000 ppm |
| Sound Level | Electret Mic Module | Ambient noise & anomaly | 40-120 dB |
| Motion Detection | PIR (HC-SR501) | Infrared motion presence | Up to 7m radius |
| Obstacle Detection | HC-SR04 Ultrasonic (x3) | Distance to obstacles | 2cm to 400cm |
| Camera | Pi Camera V2 / USB HD 120 FOV | Live video & AI inference | 1080p / 24+ FPS |
| Drivetrain | 4WD DC Geared Motors | Locomotion & steering | Variable speed PWM |
| Power | 12V Li-Ion + Solar | Field endurance | 6.0Ah, 25W solar |

---

## 8. AI & Computer Vision

### 8.1 Model: YOLOv8 Nano (Edge-Optimized)

- **Framework:** Ultralytics YOLOv8n
- **Hardware Target:** Raspberry Pi 4 (4GB RAM, ARM Cortex-A72)
- **Inference Speed:** 24+ FPS real-time detection
- **Model Size:** ~6.2 MB (.pt weights file)
- **Training:** Custom-trained on agricultural field dataset

### 8.2 Detection Classes

| Class | Purpose |
|-------|---------|
| Humans / Farm Workers | Distinguish between authorized workers and intruders |
| Stray Animals / Cattle | Detect livestock intrusion and crop damage risk |
| Pests / Insects | Early pest infestation identification (expansion module) |
| Field Hazards / Obstacles | Obstacles, rocks, standing water, debris |
| Crop Disease Signatures | Discoloration, lesions, wilting patterns (expansion) |
| Weeds | Unauthorized plant growth detection (expansion) |

### 8.3 Vision Pipeline

```
Camera Frame --> OpenCV Pre-processing --> YOLOv8n Inference --> Bounding Box Overlay
     |                                           |
 RTSP Stream                           Alert Classification
     |                                           |
Dashboard (WebSocket)              Firebase Push Notification
```

### 8.4 Performance Benchmarks

| Metric | Value |
|--------|-------|
| Inference Rate | 24+ FPS |
| Precision (mAP@0.5) | >78% on agricultural dataset |
| Latency (end-to-end) | <42ms per frame |
| Model Footprint | 6.2 MB |
| CPU Load on RPi4 | ~55-65% (single core) |

---

## 9. Autonomous Navigation System

### 9.1 Autonomous Mode (OpenCV Path-Following)

The rover uses a computer-vision-based row-following algorithm:

1. **Camera frame** is captured and converted to grayscale
2. **Gaussian blur** reduces noise in field imagery
3. **Canny edge detection** identifies crop row boundaries and furrow lines
4. **Hough Line Transform** extracts dominant directional vectors
5. **PID Controller** generates left/right PWM correction signals sent to ESP32 over UART
6. **Ultrasonic array** provides 3-sensor dead-reckoning collision avoidance — auto-stop and reroute when object detected within 40cm

### 9.2 Waypoint & Perimeter Patrol

- Pre-programmed GPS or encoder-based waypoint navigation
- Automatic perimeter patrol loop with configurable zone size
- Returns-to-base when battery falls below 15% (low-power recall mode)

### 9.3 Manual Remote Control Mode

- Low-latency WebSocket joystick and button interface via web dashboard
- D-pad + speed control from any browser (mobile and desktop)
- Camera pan/tilt control from the Mission Control HUD

---

## 10. Software & Web Platform

The AgriSarthi web platform is a production-grade **React 19** multi-page application built with **Vite 6**, deployed continuously on **Vercel**.

### 10.1 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 + Vite 6 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v3 (utility-first) |
| Icons | Lucide React |
| Build Tool | Vite (optimized production bundles ~506 KB JS / 102 KB CSS) |
| Hosting | Vercel (automatic GitHub deploys) |
| Database | Firebase Realtime Database (sensor telemetry) |
| Auth | Firebase Authentication (console login/signup) |
| Analytics | Firebase Analytics |

### 10.2 Website Route Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Industrial hero section, "Why AgriSarthi" accordion, live telemetry HUD preview, fleet status ticker, rover lineup selector, autonomy feature cards |
| `/rovers` | **Fleet / Rovers** | Modular fleet showcase (Sentinel, Weeder, Scout models), interactive chassis schematic, sensor callout overlays, spec badges, technical deep-dive modal |
| `/mission-control` | **Mission Control** | Pilot-seat HUD simulator, simulated live YOLOv8 camera stream with bounding boxes, virtual D-pad drive controls, real-time sensor dials, emergency triggers, WebGL 3D farm simulation toggle |
| `/services` | **Services** | Zero-CapEx RaaS subscription tiers, interactive Farm ROI & Payback Calculator, Dual-Brain hardware architecture diagram |
| `/about` | **About** | Awards & field proof section, 4-slide investor pitch deck carousel, founding team profiles with portraits, WhatsApp & lab contact form |
| `/console` | **Console** | Fullscreen embedded AgriSarthi command & telemetry console (Firebase-connected live dashboard) |
| `/legal` | **Legal** | Privacy policy, terms of service, safety guidelines |
| `*` | **404** | Branded "Lost Telemetry Signal" 404 page |

### 10.3 Key UI Components

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar.jsx` | `src/components/Navbar.jsx` | Fixed glassmorphic navigation bar with all route links, mobile drawer, CONSOLE entry point |
| `Hero.jsx` | `src/components/Hero.jsx` | Full-screen landing hero with animated telemetry overlay |
| `MissionControlDemo.jsx` | `src/components/MissionControlDemo.jsx` | Interactive pilot HUD simulator with live sensor readout |
| `RoiCalculator.jsx` | `src/components/RoiCalculator.jsx` | Interactive Farm ROI & payback period engine |
| `RaaSPricing.jsx` | `src/components/RaaSPricing.jsx` | Robots-as-a-Service pricing tier cards |
| `TechArchitecture.jsx` | `src/components/TechArchitecture.jsx` | Dual-Brain hardware architecture visualizer |
| `SimulationViewer.jsx` | `src/components/SimulationViewer.jsx` | WebGL Three.js 3D farm simulation embed |
| `BookDemoModal.jsx` | `src/components/BookDemoModal.jsx` | 3-step pilot deployment and demo booking modal |
| `RoverDeepDiveModal.jsx` | `src/components/RoverDeepDiveModal.jsx` | Rover technical blueprint & spec modal |
| `FleetSection.jsx` | `src/components/FleetSection.jsx` | Fleet status tiles and rover lineup |
| `ContactSection.jsx` | `src/components/ContactSection.jsx` | Lab contact form with WhatsApp integration |
| `ImpactAndProof.jsx` | `src/components/ImpactAndProof.jsx` | Award proof and field validation section |
| `InvestorRoom.jsx` | `src/components/InvestorRoom.jsx` | Pitch deck carousel for investors |
| `Footer.jsx` | `src/components/Footer.jsx` | Full-width site footer with navigation and legal |

### 10.4 Design System

The entire platform adheres to a 5-zone agricultural + industrial design language:

| Design Token | Value | Purpose |
|-------------|-------|---------|
| Earth Rover Editorial | `#f0f6f0` | Page background |
| OTTO Stone | `#dbe5db` | Card backgrounds |
| Obsidian Cockpit | `#090e0b` | Dark panels, console background |
| Warm Loam | `#faf6ee` | Warm section backgrounds |
| Chlorophyll Emerald | `#16a34a` / `#22c55e` | Primary accent & CTA |
| Telemetry Cyan | `#38bdf8` | Live data indicators |

**Typography Stack:**
- Headings: `Archivo` (700-900 weight, tight tracking)
- Display Accent: `Syne` (700-800 weight)
- Body: `Plus Jakarta Sans` (400-700 weight)
- Telemetry / Mono: `JetBrains Mono` (tracking 0.12em)

---

## 11. AgriSarthi Command Console (Dashboard)

The **Console** is a standalone, fullscreen telemetry and command platform accessed at `/console`. It is built as a static HTML/CSS/JS application embedded within the React website via a full-viewport `<iframe>`, providing a total immersive "mission control" experience.

### 11.1 Console Pages

| Page | File | Description |
|------|------|-------------|
| **Main Dashboard** | `dashboard.html` | Central telemetry hub — real-time sensor gauges (soil moisture, temperature, humidity, gas, sound), Chart.js time-series graphs, rover status panel, notification feed |
| **Soil Moisture Monitor** | `soil-moisture.html` | Deep-dive subsurface moisture matrix — per-zone moisture probes, historical moisture trend charts, robotic probe arm deployment log |
| **Temperature & Climate** | `temperature.html` | Live microclimate feed — DHT22 temperature, humidity, dew point, heat index charts, MQTT stream overlay |
| **Water Level Monitor** | `water-level.html` | Real-time reservoir level, irrigation actuator controls, hydraulic valve matrix status |
| **Plant Health AI** | `planthealth.html` | AI-powered plant health scoring, YOLOv8 crop disease detection feed, NDVI trend approximation |
| **Notifications** | `notifications.html` | Alert center — categorized threat, system, and environmental notification log |
| **3D Simulation** | `3d_model/index.html` | WebGL Three.js 3D farm field simulation with autonomous rover physics, waypoint navigation, and obstacle evasion |
| **Rover Control** | `roller.html` | Manual teleoperation panel — D-pad joystick, camera feed, speed control |
| **Admin Panel** | `admin.html` | Fleet management, user administration, rover configuration settings |
| **Login** | `login.html` | Firebase-authenticated login with industrial telemetry design |
| **Signup** | `signup.html` | New user provisioning portal |

### 11.2 Console Technology Stack

| Technology | Usage |
|-----------|-------|
| HTML5 / CSS3 | Full console UI structure and dark-theme styling |
| Vanilla JavaScript (ES6+) | Real-time sensor updates, chart rendering, Firebase sync |
| Firebase SDK v12 | Realtime Database reads/writes for live sensor data |
| Chart.js | Time-series and radial gauge charts |
| MQTT.js (CDN) | WebSocket-based MQTT topic subscription from ESP32 broker |
| Three.js (WebGL) | 3D farm simulation environment |
| Google Fonts | JetBrains Mono + Plus Jakarta Sans typography |

### 11.3 Firebase Configuration

The console is connected to the **AgriSarthi Firebase Project (`agri-sarthi-9849c`)**:

| Firebase Parameter | Value |
|-------------------|-------|
| Project ID | `agri-sarthi-9849c` |
| Auth Domain | `agri-sarthi-9849c.firebaseapp.com` |
| Storage Bucket | `agri-sarthi-9849c.firebasestorage.app` |
| Analytics | `G-BXXKFC0E8C` |

### 11.4 Console Navigation UX

- **Fullscreen Immersion:** Visiting `/console` hides the main website Navbar and Footer — the entire viewport is dedicated to the dashboard
- **Floating Back Button:** A minimal circular arrow button is fixed at the top-center, navigating back within the console's iframe history
- **AgriSarthi Logo to Homepage:** Clicking the AgriSarthi logo in any console page redirects the user back to the main website (`/`) via `window.top.location.href`

---

## 12. Cloud Infrastructure & Deployment

### 12.1 Hosting & CI/CD Pipeline

| Service | Role |
|---------|------|
| **Vercel** | Primary hosting — automatic builds triggered on every GitHub push |
| **GitHub** | Source control and CI trigger (`ayushmatkar27-del/Agrisarthi-robotics`) |
| **Vite** | Production bundler — 1878 modules transformed in ~6 seconds |
| **Firebase** | Realtime Database + Authentication + Analytics |

### 12.2 Build Output

```
dist/index.html                   4.47 kB   gzip:   1.60 kB
dist/assets/index.css           102.11 kB   gzip:  15.51 kB
dist/assets/index.js            506.06 kB   gzip: 137.47 kB
Build Time: ~6 seconds  |  1878 modules transformed
```

### 12.3 Repository Structure

```
Agro-Yantra/
+-- Smart farm monitoring rover/
    +-- src/
    |   +-- App.jsx                    # Root routing & telemetry engine
    |   +-- index.css                  # Global design tokens & utilities
    |   +-- components/                # 17 reusable React components
    |   +-- pages/                     # 8 route-level page components
    +-- public/
    |   +-- console/                   # Standalone console dashboard (11 HTML pages)
    |       +-- dashboard.html
    |       +-- soil-moisture.html
    |       +-- temperature.html
    |       +-- water-level.html
    |       +-- planthealth.html
    |       +-- notifications.html
    |       +-- login.html / signup.html / admin.html
    |       +-- roller.html (teleoperation)
    |       +-- 3d_model/ (WebGL Three.js simulation)
    +-- package.json
    +-- vite.config.js
    +-- AGRISARTHI_PROJECT_REPORT.md   (this file)
```

---

## 13. Bill of Materials & Cost Analysis

### 13.1 Prototype BOM — Rs 12,000 Total

| Component | Specification | Cost (INR) | Purpose |
|-----------|--------------|-----------|---------|
| Raspberry Pi 4 (4GB) + Heatsink + Fan | ARM Cortex-A72, 4GB LPDDR4 | Rs 4,500 | Runs YOLOv8 & OpenCV |
| ESP32 Dual-Core Dev Board | Xtensa LX6, 240 MHz, Wi-Fi + BT | Rs 450 | Motor loops & sensor polling |
| 4WD Rocker-Bogie Chassis & Wheels | All-terrain ABS frame | Rs 1,800 | Rover body platform |
| 4x High-Torque Geared DC Motors + Driver | L298N H-Bridge module | Rs 1,200 | Locomotion & steering |
| 12V Rechargeable Li-Ion Battery + BMS | 6.0Ah, 3S Smart BMS | Rs 1,600 | Overcharge protection, runtime |
| Sensor Suite | Soil, DHT22, MQ-2, HC-SR04 (x3), PIR | Rs 1,150 | Field data acquisition |
| HD Camera Rig + Pan-Tilt Mount | 120 degree Wide FOV, Pi Camera V2 | Rs 850 | Vision & AI inference |
| Wiring, Connectors, Buck Converters | 12V to 5V rails | Rs 450 | Power distribution |
| **TOTAL** | | **Rs 12,000** | **Lowest-cost smart farm rover** |

### 13.2 Production Cost Tiers

| Variant | Target Market | Cost (INR) | Key Additions |
|---------|--------------|-----------|--------------|
| Prototype V0 | Research & Demo | Rs 12,000 | Current BOM |
| Field-Ready V1 | Small Farms & FPOs | Rs 75,000 – Rs 1,00,000 | Weatherproofing, GPS, longer battery, 4G modem |
| Advanced V2 | Commercial Agriculture | ~Rs 3,00,000 | LIDAR, spray attachment, ARM soil probe, swarm mesh |

---

## 14. Business Model

AgriSarthi operates across four revenue streams targeting different customer segments:

### 14.1 Stream 1 — Rover Hardware Sales

Direct sale of the physical rover platform to farms, FPOs, agricultural research institutes, and government schemes.

| Product | Price |
|---------|-------|
| Prototype V0 | Rs 12,000 |
| Field-Ready V1 | Rs 75,000 – Rs 1,00,000 |
| Advanced V2 | ~Rs 3,00,000 |

### 14.2 Stream 2 — Farming-as-a-Service (FaaS / RaaS)

Zero capital expenditure for farmers — AgriSarthi deploys and maintains the rover; farmers pay a per-acre subscription fee.

| Service | Price |
|---------|-------|
| Monitoring + Advisory | Rs 250 – Rs 500 per acre/month |
| Targeted Spraying / Irrigation | Rs 350 – Rs 600 per acre/month |
| FPO Cluster (Multi-Rover) | Custom contract |

### 14.3 Stream 3 — Software & Data Services

SaaS subscription for AI-driven insights, crop health reports, and data analytics.

| Product | Price |
|---------|-------|
| App Subscription | Rs 999 – Rs 2,999 per month |
| AI Model Updates | Included in subscription |
| Aggregated Data for Cooperatives | Custom pricing |
| Agronomist API Integration | Partner licensing |

### 14.4 Stream 4 — AMC & Support Contracts

Annual Maintenance Contract for rover hardware, firmware, and on-site servicing.

| Service | Price |
|---------|-------|
| Standard AMC | Rs 15,000 / year |
| Premium AMC (On-site + Remote) | Rs 25,000 / year |
| Hardware Upgrade Path | Per-module pricing |

---

## 15. Market Opportunity

### 15.1 Addressable Market

| Market Layer | Size |
|-------------|------|
| **TAM** — Indian Precision Agriculture | Rs 42,000 Cr (~$5.2B) by 2028 |
| **SAM** — Commercial cash crops & horticulture | 28 Million Hectares |
| **SOM** — FPOs, progressive farms (Year 1-3) | Rs 500 Cr target |

### 15.2 Target Customer Segments

| Segment | Description | Willingness to Pay |
|---------|-------------|-------------------|
| Progressive Small Farmers | 1-5 acre holdings, crop diversification | Medium |
| Farmer Producer Organizations (FPOs) | Cluster deployments 50-500 acre | High |
| Large Commercial Farms | Horticulture, floriculture, export crops | Very High |
| Agricultural Research Institutes | ICAR, KVKs, SAUs | High (grants) |
| Government Schemes | PM-KISAN linked tech grants, ATMA | High (subsidy) |

### 15.3 Competitive Differentiation

| Differentiator | AgriSarthi | Competitors |
|---------------|------------|-------------|
| Cost | Rs 12,000 prototype | Rs 2.5L – Rs 6L+ |
| Edge AI | YOLOv8 on-device | Cloud-only |
| Connectivity Required | No (offline-capable) | Yes |
| RaaS Model | Yes | Limited |
| Open-source Compatible | Yes | Proprietary |

---

## 16. Scalability Roadmap

### Phase 1 — Individual Farmers (Year 1)
- Single-rover deployment per farm
- Monitoring + dashboard + basic alerts
- Subscription or purchase model
- Pilot with 100-500 farmers in Maharashtra

### Phase 2 — FPOs & Cooperatives (Year 2)
- Multi-rover cluster deployments (5-20 rovers per FPO)
- Centralized fleet management dashboard
- Cooperative data analytics for bulk advisory
- Integration with government crop insurance (PM Fasal Bima)

### Phase 3 — Large Commercial Agriculture (Year 3)
- Enterprise rover fleets (20-100 units)
- Integration with irrigation and spraying actuators
- Custom hardware for specific crops (vineyard, orchard, greenhouse)
- API integrations with ERP and farm management platforms

### Phase 4 — Swarm Robotics & Automation (Year 4-5)
- Multi-rover mesh network with inter-rover communication
- Swarm intelligence for coordinated field coverage
- Autonomous crop intervention (targeted spraying, seeding, pruning)
- AI crop health prediction with 14-day weather overlay

### Modular Expansion Pathway

```
Monitoring  -->  Understanding  -->  Acting  -->  Automating
(Sensors +       (AI Disease &      (Precision    (Full Swarm
 Camera)          Pest Analysis)     Irrigation &   Autonomy &
                                     Spraying)      Intervention)
```

---

## 17. Impact & Benefits

### For Farmers
- Real-time early alerts about crop disease, pest attacks, and security threats
- Remote field monitoring from mobile or desktop — no physical presence required
- Faster response and targeted intervention reduces crop loss
- Reduced manual labor for inspection (saving 2-4 hours/day)

### For Crops
- Early AI detection of disease at leaf-level before major spread
- Continuous 24/7 crop health monitoring eliminates blind spots
- Identifies crop stress (heat, drought, waterlogging) at the earliest stage
- Enables targeted, timely intervention — minimizing spread

### For Water & Resources
- Soil moisture-based irrigation timing eliminates over/under watering
- Optimized use of water, fertilizers, and chemical inputs
- Estimated **30-40% water savings** through precision irrigation timing
- Supports cost-efficient, data-driven farming decisions

### For the Environment
- Reduces overuse of pesticides and chemical inputs
- Heat stress and climate risk alerts enable proactive mitigation
- Drought and excess rainfall early indicators protect biodiversity
- Supports eco-friendly, sustainable farming practices

### Projected Farm Impact (Single Unit, Per Season)

| Metric | Estimated Improvement |
|--------|----------------------|
| Crop disease detection speed | 15-20 days earlier |
| Crop yield improvement | +12-25% |
| Water savings | 30-40% |
| Pesticide reduction | 20-30% |
| Manual inspection hours saved | 2-4 hours/day |

---

## 18. Technology Stack Summary

### Hardware Stack

| Layer | Technology |
|-------|-----------|
| Edge AI Processor | Raspberry Pi 4 (4GB, ARM Cortex-A72) |
| Real-time Controller | ESP32 Dual-Core (Xtensa LX6, 240 MHz) |
| AI Framework | Ultralytics YOLOv8 Nano |
| Vision | OpenCV 4 (path following, pre-processing) |
| Communication | Serial UART (ESP32 to RPi4), WebSocket (RPi4 to Cloud), MQTT |
| Power | 12V LiFePO4 + 3S BMS + 25W Solar |

### Software Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 19 |
| Build Tool | Vite 6 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Charts (Console) | Chart.js |
| 3D Simulation | Three.js (WebGL) |
| Real-time Data | Firebase Realtime Database |
| Auth | Firebase Authentication |
| Analytics | Firebase Analytics |
| MQTT Client | MQTT.js (browser CDN) |
| Hosting | Vercel |
| CI/CD | GitHub to Vercel Auto-Deploy |

### Python Backend (Rover-Side, Raspberry Pi 4)

| Tool | Usage |
|------|-------|
| Python 3.11 | Main RPi4 application runtime |
| Ultralytics YOLOv8 | Model inference |
| OpenCV (cv2) | Camera capture + path detection |
| paho-mqtt | MQTT publish to broker |
| flask / websockets | Dashboard API + WebSocket server |
| pyserial | UART communication with ESP32 |

---

## 19. Repository & Links

| Resource | Link |
|---------|------|
| **GitHub Repository** | https://github.com/ayushmatkar27-del/Agrisarthi-robotics |
| **Live Website** | Deployed via Vercel (auto-builds from `main` branch) |
| **Firebase Project** | `agri-sarthi-9849c` on Firebase Console |
| **Competition — Techathon 3.0** | JSPM Narhe Technical Campus |
| **Competition — Eureka!** | E-Cell IIT Bombay |
| **Competition — SIH** | Smart India Hackathon (Ministry of Education, AICTE) |

---

## 20. Appendix — File & Component Index

### React Web Platform (`src/`)

```
src/
+-- App.jsx                          # Root — routing, telemetry engine, modals
+-- index.css                        # Global CSS design tokens
+-- main.jsx                         # Vite entry point
+-- components/
|   +-- AgriSarthiLogo.jsx           # SVG brand logo component
|   +-- BookDemoModal.jsx            # 3-step pilot booking modal
|   +-- ContactSection.jsx           # Lab contact + WhatsApp form
|   +-- FleetSection.jsx             # Fleet status ticker + rover tiles
|   +-- Footer.jsx                   # Site-wide footer
|   +-- Hero.jsx                     # Home hero (animated telemetry overlay)
|   +-- ImpactAndProof.jsx           # Awards + field proof section
|   +-- InvestorRoom.jsx             # Investor pitch deck carousel
|   +-- LiveStatusTicker.jsx         # Real-time fleet status ticker
|   +-- MissionControlDemo.jsx       # Pilot HUD simulator
|   +-- Navbar.jsx                   # Fixed nav bar + mobile drawer
|   +-- RaaSPricing.jsx              # RaaS subscription tier cards
|   +-- RoiCalculator.jsx            # Farm ROI payback engine
|   +-- RoverDeepDiveModal.jsx       # Technical blueprint modal
|   +-- ScrollReveal.jsx             # Scroll-triggered entrance animations
|   +-- SimulationViewer.jsx         # WebGL Three.js simulation embed
|   +-- TechArchitecture.jsx         # Dual-Brain architecture visualizer
+-- pages/
    +-- AboutPage.jsx                # /about
    +-- ConsolePage.jsx              # /console — fullscreen iframe wrapper
    +-- HomePage.jsx                 # / — hero, features, fleet
    +-- LegalPage.jsx                # /legal — privacy & terms
    +-- MissionControlPage.jsx       # /mission-control — HUD simulator
    +-- NotFoundPage.jsx             # * — 404 page
    +-- RoversPage.jsx               # /rovers — fleet showcase
    +-- ServicesPage.jsx             # /services — RaaS + ROI
```

### AgriSarthi Console (`public/console/`)

```
public/console/
+-- dashboard.html                   # Main telemetry hub (Firebase + Chart.js)
+-- soil-moisture.html               # Soil moisture matrix & probe log
+-- temperature.html                 # Climate telemetry & MQTT feed
+-- water-level.html                 # Reservoir level & irrigation controls
+-- planthealth.html                 # AI plant health scoring
+-- notifications.html               # Alert notification center
+-- roller.html                      # Manual teleoperation panel
+-- admin.html                       # Fleet admin & config panel
+-- login.html                       # Firebase-authenticated login
+-- signup.html                      # User registration portal
+-- script.js                        # Shared JS utilities
+-- style.css                        # Shared console base styles
+-- app.py                           # Python backend (Raspberry Pi)
+-- requirements.txt                 # Python dependencies
+-- yolov8n.pt                       # YOLOv8 Nano model weights (6.2 MB)
+-- 3d_model/
    +-- index.html                   # Three.js simulation entry
    +-- farm.js                      # 3D farm environment builder
    +-- rover.js                     # Rover physics model
    +-- simulation.js                # Autonomous navigation simulation
    +-- textures.js                  # WebGL texture loader
    +-- style.css                    # 3D viewer styles
```

---

## Document Information

| Field | Value |
|-------|-------|
| **Project Name** | AgriSarthi — Autonomous Smart Farm Monitoring Rover |
| **Initiative** | Agro-Yantra |
| **Version** | v2.4 (2026 Production Release) |
| **Date** | September 2026 |
| **Authors** | Ayush Matkar, Atharva Pachpol |
| **Institution** | JSPM Narhe Technical Campus, Pune |
| **Department** | Electronics & Computer Engineering |
| **Report Type** | Full Technical + Business Project Report |
| **Repository** | https://github.com/ayushmatkar27-del/Agrisarthi-robotics |

---

*This report is confidential and intended for academic evaluation, investor review, and internal team reference. All hardware specifications, cost data, and business projections are based on current prototype status and market research conducted as of September 2026.*

---
*© 2026 AgriSarthi Robotics — Agro-Yantra Initiative. All rights reserved.*
