import React, {useState, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator} from 'react-native';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import {Center} from '../components/Center';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './AuthProvider';

const Stack = createStackNavigator();

export const Routes = () => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            AsyncStorage.getItem('user').then(userString => {
                console.log(userString);
                if (userString) {
                } else setLoading(false);
            });
        } catch (error) {
            console.log('error');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                <Center>
                    <Text>There is a user</Text>
                </Center>
            ) : (
                <Stack.Navigator
                    screenOptions={{header: () => null}}
                    initialRouteName="SignUp">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};
