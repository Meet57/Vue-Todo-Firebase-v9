import { createNamespacedHelpers } from "vuex";
import { ACTIONS, GETTERS } from "./types";

const { mapActions, mapGetters } = createNamespacedHelpers("auth");

export const authActions = mapActions(ACTIONS);
export const authGetters = mapGetters(GETTERS);
