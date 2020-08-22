#include "MQTT.h"

MQTT::MQTT(){
    _net = WiFiClientSecure();
    client = MQTTClient(256);
}

void static messageHandler(String &topic, String &payload){
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
    //waterPlant();
  }
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


void MQTT::connectToAWS(){

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  Serial.println("Connect to Wifi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println(WiFi.localIP());

  // Configure WiFiClientSecure to use the AWS Iot device credentials
  _net.setCACert(AWS_CERT_CA);
  _net.setCertificate(AWS_CERT_CRT);
  _net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint
  client.begin(AWS_IOT_ENDPOINT, 8883, _net);

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

int MQTT::publishSensorReadings(unsigned long datetime, uint8_t plantId, uint8_t temperature, uint8_t humidity, uint8_t soil_moisture)
{
  StaticJsonDocument<200> doc;

  doc["plantId"] = plantId;
  doc["datetime"] = datetime;
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
