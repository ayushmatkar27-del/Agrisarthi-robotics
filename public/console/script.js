// ================= MQTT CONFIG =================
let clientID = "webClient_" + Math.random().toString(16).substr(2, 8);

let client = new Paho.MQTT.Client(
  "broker.hivemq.com",
  8000,
  clientID
);

// ================= MQTT CONNECT =================
client.connect({
  onSuccess: onConnect,
  onFailure: onFailure,
  useSSL: false
});

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived; 


let config = {
    channelId: '',
    readApiKey: '',
    writeApiKey: '',
    updateInterval: 15000 // milliseconds
};

let updateTimer = null;
let tempChart = null;
let moistureChart = null;

// Thresholds
let thresholds = {
    moisture: 30,
    temperature: 40,
    tank: 20
};

function onConnect() {
  console.log("MQTT Connected");
  client.subscribe("esp/waterlevel");
}

function onFailure(error) {
  console.log("MQTT Connection Failed:", error.errorMessage);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("MQTT Connection Lost:", responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  try {
    let data = JSON.parse(message.payloadString);

    if (data.water !== undefined) {
      document.getElementById("water").innerText = data.water + "%";
    }
  } catch (e) {
    console.log("Invalid JSON received");
  }
}

// Current sensor data
let currentData = {
    temperature: 0,
    moisture: 0,
    humidity: 0,
    light: 0,
    tank: 0,
    pump: 0
};

let isAutoMode = true;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initCharts();
    setupNavigation();
    
    if (config.channelId && config.readApiKey) {
        startAutoUpdate();
    } else {
        showConfigNotice();
    }
});

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('thingspeakConfig');
    if (saved) {
        config = JSON.parse(saved);
        hideConfigNotice();
    }
}

// Save settings to localStorage
function saveSettings() {
    config.channelId = document.getElementById('channel-id').value;
    config.readApiKey = document.getElementById('read-api-key').value;
    config.writeApiKey = document.getElementById('write-api-key').value;
    config.updateInterval = parseInt(document.getElementById('update-interval').value) * 1000;
    
    if (config.channelId && config.readApiKey) {
        localStorage.setItem('thingspeakConfig', JSON.stringify(config));
        closeSettings();
        hideConfigNotice();
        alert('✅ Configuration saved successfully!');
        startAutoUpdate();
    } else {
        alert('⚠️ Please fill in Channel ID and Read API Key');
    }
}

// Show/hide config notice
function showConfigNotice() {
    document.getElementById('config-notice').classList.remove('hidden');
}

function hideConfigNotice() {
    document.getElementById('config-notice').classList.add('hidden');
}

// Fetch data from ThingSpeak
async function fetchThingSpeakData() {
    if (!config.channelId || !config.readApiKey) {
        console.log('ThingSpeak not configured');
        return;
    }
    
    try {
        const url = `https://api.thingspeak.com/channels/${config.channelId}/feeds.json?api_key=${config.readApiKey}&results=1`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.feeds && data.feeds.length > 0) {
            const feed = data.feeds[0];
            
            currentData.temperature = parseFloat(feed.field1) || 0;
            currentData.moisture = parseFloat(feed.field2) || 0;
            currentData.humidity = parseFloat(feed.field3) || 0;
            currentData.light = parseFloat(feed.field4) || 0;
            currentData.tank = parseFloat(feed.field5) || 0;
            currentData.pump = parseInt(feed.field6) || 0;
            
            updateUI();
            checkAlerts();
            updateLastUpdateTime(feed.created_at);
        }
    } catch (error) {
        console.error('Error fetching ThingSpeak data:', error);
        showError('Failed to fetch data from ThingSpeak');
    }
}

// Fetch chart data (last 24 hours)
async function fetchChartData() {
    if (!config.channelId || !config.readApiKey) return;
    
    try {
        const url = `https://api.thingspeak.com/channels/${config.channelId}/feeds.json?api_key=${config.readApiKey}&results=100`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.feeds) {
            updateCharts(data.feeds);
        }
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }
}

