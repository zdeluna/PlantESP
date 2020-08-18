#include "SoilSensor.h"

const int AIR_VALUE = 2675;
const int WATER_VALUE = 1180;
int intervals = (AIR_VALUE - WATER_VALUE) / 3;

int soilMoistureValue = 0;

SoilSensor::SoilSensor(int pin) {
    _pin = pin;

}

int SoilSensor::getSoilMoisture(){
    soilMoistureValue = analogRead(_pin);
    Serial.println(soilMoistureValue);
    return soilMoistureValue;
}
