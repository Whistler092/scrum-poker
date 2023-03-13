import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";

const config = import.meta.env;

const firebaseConfig = {
  apiKey: config.VITE_API_KEY,
  authDomain: config.VITE_AUTH_DOMAIN,
  databaseURL: config.VITE_DATABASE_URL,
  projectId: config.VITE_PROJECT_ID,
  storageBucket: config.VITE_STORAGE_BUCKET,
  messagingSenderId: config.VITE_MESSAGING_SENDER_ID,
  appId: config.VITE_APP_ID,
  measurementId: config.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth(app);

export const authStatusChanged = (user) => {
  return onAuthStateChanged(auth, user);
};

export const handleSignOut = () => {
  return signOut(auth);
};

export const sendSignInLink = (email) => {
  const actionCodeSettings = {
    url: `${config.VITE_SITE_URL}/login-url`,
    handleCodeInApp: true,
  };

  console.log(auth);
  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

export const handleSignInLink = (url) => {
  if (isSignInWithEmailLink(auth, url)) {
    const emailRegistered = window.localStorage.getItem("email");
    return signInWithEmailLink(auth, emailRegistered, url);
  } else {
    window.location.href = "/invalid-url";
  }
};
