<template>
    <div
        v-if="getAlert.length > 0"
        style="z-index: 1002"
        class="flex absolute top-0 left-0 m-12 z-auto"
        role="alert"
    >
        <a-alert :message="getAlert" type="error" show-icon />
    </div>
</template>

<script>
export default {
    name: "Alert",
    computed: {
        getAlert() {
            return this.$store.getters.getAlert;
        },
    },
};
</script>
