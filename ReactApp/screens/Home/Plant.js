import React, {useContext, useState, useEffect} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, FlatList} from 'react-native';
import GraphData from './GraphData';
import moment from 'moment';

const Plant = ({plant}) => {
    const [name, setName] = useState(plant.name);
    return (
        <Center>
            <Text>Latest Readings: </Text>
            <Text>Temperature: </Text>
            <Text>Humidity: </Text>
            <Text>Last Watered: </Text>
            <GraphData
                temperatures={plant.temperatures}
                humidities={plant.humidities}
            />
            <Button title="Manual Water Now" />
            <Button title="Automatic Watering Settings" />
        </Center>
    );
};
export default Plant;
