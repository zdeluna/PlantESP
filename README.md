# PlantESP

## Introduction

This project aims to monitor soil moisture level, sunlight, and temperature using a microcontroller such as a ESP32. Users will be able to view their plant data on the phone or tablet device using a React Native App. The React Native App will make calls to a REST API in order to obtain plant data. I used the MQTT protocol to facilitate communication between the ESP32 and the REST Server.

![Screenshot 1](/docs/images/hardware-setup.png "Screenshot 1")

### Prerequistes

You will also need XCode to run the React Native application.

Components to build circuit

ESP32 microcontroller
DHT 11 or DHT 22 Temperature Sensor
Capacitive Soil Moisture Sensor
Water Pump
10k Ohm resistor
Jumper wires
Breadboard
