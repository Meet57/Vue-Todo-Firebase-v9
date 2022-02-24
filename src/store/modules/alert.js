export const state = {
    alert: "",
};

export const getters = {
    alert(state) {
        return state.alert;
    },
};

export const mutations = {
    alert(state, text) {
        state.alert = text;
    },
};

export const actions = {
    alert({ commit }, payload) {
        console.log(payload, "Form meet-alert");
        commit("alert", payload.text);
        setTimeout(() => {
            commit("alert", "");
        }, 3000);
    },
};

export const namespaced = true;
