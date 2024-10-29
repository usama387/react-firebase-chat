// firebase config file
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "react-chat-4a9d6.firebaseapp.com",
    projectId: "react-chat-4a9d6",
    storageBucket: "react-chat-4a9d6.appspot.com",
    messagingSenderId: "409802648311",
    appId: "1:409802648311:web:f36bc7ade2ea3d913f01f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// exporting firebase auth services
export const auth = getAuth();

// exporting firebase db services
export const database = getFireStore()

// exporting firebase storage services for uploading files and getting url back
export const storage = getStorage()

