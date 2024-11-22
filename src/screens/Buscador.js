import React, { Component } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase/config";

export default class Buscador extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      results: [],
      error: "",
    };
  }

  handleSearch(text) {
    this.setState({ search: text, error: "" });

    if (text.trim() === "") { //usamos trim para eliminar los espacios en cadena de texto
      this.setState({ results: [] });
      return;
    }

   
    auth
      .collection("users") 
      .get()
      .then((snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.email && userData.email.includes(text)) {
            results.push(userData);
          }
        });

        if (results.length === 0) {
          this.setState({ results: [], error: "El email no existe" });
        } else {
          this.setState({ results });
        }
      })
      .catch((error) => console.log("Error buscando usuarios:", error));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por email"
          value={this.state.search}
          onChangeText={(text) => this.handleSearch(text)}
        />

        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

        <FlatList
          data={this.state.results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>{item.email}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  resultText: {
    fontSize: 16,
  },
});
