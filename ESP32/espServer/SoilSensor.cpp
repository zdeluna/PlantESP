#include "SoilSensor.h"


SoilSensor::SoilSensor(int pin) {
    _pin = pin;

}

int SoilSensor::getSoilMoisture(){
    int val;
    val = analogRead(pin);
    Serial.print(val);
    return val;
}
