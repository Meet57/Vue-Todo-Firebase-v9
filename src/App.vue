<template>
    <div>
        <alert />
        <login-page v-if="cred == null" />
        <tasks v-else />
    </div>
</template>

<script>
import loginPage from "./LoginPage.vue";
import tasks from "./Tasks.vue";
import alert from "./components/Alert.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        "login-page": loginPage,
        tasks,
        alert,
    },
    computed: {
        ...mapGetters("auth", ["cred"]),
    },
};
</script>

<style></style>
