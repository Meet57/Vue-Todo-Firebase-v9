import {
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
    collection,
} from "firebase/firestore";
import firebase from "../../firebase";
import _ from "lodash";
import { name } from "ntcjs";

var firestore = firebase.db;
var auth = firebase.auth;
var db = null;

export const state = {
    todos: [],
    loading: true,
};

export const getters = {
    numberOftodos(state) {
        return state.todos.length;
    },
    completedTasks(state) {
        return state.todos.filter((todo) => todo.status).sort((a, b) => a.number - b.number);
    },
    loading(state) {
        return state.loading;
    },
    incompletedTasks(state) {
        return state.todos.filter((todo) => !todo.status).sort((a, b) => a.number - b.number);
    },
    incompletedTaskColor(state) {
        let l = state.todos.map((todo) => {
            if (!todo.status) return { colorName: todo.colorName, color: todo.color };
        });
        return _.uniqBy(l, "color").filter((o) => o);
    },
    completedTaskColor(state) {
        let l = state.todos.map((todo) => {
            if (todo.status) return { colorName: todo.colorName, color: todo.color };
        });

        return _.uniqBy(l, "color").filter((o) => o);
    },
    allTodos(state) {
        return state.todos.sort((a, b) => (a.status == b.status ? 0 : a.status ? 1 : -1));
    },
    incompleteTask(state) {
        let i = 0;
        state.todos.forEach((task) => {
            if (!task.status) {
                i++;
            }
        });
        return i;
    },
};

export const mutations = {
    resetDefault(state) {
        state.todos = [];
        state.loading = true;
    },
    addTodo(state, data) {
        let colorName = name(data.color)[1];
        addDoc(db, { ...data, colorName, createdAt: serverTimestamp() });
    },
    getTodo(state) {
        let user = doc(
            collection(firestore, "user"),
            JSON.parse(localStorage.getItem("cred")).user.uid || auth.currentUser.uid
        );
        // let user = doc(collection(firestore, "user"),auth.currentUser.uid);
        db = collection(user, "tasks");
        const q = query(db, orderBy("createdAt"));
        onSnapshot(q, (snapshot) => {
            let todos = [];
            let i = 1;
            snapshot.docs.forEach((doc) => {
                todos.push({ ...doc.data(), id: doc.id, number: i });
                i++;
            });
            state.todos = todos;
            state.loading = false;
        });
    },
    updateTodo(state, payload) {
        let docRef = doc(db, payload.id);
        let colorName = name(payload.color)[1];
        updateDoc(docRef, { ...payload, colorName: colorName });
    },
    toogleStatus(state, payload) {
        let docRef = doc(db, payload.id);
        updateDoc(docRef, { status: !payload.status });
    },
    deleteTodo(state, payload) {
        var docRef = doc(db, payload.id);
        deleteDoc(docRef);
    },
};

export const namespaced = true;
