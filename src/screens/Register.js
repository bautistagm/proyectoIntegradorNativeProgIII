import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase/config";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      registered: false,
      error: "",
    };
  }

  handleSubmit() {
    console.log(this.state.email, this.state.password);
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => this.setState({ registered: true }))
      .catch((error) => console.log({ error: "Fallo el registro" }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Registro</Text>
        <TextInput
          keyboardType="default"
          placeholder="Ingrese su usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput
          keyboardType="email address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          keyboardType="Ingrese su contrasena"
          placeholder="Ingrese su contrasena"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.handleSubmit()}>
          <Text>Acceder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text>Ir al Login</Text>
        </TouchableOpacity>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
