// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH0PkQ5_7_43kb71ItxAS7XEomb_fdr78",
  authDomain: "ecotrack-1837c.firebaseapp.com",
  projectId: "ecotrack-1837c",
  storageBucket: "ecotrack-1837c.firebasestorage.app",
  messagingSenderId: "417652671860",
  appId: "1:417652671860:web:76e5f41758ca67bdf09821",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
