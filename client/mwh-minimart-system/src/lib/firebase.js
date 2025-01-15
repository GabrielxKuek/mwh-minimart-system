import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBta6RYELnQ6RxcI_s_curcFyb9S9WRsRk",
  authDomain: "muhammadiyah-db.firebaseapp.com",
  projectId: "muhammadiyah-db",
  storageBucket: "muhammadiyah-db.appspot.com",
  messagingSenderId: "683090989996",
  appId: "1:683090989996:web:ba47d3600208a5e1b86009",
  measurementId: "G-QCP742S2T4"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };