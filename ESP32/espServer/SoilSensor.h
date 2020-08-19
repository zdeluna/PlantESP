#ifndef SoilSensor_h
#define SoilSensor_h

#include "Arduino.h"

class SoilSensor
{
	public:
		SoilSensor(int pin);
		int getSoilMoisture();

	private:
		int _pin;
};

#endif
