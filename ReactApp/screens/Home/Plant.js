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
import {PLANT_ICON} from '../../src/images';

const Plant = ({navigation, plant}) => {
    const [name, setName] = useState(plant.name);
    const {colors} = useTheme();
    const lastWateredDate = plant.water_datetimes
        ? moment(
              plant.water_datetimes[plant.water_datetimes.length - 1],
          ).format('DD-MMM')
        : '';

    const lastSensorReadings =
        plant.sensor_readings[plant.sensor_readings.length - 1];

    const lastSensorDate = lastSensorReadings.datetime
        ? moment(lastSensorReadings.datetime).format('DD-MMM')
        : '';

    console.log(lastSensorReadings);
    const [waterPlant] = useMutation(WATER_PLANT, {
        onCompleted(response) {
            console.log(response);
        },
    });

    return (
        <Center style={styles.container}>
            <View style={styles.plantNameContainer}>
                <Image style={styles.icons} source={PLANT_ICON} />
                <Text
                    style={{
                        color: colors.header,
                        fontSize: 30,
                    }}>
                    {name}
                </Text>
            </View>
            <View style={styles.sensorInfoContainer}>
                <Text style={styles.sensorText}>
                    Temperature: {lastSensorReadings.temperature}
                </Text>
                <Text style={styles.sensorText}>
                    Humidity: {lastSensorReadings.humidity}
                </Text>
                <Text style={styles.sensorText}>
                    Soil Moisture: {lastSensorReadings.soil_moisture}
                </Text>
                <Text style={styles.sensorText}>
                    Measured on: {lastSensorDate}
                </Text>
            </View>
            <GraphData sensor_readings={plant.sensor_readings} />
            <Text style={{color: colors.text, marginBottom: 10, fontSize: 20}}>
                Last Watered: {lastWateredDate}
            </Text>

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
        borderColor: '#ffffff',
        height: 30,
    },
    sensorText: {
        fontSize: 20,
        color: '#ffffff',
    },
    icons: {
        width: 40,
        height: 40,
    },
    plantNameContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
});

export default Plant;
