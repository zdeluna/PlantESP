import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from '../../components/Center';
import {Text, TouchableOpacity, Button, FlatList} from 'react-native';
import {AuthContext} from '../../src/AuthProvider';
import {ApolloClient} from 'apollo-client';
import {useQuery} from '@apollo/react-hooks';
import PlantData from './PlantData';
import PlantList from './PlantList';
import Settings from './Settings';

const Stack = createStackNavigator();

export const HomeStack = () => {
    const {logout} = useContext(AuthContext);
    return (
        <Stack.Navigator initialRouteName="PlantList">
            <Stack.Screen
                name="PlantList"
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    logout();
                                }}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        );
                    },
                }}
                component={PlantList}
            />
            <Stack.Screen name="PlantData" component={PlantData} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
};
