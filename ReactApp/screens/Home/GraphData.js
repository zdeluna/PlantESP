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

    const [xAxisData, setXAxisData] = useState(temperatureData.xValues);
    const [yAxisData, setYAxisData] = useState(temperatureData.yValues);

    return (
        <Center>
            <View style={styles.buttonPanel}>
                <Button
                    style={styles.DataCategoryButton}
                    title="Temperature"
                    onPress={() => {
                        setXAxisData(temperatureData.xValues);
                        setYAxisData(temperatureData.yValues);
                    }}
                />
                <Button
                    style={styles.DataCategoryButton}
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
    DataCategoryButton: {
        color: '#841584',
        fontSize: 30,
    },
});

export default GraphData;
