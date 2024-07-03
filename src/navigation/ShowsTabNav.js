// ShowsTabNav.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShowsScreen from '../screens/ShowsScreen';
import ShowsSearchScreen from '../screens/ShowsSearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function ShowsTabNav() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'white', tabBarInactiveBackgroundColor: '#343541', tabBarActiveBackgroundColor: '#201A18', tabBarShowLabel: false, headerShown: false,}}>
            <Tab.Screen name="ShowsScreen" component={ShowsScreen} options={{tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />)}}/>
            <Tab.Screen name="ShowsSearchScreen" component={ShowsSearchScreen} options={{tabBarIcon: ({ color, size }) => (
                <Icon name="search" color={color} size={size} />)}}/>
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{tabBarIcon: ({ color, size }) => (
                <Iconicons name="settings" color={color} size={size} />)}}/>
        </Tab.Navigator>
    );
}