import { addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { name } from "ntcjs";
import Database from "../../driver/database";

var db = null;

const database = new Database();

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
        db = null;
    },
    addTodo(state, data) {
        let colorName = name(data.color)[1];
        addDoc(db, { ...data, colorName, createdAt: serverTimestamp() });
    },
    getTodo(state, payload) {
        if (payload) {
            state.todos = payload;
            state.loading = false;
        }
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
};

export const actions = {
    getTodo({ commit }) {
        database.read().then((value) => {
            let todos = [];
            let i = 1;
            value.docs.forEach((doc) => {
                todos.push({ ...doc.data(), id: doc.id, number: i });
                i++;
            });
            commit("getTodo", todos);
        });
    },
    deleteTodo(context, payload) {
        database.detete(payload.id);
    },
};

export const namespaced = true;
