// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBLkvdyTLzwH4MUU6kXfd85HxRG-4RtIh0",
  authDomain: "netflix-clone-86a0e.firebaseapp.com",
  projectId: "netflix-clone-86a0e",
  storageBucket: "netflix-clone-86a0e.appspot.com",
  messagingSenderId: "824558259275",
  appId: "1:824558259275:web:073b25fef37b1ccd2b11ce",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
