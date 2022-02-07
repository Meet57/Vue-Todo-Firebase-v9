<template>
    <tr class="border-gray-200 bg-gray-600 text-white">
        <td class="px-3 py-2">{{ row.number }}</td>
        <td class="px-3 py-2">{{ row.todo }}</td>
        <td class="px-3 py-2 text-center">
            <i
                class="far fa-check-circle fa-lg"
                :style="[row.status ? { color: 'cyan' } : { color: 'pink' }]"
                v-on:click="toggleStatus(row.id)"
            ></i>
        </td>
        <td class="px-3 py-2 text-center">
            <i class="far fa-edit fa-lg mr-3" :style="{ color: '#5ef7ff' }"></i>
            <i
                class="far fa-trash-alt fa-lg"
                :style="{ color: '#ff5e5e' }"
                v-on:click="deleteTodo(row.id)"
            ></i>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        row: {
            type: Object,
            required: true,
        },
    },
    methods: {
        toggleStatus(id) {
            this.$store.commit("toogleStatus", { id, status: this.row.status });
        },
        deleteTodo(id) {
            this.$store.commit("deleteTodo", { id: id });
        },
    },
};
</script>

<style></style>
