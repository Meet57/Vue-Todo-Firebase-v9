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
        state.alert = paylaod.text;
        console.log(payload.text);
        setTimeout(() => {
            state.alert = "";
        }, 3000);
    },
};

export const actions = {
    alert({ commit }, payload) {
        commit("alert", payload.text);
        console.log(payload.text);
        setTimeout(() => {
            commit("alert", "");
        }, 3000);
    },
};

export const namespaced = true;
