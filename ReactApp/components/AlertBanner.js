import React from 'react';
import {Text, View} from 'react-native';

export const AlertBanner = ({message}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    text: {
        color: '#ffffff',
    },
});
