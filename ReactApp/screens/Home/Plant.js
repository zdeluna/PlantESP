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

const Plant = ({plant}) => {
    const [name, setName] = useState(plant.name);

    const {colors} = useTheme();

    return (
        <Center style={styles.container}>
            <Text style={{color: colors.text, fontSize: 30}}>
                Temperature:{' '}
            </Text>
            <Text style={{color: colors.text, fontSize: 30}}>Humidity: </Text>
            <Text style={{color: colors.text, fontSize: 30}}>
                Last Watered:{' '}
            </Text>
            <GraphData sensor_readings={plant.sensor_readings} />
            <Button style={styles.Button} title="Manual Water Now" />
            <Button style={styles.Button} title="Automatic Watering Settings" />
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    Button: {
        fontSize: 50,
        paddingTop: 20,
    },
});

export default Plant;
