import app from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJ7qCV3zQqDBeStRmnwVeKKt8yQhBf9_I",
    authDomain: "rnfirebase-28083.firebaseapp.com",
    projectId: "rnfirebase-28083",
    storageBucket: "rnfirebase-28083.firebasestorage.app",
    messagingSenderId: "535595108753",
    appId: "1:535595108753:web:e47aa88279d8d3388e3230"
};

//const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);