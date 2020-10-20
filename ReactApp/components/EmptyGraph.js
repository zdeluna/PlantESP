import React from 'react';
import {Text, Dimensions, View, StyleSheet} from 'react-native';
import {Center} from './Center';

const EmptyGraph = () => {
    return (
        <Center>
            <View style={styles.container}>
                <Center>
                    <Text style={styles.graphText}>No Data</Text>
                </Center>
            </View>
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#ffffff',
        borderWidth: 1,
        width: Dimensions.get('window').width,
        height: 220,
    },
    graphText: {
        color: '#ffffff',
        fontSize: 20,
    },
});

export default EmptyGraph;
