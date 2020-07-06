import React, {useContext, useState, useEffect} from 'react';
import {Center} from '../../components/Center';
import {Text, TouchableOpacity, Button, FlatList} from 'react-native';

const Plant = ({plant}) => {
    console.log('Now');
    const [name, setName] = useState(plant.name);

    console.log(plant);
    return (
        <Center>
            <Text>{name}</Text>
        </Center>
    );
};

export default Plant;
