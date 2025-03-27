import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLSY8n2aIemul43no00PwPHA4G8YEybUQ",  // Your Web API key
  authDomain: "snazzify-7dc90.firebaseapp.com",  // Constructed from your project ID
  projectId: "snazzify-7dc90",  // Your project ID
  storageBucket: "snazzify-7dc90.appspot.com",  // Constructed from your project ID

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 