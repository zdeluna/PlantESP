import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, ActivityIndicator} from 'react-native';
import {Center} from '../components/Center';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './AuthProvider';
import {AppTabs} from './AppTabs';
import {AuthStack} from './AuthStack';

export const Routes = () => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            // Check to see if user is logged in
            AsyncStorage.getItem('user').then(userString => {
                console.log(userString);
                if (userString) {
                    setLoading(false);
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
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
