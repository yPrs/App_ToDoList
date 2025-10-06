// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ZBDGmvYvYC8jgVT6F0d-TQVFRADSmm8",
  authDomain: "todolistapp-3a804.firebaseapp.com",
  projectId: "todolistapp-3a804",
  storageBucket: "todolistapp-3a804.firebasestorage.app",
  messagingSenderId: "780767738441",
  appId: "1:780767738441:web:834f1e2e1a13893b411d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth };