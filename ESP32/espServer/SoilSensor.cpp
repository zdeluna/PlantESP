#include "SoilSensor.h"

const int AIR_VALUE = 2675;
const int WATER_VALUE = 1180;
int interval = (AIR_VALUE - WATER_VALUE) / 10;

int soilMoistureValue = 0;

SoilSensor::SoilSensor(int pin) {
    _pin = pin;

}

/* This function will get the capacitive soil sensor readings and average them. It will
 *  return a value between 0 and 10 where 0 is completely dry and 10 is completely wet.
 */

int SoilSensor::getSoilMoisture(){
    float sensorValue = 0.0;
    // Get an average of 10 readings
    for (int i = 0; i < 10; i++){
      sensorValue = sensorValue + analogRead(_pin);
    }

   float soilMoisture = sensorValue / 10.0;

   float level = (AIR_VALUE - soilMoisture) / interval;

   return level;

    
}
