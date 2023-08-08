import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCnU7cIqrtOkaFVVhwpMuR5y9n8ZMhskVg",
  authDomain: "harry-g-portfolio.firebaseapp.com",
  projectId: "harry-g-portfolio",
  storageBucket: "harry-g-portfolio.appspot.com",
  messagingSenderId: "710688160524",
  appId: "1:710688160524:web:9a3b87a8c7e3a3407be729",
  measurementId: "G-QLW2Y6BCJK"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


export const signInWithGoogle = () => signInWithPopup(auth, provider);