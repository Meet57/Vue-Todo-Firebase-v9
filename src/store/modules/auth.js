import Auth from "../../driver/authentication";

const authentication = new Auth();

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
    // signIn({ commit, ...rest }, payload) {
    signIn({ commit }, payload) {
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
    signUp({ commit }, payload) {
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
    signOut({ commit }) {
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
