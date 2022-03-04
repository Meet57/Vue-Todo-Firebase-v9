import { serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { name } from "ntcjs";
import Database from "../../driver/database";

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
    },
    getTodo(state, payload) {
        if (payload) {
            state.todos = payload;
            state.loading = false;
        }
    },
};

export const actions = {
    getTodo({ commit }) {
        database.read().then((value) => {
            commit("getTodo", value);
        });
    },
    deleteTodo(context, payload) {
        database.deletedoc(payload.id);
    },
    addTodo(context, paylaod) {
        let colorName = name(paylaod.color)[1];
        database.add({ ...paylaod, colorName, createdAt: serverTimestamp() });
    },
    updateTodo(context, payload) {
        let colorName = name(payload.color)[1];
        database.updatedoc({ ...payload, colorName: colorName });
    },
    toogleStatus(context, payload) {
        database.updatedoc({ ...payload, status: !payload.status });
    },
};

export const namespaced = true;
