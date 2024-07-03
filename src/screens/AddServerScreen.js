import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const AddServerScreen = ({ navigation }) => {
    const [serverIp, setServerIp] = useState('');

    const handleAddServer = async () => {
        // Check server connection before adding it
        console.warn(serverIp)
        try {
            const response = await fetch(`${serverIp}/check-con`);
            console.warn("Server result", response)
            const data = await response.json();

            if (data.status === 'ok') {
                // Server is running, save the server IP to AsyncStorage
                console.log("Trying to set server ip in async storage")
                await AsyncStorage.setItem('serverIp', serverIp);
                console.log("Server added now restarting the app")
                RNRestart.restart();
            } else {
                // Server is not running, show connection error
                // console.warn('Server connection error');
                Alert.alert("Connection Error", "Server connection error!")
            }
        } catch (error) {
            Alert.alert("Server Error", "Error establishing connection with the server!")
            // console.error('Error checking server health or saving server IP', error);
            // Handle error, e.g., show connection error
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Server IP"
                placeholderTextColor="white"
                onChangeText={(text) => setServerIp(text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddServer()}>
                <Text style={styles.buttonText}>Add Server</Text>
            </TouchableOpacity>
            <View style={styles.pntCaption}>
                <Image source={require('../assets/logo.png')} style={styles.logoCaption} />
                <View style={styles.textCaptionContainer}>
                    <Text style={styles.captionText}>Powered by</Text>
                    <Text style={styles.captionText}>Project Ninja Tech</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingHorizontal: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#333333',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
    addButton: {
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pntCaption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '90%', // Match the width of the TextInput and button
    },
    logoCaption: {
        width: 60,
        height: 60,
        marginRight: 10, // Space between image and text
    },
    textCaptionContainer: {
        flexDirection: 'column',
    },
    captionText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddServerScreen;
