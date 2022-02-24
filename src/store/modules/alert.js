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
        console.log("Alert mutation called");
        state.alert = payload.text;
        setTimeout(() => {
            state.alert = "";
        }, 3000);
    },
};
