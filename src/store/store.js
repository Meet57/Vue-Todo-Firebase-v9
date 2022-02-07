import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
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
            return state.todos.sort((a, b) => (a.status == b.status ? 0 : a.status ? -1 : 1));
        },
    },
    mutations: {
        addTodo(state, data) {
            state.todos.push({ ...data, id: Date.now() });
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
