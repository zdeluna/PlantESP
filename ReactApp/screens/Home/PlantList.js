import React, {useEffect, useState} from 'react';
import {GET_PLANTS} from '../../graphql/queries/plant/getPlants';
import {Center} from '../../components/Center';
import GridCell from '../../components/GridCell';
import Plant from './Plant';
import {useQuery} from '@apollo/react-hooks';
import {FlatList, Text} from 'react-native';
import PlantData from './PlantData';
import {Button} from 'react-native';
import moment from 'moment';

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
        if (data && data.plants) {
            // Add the last water date to each plant object
            let updatedPlants = data.plants.map(plant => {
                const lastWateredDate = plant.water_datetimes.length
                    ? moment(
                          plant.water_datetimes[
                              plant.water_datetimes.length - 1
                          ],
                      ).format('MMM-DD')
                    : '';

                if (plant.water_datetimes) {
                    return {...plant, lastWatered: lastWateredDate};
                }
                return {...plant, lastWatered: ''};
            });
            setPlants(updatedPlants);
        }
    }, [data]);

    return (
        <Center>
            <FlatList
                data={plants}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <GridCell
                        navigation={navigation}
                        title={item.name}
                        id={item.id}
                        description={'Last Watered: ' + item.lastWatered}
                    />
                )}
                numColumns={2}
            />
        </Center>
    );
};

export default PlantList;
