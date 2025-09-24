// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQt_JMFa1J9AeBhbVLc5w4outA_mLwp_A",
  authDomain: "apptodolist-ebf24.firebaseapp.com",
  projectId: "apptodolist-ebf24",
  storageBucket: "apptodolist-ebf24.firebasestorage.app",
  messagingSenderId: "50862330757",
  appId: "1:50862330757:web:6b6f28b46746be8535aaec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence()
})

export { auth };