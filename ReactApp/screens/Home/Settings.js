import React, {useState} from 'react';
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Center} from '../../components/Center';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {UPDATE_PLANT} from '../../graphql/mutations/plant/updatePlant';
import {GET_PLANTS} from '../../graphql/queries/plant/getPlants';
import {useMutation} from '@apollo/react-hooks';
import {DELETE_PLANT} from '../../graphql/mutations/plant/deletePlant';
import {useApolloClient} from '@apollo/react-hooks';

const Settings = ({navigation, route}) => {
    const {colors} = useTheme();
    const client = useApolloClient();

    const [sensorFrequency, setSensorFrequency] = useState(
        route.params.sensorFrequency,
    );
    const [wateringTime, setWateringTime] = useState(route.params.wateringTime);

    const [updatePlant] = useMutation(UPDATE_PLANT, {
        onCompleted(response) {
            navigation.navigate('PlantData', {id: route.params.id});
        },
    });

    const [deletePlant] = useMutation(DELETE_PLANT, {
        onCompleted(response) {
            // Remove the recently deleted plant from the apollo cache.
            const data = client.readQuery({query: GET_PLANTS});
            client.writeQuery({
                query: GET_PLANTS,
                data: {
                    plants: data.plants.filter(
                        plant => plant.id != route.params.id,
                    ),
                },
            });

            navigation.navigate('PlantList');
        },
    });

    const saveSettings = sensorFrequency => {
        updatePlant({
            variables: {
                id: route.params.id,
                sensorFrequency: sensorFrequency,
                wateringTime: wateringTime,
            },
        });
    };

    return (
        <Center style={styles.container}>
            <Text style={{color: colors.text, fontSize: 20, paddingBottom: 20}}>
                Settings:
            </Text>
            <View style={styles.SettingContainer}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 20,
                        paddingBottom: 20,
                    }}>
                    Sensor Monitor Frequency:
                </Text>

                <DropDownPicker
                    defaultValue={sensorFrequency}
                    items={[
                        {
                            label: 'Every 8 hours',
                            value: 8,
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                        {
                            label: 'Every 12 hours',
                            value: 12,
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                        {
                            label: 'Every 24 hours',
                            value: 24,
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                    ]}
                    containerStyle={{height: 40, width: 180}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setSensorFrequency(item.value)}
                />
            </View>
            <View style={styles.SettingContainer}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 20,
                        paddingBottom: 20,
                    }}>
                    Watering Time:
                </Text>

                <DropDownPicker
                    defaultValue={wateringTime}
                    items={[
                        {
                            label: '1 second',
                            value: 1,
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                        {
                            label: '2 seconds',
                            value: 2,
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                        {
                            label: '3 seconds',
                            value: 3,
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                    ]}
                    containerStyle={{height: 40, width: 180}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setWateringTime(item.value)}
                />
            </View>
            <TouchableOpacity onPress={() => saveSettings(sensorFrequency)}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    deletePlant({
                        variables: {
                            id: route.params.id,
                        },
                    })
                }>
                <Text style={styles.deleteButtonText}>Delete Plant</Text>
            </TouchableOpacity>
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    SettingContainer: {
        borderColor: '#ffffff',
        borderWidth: 2,
        width: 300,
        padding: 20,
        margin: 20,
    },
    saveButtonText: {
        color: '#1378F6',
        fontSize: 24,
    },
    deleteButtonText: {
        color: 'red',
        fontSize: 24,
        marginTop: 100,
    },
});

export default Settings;
