<template>
    <div
        v-if="getAlert.length > 0"
        class="bg-red-100 rounded-lg py-4 px-3 border border-red-600 text-base text-red-700 mb-3 absolute bottom-0 left-0 m-5"
        role="alert"
    >
        {{ getAlert }}
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
