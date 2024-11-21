import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {auth} from '../firebase/config'

export default class Login extends Component {
  constructor() {
      super()
      this.state = {
          email: '',
          password: '',
          error:'',
      }
  }
  login(){

    const {email,password} = this.state;

    if (email === ''){
        this.setState({
            error:'El mail es obligatorio!'
        })
    }  else if (password === ''){
        this.setState({
            error:'La contraseña es obligatoria!'
        })
    } else {
        auth.signInWithEmailAndPassword(email, password)
        .then( response => {
            console.log('Login exitoso', response);

            this.setState({
                email: '',
                password: '',
                error: ''
            });

            //redigirimos al home si tood esta bien
            this.props.navigation.navigate('Home');

        })
        .catch(error => {
          console.log('error de login:',error.message), 
          this.setState({
                error: error.message
            });
        })
    }

}

  componentDidMount(){  //falta pulirlo, Redirigir al usuario a la home del sitio.
       auth.onAuthStateChanged( user => {
          if(user){
            console.log("Usuario logueado:", user)
              this.props.navigation.navigate('Home')
          }
          console.log(user)
      })
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />

        <TextInput
          keyboardType='default'
          placeholder='Password'
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

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.linkText}>Home</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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