// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiSuDaOmLTmFgYxniFgBNnal-1OJu3ldk",
  authDomain: "sidra-cottoncity.firebaseapp.com",
  projectId: "sidra-cottoncity",
  storageBucket: "sidra-cottoncity.firebasestorage.app",
  messagingSenderId: "234055320590",
  appId: "1:234055320590:web:3715e6c43d5f38833d285f",
  measurementId: "G-S96JK7DJ9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
