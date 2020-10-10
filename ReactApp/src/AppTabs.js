import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Center} from '../components/Center';
import {Text, Button} from 'react-native';
import {AuthContext} from './AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeStack} from '../screens/Home/HomeStack';

const Tabs = createBottomTabNavigator();

export const AppTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'ios-home';
                    } else {
                        iconName = 'ios-list-box';
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            <Tabs.Screen name="Home" component={HomeStack} />
        </Tabs.Navigator>
    );
};
