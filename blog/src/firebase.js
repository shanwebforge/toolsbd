// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your Firebase config object (আপনার দেওয়া)
const firebaseConfig = {
  apiKey: "AIzaSyBTwUExxQBIGW7y9a-FCCeMoT2vHvznwIY",
  authDomain: "toolbd-blog.firebaseapp.com",
  projectId: "toolbd-blog",
  storageBucket: "toolbd-blog.firebasestorage.app",
  messagingSenderId: "14769500623",
  appId: "1:14769500623:web:d2120963ad9123c5f422ba",
  measurementId: "G-8GJSH56WMD"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in your app
export { app, analytics, auth, db };
import { auth, db } from "./firebase";
