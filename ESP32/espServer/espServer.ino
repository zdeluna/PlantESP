#include "TemperatureSensor.h"
#include "SoilSensor.h"
#include "MQTT.h"
#include "time.h"
#include <string.h>


const int PLANT_ID = 4;


int TEMP_SENSOR_PIN = 13;
int SOIL_SENSOR_PIN = 14;
int RELAY_PIN = 10;


SoilSensor soilSensor(SOIL_SENSOR_PIN);
TemperatureSensor sensor(TEMP_SENSOR_PIN);
MQTT mqtt;

unsigned long WATER_TIME = 1000;
unsigned long delayStart = 0;
bool isWatering = false;


uint8_t  temp, humid = 0;


/* Use NTP (Network Time Protocol) to get the date and time from the NTP Server*/
const char* ntp_server = "pool.ntp.org";
const long gmtOffset_sec = -18000;    // Use an UTC time offset for EST
const int daylightOffset_sec = 3600;  // Offset for observing daylight savings time


void waterPlant(){
  Serial.println("call water plant function");
  digitalWrite(RELAY_PIN, HIGH);
  delayStart = millis();
  isWatering = true;
}

void checkWateringState() {
  if (isWatering && ((millis() - delayStart) >= WATER_TIME)){
    isWatering = false;
    digitalWrite(RELAY_PIN, LOW);
  }
}


unsigned long getLocalTimeNTP() {
    configTime(gmtOffset_sec, daylightOffset_sec, ntp_server);
    time_t now;
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)) {
        Serial.println("Failed to get time");
        return 0;
    }
    Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
    time(&now);
    return now;
}



void setup() {

  	// Start Serial Communication
  	Serial.begin(115200);
    delay(1000);
    //connectToAWS();
    delay(1000); 
    
 
 }

void getTemperature() {
    //uint8_t temperature = sensor.getTemperature();
    //return temperature;
}



void loop() {
  mqtt.client.loop();
  delay(1000);
  int value;
  //value = soilSensor.getSoilMoisture();
  checkWateringState();  
  
  
}