// Update UI with sensor data
function updateUI() {
    // Temperature
    document.getElementById('temp').textContent = currentData.temperature.toFixed(1) + '°C';
    updateSensorStatus('temp', currentData.temperature, 0, 50, thresholds.temperature);
    
    // Moisture
    document.getElementById('moisture').textContent = currentData.moisture.toFixed(0) + '%';
    updateSensorStatus('moisture', currentData.moisture, 0, 100, thresholds.moisture, true);
    
    // Humidity
    document.getElementById('humidity').textContent = currentData.humidity.toFixed(0) + '%';
    updateSensorStatus('humidity', currentData.humidity, 0, 100);
    
    // Light
    document.getElementById('light').textContent = currentData.light.toFixed(0) + ' Lux';
    updateSensorStatus('light', currentData.light, 0, 2000);
    
    // Tank Level
    document.getElementById('tank-percentage').textContent = currentData.tank.toFixed(0) + '%';
    document.getElementById('tank-level').style.height = currentData.tank + '%';
    
    // Pump Status
    updatePumpStatus(currentData.pump);
    
    // Auto mode pump control
    if (isAutoMode && currentData.moisture < thresholds.moisture && currentData.pump === 0) {
        controlPump(1);
    } else if (isAutoMode && currentData.moisture >= thresholds.moisture && currentData.pump === 1) {
        controlPump(0);
    }
}

// Update sensor status badge
function updateSensorStatus(sensor, value, min, max, threshold = null, inverse = false) {
    const statusEl = document.getElementById(sensor + '-status');
    
    let status = 'normal';
    if (threshold !== null) {
        if (inverse) {
            status = value < threshold ? 'critical' : 'normal';
        } else {
            status = value > threshold ? 'critical' : 'normal';
        }
    }
    
    statusEl.className = 'sensor-status ' + status;
    statusEl.textContent = status === 'normal' ? 'Normal' : status === 'warning' ? 'Warning' : 'Critical';
}

// Update pump status display
function updatePumpStatus(status) {
    const indicator = document.getElementById('pump-indicator');
    const statusText = document.getElementById('pump-status-text');
    const onBtn = document.getElementById('pump-on');
    const offBtn = document.getElementById('pump-off');
    
    if (status === 1) {
        indicator.className = 'status-indicator active';
        statusText.textContent = 'Running';
        onBtn.classList.add('active');
        offBtn.classList.remove('active');
    } else {
        indicator.className = 'status-indicator inactive';
        statusText.textContent = 'Stopped';
        offBtn.classList.add('active');
        onBtn.classList.remove('active');
    }
}

// Control pump via ThingSpeak
// async function controlPump(state) {
//     if (!config.writeApiKey) {
//         alert('⚠️ Write API Key not configured. Go to Settings.');
//         return;
//     }
    
//     try {
//         const url = `https://api.thingspeak.com/update?api_key=${config.writeApiKey}&field6=${state}`;
//         const response = await fetch(url);
//         const data = await response.text();
        
//         if (data !== '0') {
//             currentData.pump = state;
//             updatePumpStatus(state);
//             console.log('Pump control sent:', state ? 'ON' : 'OFF');
//         }
//     } catch (error) {
//         console.error('Error controlling pump:', error);
//         alert('❌ Failed to control pump');
//     }
// }

// Set mode (auto/manual)
function setMode(mode) {
    isAutoMode = mode === 'auto';
    console.log('Mode set to:', mode);
}

