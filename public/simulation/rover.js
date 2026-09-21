/**
 * AgriSarthi 3D Rover Model Builder (High-Fidelity Engineering Prototype)
 * Procedural Three.js 3D model featuring photorealistic hardware components:
 * - V-Slot Aluminum Extrusion Chassis Frame
 * - Independent Helical Coil Spring Suspension & 4WD Chevron Tractor Tires
 * - Raspberry Pi 4 (Edge AI Core) with heatsink, dual USB 3.0, Ethernet, GPIO
 * - ESP32 Microcontroller with RF shield, microUSB, and jumper wiring
 * - Articulated Pan-Tilt USB Camera with multi-element optical lens
 * - Dual-Prong Soil Moisture Probe with gold-plated contacts & furrow immersion
 * - DHT22 Temperature & Humidity Sensor with ventilation louvers
 * - MQ-135 Hazardous Gas & Air Quality Sensor with stainless steel wire dome
 * - HC-SR04 Ultrasonic Obstacle Detection Array with transmitter/receiver cans
 * - PIR Motion Sensor with multifaceted Fresnel dome
 * - High-Gain GPS Ceramic Patch Antenna
 * - Polyethylene Water Tank, 12V Diaphragm Pump, and Dual Brass Atomizer Nozzles
 * - 12V 10Ah LiFePO4 Battery Pack with BMS LED gauge
 * - Industrial Red Emergency Stop (E-Stop) Twist Button
 * - 0.96" OLED System Diagnostic Display
 */

