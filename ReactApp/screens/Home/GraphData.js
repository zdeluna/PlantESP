import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Graph from './Graph';
import moment from 'moment';

const GraphData = props => {
    const filterData = data => {
        const timeData = data.map(datum => datum.datetime);
        const temperatureData = data.map(datum => datum.temperature);
        const humidityData = data.map(datum => datum.humidity);
        const soilMoistureData = data.map(datum => datum.soil_moisture);

        return {timeData, temperatureData, humidityData, soilMoistureData};
    };

    const {
        timeData,
        temperatureData,
        humidityData,
        soilMoistureData,
    } = filterData(props.sensor_readings);

    const [categorySelected, setCategorySelected] = useState('Temperature');

    const [xAxisData, setXAxisData] = useState(timeData);
    const [yAxisData, setYAxisData] = useState(temperatureData);

    return (
        <Center>
            <View style={styles.buttonPanel}>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(temperatureData);
                        setCategorySelected('Temperature');
                    }}>
                    <Text
                        style={
                            categorySelected == 'Temperature'
                                ? styles.categoryTextSelected
                                : styles.categoryTextUnSelected
                        }>
                        Temperature
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(humidityData);
                        setCategorySelected('Humidity');
                    }}>
                    <Text
                        style={
                            categorySelected == 'Humidity'
                                ? styles.categoryTextSelected
                                : styles.categoryTextUnSelected
                        }>
                        Humidity
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(soilMoistureData);
                        setCategorySelected('Soil Mositure');
                    }}>
                    <Text
                        style={
                            categorySelected == 'Soil'
                                ? styles.categoryTextSelected
                                : styles.categoryTextUnSelected
                        }>
                        Soil
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Graph xAxis={xAxisData} yAxis={yAxisData} />
            </View>
        </Center>
    );
};

const styles = StyleSheet.create({
    buttonPanel: {
        display: 'flex',
        flexDirection: 'row',
    },
    categoryTextUnSelected: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
        textDecorationLine: 'none',
        margin: 10,
    },
    categoryTextSelected: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
        textDecorationLine: 'underline',
        margin: 10,
    },
});

export default GraphData;
