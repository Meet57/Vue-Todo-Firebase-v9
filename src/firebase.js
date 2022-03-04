// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    deleteDoc,
    addDoc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { store } from "./store/store";

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

var cred = null;

if (localStorage.getItem("cred")) {
    cred = JSON.parse(localStorage.getItem("cred"));
}

const login = (email, pass) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, pass)
            .then((user) => {
                cred = user;
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
                cred = user;
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
                cred = null;
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const currentuser = () => {
    return auth.currentUser;
};

// Database

const read = () => {
    return new Promise((resolve, reject) => {
        // getDocs(user)
        //     .then((docs) => {
        //         let arr = [];
        //         let i = 1;
        //         docs.forEach((doc) => {
        //             arr.push({ ...doc.data(), id: doc.id, number: i });
        //             i++;
        //         });
        //         resolve(arr);
        //     })
        //     .catch((err) => {
        //         reject(err);
        //     });
        let user = collection(doc(collection(db, "user"), cred.user.uid), "tasks");
        let q = query(user, orderBy("createdAt"));
        onSnapshot(
            q,
            (docs) => {
                let aa = [];
                let i = 1;
                docs.forEach((doc) => {
                    aa.push({ ...doc.data(), id: doc.id, number: i });
                    i++;
                });
                store.commit("task/getTodo", aa);
                resolve(aa);
            },
            (err) => {
                reject(err);
            }
        );
    });
};

const deletedoc = (docid) => {
    let user = collection(doc(collection(db, "user"), cred.user.uid), "tasks");
    return new Promise((resolve, reject) => {
        deleteDoc(doc(user, docid))
            .then(() => resolve())
            .catch((err) => reject(err));
    });
};

const adddoc = (data) => {
    let user = collection(doc(collection(db, "user"), cred.user.uid), "tasks");
    return new Promise((resolve, reject) => {
        addDoc(user, data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const updatedoc = (data) => {
    let user = doc(collection(doc(collection(db, "user"), cred.user.uid), "tasks"), data.id);
    return new Promise((resolve, reject) => {
        updateDoc(user, data)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    db,
    login,
    signup,
    signout,
    currentuser,
    read,
    deletedoc,
    adddoc,
    updatedoc,
    auth,
};
