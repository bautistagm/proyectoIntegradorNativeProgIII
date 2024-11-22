import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth, firestore, db } from "../firebase/config";
import firebase from "firebase";


export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.datos.data.likes.length,
            milike: this.props.datos.data.likes.includes(auth.currentUser.email)
        };
    }


    likear() {
        db.collection("posts").doc(this.props.datos.id).update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) })
            .then(() => { this.setState({ likes: this.props.datos.data.likes.length, milike: true }) }
            )
    }

    deslikear() {
        db.collection("posts").doc(this.props.datos.id).update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) })
            .then(() => { this.setState({ likes: this.props.datos.data.likes.length, milike: false }) }
            )
    }

    render() {


        return (
            <View style={styles.container}>
                <Text style={styles.description}>{this.props.datos.data.description}</Text>
                <Text style={styles.author}>Publicado por: {this.props.datos.data.userEmail}</Text>
                <Text style={styles.likes}>
                    {this.props.datos.data.likes.length}
                </Text>
                {this.state.milike == true ?
                    <TouchableOpacity onPress={() => this.deslikear()}>
                        <Text>Deslikear</Text>

                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.likear()}>
                        <Text>Likear</Text>

                    </TouchableOpacity>
                }
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

