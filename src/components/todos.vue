<template>
    <div class="mt-2">
        <!-- Filter Model -->
        <!-- <model-slot v-if="model" class="center w-1/3">
            <template #header>
                Filter for {{ !tab ? "Incomplete Tasks" : "Complete Tasks" }}
            </template>
            <template #body>
                <div class="m-2 flex flex-wrap" v-if="!tab">
                    <div
                        v-for="color in incompletedTaskColor"
                        :key="color"
                        :style="{ color: color }"
                    >
                        <input
                            type="checkbox"
                            v-model="completedFilter"
                            class="mx-2"
                            :name="color"
                            :id="color"
                            :value="color"
                        />{{ color }}
                    </div>
                </div>
                <div class="m-2 flex flex-wrap" v-else>
                    <div v-for="color in completedTaskColor" :key="color" :style="{ color: color }">
                        <input
                            type="checkbox"
                            v-model="completedFilter"
                            class="mx-2"
                            :name="color"
                            :id="color"
                            :value="color"
                        />{{ color }}
                    </div>
                </div>
                <button
                    class="ml-2 border-red-400 border px-3 py-0.5 rounded transition-all text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none"
                    type="cancel"
                    v-on:click="model = false"
                >
                    Cancel
                </button>
            </template>
        </model-slot> -->
        <!-- <div
            class="filterOption border-blue-400 p-2 px-4 border rounded-lg hover:bg-blue-400 hover:text-white"
            v-on:click="
                () => {
                    model = !model;
                }
            "
        >
            Filter
        </div> -->
        <div class="text-lg text-blue-600">Filter For</div>
        <a-select
            v-if="!tab"
            class="w-1/3"
            mode="multiple"
            :placeholder="'Incomplete Tasks'"
            @change="filterChange"
        >
            <a-select-option
                :style="{ backgroundColor: i }"
                v-for="i in incompletedTaskColor"
                :key="i"
            >
                {{ i }}
            </a-select-option>
        </a-select>
        <a-select
            v-else
            class="w-1/3"
            mode="multiple"
            :placeholder="'completed tasks'"
            @change="filterChange"
        >
            <a-select-option
                :style="{ backgroundColor: i }"
                v-for="i in completedTaskColor"
                :key="i"
            >
                {{ i }}
            </a-select-option>
        </a-select>
        <!-- {{ completedTaskColor }} -->
        <!-- Filter Model -->

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
// import { DownOutlined } from "@ant-design/icons-vue";
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
