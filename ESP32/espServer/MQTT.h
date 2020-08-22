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
    int publishSensorReadings(unsigned long datetime, uint8_t plantId, uint8_t temperature, uint8_t humidity, uint8_t soil_moisture);
    MQTTClient client;


  private:
    WiFiClientSecure _net;
    void static messageHandler(String &topic, String &payload);
    void lwMQTTErr(lwmqtt_err_t reason);
    
};

#endif
