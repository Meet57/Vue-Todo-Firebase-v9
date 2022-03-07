<template>
    <div>
        <alert />
        <router-view></router-view>
    </div>
</template>

<script>
import alert from "./components/Alert.vue";
import { authGetters } from "./store/modules/auth/helper";

export default {
    components: {
        alert,
    },
    watch: {
        CRED(value) {
            if (value) {
                this.$router.push("/todos");
            } else {
                this.$router.push("/");
            }
        },
    },
    computed: {
        ...authGetters,
    },
};
</script>

<style></style>
