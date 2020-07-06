import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './SignUp';
import Login from './Login';
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
