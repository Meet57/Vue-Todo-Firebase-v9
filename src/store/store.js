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
import { name } from "ntcjs";

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
        completedTaskColor(state) {
            return new Set(
                state.todos
                    .map((todo) => {
                        if (todo.status) return { colorName: todo.colorName, color: todo.color };
                    })
                    .filter((colorName) => colorName)
            );
        },
        incompletedTaskColor(state) {
            return new Set(
                state.todos
                    .map((todo) => {
                        if (!todo.status) return { colorName: todo.colorName, color: todo.color };
                    })
                    .filter((colorName) => colorName)
            );
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
            let colorName = name(data.color)[1];
            addDoc(db, { ...data, colorName, createdAt: serverTimestamp() });
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
            let colorName = name(payload.color)[1];
            updateDoc(docRef, { ...payload, colorName: colorName });
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
//         todo: "Colobus guerza",
//         status: true,
//         color: "Teal",
//     },
//     {
//         todo: "Nycticorax nycticorax",
//         status: false,
//         color: "Orange",
//     },
//     {
//         todo: "Eumetopias jubatus",
//         status: true,
//         color: "Green",
//     },
//     {
//         todo: "Ramphastos tucanus",
//         status: true,
//         color: "Purple",
//     },
//     {
//         todo: "Dicrostonyx groenlandicus",
//         status: false,
//         color: "Yellow",
//     },
//     {
//         todo: "Pseudocheirus peregrinus",
//         status: true,
//         color: "Fuscia",
//     },
//     {
//         todo: "Ploceus rubiginosus",
//         status: true,
//         color: "Red",
//     },
//     {
//         todo: "Haematopus ater",
//         status: true,
//         color: "Purple",
//     },
//     {
//         todo: "Manouria emys",
//         status: true,
//         color: "Orange",
//     },
//     {
//         todo: "Amphibolurus barbatus",
//         status: true,
//         color: "Puce",
//     },
//     {
//         todo: "Coluber constrictor",
//         status: false,
//         color: "Mauv",
//     },
//     {
//         todo: "Hydrochoerus hydrochaeris",
//         status: true,
//         color: "Maroon",
//     },
//     {
//         todo: "Tenrec ecaudatus",
//         status: false,
//         color: "Yellow",
//     },
//     {
//         todo: "Mabuya spilogaster",
//         status: true,
//         color: "Blue",
//     },
//     {
//         todo: "Pavo cristatus",
//         status: false,
//         color: "Indigo",
//     },
// ];

// arr.forEach((data) => {
//     addDoc(db, { ...data, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
