import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const {
  VITE_API_FIRESTORE_KEY,
  VITE_APP_FIRESTORE_AUTHDOMAIN,
  VITE_APP_FIRESTORE_PROJECTID,
  VITE_APP_FIRESTORE_STORAGEBUCKET,
  VITE_APP_FIRESTORE_MESSAGINGSENDERID,
  VITE_APP_FIRESTORE_APPID
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_FIRESTORE_KEY,
  authDomain: VITE_APP_FIRESTORE_AUTHDOMAIN,
  projectId: VITE_APP_FIRESTORE_PROJECTID,
  storageBucket: VITE_APP_FIRESTORE_STORAGEBUCKET,
  messagingSenderId: VITE_APP_FIRESTORE_MESSAGINGSENDERID,
  appId: VITE_APP_FIRESTORE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
