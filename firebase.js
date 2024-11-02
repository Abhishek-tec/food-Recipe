// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiNwx1L51wDfqXybunPnp1-1s5ZcFF65c",
  authDomain: "food-yt-20999.firebaseapp.com",
  projectId: "food-yt-20999",
  storageBucket: "food-yt-20999.appspot.com",
  messagingSenderId: "226832546319",
  appId: "1:226832546319:web:8793871d6c63062e88817a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
