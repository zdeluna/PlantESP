# PlantESP

## Introduction

This project aims to create a self watering system using an ESP32 microcontroller, various hardware components, and a mobile device running a React Native Application. Users will be able to monitor soil moisture level, temperature, and humidity on their mobile device. The microcontroller will communicate with the mobile device using MQTT protocol. All data will be store on an Amazon RDS database.

![Screenshot 1](/docs/images/hardware-setup.png "Screenshot 1")

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
-   Capacitive Soil Moisture Sensor
-   3-5V Submersible Water Pump
-   3V Relay
-   External Power to the pump such as 2 AA batteries.
-   Jumper wires
-   Breadboard

## Authors

-   **Zach DeLuna** - _Initial work_ - (https://github.com/zdeluna)
