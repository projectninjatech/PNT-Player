// BottomTabNav.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MoviesSearchScreen from '../screens/MoviesSearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'white', tabBarInactiveBackgroundColor: '#343541', tabBarActiveBackgroundColor: '#201A18', tabBarShowLabel: false, headerShown: false,}}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />)}}/>
            <Tab.Screen name="MoviesSearchScreen" component={MoviesSearchScreen} options={{tabBarIcon: ({ color, size }) => (
                <Icon name="search" color={color} size={size} />)}}/>
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{tabBarIcon: ({ color, size }) => (
                <Iconicons name="settings" color={color} size={size} />)}}/>
        </Tab.Navigator>
    );
}