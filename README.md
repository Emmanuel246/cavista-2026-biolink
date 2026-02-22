# EcoBreathe AI

**Smart Environmental Monitoring that Predicts Health Risks Before They Happen**

EcoBreathe AI is an IoT-powered environmental health monitoring system that collects real-time air and weather data, analyzes it using an AI risk engine, and provides early warnings to help prevent heat stress and respiratory problems.

Built for the hackathon theme:
**From Data to Prevention: AI as Health Partner**

---

## Overview

EcoBreathe AI transforms environmental data into actionable health insights.

The system monitors:

* Temperature
* Humidity
* Air quality (pollution levels)

Using this data, it predicts:

* Heat stress risk
* Respiratory / asthma risk
* Environmental Health Score

Users receive:

* Real-time dashboard updates
* Risk levels (Low / Medium / High)
* Preventive recommendations such as:

  * Hydrate and avoid outdoor activity
  * Improve ventilation
  * Wear a mask when air quality is poor

This solution is especially relevant for urban environments like Lagos, where heat and pollution significantly impact daily health.

---

## Features

### IoT Environmental Monitoring

* ESP32 microcontroller
* DHT22 sensor (temperature & humidity)
* MQ135 / PM sensor (air quality)
* Data transmission via WiFi every 30–60 seconds

### AI Risk Engine

* Heat stress prediction
* Air quality risk detection
* Environmental Health Score (0–100)
* Smart prevention recommendations

### Real-Time Dashboard

* Live sensor readings
* Risk status (Green / Yellow / Red)
* Health score visualization
* Historical trends
* Device status monitoring

### API Integration

* Weather API (fallback)
* Air Quality API (contextual data)
* Gemini Integration for chatbot and personalized responses

---

## Tech Stack

**Frontend**

* React
* Tailwind CSS
* Axios
* Chart.js / Recharts

**Backend**

* Python
* Fast API
* SQLite

**Hardware**

* ESP32
* DHT11
* MQ135
* PM Sensor
* Buzzer
* BreadBoard

**Other**

* REST APIs
* IoT communication over HTTP

---

## System Architecture

Hardware Layer
ESP32 + Sensors → WiFi

Backend Layer
Python FastAPI → SQLite 

AI Layer
RAG + Rule-based risk engine + Gemini Integration

Frontend Layer
React Dashboard → Real-time visualization

---

## AI Risk Model

### Heat Stress Rules

* Temperature > 32°C and Humidity > 70% → High Risk
* Temperature > 30°C → Medium Risk

### Air Quality Rules

* AQI > 150 → High Risk
* AQI > 100 → Medium Risk

### Health Score

Health Score starts at 100.

Penalties:

* High heat risk: −25
* Medium heat risk: −10
* High air risk: −25
* Medium air risk: −10

Score interpretation:

| Score  | Condition |
| ------ | --------- |
| 80–100 | Safe      |
| 50–79  | Moderate  |
| 0–49   | Unhealthy |

---

## Project Structure

```
EcoBreath-AI/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── hardware/
│   ├── esp32-code/
│   └── wiring-diagram/
│
└── README.md
```

---

## Production API Endpoints

**Base URL:** `https://cavista-2026-ecobreathe-ai-production.up.railway.app`

### POST /sensor-data
Send sensor data from ESP32.
```json
{
  "temperature": 31,
  "humidity": 75,
  "aqi": 140,
  "device_id": "device-001"
}
```

---

### GET /latest-data
Returns latest readings and full risk analysis for the dashboard.

---

### GET /history
Returns the 50 most recent historical environmental data points.

---

### POST /symptom-diary
Receives structured symptom entries directly from the dashboard.

## Installation

### Backend

```
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Hardware Setup

Components:

* ESP32
* DHT22
* MQ135 or PM sensor
* Breadboard & jumper wires

Steps:

1. Connect sensors to ESP32
2. Upload firmware
3. Configure WiFi credentials
4. Set backend API URL
5. Device sends data every 30–60 seconds


## Use Cases

* Homes and families
* Asthma patients
* Schools and classrooms
* Offices and workplaces
* Hospitals
* Outdoor workers


## Future Improvements

* Mobile app
* WhatsApp/SMS alerts
* Machine learning risk prediction
* Multi-device monitoring
* Building-level analytics
* City-wide air quality risk maps


## License

MIT License

