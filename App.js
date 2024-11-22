import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './src/navigation/Main';


//aca importamos componentes y screens
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import CreatePost from './src/screens/CreatePost';
import Buscador from './src/screens/Buscador';




export default function App() {
  return (
    <Main/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

