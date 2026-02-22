#include <Arduino.h>

HardwareSerial pmsSerial(2); // Using UART2 (RX=16, TX=17)

void setup() {
  Serial.begin(115200);
  pmsSerial.begin(9600, SERIAL_8N1, 16, 17);
  Serial.println("Plantower PMS5003 Laser Unit Test Started...");
}

void loop() {
  if (pmsSerial.available() >= 32) {
    // Check for standard Plantower start bytes (0x42, 0x4D)
    if (pmsSerial.read() == 0x42 && pmsSerial.read() == 0x4D) {
      for (int i = 0; i < 4; i++) pmsSerial.read(); // Skip frame length and PM1.0
      
      // Shift bytes to calculate PM2.5
      int pm25 = (pmsSerial.read() << 8) | pmsSerial.read(); 
      
      Serial.print("PM2.5 Concentration: ");
      Serial.print(pm25);
      Serial.println(" ug/m3");
      
      // Flush the rest of the buffer
      while (pmsSerial.available()) pmsSerial.read(); 
    }
  }
  delay(1000);
}