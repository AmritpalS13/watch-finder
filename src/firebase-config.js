// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage  } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzFqXc6wbiBWY1kcbOCLlNCjsso8812Zs",
  authDomain: "watchfinder-toronto.firebaseapp.com",
  projectId: "watchfinder-toronto",
  storageBucket: "watchfinder-toronto.appspot.com",
  messagingSenderId: "130278945095",
  appId: "1:130278945095:web:95c2d2bf0356ddb5c41c62",
  measurementId: "G-VD3Z8YWG8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = new getStorage(app);
