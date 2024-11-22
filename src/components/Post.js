import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, firestore } from "../firebase/config";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.data.likes || [],
    };
  }

  handleLike() {
    const { id, data } = this.props;
    const { likes } = this.state;
    const currentUserEmail = auth.currentUser.email;

    if (likes.includes(currentUserEmail)) {
      firestore
        .collection("posts")
        .doc(id)
        .update({
          likes: likes.filter((email) => email !== currentUserEmail),
        })
        .then(() => {
          this.setState({ likes: likes.filter((email) => email !== currentUserEmail) });
        })
        .catch((error) => console.error("Error al quitar el like: ", error));
    } else {
      firestore
        .collection("posts")
        .doc(id)
        .update({
          likes: [...likes, currentUserEmail],
        })
        .then(() => {
          this.setState({ likes: [...likes, currentUserEmail] });
        })
        .catch((error) => console.error("Error al agregar el like: ", error));
    }
  }

  render() {
    const { data } = this.props;
    const { likes } = this.state;
    const currentUserEmail = auth.currentUser.email;
    const likedByUser = likes.includes(currentUserEmail);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.author}>Publicado por: {data.userEmail}</Text>
        <Text style={styles.likes}>
          {likes.length} {likes.length === 1 ? "Me gusta" : "Me gustas"}
        </Text>
        <TouchableOpacity
          onPress={() => this.handleLike()}
          style={[styles.likeButton, likedByUser ? styles.liked : null]}
        >
          <Text style={styles.likeButtonText}>
            {likedByUser ? "Quitar Me Gusta" : "Me Gusta"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  likes: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  likeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  liked: {
    backgroundColor: "#ff4d4d",
  },
  likeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
