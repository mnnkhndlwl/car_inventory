// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "carinventory-1bab2.firebaseapp.com",
  projectId: "carinventory-1bab2",
  storageBucket: "carinventory-1bab2.appspot.com",
  messagingSenderId: "868409462666",
  appId: "1:868409462666:web:2cdadfd7e1e380ed084273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const auth = getAuth();
//export const provider = new GoogleAuthProvider();

export default app;