import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Center} from '../components/Center';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import {AuthContext} from './AuthProvider';
import {ApolloClient} from 'apollo-client';
import {GET_PLANTS} from '../graphql/queries/plant/getPlants';

const Stack = createStackNavigator();

function Feed() {
    return (
        <Center>
            <Text>feed</Text>
        </Center>
    );
}

export const HomeStack = () => {
    const {logout} = useContext(AuthContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Feed"
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
                component={Feed}
            />
        </Stack.Navigator>
    );
};
