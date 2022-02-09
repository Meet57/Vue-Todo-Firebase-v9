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
            updateDoc(docRef, { todo: payload.todo });
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
//         todo: "White-throated monitor",
//         status: false,
//     },
//     {
//         todo: "Campo flicker",
//         status: false,
//     },
//     {
//         todo: "Squirrel, arctic ground",
//         status: true,
//     },
//     {
//         todo: "Genoveva",
//         status: true,
//     },
//     {
//         todo: "Greater sage grouse",
//         status: false,
//     },
//     {
//         todo: "Rufous tree pie",
//         status: false,
//     },
//     {
//         todo: "Pine snake (unidentified)",
//         status: false,
//     },
//     {
//         todo: "Zorro, azara's",
//         status: false,
//     },
//     {
//         todo: "Kafue flats lechwe",
//         status: false,
//     },
//     {
//         todo: "Lion, steller's sea",
//         status: false,
//     },
//     {
//         todo: "Hen, sage",
//         status: false,
//     },
//     {
//         todo: "Laughing dove",
//         status: true,
//     },
//     {
//         todo: "Red phalarope",
//         status: true,
//     },
//     {
//         todo: "Sandgrouse, yellow-throated",
//         status: true,
//     },
//     {
//         todo: "Sunbird, lesser double-collared",
//         status: true,
//     },
//     {
//         todo: "Deer, spotted",
//         status: false,
//     },
//     {
//         todo: "Fisher",
//         status: false,
//     },
//     {
//         todo: "Raven, white-necked",
//         status: true,
//     },
//     {
//         todo: "Three-banded plover",
//         status: false,
//     },
//     {
//         todo: "Roseat flamingo",
//         status: false,
//     },
//     {
//         todo: "Lion, australian sea",
//         status: false,
//     },
//     {
//         todo: "Blue-breasted cordon bleu",
//         status: true,
//     },
//     {
//         todo: "Hartebeest, coke's",
//         status: true,
//     },
//     {
//         todo: "Echidna, short-beaked",
//         status: true,
//     },
//     {
//         todo: "Dolphin, bottle-nose",
//         status: false,
//     },
//     {
//         todo: "Ground legaan",
//         status: true,
//     },
//     {
//         todo: "Yellow-brown sungazer",
//         status: true,
//     },
//     {
//         todo: "Deer, spotted",
//         status: false,
//     },
//     {
//         todo: "Fox, arctic",
//         status: true,
//     },
//     {
//         todo: "Nile crocodile",
//         status: true,
//     },
// ];

// arr.forEach((data) => {
//     addDoc(db, { ...data, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
