import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import AuthContext from "./AuthContext";
import { authAPI } from "../api/api";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync auth token with server
  useEffect(() => {
    const syncToken = async () => {
      if (!user?.email || !user?.uid) {
        return;
      }

      try {
        await authAPI.issueToken({
          email: user.email,
          userId: user.uid,
          name: user.displayName || user.name || "EcoTrack User",
        });
      } catch {
        // Token sync failed, but continue
      }
    };

    syncToken();
  }, [user]);

  const contextValue = {
    user,
    setUser,
    loading,
    signIn: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        setUser(userCredential.user);
        return Promise.resolve({ user: userCredential.user });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    signUp: async (email, password, displayName) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(auth.currentUser, { displayName });
        setUser(userCredential.user);
        return Promise.resolve({ user: userCredential.user });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    signInWithGoogle: async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
        return Promise.resolve({ user: result.user });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logOut: async () => {
      try {
        await signOut(auth);
        setUser(null);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    forgetpass: async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updateUser: async (upData) => {
      try {
        if (!auth.currentUser) {
          throw new Error("No authenticated user.");
        }
        await updateProfile(auth.currentUser, upData);
        setUser({ ...auth.currentUser, ...upData });
        return Promise.resolve({ user: auth.currentUser });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
