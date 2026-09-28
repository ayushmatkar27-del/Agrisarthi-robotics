from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import time
from collections import Counter
import numpy as np
import threading

app = Flask(__name__)
CORS(app)

# ===== YOLO CONFIG =====
MODEL_PATH = "yolov8n.pt"
CONFIDENCE = 0.30
FRAME_SKIP = 2
ANIMAL_CLASSES = {14, 15, 16, 17, 18, 19, 20, 21, 22, 23}

print("Loading YOLO model...")
model = YOLO(MODEL_PATH)
print("Model loaded!\n")

# ===== GLOBAL STATE =====
cap = None
stream_active = False
current_frame = None
detection_data = {
    "total_objects": 0,
    "person_count": 0,
    "animal_count": 0,
    "fps": 0.0,
    "objects": []
}
prev_time = 0
frame_count = 0

def adjust_gamma(image, gamma=1.6):
    invGamma = 1.0 / gamma
    table = np.array([(i / 255.0) ** invGamma * 255 for i in np.arange(0, 256)]).astype("uint8")
    return cv2.LUT(image, table)

def stream_worker(esp32_url):
    """Background thread that captures, processes, and serves the stream"""
    global cap, stream_active, current_frame, detection_data, prev_time, frame_count
    
    print(f"Starting stream from {esp32_url}")
    cap = cv2.VideoCapture(esp32_url)
    
    if not cap.isOpened():
        print("❌ Cannot open ESP32 stream!")
        stream_active = False
        return
    
    stream_active = True
    prev_time = time.time()
    frame_count = 0
    
    while stream_active:
        try:
            ret, frame = cap.read()
            if not ret:
                print("⚠ Frame lost — reconnecting…")
                cap.release()
                cap = cv2.VideoCapture(esp32_url)
                continue
            
            frame_count += 1
            frame = cv2.resize(frame, (640, 480))
            frame = adjust_gamma(frame, gamma=1.4)
            
            annotated = frame.copy()
            detections = []
            all_counts = Counter()
            
            # Run YOLO every FRAME_SKIP frames
            if frame_count % FRAME_SKIP == 0:
                results = model(frame, conf=CONFIDENCE)
                for box in results[0].boxes:
                    cls = int(box.cls[0])
                    conf = float(box.conf[0])
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    name = model.names[cls]
                    detections.append(name)
                    all_counts[name] += 1
                    
                    color = (0, 255, 0) if cls in ANIMAL_CLASSES else (255, 0, 0) if cls == 0 else (0, 0, 255)
                    cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
                    cv2.putText(annotated, f"{name} {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            
            # Update detection data
            detection_data["total_objects"] = len(detections)
            detection_data["person_count"] = all_counts.get("person", 0)
            detection_data["animal_count"] = sum(all_counts.get(model.names[c], 0) for c in ANIMAL_CLASSES)
            detection_data["objects"] = list(set(detections))
            
            # Calculate FPS
            now = time.time()
            fps = 1 / (now - prev_time) if prev_time > 0 else 0
            prev_time = now
            detection_data["fps"] = round(fps, 1)
            
            # Overlay text
            cv2.putText(annotated, f"Total: {detection_data['total_objects']}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(annotated, f"FPS: {detection_data['fps']:.1f}", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (50, 255, 100), 2)
            
            current_frame = annotated
            
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(1)
    
    if cap:
        cap.release()
    print("Stream stopped")

def generate_mjpeg():
    """Generator that yields MJPEG frames"""
    while stream_active:
        if current_frame is not None:
            ret, buffer = cv2.imencode('.jpg', current_frame)
            if ret:
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n'
                       b'Content-Length: ' + str(len(frame_bytes)).encode() + b'\r\n\r\n' +
                       frame_bytes + b'\r\n')
        time.sleep(0.04)  # ~25 FPS

# ===== FLASK ROUTES =====

@app.route('/')
def index():
    return "AgriSarthi YOLO Backend Running"

@app.route('/start_stream', methods=['POST'])
def start_stream():
    """Start the camera stream"""
    global stream_active
    
    if stream_active:
        return jsonify({"status": "already_running", "message": "Stream already active"})
    
    data = request.json or {}
    esp32_url = data.get('esp32_url', 'http://10.164.223.165:81/')
    
    thread = threading.Thread(target=stream_worker, args=(esp32_url,), daemon=True)
    thread.start()
    
    time.sleep(1)
    return jsonify({"status": "started", "message": f"Stream started from {esp32_url}"})

@app.route('/stop_stream', methods=['POST'])
def stop_stream():
    """Stop the camera stream"""
    global stream_active, cap
    stream_active = False
    if cap:
        cap.release()
        cap = None
    return jsonify({"status": "stopped"})

@app.route('/video_feed')
def video_feed():
    """MJPEG video stream"""
    return Response(generate_mjpeg(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/detection_data')
def get_detection_data():
    """Get detection data"""
    return jsonify(detection_data)

@app.route('/status')
def get_status():
    """Get stream status"""
    return jsonify({"stream_active": stream_active, "frame_available": current_frame is not None})

if __name__ == '__main__':
    print("Starting Flask server on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
