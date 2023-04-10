import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkL9gXVUNFPMOGO2MsHZ1s8f6YvFSX7Ps",
  authDomain: "food-hunter-e4f88.firebaseapp.com",
  projectId: "food-hunter-e4f88",
  storageBucket: "food-hunter-e4f88.appspot.com",
  messagingSenderId: "489056695716",
  appId: "1:489056695716:web:d52c167914a03bb02f3d31",
  measurementId: "G-HP2KCCS293"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
export const storage = getStorage(app);
