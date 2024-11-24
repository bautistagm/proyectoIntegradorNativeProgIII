import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth, firestore } from "../firebase/config";
import Post from "../components/Post";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      totalPosts: 0,
    };
  }

  componentDidMount() {
    const userEmail = auth.currentUser?.email;


    if (!userEmail) {
      alert("Debes estar logueado para acceder al perfil.");
      this.props.navigation.navigate("Login");
      return;
    }

    this.unsubscribe = firestore
      .collection("posts")
      .where("userEmail", "==", userEmail)
      .onSnapshot((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });

        this.setState({ userPosts: posts, totalPosts: posts.length });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  handleLogout() {
    auth
      .signOut()
      .then(() => {
        alert("Cerraste sesión con éxito.");
        this.props.navigation.navigate("Login");
      })
      .catch((error) => console.error("Error al cerrar sesión: ", error));
  }

  handleDeletePost(postId) {
    Alert.alert(
      "Eliminar posteo",
      "¿Estás seguro de que deseas eliminar este post?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            firestore
              .collection("posts")
              .doc(postId)
              .delete()
              .then(() => {
                alert("Post eliminado con éxito.");
              })
              .catch((error) =>
                console.error("Error al eliminar el post: ", error)
              );
          },
        },
      ]
    );
  }

  render() {
    const { userPosts, totalPosts } = this.state;
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Cargando datos del usuario...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>twittMe</Text>
        <Text style={styles.heading}>Perfil del usuario</Text>
        <Text style={styles.text}>Nombre de usuario: {currentUser.displayName || "No definido"}</Text>
        <Text style={styles.text}>Email: {currentUser.email}</Text>
        <Text style={styles.text}>Cantidad de posteos: {totalPosts}</Text>
  
        <Text style={styles.subHeading}>Mis posteos</Text>
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              post={item}
              onDelete={() => this.handleDeletePost(item.id)}
            />
          )}
        />
  
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.handleLogout()}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#921224",
    position: "absolute",
    top: 10, 
    left: 0,
    right: 0,
    textAlign: "center", 
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
