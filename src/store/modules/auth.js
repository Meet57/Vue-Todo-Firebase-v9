import firebase from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

var { auth } = firebase;

export const state = {
    cred: null,
};

export const getters = {
    cred(state) {
        return state.cred;
    },
};

export const mutations = {
    changeCred(state, payload) {
        state.cred = payload;
    },
};

export const actions = {
    init({ commit }) {
        if (getSavedState("cred")) {
            commit("changeCred", getSavedState("cred"));
            commit("changeCred", getSavedState("cred"), { root: true });
        }
    },
    signIn({ commit }, payload) {
        signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((cred) => {
                saveState("cred", cred);
                commit("changeCred", cred);
                commit("changeCred", cred, { root: true });
            })
            .catch((err) => {
                console.log(err.message);
            });
    },
    signUp({ commit }, payload) {
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((cred) => {
                saveState("cred", cred);
                commit("changeCred", cred);
                commit("changeCred", cred, { root: true });
            })
            .catch((err) => {
                console.log(err.message);
            });
    },
    signOut({ commit }) {
        signOut(auth)
            .then(() => {
                window.localStorage.removeItem("cred");
                commit("changeCred", null);
                commit("changeCred", null, { root: true });
            })
            .catch((err) => {
                console.log(err.message);
            });
    },
};

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state));
}

if (getSavedState("cred")) {
    mutations.changeCred(state, getSavedState("cred"));
}
