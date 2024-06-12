import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-1f85f.firebaseapp.com",
  projectId: "reactchat-1f85f",
  storageBucket: "reactchat-1f85f.appspot.com",
  messagingSenderId: "81231426638",
  appId: "1:81231426638:web:8f3d0a6c3d33be1916bf1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
