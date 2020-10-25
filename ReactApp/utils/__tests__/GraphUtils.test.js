import React from 'react';
import renderer from 'react-test-renderer';
import {Image} from 'react-native';
import {
    groupBy,
    averageMeasurements,
    calculateAverageMeasurement,
    changeDateTimeFormat,
} from '../GraphUtils';

describe('Graph Data Functions', () => {
    let testPlantData = [
        {datetime: '10-21', humidity: 30, temperature: 100},
        {datetime: '10-21', humidity: 40, temperature: 80},
        {datetime: '10-22', humidity: 20, temperature: 90},
    ];

    it('groupBy function groups data by attribute', () => {
        let groupedData = groupBy(testPlantData, 'datetime');
        expect(groupedData['10-21'].length).toBe(2);
        expect(groupedData['10-22'].length).toBe(1);
    });

    it('calculate average measurement averages sensor readings', () => {
        testPlantData = [
            {datetime: '10-21', humidity: 30, temperature: 100},
            {datetime: '10-21', humidity: 40, temperature: 80},
        ];

        let averagePlantData = calculateAverageMeasurement(testPlantData);

        expect(averagePlantData.humidity).toBe(35);
        expect(averagePlantData.temperature).toBe(90);
        expect(averagePlantData.datetime).toBe('10-21');
    });

    it('calculate average measurements for grouped data when multiple values for a single date are present', () => {
        groupedData = {
            '10-21': [
                {
                    datetime: '10-21',
                    humidity: 30,
                    temperature: 100,
                    soil_moisture: 4,
                },
                {
                    datetime: '10-21',
                    humidity: 40,
                    temperature: 80,
                    soil_moisture: 6,
                },
            ],
            '10-22': [
                {
                    datetime: '10-22',
                    humidity: 20,
                    temperature: 90,
                    soil_moisture: 8,
                },
            ],
        };

        let aggregateData = averageMeasurements(groupedData);

        let correctAggreateData = [
            {
                temperature: 90,
                humidity: 35,
                soil_moisture: 5,
                datetime: '10-21',
            },
            {
                temperature: 90,
                humidity: 20,
                soil_moisture: 8,
                datetime: '10-22',
            },
        ];

        expect(aggregateData).toEqual(correctAggreateData);
    });
    it('Change the way dates are formatted in sensor measurements', () => {
        testPlantData = [
            {
                temperature: 90,
                humidity: 35,
                soil_moisture: 5,
                datetime: '2020-10-19T20:14:30Z',
            },
        ];

        let formattedData = changeDateTimeFormat(testPlantData, 'MMM-DD');
        expect(formattedData[0].datetime).toEqual('Oct-19');
    });
});
