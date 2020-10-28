import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Center} from './Center';

const GridCell = ({id, navigation, title, description}) => {
    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <Center>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('PlantData', {id: id});
                    }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </TouchableOpacity>
            </Center>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        display: 'flex',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: '#333333',
    },
    Icon: {
        width: 40,
        height: 40,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    description: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default GridCell;
