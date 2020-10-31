import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Center} from '../../components/Center';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {UPDATE_PLANT} from '../../graphql/mutations/plant/updatePlant';
import {useMutation} from '@apollo/react-hooks';
import {DELETE_PLANT} from '../../graphql/mutations/plant/deletePlant';

const Settings = ({navigation, route}) => {
    const {colors} = useTheme();
    const [sensorFrequency, setSensorFrequency] = useState(
        route.params.sensorFrequency,
    );
    const [wateringTime, setWateringTime] = useState(route.params.wateringTime);

    const [updatePlant] = useMutation(UPDATE_PLANT, {
        onCompleted(response) {
            console.log(response);
            navigation.navigate('PlantData', {id: route.params.id});
        },
    });

    const [deletePlant] = useMutation(DELETE_PLANT, {
        onCompleted(response) {
            console.log(response);
            navigation.navigate('PlantList');
        },
    });

    const saveSettings = sensorFrequency => {
        console.log('Save settings');
        console.log(sensorFrequency);

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

            <Button
                style={styles.Button}
                title="Save"
                onPress={() => saveSettings(sensorFrequency)}
            />
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    Button: {
        fontSize: 20,
        paddingTop: 50,
        backgroundColor: '#fafafa',
    },
    SettingContainer: {
        borderColor: '#ffffff',
        borderWidth: 2,
        width: 300,
        padding: 20,
        margin: 20,
    },
});

export default Settings;
