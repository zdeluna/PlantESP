import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

const Stack = createStackNavigator();

export const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{header: () => null}}
                initialRouteName="SignUp">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
