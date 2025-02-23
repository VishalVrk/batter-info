// Import required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getAuth  } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP_1TLZsGjGYHsS2me-2p0Fn1sOS4GOw8",
    authDomain: "bulkprojec.firebaseapp.com",
    databaseURL: "https://bulkprojec-default-rtdb.firebaseio.com",
    projectId: "bulkprojec",
    storageBucket: "bulkprojec.firebasestorage.app",
    messagingSenderId: "925789645395",
    appId: "1:925789645395:web:db14801943ab7fb02034a6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // Initialize Firestore
const auth = getAuth(app);  // Initialize Authentication

export { app, db, analytics, auth,collection,getDocs };
