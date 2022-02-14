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
//     {
//         todo: "Aegypius tracheliotus",
//         status: false,
//         color: "#5d20ae",
//     },
//     {
//         todo: "Procyon cancrivorus",
//         status: true,
//         color: "#2677e2",
//     },
//     {
//         todo: "Gyps bengalensis",
//         status: true,
//         color: "#70c6ab",
//     },
//     {
//         todo: "Nasua nasua",
//         status: true,
//         color: "#2926d3",
//     },
//     {
//         todo: "Thylogale stigmatica",
//         status: true,
//         color: "#28ae55",
//     },
//     {
//         todo: "Tauraco porphyrelophus",
//         status: false,
//         color: "#b013b2",
//     },
//     {
//         todo: "Recurvirostra avosetta",
//         status: false,
//         color: "#c47a5b",
//     },
//     {
//         todo: "Ictonyx striatus",
//         status: false,
//         color: "#886cde",
//     },
//     {
//         todo: "Ramphastos tucanus",
//         status: false,
//         color: "#bde89d",
//     },
//     {
//         todo: "Paradoxurus hermaphroditus",
//         status: false,
//         color: "#8fc31a",
//     },
//     {
//         todo: "Lamprotornis nitens",
//         status: false,
//         color: "#999c6a",
//     },
//     {
//         todo: "Acanthaster planci",
//         status: true,
//         color: "#878fd0",
//     },
//     {
//         todo: "Platalea leucordia",
//         status: true,
//         color: "#f23b72",
//     },
//     {
//         todo: "Tamiasciurus hudsonicus",
//         status: false,
//         color: "#653c48",
//     },
//     {
//         todo: "Zonotrichia capensis",
//         status: false,
//         color: "#3ae549",
//     },
//     {
//         todo: "Xerus sp.",
//         status: false,
//         color: "#b6ce93",
//     },
//     {
//         todo: "Graspus graspus",
//         status: false,
//         color: "#020de2",
//     },
//     {
//         todo: "Casmerodius albus",
//         status: true,
//         color: "#018a20",
//     },
//     {
//         todo: "Colobus guerza",
//         status: true,
//         color: "#7cabba",
//     },
//     {
//         todo: "Acridotheres tristis",
//         status: false,
//         color: "#581e47",
//     },
//     {
//         todo: "Phoeniconaias minor",
//         status: false,
//         color: "#54e9ec",
//     },
//     {
//         todo: "Agkistrodon piscivorus",
//         status: false,
//         color: "#d3a67d",
//     },
//     {
//         todo: "Ciconia episcopus",
//         status: true,
//         color: "#f45497",
//     },
// ];

// arr.forEach((data) => {
//     let colorName = name(data.color)[1];
//     addDoc(db, { ...data, colorName, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
