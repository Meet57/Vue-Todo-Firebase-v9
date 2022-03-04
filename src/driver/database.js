import { onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import firebase from "../firebase";
const { db, auth } = firebase;

class Database {
    user = null;
    constructor() {}
    read() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = collection(doc(collection(db, "user"), user.uid), "tasks");
                    onSnapshot(this.user, (snapshot) => {
                        // let todos = [];
                        // let i = 1;
                        // snapshot.docs.forEach((doc) => {
                        //     todos.push({ ...doc.data(), id: doc.id, number: i });
                        //     i++;
                        // });
                        resolve(snapshot);
                    });
                }
            });
        });
    }
    detete(id) {
        deleteDoc(doc(this.user, id));
    }
}
export default Database;