const ROVER_COMPONENTS = {
    rpi4: {
        title: "Raspberry Pi 4 (Edge AI Core)",
        category: "Processing & Intelligence Subsystem",
        specs: "Broadcom BCM2711, Quad-Core Cortex-A72 @ 1.5GHz, 4GB LPDDR4, Local SQLite",
        role: "The central intelligence brain. Executes on-device OpenCV computer vision and YOLOv8n inference locally in ~42ms per frame. Performs multi-modal sensor fusion offline without relying on continuous 4G/cloud signals in rural fields.",
        cameraOffset: { x: 0.6, y: 0.6, z: 0.6 },
        focusOffset: { x: 0.15, y: 0.88, z: 0.18 }
    },
    esp32: {
        title: "ESP32 Microcontroller",
        category: "Real-Time Sensor & Motor Interface",
        specs: "Dual-Core Xtensa 32-bit LX6 @ 240MHz, 520KB SRAM, Wi-Fi 802.11b/g/n & BLE",
        role: "Handles microsecond-level hardware control: reads analog soil moisture levels, DHT22 digital pulse timings, gas sensor ADC channels, and generates motor PWM signals for differential 4WD steering.",
        cameraOffset: { x: 0.6, y: 0.5, z: -0.6 },
        focusOffset: { x: 0.15, y: 0.88, z: -0.22 }
    },
    camera: {
        title: "USB Crop Monitoring Camera",
        category: "Computer Vision & Edge Detection",
        specs: "1080p FHD, 120° Wide-Angle Distortion-Free Lens, Pan-Tilt Servos",
        role: "Captures high-resolution leaf canopy imagery as the rover navigates crop rows. Directly feeds frames to the on-device YOLO model to detect early-stage foliar blight, powdery mildew, and insect infestations.",
        cameraOffset: { x: 0.9, y: 0.4, z: 0.6 },
        focusOffset: { x: 0.58, y: 1.45, z: 0 }
    },
    soil_probe: {
        title: "Soil Moisture Dual-Prong Probe",
        category: "Sub-Surface Telemetry",
        specs: "Corrosion-Resistant Gold-Plated Electrodes, Capacitive High-Impedance Sensor",
        role: "Continuously probes the topsoil in crop furrows to measure volumetric water content (% VWC). Essential input to the Water Stress Engine: triggers automated irrigation alerts when combined with high canopy heat.",
        cameraOffset: { x: 0.7, y: 0.4, z: 0.6 },
        focusOffset: { x: 0.88, y: 0.35, z: 0.38 }
    },
    dht22: {
        title: "DHT22 Canopy Climate Sensor",
        category: "Micro-Climate Monitoring",
        specs: "Temp: -40 to 80°C (±0.5°C), Humidity: 0-100% RH (±2% RH), 0.5Hz Sampling",
        role: "Monitors the ambient micro-climate directly beneath the crop canopy. High ambient humidity combined with elevated temperatures creates optimal conditions for fungal sporulation, triggering preventive advisories.",
        cameraOffset: { x: 0.5, y: 0.4, z: -0.6 },
        focusOffset: { x: 0.40, y: 0.92, z: -0.36 }
    },
    mq135: {
        title: "MQ-135 Air Quality & Gas Sensor",
        category: "Environmental Hazard Detection",
        specs: "SnO2 Sensitive Layer, Detects NH3, NOx, Benzene, Smoke, CO2 (10-1000 ppm)",
        role: "Detects ammonia build-up from improper fertilizer decay, anaerobic decomposition vapors in waterlogged roots, and smoke from agricultural field burns or stubble fires.",
        cameraOffset: { x: 0.5, y: 0.4, z: 0.6 },
        focusOffset: { x: 0.38, y: 0.90, z: 0.36 }
    },
    ultrasonic: {
        title: "HC-SR04 Ultrasonic Obstacle Array",
        category: "Autonomous Navigation & Field Safety",
        specs: "40kHz Sonic Pulses, Range: 2cm - 400cm, 15° Cone, Triple-Bumper Array",
        role: "Scans ahead for crop stalks, furrows, irrigation pipes, humans, or farm animals. Feeds directly into the obstacle avoidance algorithm to calculate immediate steering offsets.",
        cameraOffset: { x: 0.8, y: 0.3, z: 0.4 },
        focusOffset: { x: 0.97, y: 0.55, z: 0 }
    },
    pir: {
        title: "PIR Wildlife & Motion Sensor",
        category: "Farm Security & Intrusion Alert",
        specs: "Pyroelectric Dual-Element Sensor, Multifaceted Fresnel Dome, 7m Range",
        role: "Passively monitors for night-time animal intrusions (wild boars, stray cattle) or human unauthorized access, instantly waking the camera and telemetry subsystem.",
        cameraOffset: { x: 0.6, y: 0.4, z: -0.6 },
        focusOffset: { x: 0.55, y: 0.88, z: -0.38 }
    },
    gps: {
        title: "High-Precision GPS Antenna",
        category: "Geospatial Localization",
        specs: "U-blox Active Ceramic Patch Antenna, Multi-GNSS, 2.5m CEP Accuracy",
        role: "Geotags every single sensor observation, leaf disease finding, and soil moisture record to generate high-resolution farm GIS spatial heatmaps.",
        cameraOffset: { x: 0.6, y: 0.5, z: 0.6 },
        focusOffset: { x: -0.25, y: 1.40, z: 0 }
    },
    sprayer: {
        title: "Targeted Micro-Sprayer & Nozzles",
        category: "Precision Intervention Actuator",
        specs: "12V 4.0L/min Diaphragm Pump, Dual Brass Atomizing Mist Nozzles, 60 PSI",
        role: "Enables ultra-targeted spot spraying of bio-pesticides or micronutrient solutions directly onto affected leaves identified by the computer vision model, cutting chemical usage by up to 85%.",
        cameraOffset: { x: -0.7, y: 0.4, z: 0.8 },
        focusOffset: { x: -0.55, y: 0.55, z: 0.82 }
    },
    tank: {
        title: "Liquid Reservoir Tank",
        category: "Fluid Storage Subsystem",
        specs: "2.5 Litre HDPE Translucent Tank with Graduated Level Scale & Float Sensor",
        role: "Stores targeted liquid solutions with built-in level sensing to notify the farmer via dashboard when refilling is needed.",
        cameraOffset: { x: -0.6, y: 0.6, z: 0.6 },
        focusOffset: { x: -0.25, y: 0.98, z: 0.15 }
    },
    battery: {
        title: "Lithium Power Subsystem",
        category: "Energy Storage",
        specs: "12.8V 10Ah LiFePO4 Battery with Integrated Smart BMS & 4-Level LED Bar",
        role: "Delivers 4-6 hours of continuous autonomous field scouting and edge compute. Stable discharge voltage protects the Raspberry Pi from brownouts.",
        cameraOffset: { x: -0.6, y: 0.5, z: -0.6 },
        focusOffset: { x: -0.45, y: 0.90, z: -0.16 }
    },
    wheels: {
        title: "4WD High-Torque Locomotion",
        category: "Drive & Suspension",
        specs: "4x 12V 100RPM Geared DC Motors with Dual Helical Springs & Mud Cleats",
        role: "Powers the rover across heavy farm furrows, muddy soil, and loose earth with differential zero-radius turning capability.",
        cameraOffset: { x: 0.8, y: 0.5, z: 0.9 },
        focusOffset: { x: 0.6, y: 0.42, z: 0.68 }
    }
};

class Rover3D {
    constructor() {
        this.group = new THREE.Group();
        this.interactiveMeshes = [];
        this.componentMeshes = {};
        this.wheels = [];
        this.sonarWaves = [];
        this.sprayParticles = null;
        this.spraying = false;
        this.visionCone = null;
        this.cameraHead = null;
        this.oledCanvas = null;
        this.oledTexture = null;

        this.initMaterials();
        this.buildChassis();
        this.buildWheels();
        this.buildComputingLayer();
        this.buildSensors();
        this.buildActuators();
        this.buildCablesAndDetails();
        this.buildSonarFX();
        this.buildVisionConeFX();
        this.buildSprayFX();
    }

