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
import _ from "lodash";

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
        Alert(state) {
            return state.alert;
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
    },
    mutations: {
        alert(state, payload) {
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
    },
    actions: {},
});

// let arr = [
//     {
//         todo: "Lacy Oughton",
//         status: true,
//         color: "#85f099",
//     },
//     {
//         todo: "Matt Cargo",
//         status: false,
//         color: "#b55fef",
//     },
//     {
//         todo: "Vite O' Scallan",
//         status: false,
//         color: "#3f267f",
//     },
//     {
//         todo: "Allyn Ewers",
//         status: true,
//         color: "#e925a2",
//     },
//     {
//         todo: "Gannie Aizikov",
//         status: false,
//         color: "#395e6e",
//     },
//     {
//         todo: "Julius Wigin",
//         status: false,
//         color: "#9531f3",
//     },
//     {
//         todo: "Berte Leinster",
//         status: true,
//         color: "#5a5573",
//     },
//     {
//         todo: "Cece Skrzynski",
//         status: false,
//         color: "#deeda6",
//     },
//     {
//         todo: "Janette Ellerman",
//         status: false,
//         color: "#809f9a",
//     },
//     {
//         todo: "Micaela Hacquel",
//         status: true,
//         color: "#994d61",
//     },
//     {
//         todo: "Matthias Petegre",
//         status: true,
//         color: "#2a79a7",
//     },
//     {
//         todo: "Muire Novak",
//         status: false,
//         color: "#01a74c",
//     },
//     {
//         todo: "Kareem Scapens",
//         status: false,
//         color: "#4ea3ae",
//     },
//     {
//         todo: "Federico Mapledoore",
//         status: true,
//         color: "#1727ce",
//     },
//     {
//         todo: "Moreen Huet",
//         status: false,
//         color: "#45a137",
//     },
//     {
//         todo: "Terri Sherston",
//         status: true,
//         color: "#75b8da",
//     },
//     {
//         todo: "Adler Umpleby",
//         status: false,
//         color: "#954550",
//     },
//     {
//         todo: "Kelci Brockington",
//         status: true,
//         color: "#1f9308",
//     },
//     {
//         todo: "Engelbert Stanhope",
//         status: false,
//         color: "#af54de",
//     },
//     {
//         todo: "Maynord Twinbourne",
//         status: true,
//         color: "#42f16b",
//     },
// ];

// arr.forEach((data) => {
//     let colorName = name(data.color)[1];
//     addDoc(db, { ...data, colorName, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
