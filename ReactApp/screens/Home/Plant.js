import React, {useContext, useState, useEffect} from 'react';
import {Center} from '../../components/Center';
import {Text, View, TouchableOpacity, Button, FlatList} from 'react-native';
import Graph from './Graph';

const Plant = ({plant}) => {
    const [name, setName] = useState(plant.name);
    // Create some dummy temperature data

    // Create some dummy humdity data

    return (
        <Center>
            <Text>{name}</Text>
            <View>
                <Button
                    title="Temperature"
                    onPress={() => {
                        console.log('press');
                    }}
                />
                <Graph />
                <Button
                    title="Humidty"
                    onPress={() => {
                        console.log('press');
                    }}
                />
            </View>
        </Center>
    );
};

export default Plant;
