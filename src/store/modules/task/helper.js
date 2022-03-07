import { createNamespacedHelpers } from "vuex";
import { ACTIONS, GETTERS, MUTATIONS } from "./types";

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers("task");

export const taskActions = mapActions(ACTIONS);
export const taskGetters = mapGetters(GETTERS);
export const taskMutations = mapMutations(MUTATIONS);
