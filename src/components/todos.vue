<template>
    <div class="mt-2">
        <a-tabs default-active-key="1">
            <a-tab-pane key="1">
                <template #tab>
                    Incomplete Tasks
                    <span
                        class="ml-2 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                    >
                        {{ incompletedTasks.length }}
                    </span>
                </template>
                <!-- Table -->
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
                <!-- Table over -->
            </a-tab-pane>
            <a-tab-pane key="2">
                <template #tab>
                    Complete Tasks
                    <span
                        class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                    >
                        {{ completedTasks.length }}
                    </span>
                </template>
                <!-- Table -->
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
                <!-- Table Over -->
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import todo from "./todo.vue";
export default {
    name: "AllTodos",
    components: {
        todo: todo,
        // DownOutlined: DownOutlined,
    },
    data() {
        return {
            tab: true,
            filter: [],
            model: false,
            completedFilter: [],
            incompletedFilter: [],
        };
    },
    watch: {},
    methods: {
        filterChange(value) {
            if (!this.tab) {
                this.incompletedFilter = value;
            } else {
                this.completedFilter = value;
            }
        },
    },
    computed: {
        completedTasks() {
            if (this.completedFilter.length > 0) {
                return this.$store.getters.completedTasks.filter((t) =>
                    this.completedFilter.includes(t.color)
                );
            } else {
                return this.$store.getters.completedTasks;
            }
        },
        incompletedTasks() {
            if (this.incompletedFilter.length > 0) {
                return this.$store.getters.incompletedTasks.filter((t) =>
                    this.incompletedFilter.includes(t.color)
                );
            } else {
                return this.$store.getters.incompletedTasks;
            }
        },
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },
        completedTaskColor() {
            return Array.from(this.$store.getters.completedTaskColor);
        },
        incompletedTaskColor() {
            return Array.from(this.$store.getters.incompletedTaskColor);
        },
    },
};
</script>

<style>
.filterOption {
    width: max-content;
    cursor: pointer;
}
.center {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
}
</style>
