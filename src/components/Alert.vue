<template>
    <div
        v-if="ALERT.length > 0"
        style="z-index: 1002"
        class="flex absolute top-0 left-0 m-12 z-auto"
        role="alert"
    >
        <a-alert :message="ALERT" type="error" show-icon />
    </div>
</template>

<script>
import { alertGetters } from "../store/modules/alert/helper";

export default {
    name: "Alert",
    computed: {
        ...alertGetters,
    },
};
</script>
