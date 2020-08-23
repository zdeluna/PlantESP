#include "MQTT.h"

MQTT::MQTT(){
    _net = WiFiClientSecure();
    client = MQTTClient(256);
}

void MQTT::messageHandler(String &topic, String &payload){
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
    
  }

  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT is Connected");

}

int MQTT::publishSensorReadings(time_t datetime, uint8_t plantId, uint8_t temperature, uint8_t humidity, uint8_t soil_moisture)
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
