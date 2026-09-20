# AgriSarthi — AI-Powered Smart Farm Monitoring Rover

> **Award & Recognition**: 🏆 **1st Prize Winners — Techathon 3.0** (Awarded ₹2,00,000) | Built for **Eureka! Startup Competition**  
> **Tagline**: *"Your Farm. Monitored Continuously."*  
> **Institution**: JSPM Narhe Technical Campus, Dept. of Electronics & Computer Engineering  

---

## 📌 Executive Summary

**AgriSarthi** is an autonomous, low-cost smart agricultural monitoring rover designed to empower small to medium-scale farmers with real-time field intelligence. By integrating dual-microcontroller hardware, multi-modal environmental sensors, computer vision (YOLOv8 & OpenCV), and a cloud-connected web dashboard, AgriSarthi provides continuous 24/7 crop health, soil parameter, and security monitoring.

---

## 🛠️ System Architecture

### 1. Hardware Architecture (Dual-Controller Design)

| Layer | Microcontroller / Processor | Responsibilities & Functions |
| :--- | :--- | :--- |
| **Low-Level Control** | **ESP32 Microcontroller** | Motor control, sensor reading & data acquisition, low-power battery management, telemetry transmission. |
| **High-Level Control** | **Raspberry Pi 4 (4GB/8GB)** | Video streaming (24 FPS), YOLOv8 object detection, OpenCV path navigation, WebSocket/HTTP web interface communication. |

### 2. Sensor & Actuator Suite

- **Soil Moisture Sensor**: Capacitive sensor for real-time soil hydration monitoring.
- **DHT11 / DHT22**: Ambient temperature & relative humidity measurement.
- **MQ-2 Gas Sensor**: Air quality, smoke, and hazardous gas detection in fields/greenhouses.
- **Sound Level Sensor (Decibel Meter)**: Ambient noise & anomaly detection.
- **PIR Motion Sensor**: Passive Infrared motion detection for nocturnal security & intruder alerts.
- **Ultrasonic Sensor (HC-SR04)**: Real-time obstacle detection & collision avoidance.
- **Camera Module**: Pi Camera / HD USB Webcam with live RTSP/WebRTC stream.
- **Drivetrain & Motors**: 4WD High-Torque DC Geared Motors with L298N / BTS7960 motor driver modules.
- **Power Supply**: 12V LiFePO4 / Li-ion rechargeable battery pack with BMS & solar charging support.

---

## 🤖 Software & AI Capabilities

### 1. Computer Vision & Object Detection
- **Model**: Custom-trained **YOLOv8n (Nano)** optimized for edge devices (Raspberry Pi NPU/CPU).
- **Detectable Classes**:
  - Humans / Farm Workers
  - Stray Animals / Cattle / Pests
  - Field Hazards / Obstacles
  - Crop Disease & Weed Detection (Expansion module)
- **Performance**: Real-time inferencing with bounding box overlay & confidence scores (streaming live at 24+ FPS).

### 2. Navigation & Autonomous Operation
- **Autonomous Mode**:
  - OpenCV-based row/path-following algorithm.
  - Ultrasonic sensor array for dynamic obstacle detection & stopping.
  - Automatic waypointing & perimeter patrolling.
- **Manual Remote Control Mode**:
  - Low-latency WebSocket joystick / button control via web dashboard and mobile application.

---

## 📊 Dashboard & Cloud Web Application

- **Live Video Feed**: Low-latency HD camera stream embedded with real-time YOLOv8 bounding box annotations.
- **Telemetry & Diagnostics**:
  - Battery Percentage & Health indicator (~79% operational standard).
  - Signal Strength & Connectivity status (~92% RSSI).
  - Total Distance Covered & Operational Uptime.
  - Active Zone Map (Zones A, B, C, D) tracking current rover position.
- **Historical Analytics**: Interactive charts for temperature, soil moisture trends, gas concentration, and motion events.
- **Alert System**: Instant web/push notifications when soil moisture drops below thresholds or intruders are detected.

---

## 👨‍💻 Team & Organizational Context

- **Institution**: JSPM Narhe Technical Campus, Pune
- **Department**: Electronics & Computer Engineering (ECE)
- **Founding Team**:
  - **Ayush Matkar**: Co-Founder & Robotics Tech Developer
  - **Atharva Pachpol**: Co-Founder — Market Analysis, Research & AI Developer

---

## 🚀 Business & Roadmap Summary

- **Target Market**: Small & medium enterprise (SME) farmers, greenhouse owners, and precision agriculture researchers.
- **Value Proposition**: Drastically reduces manual labor costs, prevents early crop disease spread, and offers night-time farm security at a fraction of industrial tractor/drone costs.
- **Status**: Tested prototype seeking pilot farm deployments, mentor guidance, and seed funding.