// Check and update alerts
function checkAlerts() {
    const alertsContainer = document.getElementById('alerts-container');
    let alerts = [];
    
    // Low moisture alert
    if (currentData.moisture < thresholds.moisture) {
        alerts.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Low Soil Moisture',
            message: `Current: ${currentData.moisture.toFixed(0)}% | Threshold: ${thresholds.moisture}%`
        });
    }
    
    // High temperature alert
    if (currentData.temperature > thresholds.temperature) {
        alerts.push({
            type: 'danger',
            icon: '🚨',
            title: 'High Temperature Alert',
            message: `Current: ${currentData.temperature.toFixed(1)}°C | Threshold: ${thresholds.temperature}°C`
        });
    }
    
    // Low tank alert
    if (currentData.tank < thresholds.tank) {
        alerts.push({
            type: 'danger',
            icon: '💧',
            title: 'Water Tank Low',
            message: `Current: ${currentData.tank.toFixed(0)}% | Critical Level`
        });
    }
    
    // Update alerts display
    if (alerts.length === 0) {
        alertsContainer.innerHTML = '<p class="no-alerts">No active alerts. All systems normal! ✅</p>';
        document.getElementById('alert-count').textContent = '0';
    } else {
        alertsContainer.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <span>${alert.icon}</span>
                <div>
                    <strong>${alert.title}</strong><br>
                    <small>${alert.message}</small>
                </div>
            </div>
        `).join('');
        document.getElementById('alert-count').textContent = alerts.length;
    }
}

// Update threshold values
function updateThreshold(type, value) {
    if (type === 'moisture') {
        thresholds.moisture = parseInt(value);
        document.getElementById('moisture-threshold-value').textContent = value + '%';
    } else if (type === 'temp') {
        thresholds.temperature = parseInt(value);
        document.getElementById('temp-threshold-value').textContent = value + '°C';
    }
    checkAlerts();
}

// Update last update time
function updateLastUpdateTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    
    let timeStr = '';
    if (diff < 60) {
        timeStr = 'Just now';
    } else if (diff < 3600) {
        timeStr = Math.floor(diff / 60) + ' minutes ago';
    } else {
        timeStr = date.toLocaleTimeString();
    }
    
    document.getElementById('last-update').textContent = timeStr;
}

// Initialize charts
function initCharts() {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    
    // Temperature Chart
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                tension: 0.4
            }]
        },
        options: commonOptions
    });
    
    // Moisture Chart
    const moistureCtx = document.getElementById('moistureChart').getContext('2d');
    moistureChart = new Chart(moistureCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Soil Moisture (%)',
                data: [],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            }]
        },
        options: commonOptions
    });
    
    fetchChartData();
}

// Update charts with data
function updateCharts(feeds) {
    const labels = feeds.map(f => {
        const date = new Date(f.created_at);
        return date.toLocaleTimeString();
    });
    
    const tempData = feeds.map(f => parseFloat(f.field1) || 0);
    const moistureData = feeds.map(f => parseFloat(f.field2) || 0);
    
    tempChart.data.labels = labels;
    tempChart.data.datasets[0].data = tempData;
    tempChart.update();
    
    moistureChart.data.labels = labels;
    moistureChart.data.datasets[0].data = moistureData;
    moistureChart.update();
}

// Start auto-update
function startAutoUpdate() {
    if (updateTimer) {
        clearInterval(updateTimer);
    }
    
    fetchThingSpeakData();
    fetchChartData();
    
    updateTimer = setInterval(() => {
        fetchThingSpeakData();
        fetchChartData();
    }, config.updateInterval);
}

// Settings modal functions
function closeSettings() {
    document.getElementById('settings-modal').classList.remove('show');
}

function showNotifications() {
    alert('🔔 Notification panel - Feature coming soon!');
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            if (page === 'settings') {
                showSettings();
            } else if (page === 'logout') {
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.clear();
                    location.reload();
                }
            } else {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function showSettings() {
    const modal = document.getElementById('settings-modal');
    
    // Pre-fill current values
    document.getElementById('channel-id').value = config.channelId || '';
    document.getElementById('read-api-key').value = config.readApiKey || '';
    document.getElementById('write-api-key').value = config.writeApiKey || '';
    document.getElementById('update-interval').value = config.updateInterval / 1000;
    
    modal.classList.add('show');
}

// Plant image preview
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const scanArea = document.getElementById('scan-area');
            scanArea.innerHTML = `
                <img src="${e.target.result}" alt="Plant Image">
                <p>Image loaded! Click 'Analyze' to detect diseases.</p>
                <button class="scan-btn" onclick="analyzePlant()">🔍 Analyze Plant</button>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function analyzePlant() {
    alert('🌿 Analyzing plant health using AI...\n\nThis feature requires integration with plant disease detection API.');
}

function captureFromCamera() {
    alert('📷 ESP32-CAM Integration\n\nSend capture command to your ESP32-CAM module.\nImage URL will be fetched from ThingSpeak or external storage.');
}

function showError(message) {
    console.error(message);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('settings-modal');
    if (event.target === modal) {
        closeSettings();
    }
};

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (example only, replace with real authentication logic)
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        window.location.href = './index.html'; // Redirect to the index page
    } else {
        alert('Invalid username or password.');
    }
});

