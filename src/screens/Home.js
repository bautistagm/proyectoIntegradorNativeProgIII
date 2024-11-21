import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native-web';

const Tab = createBottomTabNavigator();


export default function Home() {
  return (
    <View>
      
      <TouchableOpacity onPress={() => auth.signedOut()}>
          <Text> probando </Text> 
      </TouchableOpacity>
    </View>
  );
}