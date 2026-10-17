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
        // Core Networking
        getRoverIp: function () {
            return localStorage.getItem(STORAGE_KEY_IP) || detectDefaultIp();
        },
        setRoverIp: function (ip) {
            if (!ip) return;
            const cleanIp = ip.trim().replace(/^https?:\/\//, '').split('/')[0];
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
            odometry: 'agrisarthi/odometry',
            sectors: 'agrisarthi/sectors',
            alerts: 'agrisarthi/alerts',
            camera: 'agrisarthi/camera/cmd'
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

        // Global Settings Modal Helper
        openSettingsModal: function () {
            let modal = document.getElementById('rpiConfigModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'rpiConfigModal';
                modal.innerHTML = `
                    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;">
                        <div style="background:#0d1626;border:1px solid rgba(0,229,153,0.3);border-radius:16px;width:100%;max-width:440px;padding:24px;color:#f3f4f6;box-shadow:0 25px 50px -12px rgba(0,0,0,0.8);font-family:'Plus Jakarta Sans',sans-serif;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                                <h3 style="font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:8px;color:#00e599;">
                                    <span>⚙️</span> Rover Connection Settings
                                </h3>
                                <button id="rpiCloseModalBtn" style="background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer;">&times;</button>
                            </div>
                            
                            <div style="margin-bottom:14px;">
                                <label style="display:block;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;">Raspberry Pi 4 IP Address / Hostname</label>
                                <input id="rpiIpInput" type="text" value="${this.getRoverIp()}" placeholder="e.g. 192.168.4.1 or raspberrypi.local" style="width:100%;background:rgba(7,13,24,0.9);border:1px solid rgba(255,255,255,0.12);padding:10px 14px;border-radius:8px;color:#00e599;font-family:'JetBrains Mono',monospace;font-size:13px;outline:none;" />
                                <span style="font-size:11px;color:#64748b;display:block;margin-top:4px;">Used for YOLO camera stream (:5000), REST APIs, and local MQTT.</span>
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
                document.getElementById('rpiSaveBtn').onclick = () => {
                    const newIp = document.getElementById('rpiIpInput').value.trim();
                    const newMode = document.getElementById('rpiModeSelect').value;
                    RPiConfig.setRoverIp(newIp);
                    RPiConfig.setConnectionMode(newMode);
                    modal.remove();
                    window.location.reload();
                };
            }
        }
    };

    window.RPiConfig = RPiConfig;

})(window);
