import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import Graph from './Graph';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import EmptyGraph from '../../components/EmptyGraph';
import {useTheme} from '@react-navigation/native';
import {
    groupBy,
    averageMeasurements,
    changeDateTimeFormat,
} from '../../utils/GraphUtils';

const GraphData = props => {
    const filterDataByTimeFrame = (data, timeFrame) => {
        let originalData = data;
        let currentDate = moment();
        return originalData.filter(sensorReading =>
            moment(sensorReading.datetime).isSame(currentDate, timeFrame),
        );
    };

    const {colors} = useTheme();

    const aggregateData = timeFrame => {
        let data = changeDateTimeFormat(
            filterDataByTimeFrame(props.sensor_readings, timeFrame),
            'DD-MMM',
        );

        // Go through each sensor reading and group the ones that have the same date;
        let groupedData = groupBy(data, 'datetime');
        return averageMeasurements(groupedData);
    };

    let lastDayData = filterDataByTimeFrame(props.sensor_readings, 'day');
    let lastWeekData = aggregateData('week');
    let lastMonthData = aggregateData('month');

    const sensorData = {
        day: lastDayData,
        week: lastWeekData,
        month: lastMonthData,
    };

    const filterDataByCategory = (data, category) => {
        return data.map(datum => datum[category]);
    };

    const [categorySelected, setCategorySelected] = useState('temperature');

    const [xAxisData, setXAxisData] = useState(
        filterDataByCategory(lastWeekData, 'datetime'),
    );
    const [yAxisData, setYAxisData] = useState(
        filterDataByCategory(lastWeekData, 'temperature'),
    );
    const [yAxisUnits, setYAxisUnits] = useState('°');
    const [timeFrame, setTimeFrame] = useState('week');

    function ShowGraph() {
        if (xAxisData && xAxisData.length) {
            return (
                <Graph
                    xAxis={xAxisData}
                    yAxis={yAxisData}
                    yAxisUnits={yAxisUnits}
                />
            );
        } else return <EmptyGraph />;
    }

    return (
        <Center>
            <View style={styles.buttonPanel}>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(
                            filterDataByCategory(
                                sensorData[timeFrame],
                                'temperature',
                            ),
                        );
                        setYAxisUnits('°');
                        setCategorySelected('temperature');
                    }}>
                    <Text
                        style={
                            categorySelected == 'temperature'
                                ? styles.categoryTextSelected
                                : styles.categoryTextUnSelected
                        }>
                        Temperature
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => {
                        setYAxisData(
                            filterDataByCategory(
                                sensorData[timeFrame],
                                'humidity',
                            ),
                        );
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
                        setYAxisData(
                            filterDataByCategory(
                                sensorData[timeFrame],
                                'soil_moisture',
                            ),
                        );
                        setYAxisUnits('/10');
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
                    defaultValue={'week'}
                    containerStyle={{width: 120, height: 40, marginLeft: 10}}
                    style={{
                        backgroundColor: colors.background,
                        borderWidth: 2,
                    }}
                    itemStyle={{justifyContent: 'flex-start'}}
                    dropDownStyle={{
                        backgroundColor: colors.background,
                        borderWidth: 2,
                    }}
                    labelStyle={{
                        color: colors.text,
                    }}
                    arrowColor={colors.text}
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
                <ShowGraph />
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
