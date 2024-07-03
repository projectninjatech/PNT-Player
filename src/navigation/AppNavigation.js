import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoPlayer from '../screens/MoviesVideoPlayer';
import MovieDetails from '../screens/MovieDetails';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNav';
import RegisterScreen from '../screens/RegisterScreen';
import ShowsTabNav from './ShowsTabNav';
import ShowDetails from '../screens/ShowDetails';
import ShowsVideoPlayer from '../screens/ShowsVideoPlayer';
import AddServerScreen from '../screens/AddServerScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AddServerScreen" component={AddServerScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="ShowsTabNav" component={ShowsTabNav} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="ShowDetails" component={ShowDetails} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="ShowsVideoPlayer" component={ShowsVideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}