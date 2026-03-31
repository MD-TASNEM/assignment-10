import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import functions you need from SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH0PkQ5_7_43kb71ItxAS7XEomb_fdr78",
  authDomain: "ecotrack-1837c.firebaseapp.com",
  projectId: "ecotrack-1837c",
  storageBucket: "ecotrack-1837c.firebasestorage.app",
  messagingSenderId: "417652671860",
  appId: "1:417652671860:web:76e5f41758ca67bdf09821",
};

export const isFirebaseConfigured = true;

let app;
let auth;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error.message);
  throw error;
}

export { auth, app };

// Export additional Firebase services you might need
export const db = getFirestore(app);
export const storage = getStorage(app);
