// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQz4AW1_-oIUaK4ASSxEUGJo0TfLQfP-M",
    authDomain: "vue-todo-firebase-375f2.firebaseapp.com",
    projectId: "vue-todo-firebase-375f2",
    storageBucket: "vue-todo-firebase-375f2.appspot.com",
    messagingSenderId: "670568746570",
    appId: "1:670568746570:web:3a95f56b4d19ce05e020b3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export default { db, auth };
