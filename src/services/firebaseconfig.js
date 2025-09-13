import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbXIIu8ySKx8GFdSESYPKfiAxR8RszYJk",
    authDomain: "proyecto-final-alvarez.firebaseapp.com",
    projectId: "proyecto-final-alvarez",
    storageBucket: "proyecto-final-alvarez.firebasestorage.app",
    messagingSenderId: "84507151159",
    appId: "1:84507151159:web:15afd939950d837379a8b2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
