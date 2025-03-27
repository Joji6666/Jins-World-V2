// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "jins-world-guestbook.firebaseapp.com",
  projectId: "jins-world-guestbook",
  storageBucket: "jins-world-guestbook.firebasestorage.app",
  messagingSenderId: "621026004201",
  appId: "1:621026004201:web:c750cb5b034a98bcf8f478",
  measurementId: "G-BTCQQ605GT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
