// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRNAQbyegITNIw1T3AnqwDZIxa0JreVPE",
  authDomain: "clone-67fcf.firebaseapp.com",
  projectId: "clone-67fcf",
  storageBucket: "clone-67fcf.appspot.com",
  messagingSenderId: "37736843536",
  appId: "1:37736843536:web:0e27e590b2435eb3a93d95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);