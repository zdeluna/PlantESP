#include "WiFi.h"
#include "TemperatureSensor.h"
#include "config.h"

const char* ssid = WIFI_PASSWORD;
const char* password = WIFI_SSID;


int TEMP_SENSOR_PIN = 14;
//TemperatureSensor sensor(TEMP_SENSOR_PIN);


void setup() {

  	// Start Serial Communication
  	Serial.begin(115200);
  	Serial.println("Start server");
    scanNetworks();
    connectToNetwork();

    Serial.println(WiFi.localIP());

    WiFi.disconnect();

 }

void getTemperature() {
    uint8_t temperature = sensor.getTemperature();
    return temperature;
}


void loop() {
}
