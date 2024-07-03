import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userRegisterAPI } from '../api/userRegisterAPI';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        navigation.navigate('LoginScreen');
    };

    const handleRegister = async () => {
        const responseData = await userRegisterAPI(username, password);
        if (responseData.success === false) {
            console.warn("Username and password already exists!")
        } else if (responseData.success === true) {
            navigation.navigate('LoginScreen');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={"white"}
                onChangeText={(text) => setUsername(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"white"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.buttonText}>Already a member. Login!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000', // Dark background color
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontWeight:'bold'
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#333333',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
    registerButton: {
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical:10,
        width:'80%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center'
    },
});

export default RegisterScreen;
