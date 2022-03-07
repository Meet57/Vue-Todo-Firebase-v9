import { ACTIONS, GETTERS } from "./types";

export const state = {
    alert: "",
};

export const getters = {
    [GETTERS.ALERT](state) {
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
    [ACTIONS.ALERT]({ commit }, payload) {
        commit("changealert", payload.text);
        setTimeout(() => {
            commit("changealert", "");
        }, 3000);
    },
};

export const namespaced = true;
