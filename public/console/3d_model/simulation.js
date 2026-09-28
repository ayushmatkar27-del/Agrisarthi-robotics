/**
 * AgriSarthi 3D Simulation Controller (High-Fidelity)
 * Seamless Three.js rendering, ACES filmic tone mapping, smooth camera interpolation,
 * dedicated hardware close-up inspection with holographic reticle, and real-time telemetry.
 */

class SimulationApp {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.clock = new THREE.Clock();

        // Driving state
        this.mode = 'autonomous'; // 'autonomous' or 'manual'
        this.isInspecting = false;
        this.inspectedComponent = null;
        this.roverSpeed = 0;
        this.roverTurn = 0;
        this.maxSpeed = 2.4;
        this.currentWaypointIndex = 0;
        this.viewMode = 'orbit'; // 'orbit', 'follow', 'pov', 'top', 'inspect'

        // Smooth camera animation targets
        this.targetCamPos = new THREE.Vector3(6, 4.5, 9);
        this.targetLookAt = new THREE.Vector3(0, 0.6, 0);

        // Input keys
        this.keys = { forward: false, backward: false, left: false, right: false };

        // Telemetry state
        this.telemetry = {
            moisture: 48,
            temperature: 28.4,
            humidity: 62,
            airPPM: 395,
            battery: 92,
            speed: 0.0,
            obstacleDist: 2.8,
            lat: 18.5204,
            lon: 73.8567,
            statusText: "All systems nominal • Continuous farm scouting active.",
            alertLevel: "normal"
        };

        this.initScene();
        this.initLighting();
        this.buildWorld();
        this.initHighlightReticle();
        this.initControls();
        this.initRaycaster();
        this.initUIListeners();
        this.initMiniVisionFeed();

