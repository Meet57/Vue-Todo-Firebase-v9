import Vue from "vue";
import Vuex from "vuex";

import * as task from "./modules/task";
import * as auth from "./modules/auth/auth";
import * as alert from "./modules/alert/alert";

Vue.use(Vuex);

// Create a new store instance.
export const store = new Vuex.Store({
    modules: {
        task,
        auth,
        alert,
    },
    // strict: true,
    // This will restrict outside files to edit Vuex store
});
