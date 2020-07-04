import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from '../components/Center';
import {Text, TouchableOpacity, Button, FlatList} from 'react-native';
import {AuthContext} from './AuthProvider';
import {ApolloClient} from 'apollo-client';
import {useQuery} from '@apollo/react-hooks';
import Plant from '../components/Plant';
import PlantList from '../components/PlantList';

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
            <Stack.Screen name="Plant" component={Plant} />
        </Stack.Navigator>
    );
};
