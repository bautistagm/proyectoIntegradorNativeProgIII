import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, firestore } from "../firebase/config";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      error: "",
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      this.setState({ isAuthenticated: true });
    } else {
      alert("Debes estar logueado para crear un post.");
      this.props.navigation.navigate("Login");
    }
  }


  handlePost() {
    const { description } = this.state;

    if (!description.trim()) {
      this.setState({ error: "La descripción no puede estar vacía" });
      return;
    }

    const userEmail = auth.currentUser?.email;
      
    firestore
      .collection("posts")
      .add({
        description: description,
        createdAt: new Date(),
        userEmail: userEmail,
        likes: [],
      })
      .then(() => {
        this.setState({ description: "", error: "" });
        alert("¡Post creado con éxito!");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: "Error al crear el post. Inténtalo de nuevo." });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Crear Posteo</Text>
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Escribe una descripción"
          multiline
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />
        <TouchableOpacity
          onPress={() => this.handlePost()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
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
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: "top",
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
  secondaryButton: {
    padding: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
