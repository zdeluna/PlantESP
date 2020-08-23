#ifndef MQTT_h
#define MQTT_h

#include "config.h"
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include "Arduino.h"
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define AWS_IOT_PUBLISH_TOPIC   "esp/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp/sub"

class MQTT
{
  public:
    MQTT();
    void connectToAWS();
    int publishSensorReadings(time_t datetime, uint8_t plantId, uint8_t temperature, uint8_t humidity, uint8_t soil_moisture);
    MQTTClient client;
    static void messageHandler(String &topic, String &payload);

  private:
    WiFiClientSecure _net;
    
};

#endif
