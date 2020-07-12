import React, {useContext, useState, useEffect} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, FlatList} from 'react-native';
import Graph from './Graph';
import moment from 'moment';

const dummyData = [
    {degrees: 100, datetime: '2020-07-11 14:02:05'},
    {degrees: 98, datetime: '2020-07-12 14:02:05'},
    {degrees: 95, datetime: '2020-07-13 14:02:05'},
    {degrees: 105, datetime: '2020-07-15 14:02:05'},
];

const days = dummyData.map(datum => {
    return moment(datum.datetime).format('DD-MMM');
});

const filterData = data => {
    const filteredData = {};
    filteredData.yValues = data.map(datum => datum.value);

    filteredData.xValues = data.map(datum => {
        return moment(datum.datetime).format('DD-MMM');
    });

    return filteredData;
};

const Plant = ({plant, temperatures}) => {
    const [name, setName] = useState(plant.name);
    // Create some dummy temperature data
    // Create some dummy humdity data
    const [xAxisData, setXAxisData] = useState(days);
    const [yAxisData, setYAxisData] = useState(degrees);

    return (
        <Center>
            <Text>{name}</Text>
            <View>
                <Button
                    title="Temperature"
                    onPress={() => {
                        console.log('press');
                    }}
                />
                <Button
                    title="Humidity"
                    onPress={() => {
                        console.log('press');
                    }}
                />
                <Button
                    title="Soil"
                    onPress={() => {
                        console.log('press');
                    }}
                />

                <Graph xAxis={xAxisData} yAxis={yAxisData} />
                <Button
                    title="Humidty"
                    onPress={() => {
                        console.log('press');
                    }}
                />
            </View>
        </Center>
    );
};

export default Plant;
