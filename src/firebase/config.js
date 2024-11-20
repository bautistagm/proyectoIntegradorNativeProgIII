import app from "firebase/app";
import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { auth } from "../firebase/config"

const firebaseConfig = {
    apiKey: "AIzaSyCJ7qCV3zQqDBeStRmnwVeKKt8yQhBf9_I",
    authDomain: "rnfirebase-28083.firebaseapp.com",
    projectId: "rnfirebase-28083",
    storageBucket: "rnfirebase-28083.firebasestorage.app",
    messagingSenderId: "535595108753",
    appId: "1:535595108753:web:e47aa88279d8d3388e3230"
};

const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();