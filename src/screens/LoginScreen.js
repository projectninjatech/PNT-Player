import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Image } from 'react-native';
import { userloginAPI, checkAuthAPI } from '../api/userloginAPI';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // console.log('Logging in with:', { username, password });
        const responseData = await userloginAPI(username, password);
        // console.log("Login response are",responseData)
        if (responseData.success === false) {
            // console.warn("Wrong username or password!")
            Alert.alert("Authentication failed", "Wrong username or password!")
        } else if (responseData.success === true) {
            navigation.navigate('BottomTabNavigator', {
                screen: 'HomeScreen',
                params: { mylist: responseData.user.mylist, watchedMovies: responseData.user.watchedMovies },
              });
        }
    };

    const handleRegister = () => {
        navigation.navigate("RegisterScreen")
    }

    const changeServer = async () => {
        await AsyncStorage.removeItem('serverIp');
        navigation.navigate("AddServerScreen")
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Sign In</Text>

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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.buttonText}>Not a member. Register!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeServer} onPress={changeServer}>
                <Text style={styles.buttonText}>Change Server</Text>
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
    loginButton: {
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
    changeServer: {
        top:20,
        width:'80%',
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10
    }
});

export default LoginScreen;
