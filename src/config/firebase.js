// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeROy4dLXboSIvob1bM3uP1rRP9KnBV7o",
  authDomain: "link-library-91c5c.firebaseapp.com",
  projectId: "link-library-91c5c",
  storageBucket: "link-library-91c5c.appspot.com",
  messagingSenderId: "982105323154",
  appId: "1:982105323154:web:35950c84032b4f0901984b",
  measurementId: "G-MYTRLX93RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}