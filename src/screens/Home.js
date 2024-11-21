import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 









export default class Home extends Component {

  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la aplicación!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ir a login</Text>
      </TouchableOpacity>
    </View>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});
