# PlantESP

## Introduction

This project aims to create a self watering system using an ESP32 microcontroller, various hardware components, and a mobile device running a React Native Application. Users will be able to monitor soil moisture level, temperature, and humidity on their mobile device. The microcontroller will communicate with the mobile device using MQTT protocol. All data will be store on an Amazon RDS database.

![Screenshot 1](/docs/images/hardware-setup.png "Screenshot 1")

### Prerequistes

You will also need XCode to run the React Native application.

### Part List

ESP32 microcontroller
DHT 11 or DHT 22 Temperature Sensor
Capacitive Soil Moisture Sensor
3-5V Water Pump
Relay
External Power to the pump such as 2 AA batteries.
Jumper wires
Breadboard
