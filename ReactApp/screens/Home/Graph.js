import React, {useState} from 'react';
import {Center} from '../../components/Center';
import {Dimensions, Text, View} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';

const Graph = ({xAxis, yAxis, yAxisUnits}) => {
    return (
        <View>
            <LineChart
                data={{
                    labels: xAxis,
                    datasets: [
                        {
                            data: yAxis,
                        },
                    ],
                }}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix={yAxisUnits}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: '#d3d3d3',
                    backgroundGradientFrom: '#0B2B36',
                    backgroundGradientTo: '#0B2B36',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default Graph;
