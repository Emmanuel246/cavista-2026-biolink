#include <Arduino.h>

#define MQ135_PIN 34

void setup() {
  Serial.begin(115200);
  Serial.println("MQ-135 Gas Sensor Unit Test Started...");
  // Note: MQ-135 requires 24h burn-in for absolute PPM accuracy.
  // We are reading raw analog voltage for relative scaling.
}

void loop() {
  int raw_gas = analogRead(MQ135_PIN);
  Serial.print("Raw Gas Value (Analog): "); 
  Serial.println(raw_gas);
  delay(1000);
}