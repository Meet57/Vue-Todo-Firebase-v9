// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX3Zl2fHs_WYFf8KY8i5J0GgeXTqPH7Zo",
    authDomain: "vue-firebase-b8455.firebaseapp.com",
    projectId: "vue-firebase-b8455",
    storageBucket: "vue-firebase-b8455.appspot.com",
    messagingSenderId: "321808385924",
    appId: "1:321808385924:web:38cad14a68b15e3b23ffd1",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const login = (email, pass) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, pass)
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const signup = (email, pass) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const signout = () => {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default { db, login, signup, signout, auth };
