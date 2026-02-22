#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <WiFiClientSecure.h>

// ==========================================
// 1. WIFI & CLOUD CONFIGURATION
// ==========================================
const char* ssid = "TofStrings";
const char* password = "Emmanuel";

// 🚨 URGENT: Replace 'YOUR_ENDPOINT' with the exact word your backend dev gave you!
// Example: "...railway.app/api/sensors" or "...railway.app/data"
const char* serverName = "https://cavista-2026-ecobreathe-ai-production.up.railway.app/sensor-data"; 

// ==========================================
// 2. HARDWARE PINS & SENSOR SETUP
// ==========================================
#define DHTPIN 4
#define DHTTYPE DHT11
#define MQ135_PIN 34
#define BUZZER_PIN 27 

// The Actuation Threshold to beat the competition
const int ALARM_THRESHOLD = 300; 

DHT dht(DHTPIN, DHTTYPE);
HardwareSerial pmsSerial(2); // Using UART2 (RX=16, TX=17) for Plantower Laser

int plantower_pm25 = 0;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pmsSerial.begin(9600, SERIAL_8N1, 16, 17);

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW); // Ensure emergency exhaust is OFF at startup

  // --- CONNECT TO HOTSPOT ---
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nEcoBreath Edge-Node Online!");
  
  // Quick 200ms physical confirmation beep
  digitalWrite(BUZZER_PIN, HIGH);
  delay(200);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  // ==========================================
  // STEP 1: SENSOR POLLING & EDGE COMPUTING
  // ==========================================
  int raw_gas = analogRead(MQ135_PIN);
  
  // Parse UART data from Plantower PM2.5 Laser
  if (pmsSerial.available() >= 32) {
    if (pmsSerial.read() == 0x42 && pmsSerial.read() == 0x4D) {
      for (int i = 0; i < 4; i++) pmsSerial.read(); // Skip header bytes
      plantower_pm25 = (pmsSerial.read() << 8) | pmsSerial.read(); 
      while (pmsSerial.available()) pmsSerial.read(); // Flush buffer
    }
  }

  // Calculate Sensor Fusion Air Quality Index
  int fused_aqi = plantower_pm25 + (raw_gas / 10); 

  // ==========================================
  // STEP 2: CLOSED-LOOP ACTUATION 
  // ==========================================
  if (fused_aqi >= ALARM_THRESHOLD) {
    digitalWrite(BUZZER_PIN, HIGH); // Trigger emergency exhaust mitigation!
  } else {
    digitalWrite(BUZZER_PIN, LOW);  // System Normal
  }

  // ==========================================
  // STEP 3: SECURE CLOUD POST ROUTINE
  // ==========================================
  if (WiFi.status() == WL_CONNECTED) {
      WiFiClientSecure client;
      client.setInsecure(); // 🚨 Bypasses SSL to force data to the Railway cloud!

      HTTPClient http;
      
      // Build JSON Payload
      StaticJsonDocument<200> doc;
      doc["temperature"] = dht.readTemperature();
      doc["humidity"]    = dht.readHumidity();
      doc["aqi"]         = fused_aqi;
      doc["device_id"]   = "esp32-001";

      String requestBody;
      serializeJson(doc, requestBody);

      // Initialize HTTPS POST connection
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");

      // Fire payload to backend
      int httpResponseCode = http.POST(requestBody);

      // Verify success in Serial Monitor
      Serial.printf("Server: %d | Fused AQI: %d | Payload: %s\n", httpResponseCode, fused_aqi, requestBody.c_str());
      
      http.end();
  } else {
    Serial.println("Error: Edge-Node lost WiFi connection.");
  }
  
  // Wait 5 seconds before next polling cycle
  delay(5000); 
}