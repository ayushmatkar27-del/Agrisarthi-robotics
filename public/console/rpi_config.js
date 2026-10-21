/**
 * AgriSarthi — Raspberry Pi 4 Centralized Console Configuration Engine
 * Shared configuration & connection manager across all console interfaces.
 */

(function (window) {
    'use strict';

    const STORAGE_KEY_IP = 'agrisarthi_rpi_ip';
    const STORAGE_KEY_MODE = 'agrisarthi_conn_mode'; // 'local' | 'cloud'
    const STORAGE_KEY_CLOUD_BROKER = 'agrisarthi_cloud_broker';

    // Auto-detect default IP
    function detectDefaultIp() {
        const hostname = window.location.hostname;
        if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return hostname;
        }
        return '192.168.4.1'; // Standard Rover SoftAP or RPi static IP
    }

    const RPiConfig = {
        // Robust IP / Hostname Sanitizer (strips http://, :5000, paths, 0.0.0.0)
        cleanHostOrIp: function (raw) {
            if (!raw) return '192.168.4.1';
            let cleaned = String(raw).trim();
            // Strip protocol
            cleaned = cleaned.replace(/^(https?|wss?):\/\//i, '');
            // Strip path or query params
            cleaned = cleaned.split('/')[0].split('?')[0];
            // Strip trailing port e.g. :5000, :9001, :81, etc.
            cleaned = cleaned.replace(/:[0-9]+$/, '');
            // 0.0.0.0 is an internal listen address, not reachable by client browsers
            if (cleaned === '0.0.0.0') {
                cleaned = '127.0.0.1';
            }
            return cleaned || '192.168.4.1';
        },

        // Core Networking
        getRoverIp: function () {
            const raw = localStorage.getItem(STORAGE_KEY_IP) || detectDefaultIp();
            return this.cleanHostOrIp(raw);
        },
        setRoverIp: function (ip) {
            if (!ip) return;
            const cleanIp = this.cleanHostOrIp(ip);
            localStorage.setItem(STORAGE_KEY_IP, cleanIp);
            console.log('[RPiConfig] Updated Rover IP:', cleanIp);
            return cleanIp;
        },

        getConnectionMode: function () {
            return localStorage.getItem(STORAGE_KEY_MODE) || 'local';
        },
        setConnectionMode: function (mode) {
            localStorage.setItem(STORAGE_KEY_MODE, mode);
        },

        // Endpoints
        getApiBaseUrl: function () {
            const ip = this.getRoverIp();
            return `http://${ip}:5000`;
        },
        getCameraStreamUrl: function () {
            const ip = this.getRoverIp();
            return `http://${ip}:5000/video_feed`;
        },
        getRawEsp32StreamUrl: function () {
            const ip = this.getRoverIp();
            return `http://${ip}:81/stream`;
        },
        getWebSocketMotionUrl: function () {
            const ip = this.getRoverIp();
            return `ws://${ip}:81`;
        },

        // MQTT Endpoints
        getMqttBrokerUrl: function () {
            const mode = this.getConnectionMode();
            if (mode === 'cloud') {
                return localStorage.getItem(STORAGE_KEY_CLOUD_BROKER) || 'wss://broker.emqx.io:8084/mqtt';
            }
            // Local Raspberry Pi Mosquitto WebSocket on port 9001
            const ip = this.getRoverIp();
            return `ws://${ip}:9001`;
        },

        // Unified MQTT Topics
        TOPICS: {
            telemetry: 'agrisarthi/telemetry',
            motion: 'agrisarthi/control/motion',
            actuators: 'agrisarthi/control/actuators',
            gimbal: 'agrisarthi/control/gimbal',
            odometry: 'agrisarthi/odometry',
            sectors: 'agrisarthi/sectors',
            alerts: 'agrisarthi/alerts',
            camera: 'agrisarthi/camera/cmd',
            sensors: 'agrisarthi/sensors'
        },

        // Wheel Odometry Mathematical Algorithm: D = pulses * (pi * D_wheel) / PPR
        calculateOdometryDistance: function (pulses, wheelDiameterMm, ppr) {
            const dMeters = (wheelDiameterMm || 260) / 1000.0;
            const p = pulses || 0;
            const pulsesPerRev = ppr || 20;
            const circumference = Math.PI * dMeters;
            return (p * circumference) / pulsesPerRev;
        },

        // Unified MQTT Client Initializer (supports mqtt.js CDN)
        initMqtt: function (options) {
            options = options || {};
            const brokerUrl = options.brokerUrl || this.getMqttBrokerUrl();
            const clientId = 'AgriSarthi_Web_' + Math.random().toString(16).substr(2, 8);

            console.log(`[RPiConfig] Connecting MQTT -> ${brokerUrl} (Client: ${clientId})`);

            if (typeof mqtt === 'undefined') {
                console.warn('[RPiConfig] mqtt.min.js is not loaded on this page.');
                return null;
            }

            try {
                const client = mqtt.connect(brokerUrl, {
                    clientId: clientId,
                    clean: true,
                    connectTimeout: 4000,
                    reconnectPeriod: 3000
                });

                client.on('connect', function () {
                    console.log('[RPiConfig] ✅ Connected to MQTT broker:', brokerUrl);
                    if (options.onConnect) options.onConnect(client);
                });

                client.on('message', function (topic, payload) {
                    try {
                        const parsed = JSON.parse(payload.toString());
                        if (options.onMessage) options.onMessage(topic, parsed, payload.toString());
                    } catch (e) {
                        if (options.onMessage) options.onMessage(topic, null, payload.toString());
                    }
                });

                client.on('error', function (err) {
                    console.error('[RPiConfig] ❌ MQTT Error:', err.message || err);
                    if (options.onError) options.onError(err);
                });

                client.on('close', function () {
                    if (options.onClose) options.onClose();
                });

                return client;
            } catch (err) {
                console.error('[RPiConfig] MQTT init failed:', err);
                if (options.onError) options.onError(err);
                return null;
            }
        },

        // Send hardware actuator command via MQTT with REST fallback
        dispatchActuatorCommand: function (client, payload, onDone) {
            if (client && !client.publish && !client.connected) {
                onDone = payload;
                payload = client;
                client = null;
            }
            const dataStr = JSON.stringify(payload);
            let mqttSuccess = false;

            if (client && client.connected) {
                try {
                    client.publish(this.TOPICS.actuators, dataStr, { qos: 1 });
                    mqttSuccess = true;
                    console.log('[RPiConfig] 📡 Actuator dispatched via MQTT:', dataStr);
                } catch (e) {
                    console.warn('[RPiConfig] MQTT publish error, falling back to HTTP:', e);
                }
            }

            // HTTP POST fallback to Raspberry Pi Flask endpoint (/api/control)
            const restUrl = `${this.getApiBaseUrl()}/api/control`;
            fetch(restUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: dataStr
            })
                .then(res => res.json())
                .then(resData => {
                    console.log('[RPiConfig] 🌐 Actuator acknowledged via REST:', resData);
                    if (onDone) onDone(true, resData);
                })
                .catch(err => {
                    if (mqttSuccess) {
                        if (onDone) onDone(true, { via: 'mqtt' });
                    } else {
                        console.warn('[RPiConfig] Both MQTT and HTTP REST failed:', err.message);
                        if (onDone) onDone(false, err);
                    }
                });
        },

        // Helper to get active MQTT port
        getMqttPort: function () {
            return this.getConnectionMode() === 'cloud' ? 8084 : 9001;
        },

        // Send rover motion command via MQTT with REST fallback
        dispatchMotionCommand: function (client, payload, onDone) {
            const dataStr = JSON.stringify(payload);
            let mqttSuccess = false;

            if (client && client.connected) {
                try {
                    client.publish(this.TOPICS.motion, dataStr, { qos: 0 });
                    mqttSuccess = true;
                } catch (e) {
                    console.warn('[RPiConfig] MQTT motion publish error:', e);
                }
            }

            // HTTP POST fallback to Flask /api/control
            const restUrl = `${this.getApiBaseUrl()}/api/control`;
            fetch(restUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target: 'motion', ...payload })
            })
                .then(res => res.json())
                .then(resData => {
                    if (onDone) onDone(true, resData);
                })
                .catch(err => {
                    if (mqttSuccess) {
                        if (onDone) onDone(true, { via: 'mqtt' });
                    } else if (onDone) {
                        onDone(false, err);
                    }
                });
        },

        // Asynchronous Health Check / Connection Ping to Raspberry Pi
        checkStatus: async function (timeoutMs = 2500) {
            const statusUrl = `${this.getApiBaseUrl()}/status`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            const startTime = performance.now();

            try {
                const response = await fetch(statusUrl, { signal: controller.signal, mode: 'cors' });
                clearTimeout(timeoutId);
                const latency = Math.round(performance.now() - startTime);

                if (response.ok) {
                    const data = await response.json();
                    return { online: true, latency, data, ip: this.getRoverIp() };
                }
                return { online: false, latency, error: `HTTP ${response.status}`, ip: this.getRoverIp() };
            } catch (err) {
                clearTimeout(timeoutId);
                return { online: false, error: err.name === 'AbortError' ? 'Timeout' : err.message, ip: this.getRoverIp() };
            }
        },

        // Update both RPi and ESP32 Status Indicator Badges in Console Header
        updateStatusPills: function (statusRes) {
            const rpiPill = document.getElementById("rpiStatusPill");
            const rpiText = document.getElementById("rpiStatusText");
            const espPill = document.getElementById("espStatusPill");
            const espText = document.getElementById("espStatusText");
            const espLinkDetail = document.getElementById("esp32LinkStatusText");

            if (!statusRes || !statusRes.online) {
                if (rpiPill) {
                    rpiPill.classList.remove("connected");
                    rpiPill.title = `Cannot connect to Raspberry Pi at ${this.getRoverIp()}. Click to change IP.`;
                }
                if (rpiText) rpiText.innerText = "● RPi: OFFLINE";

                if (espPill) {
                    espPill.classList.remove("connected");
                    espPill.title = "Raspberry Pi offline. ESP32 status unknown.";
                }
                if (espText) espText.innerText = "● ESP32: --";
                if (espLinkDetail) {
                    espLinkDetail.style.color = "#ef4444";
                    espLinkDetail.innerText = "● RPi OFFLINE";
                }
                return;
            }

            // 1. RPi Online
            if (rpiPill) {
                rpiPill.classList.add("connected");
                rpiPill.title = `Raspberry Pi connected at ${statusRes.ip} (${statusRes.latency}ms). Click to edit settings.`;
            }
            if (rpiText) rpiText.innerHTML = `● RPi: ONLINE <span style="font-size:9.5px;opacity:0.85;">(${statusRes.latency}ms)</span>`;

            // 2. ESP32 Link Status
            const data = statusRes.data || {};
            const isEspConnected = Boolean(data.esp32_link === true || data.esp32_connected === true);
            this.setEspConnected(isEspConnected);
        },

        // Set ESP32 Link indicator state directly (from MQTT or REST telemetry)
        setEspConnected: function (connected) {
            const espPill = document.getElementById("espStatusPill");
            const espText = document.getElementById("espStatusText");
            const espLinkDetail = document.getElementById("esp32LinkStatusText");

            if (espPill) {
                if (connected) {
                    espPill.classList.add("connected");
                    espPill.title = "ESP32 Co-Processor connected via USB Serial. Motor Kinematics & Gimbal Online.";
                    if (espText) espText.innerHTML = "● ESP32: CONNECTED";
                } else {
                    espPill.classList.remove("connected");
                    espPill.title = "ESP32 disconnected from Raspberry Pi. Check USB cable between ESP32 and RPi.";
                    if (espText) espText.innerHTML = "● ESP32: OFFLINE";
                }
            }

            if (espLinkDetail) {
                if (connected) {
                    espLinkDetail.style.color = "#38bdf8";
                    espLinkDetail.innerText = "● CONNECTED (USB)";
                } else {
                    espLinkDetail.style.color = "#ef4444";
                    espLinkDetail.innerText = "● DISCONNECTED";
                }
            }
        },

        // Global Settings Modal Helper
        openSettingsModal: function () {
            let modal = document.getElementById('rpiConfigModal');
            if (!modal) {
                const currentIp = this.getRoverIp();
                const isHttps = window.location.protocol === 'https:';

                modal = document.createElement('div');
                modal.id = 'rpiConfigModal';
                modal.innerHTML = `
                    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;">
                        <div style="background:#0d1626;border:1px solid rgba(0,229,153,0.3);border-radius:16px;width:100%;max-width:460px;padding:24px;color:#f3f4f6;box-shadow:0 25px 50px -12px rgba(0,0,0,0.8);font-family:'Plus Jakarta Sans',sans-serif;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                                <h3 style="font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:8px;color:#00e599;margin:0;">
                                    <span>⚙️</span> Rover Connection Settings
                                </h3>
                                <button id="rpiCloseModalBtn" style="background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer;">&times;</button>
                            </div>

                            ${isHttps ? `
                            <div style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);border-radius:8px;padding:10px 12px;margin-bottom:14px;font-size:12px;color:#fca5a5;line-height:1.4;">
                                <strong>⚠️ Mixed Content Warning:</strong> You are accessing this console via HTTPS. Modern web browsers block unencrypted HTTP connections to local IPs (192.168.x.x). Please open the console via <code>http://localhost:5173/console/dashboard.html</code> or direct HTTP!
                            </div>
                            ` : ''}
                            
                            <div style="margin-bottom:14px;">
                                <label style="display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Raspberry Pi / Host IP Address</label>
                                <div style="display:flex;gap:8px;">
                                    <input id="rpiIpInput" type="text" value="${currentIp}" placeholder="e.g. 192.168.1.50 or localhost" style="flex:1;background:rgba(7,13,24,0.9);border:1px solid rgba(255,255,255,0.12);padding:10px 14px;border-radius:8px;color:#00e599;font-family:'JetBrains Mono',monospace;font-size:13px;outline:none;" />
                                    <button id="rpiTestPingBtn" type="button" style="padding:10px 14px;border-radius:8px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.35);color:#38bdf8;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;">Test Ping</button>
                                </div>
                                <span style="font-size:11px;color:#94a3b8;display:block;margin-top:5px;">Enter IP/hostname only (e.g. <code>192.168.1.50</code>). Do <strong>NOT</strong> include <code>:5000</code> or <code>http://</code>.</span>
                                <div id="rpiPingFeedback" style="display:none;font-size:11px;font-family:'JetBrains Mono',monospace;margin-top:6px;padding:6px 10px;border-radius:6px;"></div>
                            </div>

                            <div style="margin-bottom:18px;">
                                <label style="display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Connection Topology</label>
                                <select id="rpiModeSelect" style="width:100%;background:rgba(7,13,24,0.9);border:1px solid rgba(255,255,255,0.12);padding:10px 14px;border-radius:8px;color:#f3f4f6;font-size:13px;outline:none;">
                                    <option value="local" ${this.getConnectionMode() === 'local' ? 'selected' : ''}>Local RPi Wi-Fi / Hotspot (Offline Direct)</option>
                                    <option value="cloud" ${this.getConnectionMode() === 'cloud' ? 'selected' : ''}>Cloud MQTT Broker (Internet Active)</option>
                                </select>
                            </div>

                            <div style="display:flex;gap:10px;justify-content:flex-end;">
                                <button id="rpiCancelBtn" style="padding:8px 16px;border-radius:8px;background:rgba(255,255,255,0.06);color:#94a3b8;border:none;font-size:13px;font-weight:600;cursor:pointer;">Cancel</button>
                                <button id="rpiSaveBtn" style="padding:8px 18px;border-radius:8px;background:#00e599;color:#070d18;border:none;font-size:13px;font-weight:700;cursor:pointer;">Save & Apply</button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                document.getElementById('rpiCloseModalBtn').onclick = () => modal.remove();
                document.getElementById('rpiCancelBtn').onclick = () => modal.remove();

                // Live Test Ping handler
                document.getElementById('rpiTestPingBtn').onclick = async () => {
                    const testInput = document.getElementById('rpiIpInput').value.trim();
                    const cleanIp = RPiConfig.cleanHostOrIp(testInput);
                    const feedback = document.getElementById('rpiPingFeedback');
                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(255,255,255,0.06)';
                    feedback.style.color = '#38bdf8';
                    feedback.innerText = `Testing connection to http://${cleanIp}:5000/status ...`;

                    const controller = new AbortController();
                    const timer = setTimeout(() => controller.abort(), 2500);
                    const t0 = performance.now();

                    try {
                        const res = await fetch(`http://${cleanIp}:5000/status`, { signal: controller.signal, mode: 'cors' });
                        clearTimeout(timer);
                        const ms = Math.round(performance.now() - t0);
                        if (res.ok) {
                            feedback.style.background = 'rgba(0,229,153,0.15)';
                            feedback.style.color = '#00e599';
                            feedback.innerText = `✅ Connected! Latency: ${ms}ms (Stream & Telemetry Active)`;
                        } else {
                            feedback.style.background = 'rgba(239,68,68,0.15)';
                            feedback.style.color = '#f87171';
                            feedback.innerText = `❌ Server replied with HTTP ${res.status}`;
                        }
                    } catch (e) {
                        clearTimeout(timer);
                        feedback.style.background = 'rgba(239,68,68,0.15)';
                        feedback.style.color = '#f87171';
                        feedback.innerText = `❌ Connection failed: Unable to reach http://${cleanIp}:5000. Is main.py running?`;
                    }
                };

                document.getElementById('rpiSaveBtn').onclick = () => {
                    const rawIp = document.getElementById('rpiIpInput').value.trim();
                    const newMode = document.getElementById('rpiModeSelect').value;
                    RPiConfig.setRoverIp(rawIp);
                    RPiConfig.setConnectionMode(newMode);
                    modal.remove();
                    window.location.reload();
                };
            }
        }
    };

    window.RPiConfig = RPiConfig;

})(window);