    initMaterials() {
        const tex = window.TextureGenerator;

        // Realistic Materials
        this.matChassis = new THREE.MeshStandardMaterial({
            color: 0x1e293b,
            roughness: 0.4,
            metalness: 0.7,
            bumpMap: tex ? tex.createSoilBumpMap() : null,
            bumpScale: 0.005
        });

        this.matBrushedAlum = new THREE.MeshStandardMaterial({
            color: 0xd1d5db,
            roughness: 0.25,
            metalness: 0.85,
            map: tex ? tex.createBrushedMetalTexture() : null
        });

        this.matAccentGreen = new THREE.MeshStandardMaterial({
            color: 0x15803d, // AgriSarthi Brand Dark Green
            roughness: 0.35,
            metalness: 0.5
        });

        this.matRubber = new THREE.MeshStandardMaterial({
            color: 0x171717,
            roughness: 0.9,
            metalness: 0.05,
            map: tex ? tex.createTireTreadTexture() : null,
            bumpScale: 0.04
        });

        this.matGold = new THREE.MeshStandardMaterial({
            color: 0xd97706,
            roughness: 0.2,
            metalness: 0.9
        });

        this.matPCBGreen = new THREE.MeshStandardMaterial({
            color: 0x065f46,
            roughness: 0.4,
            metalness: 0.3
        });

        this.matPCBDark = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.4,
            metalness: 0.4
        });

        this.matWhitePlastic = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            roughness: 0.25,
            metalness: 0.05
        });

        this.matGlassLens = new THREE.MeshPhysicalMaterial({
            color: 0x1e3a8a,
            roughness: 0.05,
            metalness: 0.1,
            transmission: 0.9,
            transparent: true,
            opacity: 0.95
        });

        this.matHDPE = new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            roughness: 0.2,
            transmission: 0.7,
            transparent: true,
            opacity: 0.65
        });

        this.matSpring = new THREE.MeshStandardMaterial({
            color: 0xef4444, // Red sport suspension springs
            roughness: 0.3,
            metalness: 0.8
        });
    }

    registerComponent(mesh, componentKey) {
        mesh.userData = {
            componentKey: componentKey,
            info: ROVER_COMPONENTS[componentKey]
        };
        this.interactiveMeshes.push(mesh);
        this.componentMeshes[componentKey] = mesh;
    }

    buildChassis() {
        // --- 1. Dual V-Slot Aluminum Extrusion Side Rails (2020 Aluminum) ---
        [-0.45, 0.45].forEach(z => {
            const railGeom = new THREE.BoxGeometry(1.65, 0.05, 0.05);
            const rail = new THREE.Mesh(railGeom, this.matBrushedAlum);
            rail.position.set(0, 0.48, z);
            rail.castShadow = true;
            this.group.add(rail);

            // Black anodized corner bracket blocks
            [-0.75, 0, 0.75].forEach(x => {
                const corner = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), this.matChassis);
                corner.position.set(x, 0.48, z);
                this.group.add(corner);
            });
        });

        // Cross Struts
        [-0.75, -0.25, 0.25, 0.75].forEach(x => {
            const cross = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.85), this.matBrushedAlum);
            cross.position.set(x, 0.48, 0);
            cross.castShadow = true;
            this.group.add(cross);
        });

        // --- 2. Main Equipment Deck Plate (Laser-cut Aluminum with Green Powder Coat) ---
        const deckGeom = new THREE.BoxGeometry(1.5, 0.04, 0.9);
        const deck = new THREE.Mesh(deckGeom, this.matAccentGreen);
        deck.position.set(0, 0.52, 0);
        deck.castShadow = true;
        deck.receiveShadow = true;
        this.group.add(deck);

        // --- 3. Electronics Enclosure (Weatherproof Box with Vented Sides) ---
        const encGeom = new THREE.BoxGeometry(1.2, 0.32, 0.75);
        const enc = new THREE.Mesh(encGeom, this.matChassis);
        enc.position.set(0, 0.70, 0);
        enc.castShadow = true;
        this.group.add(enc);

        // Acrylic Transparent Top Lid to view internal compute
        const lidGeom = new THREE.BoxGeometry(1.16, 0.02, 0.71);
        const lid = new THREE.Mesh(lidGeom, new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.1,
            transmission: 0.85,
            transparent: true,
            opacity: 0.4
        }));
        lid.position.set(0, 0.86, 0);
        this.group.add(lid);

        // Heavy Front Steel Bull-Bar Bumper
        const bumperGeom = new THREE.CylinderGeometry(0.03, 0.03, 1.1, 16);
        bumperGeom.rotateX(Math.PI / 2);
        const bumper = new THREE.Mesh(bumperGeom, this.matBrushedAlum);
        bumper.position.set(0.92, 0.52, 0);
        bumper.castShadow = true;
        this.group.add(bumper);

        // Side Bumper Bars
        [-0.52, 0.52].forEach(z => {
            const sideBar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 12), this.matBrushedAlum);
            sideBar.rotation.z = Math.PI / 2;
            sideBar.position.set(0, 0.65, z);
            this.group.add(sideBar);
        });

        // Industrial Emergency Stop (E-Stop) Twist Button
        const estopBase = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.03, 16), this.matGold);
        estopBase.position.set(-0.55, 0.88, 0.32);
        this.group.add(estopBase);

        const estopMushroom = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.035, 16), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 }));
        estopMushroom.position.set(-0.55, 0.91, 0.32);
        this.group.add(estopMushroom);

        // OLED Status Display 0.96"
        this.buildOLEDDisplay();
    }

    buildOLEDDisplay() {
        const oledCanvas = document.createElement('canvas');
        oledCanvas.width = 256;
        oledCanvas.height = 128;
        const ctx = oledCanvas.getContext('2d');

        ctx.fillStyle = '#050c18';
        ctx.fillRect(0, 0, 256, 128);

        // Blue OLED text
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('AGRISARTHI V1', 12, 32);

        ctx.font = '15px monospace';
        ctx.fillStyle = '#22c55e';
        ctx.fillText('STATUS: EDGE_ACTIVE', 12, 60);

        ctx.fillStyle = '#facc15';
        ctx.fillText('YOLO: 41ms | BATT: 92%', 12, 85);
        ctx.fillText('IP: 192.168.4.1 (ESP32)', 12, 110);

        this.oledTexture = new THREE.CanvasTexture(oledCanvas);
        const oledGeom = new THREE.PlaneGeometry(0.18, 0.09);
        const oledMesh = new THREE.Mesh(oledGeom, new THREE.MeshBasicMaterial({ map: this.oledTexture }));
        oledMesh.position.set(0.601, 0.72, -0.15);
        oledMesh.rotation.y = Math.PI / 2;
        this.group.add(oledMesh);
    }

    buildWheels() {
        const wheelCoords = [
            { x: 0.62, z: 0.68, side: 'FL' },
            { x: 0.62, z: -0.68, side: 'FR' },
            { x: -0.62, z: 0.68, side: 'RL' },
            { x: -0.62, z: -0.68, side: 'RR' }
        ];

        wheelCoords.forEach(pos => {
            const wheelAssembly = new THREE.Group();
            wheelAssembly.position.set(pos.x, 0.42, pos.z);

            // 1. High-Lug Chevron Agricultural Tire
            const tireGeom = new THREE.CylinderGeometry(0.40, 0.40, 0.28, 24);
            tireGeom.rotateX(Math.PI / 2);
            const tire = new THREE.Mesh(tireGeom, this.matRubber);
            tire.castShadow = true;
            wheelAssembly.add(tire);

            // 2. High-Strength Rim with 5 spokes
            const rimGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.29, 16);
            rimGeom.rotateX(Math.PI / 2);
            const rim = new THREE.Mesh(rimGeom, this.matAccentGreen);
            wheelAssembly.add(rim);

            // Center Hub Nut
            const nutGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.31, 6);
            nutGeom.rotateX(Math.PI / 2);
            const nut = new THREE.Mesh(nutGeom, this.matBrushedAlum);
            wheelAssembly.add(nut);

            // 3. Realistic Helical Spring Shock Strut
            const shockGroup = new THREE.Group();
            shockGroup.position.set(0, 0.15, pos.z > 0 ? -0.14 : 0.14);

            // Central Piston Shaft
            const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 12), this.matBrushedAlum);
            shockGroup.add(piston);

            // Red Coiled Helical Spring around piston
            for (let i = 0; i < 7; i++) {
                const coilRing = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.007, 8, 16), this.matSpring);
                coilRing.rotation.x = Math.PI / 2;
                coilRing.position.y = -0.10 + i * 0.032;
                shockGroup.add(coilRing);
            }
            wheelAssembly.add(shockGroup);

            this.registerComponent(tire, 'wheels');
            this.wheels.push(wheelAssembly);
            this.group.add(wheelAssembly);
        });
    }

    buildComputingLayer() {
        // --- 1. Raspberry Pi 4 Model B (Edge AI Compute Brain) ---
        const rpiGroup = new THREE.Group();
        rpiGroup.position.set(0.15, 0.88, 0.18);

        // Green FR-4 PCB Board with copper mounting holes
        const pcbGeom = new THREE.BoxGeometry(0.34, 0.015, 0.24);
        const pcb = new THREE.Mesh(pcbGeom, this.matPCBGreen);
        pcb.castShadow = true;
        rpiGroup.add(pcb);

        // Aluminum Finned CPU Heatsink
        const heatsinkBase = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.02, 0.11), this.matBrushedAlum);
        heatsinkBase.position.set(-0.04, 0.018, -0.02);
        rpiGroup.add(heatsinkBase);

        // Heatsink cooling fins
        for (let i = 0; i < 5; i++) {
            const fin = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.03, 0.012), this.matBrushedAlum);
            fin.position.set(-0.04, 0.032, -0.06 + i * 0.022);
            rpiGroup.add(fin);
        }

        // Quad USB Port Blocks (2x USB 3.0 Blue, 2x USB 2.0 Black)
        const usb3 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.055, 0.06), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6 }));
        usb3.position.set(0.13, 0.035, 0.05);
        rpiGroup.add(usb3);

        const usb2 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.055, 0.06), this.matChassis);
        usb2.position.set(0.13, 0.035, -0.02);
        rpiGroup.add(usb2);

        // RJ45 Ethernet Port Block
        const rj45 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.055, 0.065), this.matBrushedAlum);
        rj45.position.set(0.13, 0.035, -0.085);
        rpiGroup.add(rj45);

        // 40-Pin GPIO Header (Gold pins)
        const gpioBlock = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.025, 0.02), this.matChassis);
        gpioBlock.position.set(-0.03, 0.02, -0.10);
        rpiGroup.add(gpioBlock);

        // Acrylic Protective Top Case with laser engravings
        const caseGeom = new THREE.BoxGeometry(0.38, 0.10, 0.28);
        const rpiCase = new THREE.Mesh(caseGeom, new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.1,
            transmission: 0.7,
            transparent: true,
            opacity: 0.45
        }));
        rpiCase.position.set(0, 0.04, 0);
        rpiGroup.add(rpiCase);

        this.registerComponent(rpiCase, 'rpi4');
        this.group.add(rpiGroup);

        // --- 2. ESP32 NodeMCU Development Board ---
        const espGroup = new THREE.Group();
        espGroup.position.set(0.15, 0.88, -0.22);

        // Black PCB
        const espPCB = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.015, 0.14), this.matPCBDark);
        espGroup.add(espPCB);

        // ESP-WROOM-32 Metal RF Shielding Can with copper trace antenna
        const shield = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.018, 0.085), this.matBrushedAlum);
        shield.position.set(-0.04, 0.016, 0);
        espGroup.add(shield);

        // PCB Antenna serpentine trace
        const antTrace = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.016, 0.085), this.matGold);
        antTrace.position.set(-0.09, 0.016, 0);
        espGroup.add(antTrace);

        // MicroUSB connector
        const usb = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.018, 0.035), this.matBrushedAlum);
        usb.position.set(0.11, 0.016, 0);
        espGroup.add(usb);

        // Hitbox
        const espHit = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.09, 0.18), new THREE.MeshBasicMaterial({ visible: false }));
        espGroup.add(espHit);
        this.registerComponent(espHit, 'esp32');

        this.group.add(espGroup);

        // --- 3. 12V 10Ah LiFePO4 Lithium Battery Subsystem ---
        const battGroup = new THREE.Group();
        battGroup.position.set(-0.45, 0.90, -0.16);

        // Sealed blue casing with yellow terminal caps
        const battBox = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.19, 0.28), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.4 }));
        battBox.castShadow = true;
        battGroup.add(battBox);

        // BMS 4-Segment Green LED Power Level Meter
        for (let i = 0; i < 4; i++) {
            const bar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.015, 0.01), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
            bar.position.set(-0.09 + i * 0.06, 0.065, 0.145);
            battGroup.add(bar);
        }

        this.registerComponent(battBox, 'battery');
        this.group.add(battGroup);
    }

    buildSensors() {
        // --- 1. USB Crop Camera on Carbon-Fiber Mast with Pan/Tilt Head ---
        const camGroup = new THREE.Group();
        camGroup.position.set(0.55, 0.85, 0);

        // Rigid Carbon Mast
        const mastGeom = new THREE.CylinderGeometry(0.032, 0.035, 0.65, 16);
        const mast = new THREE.Mesh(mastGeom, this.matChassis);
        mast.position.y = 0.32;
        mast.castShadow = true;
        camGroup.add(mast);

        // Pan/Tilt Dual-Servo Bracket
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.10, 0.12), this.matAccentGreen);
        bracket.position.y = 0.65;
        camGroup.add(bracket);

        // Camera Head Assembly
        this.cameraHead = new THREE.Group();
        this.cameraHead.position.set(0.05, 0.72, 0);

        // Camera Body
        const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.11, 0.12), this.matWhitePlastic);
        this.cameraHead.add(camBody);

        // Multi-Element Optical Lens Housing
        const lensHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.09, 20), this.matChassis);
        lensHousing.rotateZ(Math.PI / 2);
        lensHousing.position.x = 0.10;
        this.cameraHead.add(lensHousing);

        // Front Anti-Reflective Optical Glass Element
        const glassElement = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.01, 20), this.matGlassLens);
        glassElement.rotateZ(Math.PI / 2);
        glassElement.position.x = 0.146;
        this.cameraHead.add(glassElement);

        const camHit = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.24), new THREE.MeshBasicMaterial({ visible: false }));
        camHit.position.y = 0.72;
        camGroup.add(camHit);
        this.registerComponent(camHit, 'camera');

        camGroup.add(this.cameraHead);
        this.group.add(camGroup);

        // --- 2. Soil Moisture Dual-Prong Probe (Furrow Ground Level) ---
        const probeGroup = new THREE.Group();
        probeGroup.position.set(0.88, 0.42, 0.38);

        // Sensor Head Circuit Board
        const probeHead = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.035), this.matPCBGreen);
        probeGroup.add(probeHead);

        // Indicator LED
        const probeLed = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.008), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        probeLed.position.set(0, 0.04, 0.02);
        probeGroup.add(probeLed);

        // Dual Gold-Plated Electrodes extending downward into furrow soil
        [-0.022, 0.022].forEach(x => {
            const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.003, 0.48, 8), this.matGold);
            prong.position.set(x, -0.24, 0);
            probeGroup.add(prong);
        });

        const probeHit = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.55, 0.20), new THREE.MeshBasicMaterial({ visible: false }));
        probeGroup.add(probeHit);
        this.registerComponent(probeHit, 'soil_probe');
        this.group.add(probeGroup);

        // --- 3. DHT22 Temperature & Humidity Sensor ---
        const dhtGroup = new THREE.Group();
        dhtGroup.position.set(0.40, 0.92, -0.36);

        // White Slotted Plastic Body
        const dhtBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.14, 0.065), this.matWhitePlastic);
        dhtGroup.add(dhtBody);

        // Air Ventilation Louvers
        for (let i = 0; i < 4; i++) {
            const louver = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.012, 0.01), this.matChassis);
            louver.position.set(0, -0.04 + i * 0.026, 0.034);
            dhtGroup.add(louver);
        }

        const dhtHit = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.18), new THREE.MeshBasicMaterial({ visible: false }));
        dhtGroup.add(dhtHit);
        this.registerComponent(dhtHit, 'dht22');
        this.group.add(dhtGroup);

        // --- 4. MQ-135 Hazardous Gas & Air Quality Sensor ---
        const mqGroup = new THREE.Group();
        mqGroup.position.set(0.38, 0.90, 0.36);

        // Hexagonal PCB Base
        const mqPCB = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.015, 6), this.matPCBGreen);
        mqGroup.add(mqPCB);

        // Golden Collar Base
        const mqCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.05, 0.02, 16), this.matGold);
        mqCollar.position.y = 0.018;
        mqGroup.add(mqCollar);

        // Stainless Steel Woven Wire Mesh Sensing Chamber Dome
        const mqMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.06, 16), this.matBrushedAlum);
        mqMesh.position.y = 0.05;
        mqGroup.add(mqMesh);

        const mqHit = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), new THREE.MeshBasicMaterial({ visible: false }));
        mqGroup.add(mqHit);
        this.registerComponent(mqHit, 'mq135');
        this.group.add(mqGroup);

        // --- 5. HC-SR04 Ultrasonic Obstacle Array ---
        const ultraArray = [
            { x: 0.98, y: 0.55, z: 0, rotY: 0 },
            { x: 0.90, y: 0.55, z: 0.54, rotY: Math.PI / 4 },
            { x: 0.90, y: 0.55, z: -0.54, rotY: -Math.PI / 4 }
        ];

        ultraArray.forEach((cfg, idx) => {
            const uGroup = new THREE.Group();
            uGroup.position.set(cfg.x, cfg.y, cfg.z);
            uGroup.rotation.y = cfg.rotY;

            // Blue PCB Board
            const uPCB = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.18), new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }));
            uGroup.add(uPCB);

            // Dual Acoustic Transducers (Silver aluminum cans)
            [-0.045, 0.045].forEach(z => {
                const can = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 16), this.matBrushedAlum);
                can.rotation.z = Math.PI / 2;
                can.position.set(0.03, 0, z);
                uGroup.add(can);

                // Speaker mesh grill
                const grill = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.005, 16), this.matChassis);
                grill.rotation.z = Math.PI / 2;
                grill.position.set(0.056, 0, z);
                uGroup.add(grill);
            });

            if (idx === 0) {
                const uHit = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.26), new THREE.MeshBasicMaterial({ visible: false }));
                uGroup.add(uHit);
                this.registerComponent(uHit, 'ultrasonic');
            }
            this.group.add(uGroup);
        });

        // --- 6. PIR Motion Sensor (Fresnel Dome) ---
        const pirGroup = new THREE.Group();
        pirGroup.position.set(0.55, 0.88, -0.38);

        const pirPCB = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.015, 0.09), this.matPCBGreen);
        pirGroup.add(pirPCB);

        // Faceted White Fresnel Dome
        const domeGeom = new THREE.SphereGeometry(0.038, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2);
        const dome = new THREE.Mesh(domeGeom, this.matWhitePlastic);
        dome.position.y = 0.008;
        pirGroup.add(dome);

        const pirHit = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.16), new THREE.MeshBasicMaterial({ visible: false }));
        pirGroup.add(pirHit);
        this.registerComponent(pirHit, 'pir');
        this.group.add(pirGroup);

        // --- 7. GPS Ceramic Patch Antenna on Elevated Mast ---
        const gpsGroup = new THREE.Group();
        gpsGroup.position.set(-0.25, 1.25, 0);

        // Stainless Steel Mast
        const gpsMast = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.42), this.matBrushedAlum);
        gpsGroup.add(gpsMast);

        // Circular Patch Antenna Puck
        const gpsPuck = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.09, 0.045, 20), this.matWhitePlastic);
        gpsPuck.position.y = 0.22;
        gpsGroup.add(gpsPuck);

        const gpsHit = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.24), new THREE.MeshBasicMaterial({ visible: false }));
        gpsHit.position.y = 0.22;
        gpsGroup.add(gpsHit);
        this.registerComponent(gpsHit, 'gps');
        this.group.add(gpsGroup);
    }

    buildActuators() {
        // --- 1. Liquid Reservoir Tank with Graduated Level Scale ---
        const tankGroup = new THREE.Group();
        tankGroup.position.set(-0.25, 0.98, 0.15);

        // Cylindrical Translucent HDPE Tank
        const tankGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.42, 20);
        tankGeom.rotateX(Math.PI / 2);
        const tank = new THREE.Mesh(tankGeom, this.matHDPE);
        tankGroup.add(tank);

        // Fluid Contents (Liquid Blue Solution)
        const fluidGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.38, 20);
        fluidGeom.rotateX(Math.PI / 2);
        const fluid = new THREE.Mesh(fluidGeom, new THREE.MeshStandardMaterial({
            color: 0x0284c7,
            roughness: 0.1,
            metalness: 0.1
        }));
        fluid.scale.set(0.96, 0.72, 0.96);
        fluid.position.y = -0.04;
        tankGroup.add(fluid);

        // Black Threaded Filler Cap
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 16), this.matChassis);
        cap.position.set(0, 0.23, 0);
        tankGroup.add(cap);

        this.registerComponent(tank, 'tank');
        this.group.add(tankGroup);

        // --- 2. 12V High-Pressure Diaphragm Mini Pump ---
        const pump = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.13, 0.15), this.matChassis);
        pump.position.set(-0.55, 0.88, 0.15);
        this.group.add(pump);

        // --- 3. Targeted Spray Boom Arms & Dual Brass Mist Nozzles ---
        [-0.64, 0.64].forEach(z => {
            // Stainless spray arm extending outwards toward crop rows
            const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.36), this.matBrushedAlum);
            arm.rotateX(Math.PI / 2);
            arm.position.set(-0.55, 0.65, z > 0 ? 0.70 : -0.70);
            this.group.add(arm);

            // Precision Brass Atomizer Nozzle
            const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.07, 16), this.matGold);
            nozzle.rotateX(z > 0 ? Math.PI * 0.75 : -Math.PI * 0.75);
            nozzle.position.set(-0.55, 0.54, z > 0 ? 0.84 : -0.84);
            this.group.add(nozzle);

            this.registerComponent(nozzle, 'sprayer');
        });
    }

    buildCablesAndDetails() {
        // Colored Ribbon Wires connecting Pi 4 to ESP32 and Sensors
        const wireColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b];
        wireColors.forEach((color, i) => {
            const wireCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0.12, 0.90, 0.08 - i * 0.03),
                new THREE.Vector3(0.08, 0.94, -0.05),
                new THREE.Vector3(0.14, 0.90, -0.15 - i * 0.02)
            ]);
            const wireGeom = new THREE.TubeGeometry(wireCurve, 12, 0.005, 6, false);
            const wire = new THREE.Mesh(wireGeom, new THREE.MeshStandardMaterial({ color: color, roughness: 0.5 }));
            this.group.add(wire);
        });

        // Translucent Silicone Fluid Tubing from Tank to Pump to Nozzles
        const tubeCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.35, 0.90, 0.15),
            new THREE.Vector3(-0.48, 0.88, 0.15),
            new THREE.Vector3(-0.55, 0.68, 0.55),
            new THREE.Vector3(-0.55, 0.56, 0.82)
        ]);
        const tubeGeom = new THREE.TubeGeometry(tubeCurve, 16, 0.008, 8, false);
        const tube = new THREE.Mesh(tubeGeom, new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            roughness: 0.2,
            transmission: 0.8,
            transparent: true,
            opacity: 0.7
        }));
        this.group.add(tube);
    }

    buildSonarFX() {
        this.sonarWaves = [];
        for (let i = 0; i < 3; i++) {
            const arcCurve = new THREE.EllipseCurve(
                0, 0,
                0.35 + i * 0.4, 0.35 + i * 0.4,
                -Math.PI / 5, Math.PI / 5,
                false, 0
            );
            const points = arcCurve.getPoints(24);
            const geom = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
                color: 0x0284c7,
                transparent: true,
                opacity: 0.85 - i * 0.25,
                linewidth: 2
            });
            const line = new THREE.Line(geom, mat);
            line.rotation.x = Math.PI / 2;
            line.position.set(1.06, 0.55, 0);
            line.userData = { offset: i * 0.33 };
            this.sonarWaves.push(line);
            this.group.add(line);
        }
    }

    buildVisionConeFX() {
        // High-Tech Semi-Transparent Camera Vision Frustum
        const coneGeom = new THREE.ConeGeometry(0.7, 2.0, 16, 1, true);
        coneGeom.rotateZ(-Math.PI / 2);
        coneGeom.translate(1.0, 0, 0);

        const coneMat = new THREE.MeshBasicMaterial({
            color: 0x22c55e,
            transparent: true,
            opacity: 0.16,
            side: THREE.DoubleSide
        });

        this.visionCone = new THREE.Mesh(coneGeom, coneMat);
        this.visionCone.position.set(0.65, 1.55, 0);
        this.group.add(this.visionCone);

        // Glowing Wireframe Mesh Grid
        const gridMat = new THREE.MeshBasicMaterial({
            color: 0x4ade80,
            wireframe: true,
            transparent: true,
            opacity: 0.22
        });
        const grid = new THREE.Mesh(coneGeom, gridMat);
        this.visionCone.add(grid);
    }

    buildSprayFX() {
        const particleCount = 160;
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = -0.55;
            positions[i * 3 + 1] = 0.54;
            positions[i * 3 + 2] = (i % 2 === 0 ? 0.84 : -0.84);

            velocities.push({
                vx: (Math.random() - 0.5) * 0.25,
                vy: -Math.random() * 0.9 - 0.5,
                vz: (i % 2 === 0 ? 1 : -1) * (Math.random() * 0.7 + 0.35),
                life: Math.random()
            });
        }

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 0.06,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.sprayParticles = new THREE.Points(geom, mat);
        this.sprayParticles.userData = { velocities: velocities };
        this.sprayParticles.visible = false;
        this.group.add(this.sprayParticles);
    }

    toggleSpray(state) {
        this.spraying = (state !== undefined) ? state : !this.spraying;
        if (this.sprayParticles) {
            this.sprayParticles.visible = this.spraying;
        }
        return this.spraying;
    }

    update(delta, roverSpeed) {
        // Wheel Rotation
        if (roverSpeed !== 0) {
            this.wheels.forEach(w => {
                w.children[0].rotation.z += roverSpeed * delta * 3.5;
            });
        }

        // Camera Head active scanning tilt
        if (this.cameraHead) {
            const t = Date.now() * 0.0012;
            this.cameraHead.rotation.y = Math.sin(t) * 0.22;
            this.cameraHead.rotation.z = Math.sin(t * 0.6) * 0.06;
            if (this.visionCone) {
                this.visionCone.rotation.y = this.cameraHead.rotation.y;
                this.visionCone.rotation.z = this.cameraHead.rotation.z;
            }
        }

        // Ultrasonic Sonar Pulse
        this.sonarWaves.forEach(wave => {
            const time = (Date.now() * 0.002 + wave.userData.offset) % 1.0;
            const currentScale = 0.4 + time * 1.6;
            wave.scale.set(currentScale, currentScale, 1);
            wave.material.opacity = Math.max(0, 0.9 * (1 - time));
        });

        // Spray Mist Emitter
        if (this.spraying && this.sprayParticles) {
            const posAttr = this.sprayParticles.geometry.attributes.position;
            const vels = this.sprayParticles.userData.velocities;
            for (let i = 0; i < vels.length; i++) {
                const v = vels[i];
                v.life += delta * 2.8;
                if (v.life > 1.0) {
                    v.life = 0;
                    posAttr.array[i * 3] = -0.55;
                    posAttr.array[i * 3 + 1] = 0.54;
                    posAttr.array[i * 3 + 2] = (i % 2 === 0 ? 0.84 : -0.84);
                } else {
                    posAttr.array[i * 3] += v.vx * delta;
                    posAttr.array[i * 3 + 1] += v.vy * delta;
                    posAttr.array[i * 3 + 2] += v.vz * delta;
                }
            }
            posAttr.needsUpdate = true;
        }
    }
}

window.Rover3D = Rover3D;
window.ROVER_COMPONENTS = ROVER_COMPONENTS;
