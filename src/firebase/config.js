import app from 'firebase/app'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJ7qCV3zQqDBeStRmnwVeKKt8yQhBf9_I",
    authDomain: "rnfirebase-28083.firebaseapp.com",
    projectId: "rnfirebase-28083",
    storageBucket: "rnfirebase-28083.appspot.com",
    messagingSenderId: "535595108753",
    appId: "1:535595108753:web:e47aa88279d8d3388e3230"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();  
export const storage = firebase.storage();
export const db = firebase.firestore();
