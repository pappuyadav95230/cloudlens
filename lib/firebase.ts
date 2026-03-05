import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCrGeQoSMmp9ild333sWpm_3Z0C6Ndz8zg",
    authDomain: "cloudlens-2d4d1.firebaseapp.com",
    projectId: "cloudlens-2d4d1",
    storageBucket: "cloudlens-2d4d1.firebasestorage.app",
    messagingSenderId: "707939182391",
    appId: "1:707939182391:web:fb43ea22ca14b5aeffdcb2",
    measurementId: "G-9DFZ840YZW",
};

// Initialize Firebase (avoid re-initialization in dev hot-reload)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