// Handle Google Sign-In button click
document.getElementById('google-signin').addEventListener('click', function() {
    alert('Google Sign-In functionality is not implemented yet.');
    // Add Google Sign-In API integration here
});


document.addEventListener("DOMContentLoaded", () => {

    const status = document.getElementById("status");

    function startPump() {
        status.textContent = "Pump Started 💧";
    }

    function stopPump() {
        status.textContent = "Pump Stopped 🚫";
    }

    document.getElementById("startBtn").addEventListener("click", startPump);
    document.getElementById("stopBtn").addEventListener("click", stopPump);
});

function startMJPEGStream(url) {
    if (mjpegXHR) mjpegXHR.abort();
    
    mjpegCanvas = document.getElementById('mjpegCanvas');
    mjpegCtx = mjpegCanvas.getContext('2d');
    
    mjpegXHR = new XMLHttpRequest();
    mjpegXHR.open('GET', url, true);
    mjpegXHR.responseType = 'arraybuffer';
    mjpegXHR.overrideMimeType('multipart/x-mixed-replace; boundary=frame');  // Adjust boundary if different
    
    let buffer = new Uint8Array();
    mjpegXHR.onreadystatechange = function() {
        if (mjpegXHR.readyState === 3 || mjpegXHR.readyState === 4) {  // Partial or full data
            const newData = new Uint8Array(mjpegXHR.response);
            buffer = new Uint8Array([...buffer, ...newData.slice(buffer.length)]);
            
            let jpegStart = -1;
            let jpegEnd = -1;
            
            // Find JPEG boundaries (SOI 0xFFD8, EOI 0xFFD9)
            for (let i = 0; i < buffer.length - 1; i++) {
                if (buffer[i] === 0xFF && buffer[i+1] === 0xD8) jpegStart = i;
                if (buffer[i] === 0xFF && buffer[i+1] === 0xD9 && jpegStart !== -1) {
                    jpegEnd = i + 2;
                    break;
                }
            }
            
            if (jpegStart !== -1 && jpegEnd !== -1) {
                const jpegData = buffer.slice(jpegStart, jpegEnd);
                const blob = new Blob([jpegData], {type: 'image/jpeg'});
                createImageBitmap(blob).then(bitmap => {
                    mjpegCanvas.width = bitmap.width;
                    mjpegCanvas.height = bitmap.height;
                    mjpegCtx.drawImage(bitmap, 0, 0);
                    bitmap.close();
                });
                
                buffer = buffer.slice(jpegEnd);  // Remove processed frame
            }
        }
    };
    
    mjpegXHR.send();
}

// In startESPCamera():
// Instead of mjpegElement.src = esp32StreamUrl;
startMJPEGStream(esp32StreamUrl);


// ================== PUMP CONTROL FUNCTIONS ==================
// ... existing code ...

// Add these functions:
function startPump() {
    controlPump('ON');
}

function stopPump() {
    controlPump('OFF');
}

// Or you can also add them to the window object at the end:
window.startPump = function() {
    controlPump('ON');
};

window.stopPump = function() {
    controlPump('OFF');
};