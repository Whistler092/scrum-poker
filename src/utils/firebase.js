import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendSignInLinkToEmail,
} from "firebase/auth";

const config = import.meta.env;

console.log("firebase", config);

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

const auth = getAuth();

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const authStatusChanged = (user) => {
  return onAuthStateChanged(auth, user);
};
