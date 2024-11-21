import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Homes';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}