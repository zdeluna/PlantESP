import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{header: () => null}}
            initialRouteName="SignUp">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};
