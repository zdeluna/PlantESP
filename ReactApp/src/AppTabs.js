import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Center} from '../components/Center';
import {Text, Button} from 'react-native';
import {AuthContext} from './AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

function Home() {
    const {logout} = useContext(AuthContext);
    return (
        <Center>
            <Text>Home</Text>
            <Button title="logout" onPress={() => logout()} />
        </Center>
    );
}

export const AppTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'ios-home';
                    } else {
                        iconName = 'ios-list-box';
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            <Tabs.Screen name="Home" component={Home} />
        </Tabs.Navigator>
    );
};
