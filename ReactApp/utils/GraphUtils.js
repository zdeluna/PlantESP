import moment from 'moment';

/**
 * Group objects containted in an array by an attribute
 * @param {Array} array
 * @param {String} key
 * @Return {Promise} - Object with attribute as key and grouped data stored in 
 * an array. 
 * Example: if datetime was passed in as key
 * {'10-21': [{datetime: '10-21', humidity: 30, temperature: 100},
 {datetime: '10-21', humidity: 40, temperature: 80}],
   '10-22: [ {datetime: '10-22', humidity: 20, temperature: 90}]}
 */

export const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        if (result[currentValue[key]]) {
            result[currentValue[key]].push(currentValue);
        } else {
            result[currentValue[key]] = [];
            result[currentValue[key]].push(currentValue);
        }
        return result;
    }, {});
};

/**
 * Group objects containted in an array by an attribute
 * @param {Object} - Object containing datetime as an key and sensor values
 * stored as the value as an array
 * @Return {Promise} - Array containing sensor values where grouped values are averaged
 * */

export const averageMeasurements = groupedData => {
    let array = [];

    Object.keys(groupedData).forEach(measurementType => {
        // If two measurements happen in a single day, find the average of the measurements
        let measurement = calculateAverageMeasurement(
            groupedData[measurementType],
        );
        array.push(measurement);
    });

    return array;
};

/**
 * Calculate the average of multiple sensor readings and return a single object * containing the average
 * @param {Array} array
 * @Return {Object} - Object with average temperature, humidity, and soil moist * ure readings
 *  */

export const calculateAverageMeasurement = array => {
    let numberOfMeasurements = array.length;
    let sumTemperatures = (sumHumidities = sumSoilMoistures = 0);

    array.forEach(measurement => {
        sumTemperatures += measurement.temperature;
        sumHumidities += measurement.humidity;
        sumSoilMoistures += measurement.soil_moisture;
    });

    let averageTemperature = sumTemperatures / numberOfMeasurements;
    let averageHumidity = sumHumidities / numberOfMeasurements;
    let averageSoilMoisture = sumSoilMoistures / numberOfMeasurements;

    return {
        temperature: averageTemperature,
        humidity: averageHumidity,
        soil_moisture: averageSoilMoisture,
        datetime: array[0].datetime,
    };
};

export const changeDateTimeFormat = (data, format) => {
    const formattedData = data.map(datum => ({
        ...datum,
        datetime: moment(datum.datetime).format(format),
    }));

    return formattedData;
};
