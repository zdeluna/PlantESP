import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Center} from './Center';

const AlertBanner = ({message}) => {
    return (
        <View style={styles.container}>
            <Center>
                <Text style={styles.text}>{message}</Text>
            </Center>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        marginTop: 40,
        height: 30,
    },
    text: {
        color: '#333333',
    },
});

export default AlertBanner;
