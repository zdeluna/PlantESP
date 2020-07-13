import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button} from 'react-native';
import Graph from './Graph';
import moment from 'moment';

const GraphData = props => {
    const filterData = data => {
        const filteredData = {};
        filteredData.yValues = data.map(datum => datum.value);

        filteredData.xValues = data.map(datum => {
            return moment(datum.datetime).format('DD-MMM');
        });

        return filteredData;
    };
    const temperatureData = filterData(props.temperatures);
    const humidityData = filterData(props.humidities);

    const [xAxisData, setXAxisData] = useState(temperatureData.xValues);
    const [yAxisData, setYAxisData] = useState(temperatureData.yValues);

    return (
        <Center>
            <View>
                <Button
                    title="Temperature"
                    onPress={() => {
                        setXAxisData(temperatureData.xValues);
                        setYAxisData(temperatureData.yValues);
                    }}
                />
                <Button
                    title="Humidity"
                    onPress={() => {
                        setXAxisData(humidityData.xValues);
                        setYAxisData(humidityData.yValues);
                    }}
                />
                <Button
                    title="Soil"
                    onPress={() => {
                        console.log('press');
                    }}
                />

                <Graph xAxis={xAxisData} yAxis={yAxisData} />
            </View>
        </Center>
    );
};

export default GraphData;
