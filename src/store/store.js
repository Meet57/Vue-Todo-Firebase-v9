import { onSnapshot } from "firebase/firestore";
import Vue from "vue";
import Vuex from "vuex";
import db from "../firebase";

Vue.use(Vuex);

// Create a new store instance.
export const store = new Vuex.Store({
    strict: true,
    // This will restrict outside files to edit Vuex store
    state: {
        todos: [
            {
                id: 1,
                todo: "Forest City Realty Trust, Inc.",
                status: true,
            },
            {
                id: 2,
                todo: "Discovery Communications, Inc.",
                status: false,
            },
            {
                id: 3,
                todo: "Southern California Edison Company",
                status: true,
            },
            {
                id: 4,
                todo: "Olympic Steel, Inc.",
                status: false,
            },
            {
                id: 5,
                todo: "Goldman Sachs Group, Inc. (The)",
                status: false,
            },
            {
                id: 6,
                todo: "Qorvo, Inc.",
                status: false,
            },
            {
                id: 7,
                todo: "Valeritas Holdings, Inc.",
                status: false,
            },
            {
                id: 8,
                todo: "Abeona Therapeutics Inc.",
                status: true,
            },
            {
                id: 9,
                todo: "Autodesk, Inc.",
                status: false,
            },
            {
                id: 10,
                todo: "AgroFresh Solutions, Inc.",
                status: false,
            },
            {
                id: 11,
                todo: "Jack In The Box Inc.",
                status: true,
            },
            {
                id: 12,
                todo: "Davis Select Worldwide ETF",
                status: true,
            },
            {
                id: 13,
                todo: "Vornado Realty Trust",
                status: false,
            },
            {
                id: 14,
                todo: "S&W Seed Company",
                status: false,
            },
            {
                id: 15,
                todo: "Imax Corporation",
                status: false,
            },
            {
                id: 16,
                todo: "Oil States International, Inc.",
                status: false,
            },
            {
                id: 17,
                todo: "Telecom Italia S.P.A.",
                status: true,
            },
            {
                id: 18,
                todo: "Blackrock MuniYield Quality Fund III, Inc.",
                status: true,
            },
            {
                id: 19,
                todo: "Analogic Corporation",
                status: true,
            },
            {
                id: 20,
                todo: "Alteryx, Inc.",
                status: true,
            },
        ],
    },
    getters: {
        numberOftodos(state) {
            return state.todos.length;
        },
        AllTodos(state) {
            return state.todos;
        },
    },
    mutations: {
        addTodo(state, data) {
            state.todos.push(data);
        },
        getTodo(state) {
            var todos = []
            onSnapshot(db, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    todos.push({...doc.data(), id: doc.id})
                });
            });
            state.todos = todos
        },
    },
    actions: {},
});

