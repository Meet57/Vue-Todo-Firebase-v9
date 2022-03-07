import { createNamespacedHelpers } from "vuex";
import { ACTIONS, GETTERS } from "./types";

const { mapActions, mapGetters } = createNamespacedHelpers("alert");

export const alertActions = mapActions(ACTIONS);
export const alertGetters = mapGetters(GETTERS);
