import React, {useEffect, useState} from 'react';
import {GET_PLANTS} from '../../graphql/queries/plant/getPlants';
import {Center} from '../../components/Center';
import Plant from './Plant';
import {useQuery} from '@apollo/react-hooks';
import {FlatList} from 'react-native';
import PlantData from './PlantData';
import {Button} from 'react-native';

const PlantItem = ({navigation, id, name}) => {
    return (
        <Button
            title={name}
            onPress={() => {
                navigation.navigate('PlantData', {id: id});
            }}
        />
    );
};

const PlantList = ({navigation}) => {
    const [plants, setPlants] = useState([]);
    const {data, loading, error} = useQuery(GET_PLANTS);

    useEffect(() => {
        if (data && data.plants) setPlants(data.plants);
    });

    return (
        <Center>
            <FlatList
                data={plants}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <PlantItem
                        navigation={navigation}
                        name={item.name}
                        id={item.id}
                    />
                )}
            />
        </Center>
    );
};

export default PlantList;
