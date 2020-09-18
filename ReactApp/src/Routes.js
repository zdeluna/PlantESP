import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {View, Text, ActivityIndicator} from 'react-native';
import {Center} from '../components/Center';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './AuthProvider';
import {AppTabs} from './AppTabs';
import {AuthStack} from '../screens/Auth/AuthStack';

export const Routes = () => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#0B2B36',
            text: '#FFFFFF',
            header: '#1378F6',
        },
    };

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
        <NavigationContainer theme={MyTheme}>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
