import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth } from '../firebase/config'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }
  login() {

    const { email, password } = this.state;

    if (email === '') {
      this.setState({
        error: 'El mail es obligatorio!'
      })
    } else if (password === '') {
      this.setState({
        error: 'La contraseña es obligatoria!'
      })
    } else {
      auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log('Login exitoso', response);

          this.setState({
            email: '',
            password: '',
            error: ''
          });

          
          this.props.navigation.navigate('Tabnav');

        })
        .catch(error => {
          console.log('Error completo recibido:', error);
          console.log('Código de error:', error.code);

          const errorMessages = {
            'auth/user-not-found': 'El correo ingresado no está registrado.',
            'auth/wrong-password': 'La contraseña es incorrecta.',
            'auth/invalid-email': 'El correo es inválido.',
            'INVALID_LOGIN_CREDENTIALS': 'Los datos ingresados son incorrectos.',
          };

          const errorMessage = errorMessages[error.code] || 'Ha ocurrido un error.';
          this.setState({
            error: errorMessage
          });
        });
    }

  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Tabnav')
      }
    })
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          keyboardType='email-address'
          placeholder='Ingrese su email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />

        <TextInput
          keyboardType='default'
          placeholder='Ingrese su contrasena'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />

        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

        <TouchableOpacity onPress={() => this.login()} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.linkText}>¿Todavia no tenes cuenta? Registrate aca!</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 32,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Times new roman",
  },
  linkText: {
    marginTop: 10,
    color: '#007bff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});