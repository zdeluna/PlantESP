import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Graph from './Graph';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const GraphData = props => {
    const filterData = data => {
        const timeData = data.map(datum => {
            return moment(datum.datetime).format('DD-MMM');
        });
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
    const [yAxisUnits, setYAxisUnits] = useState('°');

    return (
        <Center>
            <View style={styles.buttonPanel}>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(temperatureData);
                        setYAxisUnits('°');
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
                        setYAxisUnits('%');
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
                        setYAxisUnits('%');
                        setCategorySelected('Soil Moisture');
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
                <DropDownPicker
                    items={[
                        {label: 'last day', value: 'last day'},
                        {label: 'last week', value: 'last week'},
                        {label: 'last month', value: 'last month'},
                        {label: 'last year', value: 'last year'},
                    ]}
                    defaultValue={'last week'}
                    containerStyle={{width: 100, height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{justifiyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => {
                        console.log(item);
                    }}
                />

                <Graph
                    xAxis={xAxisData}
                    yAxis={yAxisData}
                    yAxisUnits={yAxisUnits}
                />
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
