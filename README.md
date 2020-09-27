# PlantESP

## Introduction

This project aims to create a self watering system using an ESP32 microcontroller, various hardware components, and a mobile device running a React Native Application. Users will be able to monitor soil moisture level, temperature, and humidity on their mobile device. The microcontroller will communicate with the mobile device using MQTT protocol through an AWS IoT MQTT Broker. All data will be store on an Amazon RDS database.

![Screenshot 1](/docs/images/hardware-setup.png "Screenshot 1")
![Screenshot 2](/docs/images/simulator-screenshot.png "Screenshot 2")

### Software Architecture

![Screenshot 3](/docs/images/software_architecture.png "Screenshot 3")

This project uses MQTT protocol to facilitate communication between the ESP32 and the MQTT broker running on AWS IoT Core. The ESP32 will send/receive commands and sensor data to the broker using the topics esp32/pub and esp32/sub. The AWS IoT Core will interpret the MQTT message and send the data to one of two AWS Lambda functions representing each topic. The Lambda functions will either send a MQTT message back to the ESP32 or will communicate with the GraphQL server. The GraphQL server will make requests to the AWS Relational Database Service (RDS) to store sensor data in an MySQL database.

### Prerequistes

You will also need XCode to run the React Native application using React Native CLI

To run the React Native App after installing Homebrew using the instructions outlined in https://facebook.github.io/react-native/docs/getting-started

```
brew install yarn
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
npm install -g react-native-cli
```

Next, install the dependencies of the React Native App.

```
cd ReactApp && npm install
```

Then, install the iOS dependencies using CocoaPods.

```
cd ios && pod install
```

Run the Metro Bundler

```
npx react-native start
```

Then run the iOS Simulator

```
npx react-native run-ios
```

### Part List

-   ESP32 microcontroller
-   DHT 11 or DHT 22 Temperature Sensor
-   10k Ohm resistor
-   Capacitive Soil Moisture Sensor
-   3-5V Submersible Water Pump
-   3V Relay
-   External Power to the pump such as 2 AA batteries.
-   Jumper wires
-   Breadboard

## Authors

-   **Zach DeLuna** - _Initial work_ - (https://github.com/zdeluna)
