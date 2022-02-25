import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from "../firebase";

const { auth } = firebase;

class Auth {
    constructor() {
        setTimeout(() => {
            console.log(auth.currentUser);
        }, 10000);
    }
    getlogindetails() {
        return auth.currentUser;
    }
    login(email, pass) {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, pass)
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    signup(email, pass) {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, pass)
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    signout() {
        return new Promise((resolve, reject) => {
            signOut(auth)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default Auth;