        // Start animation loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xbbe1fa); // Daylight sky blend
        this.scene.fog = new THREE.FogExp2(0xbbe1fa, 0.012);

        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            250
        );
        this.camera.position.set(6, 4.5, 9);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Photorealistic ACES Filmic Tone Mapping
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.08;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // Soft Shadow Maps
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    initLighting() {
        // Soft Natural Ambient Light
        const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.70);
        this.scene.add(ambientLight);

        // Hemisphere Sky-Ground Light Bounce
        const hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x543d2b, 0.65);
        this.scene.add(hemiLight);

        // Golden Sunlight with Soft Cast Shadows
        const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.45);
        sunLight.position.set(28, 40, 22);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 85;
        sunLight.shadow.camera.left = -28;
        sunLight.shadow.camera.right = 28;
        sunLight.shadow.camera.top = 28;
        sunLight.shadow.camera.bottom = -28;
        sunLight.shadow.bias = -0.0004;
        this.scene.add(sunLight);

        // Front subtle fill light for rover mechanical details
        const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.45);
        fillLight.position.set(-20, 15, -20);
        this.scene.add(fillLight);
    }

    buildWorld() {
        this.farm = new FarmEnvironment(this.scene);

        this.rover = new Rover3D();
        this.rover.group.position.set(-16, 0, -6.75); // Start at Furrow 1
        this.scene.add(this.rover.group);
    }

    initHighlightReticle() {
        // 3D Holographic Reticle indicating the selected/inspected sensor
        this.reticleGroup = new THREE.Group();
        this.reticleGroup.visible = false;

        // Outer pulsing ring
        const ringGeom = new THREE.RingGeometry(0.16, 0.19, 32);
        ringGeom.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x15803d,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
        });
        this.reticleRing = new THREE.Mesh(ringGeom, ringMat);
        this.reticleGroup.add(this.reticleRing);

        // Inner targeting crosshair brackets
        for (let i = 0; i < 4; i++) {
            const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.01, 0.08), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
            const angle = (i / 4) * Math.PI * 2;
            bracket.position.set(Math.cos(angle) * 0.21, 0, Math.sin(angle) * 0.21);
            bracket.rotation.y = angle;
            this.reticleGroup.add(bracket);
        }

        // Vertical cyan holographic beacon beam
        const beamGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.6, 12);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.55
        });
        const beam = new THREE.Mesh(beamGeom, beamMat);
        beam.position.y = 0.3;
        this.reticleGroup.add(beam);

        this.scene.add(this.reticleGroup);
    }

    initControls() {
        this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.07;
        this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.04;
        this.orbitControls.minDistance = 0.35;
        this.orbitControls.maxDistance = 50;
        this.orbitControls.target.copy(this.rover.group.position);

        // Keyboard listeners for Manual Drive
        window.addEventListener('keydown', (e) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': this.keys.forward = true; break;
                case 's': case 'arrowdown': this.keys.backward = true; break;
                case 'a': case 'arrowleft': this.keys.left = true; break;
                case 'd': case 'arrowright': this.keys.right = true; break;
                case ' ':
                    e.preventDefault();
                    this.toggleSprayAction();
                    break;
                case 'escape':
                    this.closeInspection();
                    break;
            }
            if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
                if (this.isInspecting) {
                    this.closeInspection();
                }
                if (this.mode === 'autonomous') {
                    this.setMode('manual');
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key.toLowerCase()) {
                case 'w': case 'arrowup': this.keys.forward = false; break;
                case 's': case 'arrowdown': this.keys.backward = false; break;
                case 'a': case 'arrowleft': this.keys.left = false; break;
                case 'd': case 'arrowright': this.keys.right = false; break;
            }
        });
    }

    initRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.renderer.domElement.addEventListener('pointerdown', (e) => {
            if (e.target !== this.renderer.domElement) return;

            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.rover.interactiveMeshes, true);

            if (intersects.length > 0) {
                let targetMesh = intersects[0].object;
                while (targetMesh && !targetMesh.userData.info && targetMesh.parent) {
                    targetMesh = targetMesh.parent;
                }
                if (targetMesh && targetMesh.userData.info) {
                    this.inspectComponent(targetMesh.userData.componentKey);
                }
            }
        });
    }

    initUIListeners() {
        document.getElementById('btn-auto').addEventListener('click', () => this.setMode('autonomous'));
        document.getElementById('btn-manual').addEventListener('click', () => this.setMode('manual'));

        const sprayBtn = document.getElementById('btn-spray');
        sprayBtn.addEventListener('click', () => this.toggleSprayAction());

        ['orbit', 'follow', 'pov', 'top'].forEach(view => {
            const btn = document.getElementById(`view-${view}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.closeInspection();
                    this.setViewMode(view);
                });
            }
        });

        document.getElementById('modal-close').addEventListener('click', () => this.closeInspection());

        const resumeBtn = document.getElementById('btn-resume-patrol');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => this.closeInspection());
        }

        document.querySelectorAll('.sensor-pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.target.getAttribute('data-sensor');
                if (key) this.inspectComponent(key);
            });
        });
    }

    setMode(mode) {
        this.mode = mode;
        const btnAuto = document.getElementById('btn-auto');
        const btnManual = document.getElementById('btn-manual');
        const hintEl = document.getElementById('control-hint');

        if (mode === 'autonomous') {
            btnAuto.classList.add('active', 'btn-primary');
            btnAuto.classList.remove('btn-secondary');
            btnManual.classList.remove('active', 'btn-primary');
            btnManual.classList.add('btn-secondary');
            if (hintEl) hintEl.textContent = "Autonomous Patrol active • Following crop row waypoints";
        } else {
            btnManual.classList.add('active', 'btn-primary');
            btnManual.classList.remove('btn-secondary');
            btnAuto.classList.remove('active', 'btn-primary');
            btnAuto.classList.add('btn-secondary');
            if (hintEl) hintEl.textContent = "Manual Override active • Use WASD or Arrow Keys to steer rover";
        }
    }

    setViewMode(view) {
        this.viewMode = view;
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(`view-${view}`);
        if (activeBtn) activeBtn.classList.add('active');

        if (view === 'top') {
            this.camera.position.set(0, 36, 0);
            this.orbitControls.target.set(0, 0, 0);
        } else if (view === 'orbit') {
            this.orbitControls.target.copy(this.rover.group.position);
        }
    }

    toggleSprayAction() {
        const isSpraying = this.rover.toggleSpray();
        const sprayBtn = document.getElementById('btn-spray');
        if (isSpraying) {
            sprayBtn.classList.add('active');
            sprayBtn.innerHTML = `💧 Spraying (Active)`;
        } else {
            sprayBtn.classList.remove('active');
            sprayBtn.innerHTML = `💧 Targeted Spray`;
        }
    }

    inspectComponent(key) {
        const info = ROVER_COMPONENTS[key];
        if (!info) return;

        this.isInspecting = true;
        this.inspectedComponent = key;

        // Highlight pill in bottom bar
        document.querySelectorAll('.sensor-pill-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-sensor') === key);
        });

        // Compute exact world position of the target component
        const roverPos = this.rover.group.position;
        const roverHeading = this.rover.group.rotation.y;

        // Rotate offset by rover heading
        const fOff = info.focusOffset || { x: 0, y: 0.6, z: 0 };
        const cosH = Math.cos(roverHeading);
        const sinH = Math.sin(roverHeading);

        const worldFocusX = roverPos.x + (fOff.x * cosH + fOff.z * sinH);
        const worldFocusY = roverPos.y + fOff.y;
        const worldFocusZ = roverPos.z + (-fOff.x * sinH + fOff.z * cosH);

        const focusPoint = new THREE.Vector3(worldFocusX, worldFocusY, worldFocusZ);

        // Position the 3D reticle directly onto the component
        this.reticleGroup.position.copy(focusPoint);
        this.reticleGroup.visible = true;

        // Compute ideal close-up camera position
        const cOff = info.cameraOffset || { x: 0.6, y: 0.5, z: 0.6 };
        const camX = worldFocusX + (cOff.x * cosH + cOff.z * sinH);
        const camY = worldFocusY + cOff.y;
        const camZ = worldFocusZ + (-cOff.x * sinH + cOff.z * cosH);

        this.targetCamPos.set(camX, camY, camZ);
        this.targetLookAt.copy(focusPoint);
        this.viewMode = 'inspect';

        // Update Modal with specs & live diagnostics
        document.getElementById('modal-title').textContent = info.title;
        document.getElementById('modal-category').textContent = info.category;
        document.getElementById('modal-specs').textContent = `Specs: ${info.specs}`;
        document.getElementById('modal-role').textContent = info.role;

        // Generate live diagnostic telemetry for this specific hardware
        const diagEl = document.getElementById('modal-diagnostics');
        if (diagEl) {
            diagEl.innerHTML = this.getHardwareDiagnostics(key);
        }

        const modal = document.getElementById('sensor-modal');
        modal.classList.add('visible');
        document.body.classList.add('inspecting-active');

        const hintEl = document.getElementById('control-hint');
        if (hintEl) {
            hintEl.innerHTML = `🔍 Inspecting: <b>${info.title}</b> • Rover paused for inspection`;
        }
    }

    getHardwareDiagnostics(key) {
        switch (key) {
            case 'rpi4':
                return `<strong>Edge AI State:</strong> CPU Temp 47.8°C | RAM: 1.4/4GB | Local Model: YOLOv8n (FP16) | Inference: 41.2ms`;
            case 'esp32':
                return `<strong>Bus Telemetry:</strong> UART 115200 baud | ADC: 12-Bit Channels Active | Free Heap: 284KB | PWM: 20kHz`;
            case 'camera':
                return `<strong>Vision Pipeline:</strong> 1920x1080 @ 24fps | Exposure: Auto | Crop FOV: 120° Wide | Distortion: Calibrated`;
            case 'soil_probe':
                return `<strong>Soil Status:</strong> VWC Moisture: ${Math.round(this.telemetry.moisture)}% | Impedance: 420Ω | Corrosion Guard: Active`;
            case 'dht22':
                return `<strong>Canopy Reading:</strong> Temp: ${this.telemetry.temperature.toFixed(1)}°C | Humidity: ${Math.round(this.telemetry.humidity)}% RH | Vapor Deficit: 1.2 kPa`;
            case 'mq135':
                return `<strong>Atmosphere:</strong> Gas Resistance: 18.2 kΩ | Air Quality: 395 PPM (Clean) | Smoke: None`;
            case 'ultrasonic':
                return `<strong>Proximity:</strong> Center: 2.8m | Left Flank: 1.9m | Right Flank: 2.1m | Obstacle Risk: Low`;
            case 'pir':
                return `<strong>Security:</strong> Infrared Trigger: Idle | No Intrusion Detected | Range: 7.0m`;
            case 'gps':
                return `<strong>GNSS Fix:</strong> 3D DGPS Lock (14 Satellites) | Lat: ${this.telemetry.lat}° | Lon: ${this.telemetry.lon}° | HDOP: 0.9`;
            case 'sprayer':
                return `<strong>Actuation:</strong> Diaphragm Pump 60 PSI | Flow: 1.8 L/min | Droplet Size: 80μm Fine Mist`;
            case 'tank':
                return `<strong>Reservoir:</strong> Fluid Level: 78% (1.95L remaining) | Float Sensor: OK | Low Level Alert: False`;
            case 'battery':
                return `<strong>LiFePO4 BMS:</strong> Voltage: 13.2V | State of Charge: ${Math.round(this.telemetry.battery)}% | Cell Temp: 31°C | Health: 99%`;
            case 'wheels':
                return `<strong>Drivetrain:</strong> 4x DC Motors @ 85 RPM | Current Draw: 2.1A | Slip Ratio: 4% | Torque: High`;
            default:
                return `<strong>Status:</strong> Active and operating nominal`;
        }
    }

    closeInspection() {
        this.isInspecting = false;
        this.inspectedComponent = null;
        this.reticleGroup.visible = false;

        document.getElementById('sensor-modal').classList.remove('visible');
        document.body.classList.remove('inspecting-active');
        document.querySelectorAll('.sensor-pill-btn').forEach(b => b.classList.remove('active'));

        const roverPos = this.rover.group.position;
        this.targetCamPos.set(roverPos.x + 4.5, roverPos.y + 3.0, roverPos.z + 5.5);
        this.targetLookAt.set(roverPos.x, roverPos.y + 0.6, roverPos.z);
        this.viewMode = 'orbit';

        const hintEl = document.getElementById('control-hint');
        if (hintEl) {
            hintEl.textContent = "💡 Click any sensor or component on the rover to inspect its specifications and role";
        }
    }

    initMiniVisionFeed() {
        this.visionCanvas = document.getElementById('vision-canvas');
        if (this.visionCanvas) {
            this.visionCtx = this.visionCanvas.getContext('2d');
        }
    }

    updateMiniVisionFeed() {
        if (!this.visionCtx) return;
        const ctx = this.visionCtx;
        const w = this.visionCanvas.width;
        const h = this.visionCanvas.height;

        ctx.fillStyle = "#0c1712";
        ctx.fillRect(0, 0, w, h);

        // Crop foliage simulation
        ctx.fillStyle = "#14532d";
        ctx.beginPath();
        ctx.ellipse(w * 0.35, h * 0.6, 60, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#16a34a";
        ctx.beginPath();
        ctx.ellipse(w * 0.7, h * 0.55, 75, 45, 0, 0, Math.PI * 2);
        ctx.fill();

        // YOLO Bounding Box Overlay
        const t = Date.now() * 0.002;
        const xBox = w * 0.3 + Math.sin(t) * 12;
        const yBox = h * 0.22;
        const bw = 90;
        const bh = 72;

        let label = "Healthy Crop 94%";
        let boxColor = "#22c55e";

        if (this.telemetry.alertLevel === "warning") {
            label = "Water Stress 89%";
            boxColor = "#f59e0b";
        } else if (this.telemetry.alertLevel === "critical") {
            label = "Early Blight 91%";
            boxColor = "#ef4444";
        }

        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(xBox, yBox, bw, bh);

        ctx.fillStyle = boxColor;
        ctx.fillRect(xBox, yBox - 16, bw, 16);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px monospace";
        ctx.fillText(label, xBox + 4, yBox - 4);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w / 2 - 10, h / 2);
        ctx.lineTo(w / 2 + 10, h / 2);
        ctx.moveTo(w / 2, h / 2 - 10);
        ctx.lineTo(w / 2, h / 2 + 10);
        ctx.stroke();
    }

    updateAutonomousDrive(delta) {
        if (this.isInspecting) {
            // Pause rover during hardware inspection
            this.roverSpeed = 0;
            return;
        }

        const waypoints = this.farm.waypoints;
        const targetWP = waypoints[this.currentWaypointIndex];
        const roverPos = this.rover.group.position;

        const dx = targetWP.x - roverPos.x;
        const dz = targetWP.z - roverPos.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 0.8) {
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) % waypoints.length;
        } else {
            const targetAngle = Math.atan2(-dz, dx);
            let currentAngle = this.rover.group.rotation.y;

            let diff = targetAngle - currentAngle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;

            this.rover.group.rotation.y += Math.sign(diff) * Math.min(Math.abs(diff), 2.2 * delta);

            const speedFactor = Math.max(0.2, 1.0 - Math.abs(diff) / Math.PI);
            this.roverSpeed = this.maxSpeed * speedFactor;

            roverPos.x += Math.cos(targetAngle) * this.roverSpeed * delta;
            roverPos.z -= Math.sin(targetAngle) * this.roverSpeed * delta;
        }
    }

    updateManualDrive(delta) {
        if (this.isInspecting) return;

        const accel = 3.5;
        const turnSpeed = 2.4;

        if (this.keys.forward) {
            this.roverSpeed = Math.min(this.roverSpeed + accel * delta, this.maxSpeed);
        } else if (this.keys.backward) {
            this.roverSpeed = Math.max(this.roverSpeed - accel * delta, -this.maxSpeed * 0.5);
        } else {
            this.roverSpeed *= 0.92;
            if (Math.abs(this.roverSpeed) < 0.05) this.roverSpeed = 0;
        }

        if (this.keys.left) {
            this.rover.group.rotation.y += turnSpeed * delta;
        }
        if (this.keys.right) {
            this.rover.group.rotation.y -= turnSpeed * delta;
        }

        const heading = this.rover.group.rotation.y;
        this.rover.group.position.x += Math.cos(heading) * this.roverSpeed * delta;
        this.rover.group.position.z -= Math.sin(heading) * this.roverSpeed * delta;

        this.rover.group.position.x = Math.max(-25, Math.min(25, this.rover.group.position.x));
        this.rover.group.position.z = Math.max(-25, Math.min(25, this.rover.group.position.z));
    }

    updateTelemetry(delta) {
        const roverPos = this.rover.group.position;

        // Position-based telemetry simulation
        if (roverPos.z > -5.5 && roverPos.z < -3.0 && roverPos.x > 2 && roverPos.x < 12) {
            this.telemetry.moisture = 22; // Water stress hotspot
            this.telemetry.temperature = 33.8;
            this.telemetry.humidity = 42;
            this.telemetry.alertLevel = "warning";
            this.telemetry.statusText = "⚠️ Low Soil Moisture (Zone B) • Recommend targeted irrigation.";
        }
        else if (roverPos.z > 3.0 && roverPos.z < 5.5 && roverPos.x > -12 && roverPos.x < -3) {
            this.telemetry.moisture = 46;
            this.telemetry.temperature = 29.1;
            this.telemetry.humidity = 76;
            this.telemetry.alertLevel = "critical";
            this.telemetry.statusText = "⚠️ Early Leaf Spot symptom detected • Recommend inspection.";
        }
        else {
            this.telemetry.moisture = 48 + Math.sin(Date.now() * 0.001) * 2;
            this.telemetry.temperature = 28.4;
            this.telemetry.humidity = 62;
            this.telemetry.alertLevel = "normal";
            this.telemetry.statusText = "All systems nominal • Continuous farm scouting active.";
        }

        this.telemetry.speed = Math.abs(this.roverSpeed * 3.6);
        this.telemetry.battery = Math.max(10, 92 - (Date.now() * 0.00002) % 20);

        const latOffset = (roverPos.z / 1000) * 0.009;
        const lonOffset = (roverPos.x / 1000) * 0.009;
        this.telemetry.lat = (18.5204 + latOffset).toFixed(5);
        this.telemetry.lon = (73.8567 + lonOffset).toFixed(5);

        // Update UI
        document.getElementById('val-moisture').textContent = `${Math.round(this.telemetry.moisture)}%`;
        document.getElementById('val-temp').textContent = `${this.telemetry.temperature.toFixed(1)}°C`;
        document.getElementById('val-humidity').textContent = `${Math.round(this.telemetry.humidity)}%`;
        document.getElementById('val-speed').textContent = `${this.telemetry.speed.toFixed(1)} km/h`;
        document.getElementById('val-battery').textContent = `${Math.round(this.telemetry.battery)}%`;
        document.getElementById('val-gps').textContent = `${this.telemetry.lat}°N, ${this.telemetry.lon}°E`;

        const moistureEl = document.getElementById('val-moisture');
        moistureEl.className = 'item-val ' + (this.telemetry.moisture < 25 ? 'critical' : this.telemetry.moisture < 35 ? 'warning' : 'good');

        const bannerEl = document.getElementById('advisory-text');
        const visionBannerEl = document.getElementById('vision-status-banner');
        if (bannerEl) bannerEl.textContent = this.telemetry.statusText;
        if (visionBannerEl) {
            visionBannerEl.className = 'vision-status-banner ' + (this.telemetry.alertLevel === 'normal' ? 'normal' : 'alert');
            visionBannerEl.textContent = this.telemetry.statusText;
        }
    }

    updateCameraFollow() {
        const roverPos = this.rover.group.position;
        const heading = this.rover.group.rotation.y;

        if (this.viewMode === 'inspect') {
            // Smoothly lerp camera to macro hardware view
            this.camera.position.lerp(this.targetCamPos, 0.08);
            this.orbitControls.target.lerp(this.targetLookAt, 0.08);
            this.orbitControls.update();

            // Animate 3D reticle rotation & pulse
            if (this.reticleRing) {
                this.reticleRing.rotation.z += 0.02;
            }
        } else if (this.viewMode === 'follow') {
            const chaseDist = 4.2;
            const chaseHeight = 2.4;
            const camTargetX = roverPos.x - Math.cos(heading) * chaseDist;
            const camTargetZ = roverPos.z + Math.sin(heading) * chaseDist;

            this.camera.position.lerp(new THREE.Vector3(camTargetX, roverPos.y + chaseHeight, camTargetZ), 0.08);
            this.orbitControls.target.lerp(new THREE.Vector3(roverPos.x, roverPos.y + 0.8, roverPos.z), 0.1);
        } else if (this.viewMode === 'pov') {
            const povHeight = 1.45;
            const povFront = 0.5;
            this.camera.position.set(
                roverPos.x + Math.cos(heading) * povFront,
                roverPos.y + povHeight,
                roverPos.z - Math.sin(heading) * povFront
            );
            const lookTarget = new THREE.Vector3(
                roverPos.x + Math.cos(heading) * 10,
                roverPos.y + 1.2,
                roverPos.z - Math.sin(heading) * 10
            );
            this.camera.lookAt(lookTarget);
        } else if (this.viewMode === 'orbit') {
            this.orbitControls.target.copy(new THREE.Vector3(roverPos.x, roverPos.y + 0.6, roverPos.z));
            this.orbitControls.update();
        }
    }

    animate() {
        requestAnimationFrame(this.animate);

        const delta = Math.min(this.clock.getDelta(), 0.1);

        if (this.mode === 'autonomous') {
            this.updateAutonomousDrive(delta);
        } else {
            this.updateManualDrive(delta);
        }

        this.rover.update(delta, this.roverSpeed);
        this.updateTelemetry(delta);
        this.updateCameraFollow();
        this.updateMiniVisionFeed();

        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new SimulationApp();
});
