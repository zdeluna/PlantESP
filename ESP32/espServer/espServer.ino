#include "WiFi.h"
#include "TemperatureSensor.h"
#include "config.h"
#include<PubSubClient.h>
#include<ArduinoJson.h>

/* 
 *  WLAN Config
 */
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;




int TEMP_SENSOR_PIN = 14;
//TemperatureSensor sensor(TEMP_SENSOR_PIN);


/*
 * MQTT Broker Config
 */
const char* mqtt_broker = "mqtt.eclipse.org";
const char* topic = "text/1/env";

 
const size_t capacity = JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(3);
DynamicJsonDocument doc(capacity);
JsonObject data = doc.createNestedObject("data");

float temp, humid = 0.0;
char output[128];

WiFiClient espClient;
PubSubClient client(espClient);

/* Use NTP (Network Time Protocol) to get the date and time from the NTP Server*/
const char* ntp_server = "pool.ntp.org";
const long gmtOffset_sec = -18000;    // Use an UTC time offset for EST
const int daylightOffset_sec = 3600;  // Offset for observing daylight savings time




unsigned long getLocalTimeNTP() {
    time_t now;
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)) {
        Serial.println("Failed to get time");
        return 0;
    }
    Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}



void setup() {

  	// Start Serial Communication
  	Serial.begin(115200);
    delay(20);
   
  	Serial.println("Start server");
    WiFi.begin(ssid, password);
    while(WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print("Not connected to wifi");
    }
    Serial.println("Wifi Connected");
    Serial.println(WiFi.localIP());

    configTime(gmtOffset_sec, daylightOffset_sec, ntp_server);
    getLocalTimeNTP();

 }

void getTemperature() {
    //uint8_t temperature = sensor.getTemperature();
    //return temperature;
}


void loop() {
}
