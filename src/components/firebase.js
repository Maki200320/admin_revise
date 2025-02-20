import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZk-jbSqVUESR0pCY6K9aUB-oB88RZnlI",
  authDomain: "attendance-70eaa.firebaseapp.com",
  projectId: "attendance-70eaa",
  storageBucket: "attendance-70eaa.appspot.com",
  messagingSenderId: "557863487298",
  appId: "1:557863487298:web:3cb41a3279003803b9eadb",
  measurementId: "G-HTK3NB507K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
