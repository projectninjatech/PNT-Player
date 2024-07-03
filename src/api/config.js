// config.js
import AsyncStorage from '@react-native-async-storage/async-storage';

let BASE_IP = null;

const getBaseIp = async () => {
  try {
    const storedIp = await AsyncStorage.getItem('serverIp');
    BASE_IP = storedIp; // Update the BASE_IP variable
    return storedIp;
  } catch (error) {
    console.error('Error fetching base IP from AsyncStorage', error);
    return null;
  }
};



export { getBaseIp, BASE_IP };




