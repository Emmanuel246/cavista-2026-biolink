#include <Arduino.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  Serial.println("DHT11 Unit Test Started...");
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  if (isnan(temp) || isnan(hum)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Temperature: "); Serial.print(temp); Serial.print("°C  |  ");
    Serial.print("Humidity: "); Serial.print(hum); Serial.println("%");
  }
  delay(2000);
}