import React, {useContext, useState, useEffect} from 'react';
import {Center} from '../../components/Center';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Button,
    StyleSheet,
} from 'react-native';
import GraphData from './GraphData';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {useMutation} from '@apollo/react-hooks';
import {WATER_PLANT} from '../../graphql/mutations/plant/waterPlant';

const Plant = ({navigation, plant}) => {
    const [name, setName] = useState(plant.name);
    const {colors} = useTheme();
    const lastWateredDate = plant.water_datetimes
        ? moment(
              plant.water_datetimes[plant.water_datetimes.length - 1],
          ).format('DD-MMM')
        : '';

    const [waterPlant] = useMutation(WATER_PLANT, {
        onCompleted(response) {
            console.log(response);
        },
    });

    return (
        <Center style={styles.container}>
            <Text style={{color: colors.header, paddingTop: 20, fontSize: 30}}>
                {name}
            </Text>
            <Text style={{color: colors.text, fontSize: 20}}>
                Last Watered: {lastWateredDate}
            </Text>
            <GraphData sensor_readings={plant.sensor_readings} />
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
});

export default Plant;
