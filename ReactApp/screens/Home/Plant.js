import React, {useContext, useState, useEffect} from 'react';
import {Center} from '../../components/Center';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Button,
    StyleSheet,
    Image,
} from 'react-native';
import GraphData from './GraphData';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {useMutation} from '@apollo/react-hooks';
import {WATER_PLANT} from '../../graphql/mutations/plant/waterPlant';
import {PLANT_ICON, WATER_ICON} from '../../src/images';
import {Icon} from '../../components/Icon.js';

const Plant = ({navigation, plant}) => {
    console.log('plant data');
    console.log(plant);
    const [name, setName] = useState(plant.name);
    const {colors} = useTheme();
    const lastWateredDate = plant.water_datetimes.length
        ? moment(
              plant.water_datetimes[plant.water_datetimes.length - 1],
          ).format('MMM-DD')
        : '';

    console.log(lastWateredDate);
    const lastSensorReadings =
        plant.sensor_readings[plant.sensor_readings.length - 1];

    const lastSensorDate = lastSensorReadings.datetime
        ? moment(lastSensorReadings.datetime).format('MMM-DD')
        : '';

    const [waterPlant] = useMutation(WATER_PLANT, {
        onCompleted(response) {
            console.log(response);
        },
    });

    return (
        <Center style={styles.container}>
            <View style={styles.textIconContainer}>
                <Icon source={PLANT_ICON} />
                <Text
                    style={{
                        color: colors.header,
                        fontSize: 30,
                    }}>
                    {name}
                </Text>
            </View>
            <View style={styles.sensorInfoContainer}>
                <View style={styles.SensorTextContainer}>
                    <Text style={styles.sensorText}>
                        Temperature: {lastSensorReadings.temperature}
                    </Text>
                    <Text style={styles.SensorTextUnit}>°F</Text>
                </View>
                <View style={styles.SensorTextContainer}>
                    <Text style={styles.sensorText}>
                        Humidity: {lastSensorReadings.humidity}
                    </Text>
                    <Text style={styles.SensorTextUnit}>%</Text>
                </View>
                <View style={styles.SensorTextContainer}>
                    <Text style={styles.sensorText}>
                        Soil Moisture: {lastSensorReadings.soil_moisture}
                    </Text>
                    <Text style={styles.SensorTextUnit}>/ 10</Text>
                </View>
                <Text style={styles.sensorText}>
                    Measured on: {lastSensorDate}
                </Text>
            </View>
            <GraphData sensor_readings={plant.sensor_readings} />
            <View style={styles.textIconContainer}>
                <Icon source={WATER_ICON} />
                <Text
                    style={{
                        color: colors.text,
                        marginBottom: 10,
                        fontSize: 20,
                    }}>
                    {' '}
                    Last Watered: {lastWateredDate}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.Button}
                onPress={() =>
                    navigation.navigate('Settings', {
                        id: plant.id,
                        sensorFrequency: plant.sensorFrequency,
                        wateringTime: plant.wateringTime,
                    })
                }>
                <Text style={styles.ButtonText}>Settings</Text>
            </TouchableOpacity>
        </Center>
    );
};

const styles = StyleSheet.create({
    plantName: {
        color: '#111111',
    },
    container: {
        display: 'flex',
    },
    Button: {
        paddingBottom: 30,
    },
    ButtonText: {
        color: '#1378F6',
        fontSize: 25,
    },
    sensorInfoContainer: {
        marginTop: 10,
        marginBottom: 100,
        borderColor: '#ffffff',
        height: 30,
    },
    sensorText: {
        fontSize: 25,
        color: '#ffffff',
    },
    textIconContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    SensorTextContainer: {
        flexDirection: 'row',
    },
    SensorTextUnit: {
        fontSize: 27,
        color: '#d3d3d3',
    },
});

export default Plant;
