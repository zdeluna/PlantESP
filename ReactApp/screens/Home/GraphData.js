import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Graph from './Graph';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const GraphData = props => {
    /*
    const filterDataByCategory = data => {
        console.log(data);

        const timeData = data.map(datum => {
            return moment(datum.datetime).format('DD-MMM');
        });

        const temperatureData = data.map(datum => datum.temperature);
        const humidityData = data.map(datum => datum.humidity);
        const soilMoistureData = data.map(datum => datum.soil_moisture);

        return {timeData, temperatureData, humidityData, soilMoistureData};
    };
    */
    const filterDataByTimeFrame = (data, timeFrame) => {
        let originalData = data;
        let currentDate = moment();
        return originalData.filter(sensorReading =>
            moment(sensorReading.datetime).isSame(currentDate, timeFrame),
        );
    };

    const lastDayData = filterDataByTimeFrame(props.sensor_readings, 'day');
    const lastWeekData = filterDataByTimeFrame(props.sensor_readings, 'week');
    const lastMonthData = filterDataByTimeFrame(props.sensor_readings, 'month');

    const filterDataByCategory = (data, category) => {
        return data.map(datum => datum[category]);
    };

    const {
        timeData,
        temperatureData,
        humidityData,
        soilMoistureData,
    } = filterDataByCategory(props.sensor_readings);

    const [categorySelected, setCategorySelected] = useState('temperature');

    const [xAxisData, setXAxisData] = useState(
        filterDataByCategory(lastWeekData, 'datetime'),
    );
    const [yAxisData, setYAxisData] = useState(
        filterDataByCategory(lastWeekData, 'temperature'),
    );
    const [yAxisUnits, setYAxisUnits] = useState('°');
    const [timeFrame, setTimeFrame] = useState('week');

    return (
        <Center>
            <View style={styles.buttonPanel}>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(temperatureData);
                        setYAxisUnits('°');
                        setCategorySelected('temperature');
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
                        setCategorySelected('humidity');
                    }}>
                    <Text
                        style={
                            categorySelected == 'humidity'
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
                        setCategorySelected('soil_moisture');
                    }}>
                    <Text
                        style={
                            categorySelected == 'soil_moisture'
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
                        {label: 'last day', value: 'day'},
                        {label: 'last week', value: 'week'},
                        {label: 'last month', value: 'month'},
                    ]}
                    defaultValue={'last week'}
                    containerStyle={{width: 100, height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{justifiyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => {
                        setTimeFrame(item.value);

                        switch (item.value) {
                            case 'day':
                                console.log('set day');
                                setXAxisData(
                                    filterDataByCategory(
                                        lastDayData,
                                        'datetime',
                                    ),
                                );
                                setYAxisData(
                                    filterDataByCategory(
                                        lastDayData,
                                        categorySelected,
                                    ),
                                );
                                break;
                            case 'week':
                                setXAxisData(
                                    filterDataByCategory(
                                        lastWeekData,
                                        'datetime',
                                    ),
                                );
                                setYAxisData(
                                    filterDataByCategory(
                                        lastWeekData,
                                        categorySelected,
                                    ),
                                );
                                break;
                            case 'month':
                                setXAxisData(
                                    filterDataByCategory(
                                        lastMonthData,
                                        'datetime',
                                    ),
                                );
                                setYAxisData(
                                    filterDataByCategory(
                                        lastMonthData,
                                        categorySelected,
                                    ),
                                );
                                break;
                        }
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
