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

const Plant = ({plant}) => {
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
            <Text style={{color: colors.text, fontSize: 30}}>
                Temperature:{' '}
            </Text>
            <Text style={{color: colors.text, fontSize: 30}}>Humidity: </Text>
            <Text style={{color: colors.text, fontSize: 30}}>
                Last Watered: {lastWateredDate}
            </Text>
            <GraphData sensor_readings={plant.sensor_readings} />
            <Button
                style={styles.Button}
                onPress={() => {
                    waterPlant({variables: {id: plant.id}});
                }}
                title="Manual Water Now"
            />
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
