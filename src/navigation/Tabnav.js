import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
// import Profile from '../screens/Profile';
import CreatePost from '../screens/CreatePost';
import Buscador from '../screens/Buscador';

const Tab = createBottomTabNavigator();

export default function Tabnav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="CreatePost" component={CreatePost} />
      <Tab.Screen name="Buscador" component={Buscador} />
    </Tab.Navigator>
  );
}