import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const DoubleTap = ({ position, onDoubleTap }) => {


    const tap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        onDoubleTap()
    });

    const positionStyle = position === 'left' ? styles.left : styles.right;

    return (

        <GestureDetector gesture={tap}>
            <View style={[styles.innerView, positionStyle]}></View>
        </GestureDetector>

    );
};



const styles = StyleSheet.create({
    innerView: {
        // backgroundColor: 'green',
        position: 'absolute',
        top: 50,
        bottom: 100,
        width: 180, // adjust width as needed
        // backgroundColor: 'green',
        zIndex:-2
    },
    left: {
        left: 120,
    },
    right: {
        right: 120,
    },
});

export default DoubleTap;
