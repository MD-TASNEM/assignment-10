// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU9gNMdWTvhNm8pw7wTqGK9_liHNVGFdA",
  authDomain: "warmpaws-pet-care-5b70e.firebaseapp.com",
  projectId: "warmpaws-pet-care-5b70e",
  storageBucket: "warmpaws-pet-care-5b70e.firebasestorage.app",
  messagingSenderId: "491885801517",
  appId: "1:491885801517:web:2a149e141729f1de8e48a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);