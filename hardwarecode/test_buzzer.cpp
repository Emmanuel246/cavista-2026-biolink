#include <Arduino.h>

#define BUZZER_PIN 27

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("Actuation Unit Test: Buzzer Control");
}

void loop() {
  Serial.println("Triggering Emergency Alarm...");
  digitalWrite(BUZZER_PIN, HIGH);
  delay(1000); // ON for 1 second
  
  Serial.println("System Normal...");
  digitalWrite(BUZZER_PIN, LOW);
  delay(3000); // OFF for 3 seconds
}