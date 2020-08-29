import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Center} from '../../components/Center';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const Settings = () => {
    const {colors} = useTheme();
    const [sensorFrequency, setSensorFrequency] = useState('8hours');

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
                            value: '8hours',
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                        {
                            label: 'Every 12 hours',
                            value: '12hours',
                            icon: () => (
                                <Icon name="activity" size={18} color="#900" />
                            ),
                        },
                        {
                            label: 'Every 24 hours',
                            value: '24hours',
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
            <Button
                style={styles.Button}
                title="Save"
                onPress={() => saveSettings(sensorFrequency)}
            />
        </Center>
    );
};

const saveSettings = sensorFrequency => {
    console.log('Save settings');
    console.log(sensorFrequency);
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
        padding: 20,
    },
});

export default Settings;
