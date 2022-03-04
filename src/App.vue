<template>
    <div>
        <alert />
        <router-view></router-view>
    </div>
</template>

<script>
import alert from "./components/Alert.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        alert,
    },
    watch: {
        cred(value) {
            if (value) {
                this.$router.push("/todos");
            } else {
                this.$router.push("/");
            }
        },
    },
    computed: {
        ...mapGetters("auth", ["cred"]),
    },
};
</script>

<style></style>
