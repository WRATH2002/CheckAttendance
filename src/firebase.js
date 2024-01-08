// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import "dotenv";
// import "dotenv/config";
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { API_KEY } from "./components/constant";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "checkscroe.firebaseapp.com",
  projectId: "checkscroe",
  storageBucket: "checkscroe.appspot.com",
  messagingSenderId: "335127948693",
  appId: "1:335127948693:web:cc1a0384f9b5ca6757da9c",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = firebase.firestore();
export default firebase;
export { db };
// export const storage = getStorage(app);
