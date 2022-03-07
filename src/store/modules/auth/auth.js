import Auth from "../../../driver/authentication";
import { ACTIONS, GETTERS } from "./types";

const { SIGNIN, SIGNOUT, SIGNUP } = ACTIONS;
const { CRED } = GETTERS;

const authentication = new Auth();

export const state = {
    cred: null,
};

export const getters = {
    [CRED](state) {
        return state.cred;
    },
};

export const mutations = {
    changeCred(state, payload) {
        state.cred = payload;
    },
};

export const actions = {
    // signIn({ commit, ...rest }, payload) {
    [SIGNIN]({ commit }, payload) {
        authentication
            .login(payload.email, payload.password)
            .then((cred) => {
                saveState("cred", cred);
                commit("changeCred", cred);
            })
            .catch((err) => {
                commit("alert/alert", { text: err.message }, { root: true });
            });
    },
    [SIGNUP]({ commit }, payload) {
        authentication
            .signup(payload.email, payload.password)
            .then((cred) => {
                saveState("cred", cred);
                commit("changeCred", cred);
            })
            .catch((err) => {
                commit("alert/alert", { text: err.message }, { root: true });
            });
    },
    [SIGNOUT]({ commit }) {
        authentication
            .signout()
            .then(() => {
                window.localStorage.removeItem("cred");
                commit("changeCred", null);
            })
            .catch((err) => {
                commit("alert/alert", { text: err.message }, { root: true });
            });
    },
};

export const namespaced = true;

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state));
}

if (getSavedState("cred")) {
    mutations.changeCred(state, getSavedState("cred"));
}
