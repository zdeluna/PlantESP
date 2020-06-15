import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator} from 'react-native';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import {Center} from '../components/Center';

const Stack = createStackNavigator();

export const Routes = () => {
    const [loading, setLoading] = useState(true);
    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        );
    }

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
