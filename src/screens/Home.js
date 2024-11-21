import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Usamos react-native en vez de react-native-web

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la aplicación!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => alert('Botón presionado')}>
        <Text style={styles.buttonText}>Toca el boton</Text>
      </TouchableOpacity>
    </View>
  );
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
