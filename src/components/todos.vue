<template>
    <div class="">
        <div class="border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
                <li
                    :class="
                        !tab
                            ? 'inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                            : 'inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    "
                    v-on:click="tab = false"
                >
                    Incomplete Tasks
                    <span
                        class="ml-2 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                    >
                        {{ incompletedTasks.length }}
                    </span>
                </li>
                <li
                    :class="
                        tab
                            ? 'inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                            : 'inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    "
                    v-on:click="tab = true"
                >
                    Complete Tasks
                    <span
                        class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                    >
                        {{ completedTasks.length }}
                    </span>
                </li>
            </ul>
        </div>
        <template v-if="tab">
            <table v-if="completedTasks.length > 0" class="w-full rounded-full">
                <tr class="p-3 bg-gray-300">
                    <th class="text-left px-5 py-3 w-1/5">ID</th>
                    <th class="text-left px-5 py-3 w-2/5">TODO</th>
                    <th class="text-left px-5 py-3 w-1/5">STATUS</th>
                    <th class="text-left px-5 py-3 w-1/5">ACTIONS</th>
                </tr>
                <todo v-for="row in completedTasks" :key="row.id" :row="row" />
            </table>
            <div
                v-else
                class="bg-blue-100 w-1/5 text-center p-3 m-3 text-blue-800 text-xs font-semibold mr-2 rounded dark:bg-blue-200 dark:text-blue-800"
            >
                No Todo Here
            </div>
        </template>
        <template v-else>
            <table v-if="incompletedTasks.length > 0" class="w-full rounded-full">
                <tr class="p-3 bg-gray-300">
                    <th class="text-left px-5 py-3 w-1/5">ID</th>
                    <th class="text-left px-5 py-3 w-2/5">TODO</th>
                    <th class="text-left px-5 py-3 w-1/5">STATUS</th>
                    <th class="text-left px-5 py-3 w-1/5">ACTIONS</th>
                </tr>
                <todo v-for="row in incompletedTasks" :key="row.id" :row="row" />
            </table>
            <div
                v-else
                class="bg-blue-100 w-1/5 text-center p-3 m-3 text-blue-800 text-xs font-semibold mr-2 rounded dark:bg-blue-200 dark:text-blue-800"
            >
                No Todo Here
            </div>
        </template>
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
        completedTasks() {
            return this.$store.getters.completedTasks;
        },
        incompletedTasks() {
            return this.$store.getters.incompletedTasks;
        },
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },
    },
};
</script>

<style></style>
