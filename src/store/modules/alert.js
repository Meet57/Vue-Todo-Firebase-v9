export const state = {
    alert: "",
};

export const getters = {
    alert(state) {
        return state.alert;
    },
};

export const mutations = {
    alert(state, payload) {
        state.alert = payload.text;
        setTimeout(() => {
            state.alert = "";
        }, 3000);
    },
    changealert(state, payload) {
        state.alert = payload;
    },
};

export const actions = {
    alert({ commit }, payload) {
        commit("changealert", payload.text);
        setTimeout(() => {
            commit("changealert", "");
        }, 3000);
    },
};

export const namespaced = true;
