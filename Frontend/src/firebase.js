
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBj0fqs1HvLDW27WQPaIUJquqJ2oUmDSdE",
    authDomain: "sit313-p4-c103a.firebaseapp.com",
    projectId: "sit313-p4-c103a",
    storageBucket: "sit313-p4-c103a.firebasestorage.app",
    messagingSenderId: "1065227537636",
    appId: "1:1065227537636:web:8d9fd48d24ab546afa30f1",
    measurementId: "G-6TL3ZDSPT7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
