import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { checkAuthAPI } from '../api/userloginAPI';
import { getBaseIp } from '../api/config';

const SplashScreen = ({ navigation }) => {
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const serverIp = await getBaseIp();

                if (serverIp) {
                    setLoadingMessage("Authenticating to previous server...");
                    const serverHealth = await checkServerHealth(serverIp);
                    if (serverHealth) {
                        const authStatus = await checkAuthAPI();
                        if (authStatus.authenticated) {
                            navigation.navigate('BottomTabNavigator', {
                                screen: 'HomeScreen',
                                params: { mylist: authStatus.user.mylist, watchedMovies: authStatus.user.watchedMovies }
                            });
                        } else {
                            navigation.navigate('LoginScreen');
                        }
                    } else {
                        showServerDownAlert();
                    }
                } else {
                    navigation.navigate('AddServerScreen');
                }
            } catch (error) {
                console.error('Error during initialization', error);
                // Handle error (e.g., navigate to an error screen)
            }
        };

        initializeApp();
    }, [navigation]);

    const checkServerHealth = async (ip) => {
        try {
            const response = await fetch(`${ip}/check-con`);
            console.log("Server response", response);
            const data = await response.json();

            if (data.status === 'ok') {
                // Server is running
                return true;
            } else {
                // Server is not running
                return false;
            }
        } catch (error) {
            console.error('Error checking server health', error);
            // Handle error, e.g., show connection error
            return false;
        }
    };

    const showServerDownAlert = () => {
        Alert.alert(
            "Server Connection Error",
            "The server is currently down or unreachable. Would you like to add a different server?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                { text: "Add Server", onPress: () => navigation.navigate('AddServerScreen') }
            ],
            { cancelable: false }
        );
    };

    const handleAddServer = () => {
        navigation.navigate('AddServerScreen');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <ActivityIndicator size="large" color="#EB1825" />
            <Text style={styles.text}>{loadingMessage}</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddServer}>
                <Text style={styles.buttonText}>Add New Server</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
    },
    addButton: {
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SplashScreen;
