import {
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";
import db from "../firebase";

Vue.use(Vuex);

// Create a new store instance.
export const store = new Vuex.Store({
    // strict: true,
    // This will restrict outside files to edit Vuex store
    state: {
        todos: [],
        alert: "",
        editComponent: null,
    },
    getters: {
        getAlert(state) {
            return state.alert;
        },
        getEditDetails(state) {
            return state.editComponent;
        },
        numberOftodos(state) {
            return state.todos.length;
        },
        completedTasks(state) {
            return state.todos.filter((todo) => todo.status);
        },
        incompletedTasks(state) {
            return state.todos.filter((todo) => !todo.status);
        },
        AllTodos(state) {
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
    },
    mutations: {
        updateAlert(state, payload) {
            state.alert = payload.text;
            setTimeout(() => {
                state.alert = "";
            }, 3000);
        },
        addTodo(state, data) {
            addDoc(db, { ...data, createdAt: serverTimestamp() });
        },
        getTodo(state) {
            const q = query(db, orderBy("createdAt"));
            onSnapshot(q, (snapshot) => {
                let todos = [];
                let i = 1;
                snapshot.docs.forEach((doc) => {
                    todos.push({ ...doc.data(), id: doc.id, number: i });
                    i++;
                });
                state.todos = todos;
            });
        },
        editTodo(state, payload) {
            state.editComponent = payload;
        },
        cancelTodo(state) {
            state.editComponent = null;
        },
        updateTodo(state, payload) {
            let docRef = doc(db, payload.id);
            updateDoc(docRef, { ...payload });
            // let update = true;
            // state.todos.forEach((task) => {
            //     if (task.todo.toUpperCase() == payload.todo.toUpperCase()) {
            //         update = false;
            //     }
            // });
            // if (update) {
            // } else {
            //     state.alert = "Todo Already Exist";
            //     setTimeout(() => {
            //         state.alert = "";
            //     }, 3000);
            // }
        },
        toogleStatus(state, payload) {
            let docRef = doc(db, payload.id);
            updateDoc(docRef, { status: !payload.status });
        },
        deleteTodo(state, payload) {
            var docRef = doc(db, payload.id);
            deleteDoc(docRef);
        },
    },
    actions: {},
});

// let arr = [
//     {
//         todo: "Perkin Tincknell",
//         color: "#d604a9",
//         status: true,
//     },
//     {
//         todo: "Garreth Bernade",
//         color: "#19bf66",
//         status: false,
//     },
//     {
//         todo: "Cornelle Jehan",
//         color: "#b42242",
//         status: true,
//     },
//     {
//         todo: "Kirsti Iskower",
//         color: "#079847",
//         status: false,
//     },
//     {
//         todo: "Andie Overshott",
//         color: "#143bad",
//         status: false,
//     },
//     {
//         todo: "Emmit Simeonov",
//         color: "#535e70",
//         status: false,
//     },
//     {
//         todo: "Loleta Sutterby",
//         color: "#dc2310",
//         status: false,
//     },
//     {
//         todo: "Renata Richter",
//         color: "#774157",
//         status: false,
//     },
//     {
//         todo: "Avictor Pedro",
//         color: "#be3b58",
//         status: true,
//     },
//     {
//         todo: "Caterina Hansman",
//         color: "#62cc44",
//         status: false,
//     },
//     {
//         todo: "Ber Judd",
//         color: "#f6d756",
//         status: true,
//     },
//     {
//         todo: "Parrnell Dixsee",
//         color: "#515feb",
//         status: false,
//     },
//     {
//         todo: "Karisa Likely",
//         color: "#da58a4",
//         status: true,
//     },
//     {
//         todo: "Donal Letten",
//         color: "#7c42c1",
//         status: false,
//     },
//     {
//         todo: "Ainslie Kuna",
//         color: "#0be460",
//         status: true,
//     },
// ];

// arr.forEach((data) => {
//     addDoc(db, { ...data, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
