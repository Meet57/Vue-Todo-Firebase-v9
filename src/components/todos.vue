<template>
    <div class="">
        <div class="border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
                <li
                    :class="
                        tab
                            ? 'inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                            : 'inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    "
                    v-on:click="tab = true"
                >
                    Incomplete Tasks
                </li>
                <li
                    :class="
                        !tab
                            ? 'inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                            : 'inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    "
                    v-on:click="tab = false"
                >
                    Complete Tasks
                </li>
            </ul>
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
    data() {
        return {
            tab: true,
        };
    },
    computed: {
        AllTodos() {
            if (this.tab) {
                return this.$store.getters.AllTodos.filter((todo) => !todo.status);
            } else {
                return this.$store.getters.AllTodos.filter((todo) => todo.status);
            }
        },
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },
    },
};
</script>

<style></style>
