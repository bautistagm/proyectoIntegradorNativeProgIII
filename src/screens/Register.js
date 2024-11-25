import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { auth, db } from "../firebase/config";

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

  handleSubmit(nombre, mail, contrasenia) {
    auth
      .createUserWithEmailAndPassword(mail, contrasenia)
      .then((response) =>
        db
          .collection("Usuarios")
          .add({
            owner: auth.currentUser.email,
            user: nombre,
            pass: contrasenia,
            createdAt: Date.now(),
          })
          .then(this.props.navigation.navigate("Login"))
      )
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
          style={styles.input}
        />
        <TextInput
          keyboardType="email address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />
        <TextInput
          keyboardType="Ingrese su contrasena"
          placeholder="Ingrese su contrasena"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() =>
            this.handleSubmit(
              this.state.userName,
              this.state.email,
              this.state.password
            )
          }
          style={styles.continueButton}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Ir al Login</Text>
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
  continueButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButton: {
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
