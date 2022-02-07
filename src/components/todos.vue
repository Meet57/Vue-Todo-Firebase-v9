<template>
    <div class="">
        <table class="table-auto w-full rounded-full">
            <tr class="p-3 bg-gray-300">
                <th class="text-left px-5 py-3">ID</th>
                <th class="text-left px-5 py-3">TODO</th>
                <th class="text-left px-5 py-3">STATUS</th>
                <th class="text-left px-5 py-3">ACTIONS</th>

            </tr>
            <todo v-for="row in AllTodos" :key="row.id" :row="row" />
        </table>
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
    },
};
</script>

<style></style>
