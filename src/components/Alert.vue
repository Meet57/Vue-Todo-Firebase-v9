<template>
    <div v-if="getAlert.length > 0" class="flex absolute top-0 left-0 m-12" role="alert">
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
