// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  /*
  apiKey: import.meta.env.VITE_APY_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
*/
  apiKey: "AIzaSyAEJ8P31tYX6qVf9HH61fY3W_iD9iC-9Io",
  authDomain: "zafir-projects.firebaseapp.com",
  projectId: "zafir-projects",
  storageBucket: "zafir-projects.appspot.com",
  messagingSenderId: "211263662163",
  appId: "1:211263662163:web:1a389ee56c22ebf9403ea6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
