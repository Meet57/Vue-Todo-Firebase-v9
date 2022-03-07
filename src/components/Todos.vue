<template>
    <div class="mt-2">
        <div class="flex items-center justify-between">
            <div class="w-96">
                <a-button
                    v-on:click="
                        () => {
                            this.$emit('toogleModel');
                        }
                    "
                    class="mb-2"
                    :size="'large'"
                >
                    Add Todo
                </a-button>
                <!-- filter -->
                <custome-filter v-model="filter" />
                <!-- filter end -->
            </div>
            <a-card style="width: fit-content">
                <i class="far fa-check-circle fa-lg" :style="{ color: 'cyan' }"></i> - Task
                Completed
                <br />
                <i class="far fa-check-circle fa-lg" :style="{ color: 'pink' }"></i> - Task
                Inomplete
            </a-card>
        </div>

        <!-- Tabs -->
        <div v-if="loading" class="mt-5 w-full flex justify-center">
            <a-spin size="large" class="" tip="Loading..." />
        </div>
        <div v-else>
            <a-tabs default-active-key="incomplete" @change="callback" :tabBarStyle="{ margin: 0 }">
                <a-tab-pane key="incomplete">
                    <template #tab class>
                        Incomplete Tasks
                        <span
                            class="ml-2 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                        >
                            {{ incompletedTasks.length }}
                        </span>
                    </template>
                    <!-- Table -->
                    <a-table
                        :columns="columns"
                        :data-source="getincompletedTasks"
                        :pagination="{ pageSize: 10 }"
                        :scroll="{ y: 450 }"
                        :rowKey="(t) => t.id"
                    >
                        <template #id="text, record">
                            <div
                                class="rounded-full mr-2"
                                :style="{
                                    backgroundColor: record.color,
                                    height: '15px',
                                    width: '15px',
                                    display: 'inline-block',
                                }"
                            ></div>
                            {{ record.number }}
                        </template>
                        <template #status="text, record">
                            <i
                                class="far fa-check-circle fa-lg"
                                style="color: pink"
                                v-on:click="toggleStatus(record.id, record.status)"
                            ></i>
                        </template>
                        <template #actions="text, record">
                            <i
                                class="far fa-edit fa-lg mr-3"
                                :style="{ color: '#5ef7ff' }"
                                v-on:click="updateTodoData(record)"
                            ></i>
                            <a-popconfirm title="Are you sure？" @confirm="deleteTodo(record.id)">
                                <a-icon slot="icon" type="question-circle-o" style="color: red" />
                                <i class="far fa-trash-alt fa-lg" :style="{ color: '#ff5e5e' }"></i>
                            </a-popconfirm>
                        </template>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane key="complete">
                    <template #tab>
                        Complete Tasks
                        <span
                            class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                        >
                            {{ completedTasks.length }}
                        </span>
                    </template>
                    <!-- Table -->
                    <a-table
                        :columns="columns"
                        :data-source="getcompletedTasks"
                        :pagination="{ pageSize: 20 }"
                        :scroll="{ y: 450 }"
                        :rowKey="(t) => t.id"
                    >
                        <template #id="text, record">
                            <div
                                class="rounded-full mr-2"
                                :style="{
                                    backgroundColor: record.color,
                                    height: '15px',
                                    width: '15px',
                                    display: 'inline-block',
                                }"
                            ></div>
                            {{ record.number }}
                        </template>
                        <template #status="text, record">
                            <i
                                class="far fa-check-circle fa-lg"
                                style="color: cyan"
                                v-on:click="toggleStatus(record.id, record.status)"
                            ></i>
                        </template>
                        <template #actions="text, record">
                            <i
                                class="far fa-edit fa-lg mr-3"
                                :style="{ color: '#5ef7ff' }"
                                v-on:click="updateTodoData(record)"
                            ></i>
                            <a-popconfirm title="Are you sure？" @confirm="deleteTodo(record.id)">
                                <a-icon slot="icon" type="question-circle-o" style="color: red" />
                                <i class="far fa-trash-alt fa-lg" :style="{ color: '#ff5e5e' }"></i>
                            </a-popconfirm>
                        </template>
                    </a-table>
                    <!-- Table Over -->
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
import CustomFilterVue from "./CustomFilter.vue";
import { mapGetters } from "vuex";
import { DELETETODO, TOOGLESTATUS } from "../store/modules/helper";

const columns = [
    {
        dataIndex: "id",
        key: "id",
        title: "id",
        scopedSlots: { customRender: "id" },
        sorter: (a, b) => a.number - b.number,
    },
    {
        dataIndex: "todo",
        key: "todo",
        title: "todo",
        sorter: (a, b) => {
            var nameA = a.todo.toLowerCase(),
                nameB = b.todo.toLowerCase();
            if (nameA < nameB) return -1;
            else if (nameA > nameB) return 1;
            return 0;
        },
    },
    {
        dataIndex: "status",
        key: "status",
        title: "status",
        scopedSlots: { customRender: "status" },
    },
    {
        dataIndex: "actions",
        key: "actions",
        title: "actions",
        scopedSlots: { customRender: "actions" },
    },
];

export default {
    name: "allTodos",
    components: {
        "custome-filter": CustomFilterVue,
    },
    data() {
        return {
            tab: "incomplete",
            model: false,
            incompleteFilter: {
                colorList: [],
                searchText: "",
                list: [],
            },
            completeFilter: {
                colorList: [],
                searchText: "",
                list: [],
            },
            columns,
        };
    },
    watch: {
        incompletedTaskColor(newv) {
            this.incompleteFilter.list = newv;
        },
        completedTaskColor(newv) {
            this.completeFilter.list = newv;
        },
    },
    methods: {
        deleteTodo(id) {
            this.$store.dispatch(DELETETODO, { id });
        },
        toggleStatus(id, status) {
            this.$store.dispatch(TOOGLESTATUS, { id, status });
        },
        callback(key) {
            this.tab = key;
        },
        updateTodoData(data) {
            this.$emit("updateTodoData", data);
        },
    },
    computed: {
        filter: {
            get() {
                return this.tab == "incomplete" ? this.incompleteFilter : this.completeFilter;
            },
            set(newValue) {
                this.tab == "incomplete"
                    ? (this.incompleteFilter = newValue)
                    : (this.completeFilter = newValue);
            },
        },
        getcompletedTasks() {
            var list = this.completedTasks;
            const { colorList, searchText } = this.completeFilter;
            if (colorList.length) {
                list = list.filter((t) => colorList.includes(t.color));
            }
            if (searchText.length) {
                list = list.filter((t) => t.todo.toLowerCase().includes(searchText.toLowerCase()));
            }
            return list;
        },
        getincompletedTasks() {
            var list = this.incompletedTasks;
            const { colorList, searchText } = this.incompleteFilter;
            if (colorList.length) {
                list = list.filter((t) => colorList.includes(t.color));
            }
            if (searchText.length) {
                list = list.filter((t) => t.todo.toLowerCase().includes(searchText.toLowerCase()));
            }
            return list;
        },
        ...mapGetters("task", [
            "completedTaskColor",
            "incompletedTaskColor",
            "incompletedTasks",
            "completedTasks",
            "loading",
        ]),
    },
    beforeDestroy() {
        this.$store.commit("task/resetDefault");
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
