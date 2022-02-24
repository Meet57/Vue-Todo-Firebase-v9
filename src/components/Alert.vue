<template>
    <div
        v-if="alert.length > 0"
        style="z-index: 1002"
        class="flex absolute top-0 left-0 m-12 z-auto"
        role="alert"
    >
        <a-alert :message="alert" type="error" show-icon />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Alert",
    computed: {
        ...mapGetters("alert", ["alert"]),
    },
};
</script>
