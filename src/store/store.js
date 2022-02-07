import { addDoc, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
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
    },
    getters: {
        numberOftodos(state) {
            return state.todos.length;
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
        addTodo(state, data) {
            let add = true;
            state.todos.forEach((task) => {
                if (task.todo.toUpperCase() == data.todo.toUpperCase()) {
                    add = false;
                }
            });
            if (add) {
                addDoc(db, { ...data, createdAt: serverTimestamp() });
            }
        },
        getTodo(state) {
            onSnapshot(db, (snapshot) => {
                var todos = [];
                let i = 1;
                snapshot.docs.forEach((doc) => {
                    todos.push({ ...doc.data(), id: doc.id, number: i });
                    i++;
                });
                state.todos = todos;
            });
        },
        toogleStatus(state, payload) {
            var docRef = doc(db, payload.id);
            updateDoc(docRef, { status: !payload.status });
        },
        deleteTodo(state, payload) {
            var docRef = doc(db, payload.id);
            deleteDoc(docRef);
        },
    },
    actions: {},
});
