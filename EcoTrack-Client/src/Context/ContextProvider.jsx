import React, { useEffect, useState } from "react";
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
import { auth, isFirebaseConfigured } from "../Firebase/Firebase.init";
import AuthContext from "./AuthContext";
import { authAPI } from "../api/api";

const MOCK_USERS_KEY = "ecotrack.mockUsers";
const MOCK_SESSION_KEY = "ecotrack.mockSession";
const MOCK_GOOGLE_EMAIL = "google.user@ecotrack.local";
const AUTH_TOKEN_KEY = "authToken";

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const removeStorage = (key) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(key);
};

const setAuthToken = (token) => {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

const buildAvatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "EcoTrack User")}&background=10B981&color=fff&bold=true`;

const normalizeEmail = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const createMockRecord = ({
  email,
  password = "",
  displayName = "",
  photoURL = "",
  providerId = "password",
  emailVerified = false,
}) => {
  const now = new Date().toISOString();

  return {
    uid: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email,
    password,
    displayName,
    photoURL,
    providerId,
    emailVerified,
    creationTime: now,
    lastSignInTime: now,
  };
};

const mapRecordToUser = (record) => ({
  uid: record.uid,
  email: record.email,
  displayName: record.displayName || "",
  photoURL: record.photoURL || "",
  emailVerified: Boolean(record.emailVerified),
  isAnonymous: false,
  providerData: [
    {
      providerId: record.providerId || "password",
      uid: record.uid,
      displayName: record.displayName || null,
      email: record.email,
      photoURL: record.photoURL || null,
    },
  ],
  metadata: {
    creationTime: record.creationTime,
    lastSignInTime: record.lastSignInTime,
  },
  name: record.displayName || record.email?.split("@")[0] || "EcoTrack User",
});

export const ContextProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const setUser = (nextUser) => {
    setUserState(nextUser);

    if (!isFirebaseConfigured) {
      if (nextUser) {
        writeStorage(MOCK_SESSION_KEY, nextUser);
      } else {
        removeStorage(MOCK_SESSION_KEY);
      }
    }
  };

  const getMockUsers = () => readStorage(MOCK_USERS_KEY, []);

  const saveMockUsers = (users) => {
    writeStorage(MOCK_USERS_KEY, users);
  };

  const upsertMockUser = (record) => {
    const users = getMockUsers();
    const nextUsers = users.some((item) => item.uid === record.uid)
      ? users.map((item) => (item.uid === record.uid ? record : item))
      : [...users, record];

    saveMockUsers(nextUsers);
    return record;
  };

  const createUser = (email, password) => {
    if (!isFirebaseConfigured) {
      const nextEmail = normalizeEmail(email);

      if (!nextEmail || !/\S+@\S+\.\S+/.test(nextEmail)) {
        const error = new Error("Please enter a valid email address.");
        error.code = "auth/invalid-email";
        return Promise.reject(error);
      }

      const users = getMockUsers();
      const existingUser = users.find(
        (item) => normalizeEmail(item.email) === nextEmail,
      );

      if (existingUser) {
        const error = new Error(
          "This email is already registered. Please sign in instead.",
        );
        error.code = "auth/email-already-in-use";
        return Promise.reject(error);
      }

      const record = createMockRecord({
        email: nextEmail,
        password,
        providerId: "password",
        emailVerified: false,
      });

      upsertMockUser(record);
      setUser(mapRecordToUser(record));
      return Promise.resolve({ user: mapRecordToUser(record) });
    }

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    if (!isFirebaseConfigured) {
      const nextEmail = normalizeEmail(email);

      if (!nextEmail) {
        const error = new Error("Please enter your email address.");
        error.code = "auth/invalid-email";
        return Promise.reject(error);
      }

      const users = getMockUsers();
      const existingUser = users.find(
        (item) => normalizeEmail(item.email) === nextEmail,
      );

      if (!existingUser || existingUser.password !== password) {
        const error = new Error("Login failed. Please check your credentials.");
        error.code = "auth/invalid-credential";
        return Promise.reject(error);
      }

      const updatedRecord = {
        ...existingUser,
        lastSignInTime: new Date().toISOString(),
      };

      upsertMockUser(updatedRecord);
      setUser(mapRecordToUser(updatedRecord));
      return Promise.resolve({ user: mapRecordToUser(updatedRecord) });
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    if (!isFirebaseConfigured) {
      setAuthToken(null);
      setUser(null);
      return Promise.resolve();
    }

    setAuthToken(null);
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    if (!isFirebaseConfigured) {
      const now = new Date().toISOString();
      const users = getMockUsers();
      const avatar = buildAvatarUrl("EcoTrack Google User");

      let record = users.find(
        (item) => normalizeEmail(item.email) === MOCK_GOOGLE_EMAIL,
      );

      if (!record) {
        record = createMockRecord({
          email: MOCK_GOOGLE_EMAIL,
          displayName: "EcoTrack Google User",
          photoURL: avatar,
          providerId: "google.com",
          emailVerified: true,
        });
      } else {
        record = {
          ...record,
          displayName: record.displayName || "EcoTrack Google User",
          photoURL: record.photoURL || avatar,
          providerId: "google.com",
          emailVerified: true,
          lastSignInTime: now,
        };
      }

      upsertMockUser(record);
      setUser(mapRecordToUser(record));
      return Promise.resolve({ user: mapRecordToUser(record) });
    }

    return signInWithPopup(auth, provider);
  };

  const forgetpass = (email) => {
    if (!isFirebaseConfigured) {
      const nextEmail = normalizeEmail(email);

      if (!nextEmail) {
        const error = new Error("Please enter your email address.");
        error.code = "auth/invalid-email";
        return Promise.reject(error);
      }

      const users = getMockUsers();
      const existingUser = users.find(
        (item) => normalizeEmail(item.email) === nextEmail,
      );

      if (!existingUser) {
        const error = new Error("No account found with this email address.");
        error.code = "auth/user-not-found";
        return Promise.reject(error);
      }

      return Promise.resolve();
    }

    return sendPasswordResetEmail(auth, email);
  };

  const updateUser = (upData) => {
    if (!isFirebaseConfigured) {
      if (!user) {
        return Promise.reject(new Error("No authenticated user."));
      }

      const nextUser = {
        ...user,
        ...upData,
        name: upData.displayName || user.name,
        metadata: {
          ...user.metadata,
          lastSignInTime: new Date().toISOString(),
        },
      };

      const users = getMockUsers();
      const nextUsers = users.map((item) =>
        item.uid === user.uid
          ? {
              ...item,
              displayName: upData.displayName ?? item.displayName,
              photoURL: upData.photoURL ?? item.photoURL,
              emailVerified:
                typeof upData.emailVerified === "boolean"
                  ? upData.emailVerified
                  : item.emailVerified,
              lastSignInTime: nextUser.metadata.lastSignInTime,
            }
          : item,
      );

      saveMockUsers(nextUsers);
      setUser(nextUser);
      return Promise.resolve({ user: nextUser });
    }

    return updateProfile(auth.currentUser, upData);
  };

  // Observer for auth state
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setUserState(readStorage(MOCK_SESSION_KEY, null));
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserState(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const syncToken = async () => {
      if (!user?.email || !user?.uid) {
        setAuthToken(null);
        return;
      }

      try {
        const response = await authAPI.issueToken({
          email: user.email,
          userId: user.uid,
          name: user.displayName || user.name || "EcoTrack User",
        });
        setAuthToken(response?.data?.token || null);
      } catch {
        setAuthToken(null);
      }
    };

    syncToken();
  }, [user]);

  const globalInfo = {
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    forgetpass,
    loading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={globalInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
