import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYQ18Z56sg7yo5GNpKuk8quWmjtU1oAcQ",
  authDomain: "we-serve-36073.firebaseapp.com",
  projectId: "we-serve-36073",
  storageBucket: "we-serve-36073.appspot.com",
  messagingSenderId: "364786260503",
  appId: "1:364786260503:web:243d8ea6223177aeb89a52",
  databaseURL: "https://we-serve-36073-default-rtdb.firebaseio.com",
  measurementId: "G-7LGSNNXQC7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
