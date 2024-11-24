import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase/config";

export default class Buscador extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      results: [],
      error: "",
    };
  }

  componentDidMount() {
    db.collection("Usuarios").onSnapshot((snapshot) => {
      let array = []
      snapshot.forEach((doc) => {
        array.push({
          id: doc.id,
          datos: doc.data(),
        })
      })
      this.setState({
        results: array,
      })

    })
  }

  filtrarUsuarios() {
    return(
      this.state.results.filter((usuario) => {
        return usuario.datos.user.toLowerCase().includes(this.state.search.toLowerCase())
      })
    )
  }

  render() {
    
    const filtrado = this.filtrarUsuarios()

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Buscar Usuarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar por email"
          value={this.state.search}
          onChangeText={(text) => this.setState({ search: text })}
        />

        {filtrado.length === 0 ? (<Text>No se encontraron resultados</Text>): 
        
        (<FlatList 
          data = {filtrado}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>{item.datos.user}</Text>
          )}
        />)

        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#41C9E2",
  }, 
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff", 
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#ffffff90", 
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
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
