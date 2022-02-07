<template>
    <div class="">
        <div class="bg-gray-100 p-4">
            <i class="far fa-check-circle fa-lg" :style="{ color: 'cyan' }"></i> - Task Completed
            <br />
            <i class="far fa-check-circle fa-lg" :style="{ color: 'pink' }"></i> - Task Inomplete
        </div>
        <table v-if="noOfTodos > 0" class="table-auto w-full rounded-full">
            <tr class="p-3 bg-gray-300">
                <th class="text-left px-5 py-3">ID</th>
                <th class="text-left px-5 py-3">TODO</th>
                <th class="text-left px-5 py-3">STATUS</th>
                <th class="text-left px-5 py-3">ACTIONS</th>
            </tr>
            <todo v-for="row in AllTodos" :key="row.id" :row="row" />
        </table>
        <div v-else class="text-red-500 text-lg">Todos Loading || No Todos</div>
    </div>
</template>

<script>
import todo from "./todo.vue";
export default {
    name: "AllTodos",
    components: {
        todo: todo,
    },
    computed: {
        AllTodos() {
            return this.$store.getters.AllTodos;
        },
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },
    },
};
</script>

<style></style>
