import React from 'react';
import {Image, StyleSheet} from 'react-native';

export const Icon = ({source}) => {
    return <Image style={styles.Icon} source={source} />;
};

const styles = StyleSheet.create({
    Icon: {
        width: 40,
        height: 40,
    },
});
