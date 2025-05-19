// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOQ0aiItlMMcF7QKdsJbDNoH2t9cRLHD8",
  authDomain: "things-i-cant-send.firebaseapp.com",
  projectId: "things-i-cant-send",
  storageBucket: "things-i-cant-send.firebasestorage.app",
  messagingSenderId: "665840527256",
  appId: "1:665840527256:web:5f89609b2cc95f732baded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialise Firestore
const db = getFirestore(app);

// Initialise Firebase Authentication
const auth = getAuth(app);

// Sign in anonymously
signInAnonymously(auth)
  .catch((error) => console.error('Anon sign-in error:', error));

export {db, auth};