import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCP_1TLZsGjGYHsS2me-2p0Fn1sOS4GOw8",
  authDomain: "bulkprojec.firebaseapp.com",
  databaseURL: "https://bulkprojec-default-rtdb.firebaseio.com",
  projectId: "bulkprojec",
  storageBucket: "bulkprojec.firebasestorage.app",
  messagingSenderId: "925789645395",
  appId: "1:925789645395:web:db14801943ab7fb02034a6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { database, firestore };