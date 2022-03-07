import { serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { name } from "ntcjs";
import Database from "../../../driver/database";
import { ACTIONS, GETTERS, MUTATIONS } from "./types";

const database = new Database();
const { ADDTODO, DELETETODO, GETTODO, TOOGLESTATUS, UPDATETODO } = ACTIONS;
const {
    ALLTODOS,
    COMPLETEDTASKCOLOR,
    COMPLETEDTASKS,
    INCOMPLETEDTASKCOLOR,
    INCOMPLETEDTASKS,
    INCOMPLETETASK,
    LOADING,
    NUMBEROFTODOS,
} = GETTERS;
const { RESETDEFAULT } = MUTATIONS;

export const state = {
    todos: [],
    loading: true,
};

export const getters = {
    [NUMBEROFTODOS](state) {
        return state.todos.length;
    },
    [COMPLETEDTASKS](state) {
        return state.todos.filter((todo) => todo.status).sort((a, b) => a.number - b.number);
    },
    [LOADING](state) {
        return state.loading;
    },
    [INCOMPLETEDTASKS](state) {
        return state.todos.filter((todo) => !todo.status).sort((a, b) => a.number - b.number);
    },
    [INCOMPLETEDTASKCOLOR](state) {
        let l = state.todos.map((todo) => {
            if (!todo.status) return { colorName: todo.colorName, color: todo.color };
        });
        return _.uniqBy(l, "color").filter((o) => o);
    },
    [COMPLETEDTASKCOLOR](state) {
        let l = state.todos.map((todo) => {
            if (todo.status) return { colorName: todo.colorName, color: todo.color };
        });

        return _.uniqBy(l, "color").filter((o) => o);
    },
    [ALLTODOS](state) {
        return state.todos.sort((a, b) => (a.status == b.status ? 0 : a.status ? 1 : -1));
    },
    [INCOMPLETETASK](state) {
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
    [RESETDEFAULT](state) {
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
    [GETTODO]() {
        database.read();
    },
    [DELETETODO](context, payload) {
        database.deletedoc(payload.id);
    },
    [ADDTODO](context, paylaod) {
        let colorName = name(paylaod.color)[1];
        database.add({ ...paylaod, colorName, createdAt: serverTimestamp() });
    },
    [UPDATETODO](context, payload) {
        let colorName = name(payload.color)[1];
        database.updatedoc({ ...payload, colorName: colorName });
    },
    [TOOGLESTATUS](context, payload) {
        database.updatedoc({ ...payload, status: !payload.status });
    },
};

export const namespaced = true;
