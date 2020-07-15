import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
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

    const [categorySelected, setCategorySelected] = useState('Temperature');

    const [xAxisData, setXAxisData] = useState(temperatureData.xValues);
    const [yAxisData, setYAxisData] = useState(temperatureData.yValues);

    return (
        <Center>
            <View style={styles.buttonPanel}>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setXAxisData(temperatureData.xValues);
                        setYAxisData(temperatureData.yValues);
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
                        setXAxisData(humidityData.xValues);
                        setYAxisData(humidityData.yValues);
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
                        setXAxisData(humidityData.xValues);
                        setYAxisData(humidityData.yValues);
                        setCategorySelected('Humidity');
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
