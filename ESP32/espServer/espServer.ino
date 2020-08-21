#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include "TemperatureSensor.h"
#include "SoilSensor.h"
#include "config.h"
#include<PubSubClient.h>
#include<ArduinoJson.h>
#include "time.h"
#include <string.h>

#define AWS_IOT_PUBLISH_TOPIC   "esp/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp/sub"

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);


/* 
 *  WLAN Config
 */
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;

const int PLANT_ID = 4;


int TEMP_SENSOR_PIN = 13;
int SOIL_SENSOR_PIN = 14;
int RELAY_PIN = 10;


SoilSensor soilSensor(SOIL_SENSOR_PIN);
TemperatureSensor sensor(TEMP_SENSOR_PIN);

unsigned long WATER_TIME = 1000;
unsigned long delayStart = 0;
bool isWatering = false;


const size_t capacity = JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(3);
DynamicJsonDocument doc(capacity);
JsonObject data = doc.createNestedObject("data");

uint8_t  temp, humid = 0;


/* Use NTP (Network Time Protocol) to get the date and time from the NTP Server*/
const char* ntp_server = "pool.ntp.org";
const long gmtOffset_sec = -18000;    // Use an UTC time offset for EST
const int daylightOffset_sec = 3600;  // Offset for observing daylight savings time


void connectToAWS()
{
  //WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  Serial.println("Connect to Wifi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println(WiFi.localIP());

  // Configure WiFiClientSecure to use the AWS Iot device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  // Create a message handler
  client.onMessage(messageHandler);

  Serial.print("Connecting to AWS IOT Core");

  while(!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
    lwMQTTErr(client.lastError());
    
  }

  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT is Connected");
}

void lwMQTTErr(lwmqtt_err_t reason)
{
  if (reason == lwmqtt_err_t::LWMQTT_SUCCESS)
    Serial.print("Success");
  else if (reason == lwmqtt_err_t::LWMQTT_BUFFER_TOO_SHORT)
    Serial.print("Buffer too short");
  else if (reason == lwmqtt_err_t::LWMQTT_VARNUM_OVERFLOW)
    Serial.print("Varnum overflow");
  else if (reason == lwmqtt_err_t::LWMQTT_NETWORK_FAILED_CONNECT)
    Serial.print("Network failed connect");
  else if (reason == lwmqtt_err_t::LWMQTT_NETWORK_TIMEOUT)
    Serial.print("Network timeout");
  else if (reason == lwmqtt_err_t::LWMQTT_NETWORK_FAILED_READ)
    Serial.print("Network failed read");
  else if (reason == lwmqtt_err_t::LWMQTT_NETWORK_FAILED_WRITE)
    Serial.print("Network failed write");
  else if (reason == lwmqtt_err_t::LWMQTT_REMAINING_LENGTH_OVERFLOW)
    Serial.print("Remaining length overflow");
  else if (reason == lwmqtt_err_t::LWMQTT_REMAINING_LENGTH_MISMATCH)
    Serial.print("Remaining length mismatch");
  else if (reason == lwmqtt_err_t::LWMQTT_MISSING_OR_WRONG_PACKET)
    Serial.print("Missing or wrong packet");
  else if (reason == lwmqtt_err_t::LWMQTT_CONNECTION_DENIED)
    Serial.print("Connection denied");
  else if (reason == lwmqtt_err_t::LWMQTT_FAILED_SUBSCRIPTION)
    Serial.print("Failed subscription");
  else if (reason == lwmqtt_err_t::LWMQTT_SUBACK_ARRAY_OVERFLOW)
    Serial.print("Suback array overflow");
  else if (reason == lwmqtt_err_t::LWMQTT_PONG_TIMEOUT)
    Serial.print("Pong timeout");
}

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

void messageHandler(String &topic, String &payload){
  Serial.println("Message received");
  Serial.println("incoming: " + topic + " - " + payload);

  StaticJsonDocument<400> doc;
  
  DeserializationError err = deserializeJson(doc, payload);
  if (err) {
    Serial.print(F("deserializeJson() failed with code "));
    Serial.println(err.c_str());
  }

  const char* command = doc["command"];
  Serial.println("The command is : ");
  Serial.println(command);

  if (strcmp(command, "water") == 0){
    waterPlant();
  }
}



int publishSensorReadings(uint8_t temperature, uint8_t humidity, uint8_t soil_moisture)
{
  StaticJsonDocument<200> doc;

  doc["plantId"] = PLANT_ID;
  doc["datetime"] = getLocalTimeNTP();
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["soil_moisture"] = soil_moisture; 

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); 
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
  Serial.println("Publish message");

  while(!client.publish(AWS_IOT_PUBLISH_TOPIC)){
    Serial.println("Retrying publishing message. Message did not publish correctly.");
  }
  Serial.println("Message has been published successfully");

  return 1;
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
  client.loop();
  delay(1000);
  int value;
  //value = soilSensor.getSoilMoisture();
  checkWateringState();  
  
  
}
