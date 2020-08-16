#ifndef SoilSensor_h
#define SoilSensor_h

#include "Arduino.h"

class SoilSensor

{
	public:
		SoilSensor(int pin);
		~SoilSensor();
		int getSoilMoisture();

	private:
		int _pin;
};

#endif

