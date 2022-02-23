<template>
    <auth v-if="cred == null" />
    <tasks v-else />
</template>

<script>
import auth from "./Auth.vue";
import tasks from "./Tasks.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        auth,
        tasks,
    },
    computed: {
        ...mapGetters(["cred"]),
    },
};
</script>

<style></style>
