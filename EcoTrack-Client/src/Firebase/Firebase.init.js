// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// export const isFirebaseConfigured = Object.values(firebaseConfig).every(
//   (value) =>
//     value && !String(value).startsWith("your_firebase_") && value !== "",
// );

// let app;
// let auth;

// try {
//   if (isFirebaseConfigured) {
//     app = initializeApp(firebaseConfig);
//     auth = getAuth(app);
//     console.log("✅ Firebase initialized successfully");
//   } else {
//     console.warn("⚠️ Firebase not configured - using mock authentication");
//   }
// } catch (error) {
//   console.error("❌ Firebase initialization failed:", error.message);
//   console.log("🔄 Falling back to mock authentication mode");
// }

// export const auth = auth || null;
// export const app = app || null;


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) =>
    value && !String(value).startsWith("your_firebase_") && value !== "",
);

// শুরুতেই আমরা লেট ভেরিয়েবলগুলোকে এক্সপোর্ট (export) করে দিচ্ছি
export let app = null;
export let auth = null;

try {
  if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("✅ Firebase initialized successfully");
  } else {
    console.warn("⚠️ Firebase not configured - using mock authentication");
  }
} catch (error) {
  console.error("❌ Firebase initialization failed:", error.message);
  console.log("🔄 Falling back to mock authentication mode");
}