import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { userLogout } from '../api/userloginAPI';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBrightnessLevel, getBrightnessLevel } from '@reeq/react-native-device-brightness';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {

    const navigation = useNavigation();

    const [brightness, setBrightness] = React.useState(0.5);

    const handlelogout = async () => {
        const responseData = await userLogout();
        navigation.navigate("LoginScreen")
        console.log("User logout", responseData)
    };

    const changeServer = async () => {
        await AsyncStorage.removeItem('serverIp');
        navigation.navigate("AddServerScreen")
    }

    const handleBrightnessChange = async (value) => {
        setBrightnessLevel(value, true);
        setBrightness(value)
        const brightness = await getBrightnessLevel();
        console.log("Brightness", brightness);

    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <View style={styles.sliderContainer}>
                <View style={styles.iconTextContainer}>
                    <Icon name="brightness-7" size={30} color="white" />
                    <Text style={styles.sliderLabel}>Brightness Slider</Text>
                </View>
                <Slider
                    style={styles.sliderProgressBar}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.1}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="white"
                    thumbTintColor="red"
                    onValueChange={handleBrightnessChange}
                    value={brightness}
                />
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'royalblue' }]} onPress={changeServer}>
                <Text style={styles.buttonText}>Change Server</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#EB1825', }]} onPress={handlelogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            {/* <Text style={styles.infoText}>This app is developed by Imran Ansari @projectninjatech. It is built for educational purposes. Please note that the developer is not responsible for any unwanted use of the app and does not promote or endorse piracy of any content.</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 120,
    },
    button: {
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    infoText: {
        top: 20,
        color: 'white',
        width: '80%',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sliderContainer: {
        width: '80%',
        marginVertical: 20,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    sliderLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sliderProgressBar: {
        width: '100%',
    },
})