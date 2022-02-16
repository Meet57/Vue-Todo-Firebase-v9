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
            return state.todos.filter((todo) => todo.status).sort((a, b) => a.number - b.number);
        },
        incompletedTasks(state) {
            return state.todos.filter((todo) => !todo.status).sort((a, b) => a.number - b.number);
        },
        incompletedTaskColor(state) {
            let l = state.todos.map((todo) => {
                if (!todo.status) return { colorName: todo.colorName, color: todo.color };
            });

            return Array.from(new Set(l.filter((o) => o).map(JSON.stringify))).map(JSON.parse);
        },
        completedTaskColor(state) {
            let l = state.todos.map((todo) => {
                if (todo.status) return { colorName: todo.colorName, color: todo.color };
            });

            return Array.from(new Set(l.filter((o) => o).map(JSON.stringify))).map(JSON.parse);
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
//         todo: "Felis libyca",
//         status: false,
//         color: "#69d260",
//     },
//     {
//         todo: "Orcinus orca",
//         status: true,
//         color: "#cbf53d",
//     },
//     {
//         todo: "Libellula quadrimaculata",
//         status: false,
//         color: "#dde8c4",
//     },
//     {
//         todo: "Theropithecus gelada",
//         status: false,
//         color: "#bd7f08",
//     },
//     {
//         todo: "Castor fiber",
//         status: true,
//         color: "#9696a4",
//     },
//     {
//         todo: "Ovibos moschatus",
//         status: false,
//         color: "#460d5e",
//     },
//     {
//         todo: "Marmota caligata",
//         status: true,
//         color: "#18bb71",
//     },
// ];

// arr.forEach((data) => {
//     let colorName = name(data.color)[1];
//     addDoc(db, { ...data, colorName, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
