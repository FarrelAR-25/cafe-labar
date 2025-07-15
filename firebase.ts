// utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjaZtn9ODBhSB689KNusSUbzuhKObLI1U",
  authDomain: "labar-sr.firebaseapp.com",
  projectId: "labar-sr",
  storageBucket: "labar-sr.firebasestorage.app",
  messagingSenderId: "304792094176",
  appId: "1:304792094176:web:11133745e7bb3cf461d785",
  measurementId: "G-4R5EJZZ5NM"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export const auth = getAuth(app);
