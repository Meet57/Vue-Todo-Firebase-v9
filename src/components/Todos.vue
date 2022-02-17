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
                <a-select
                    v-if="tab == 'incomplete'"
                    class="w-full"
                    :title="'Filter by color'"
                    mode="multiple"
                    :value="incompletedFilter"
                    :placeholder="'Filter by color'"
                    @change="filterChangeIncomplete"
                >
                    <a-select-option v-for="i in incompletedTaskColor" :key="i.color">
                        <div
                            class="rounded-full mr-3"
                            :style="{
                                backgroundColor: i.color,
                                height: '15px',
                                width: '15px',
                                display: 'inline-block',
                            }"
                        ></div>
                        {{ i.colorName }}
                    </a-select-option>
                </a-select>
                <a-select
                    v-else
                    class="w-full"
                    mode="multiple"
                    :value="completedFilter"
                    :title="'Filter by color'"
                    @change="filterChangeComplete"
                    :placeholder="'Filter by color'"
                >
                    <a-select-option v-for="i in completedTaskColor" :key="i.color">
                        <div
                            class="rounded-full mr-3"
                            :style="{
                                backgroundColor: i.color,
                                height: '15px',
                                width: '15px',
                                display: 'inline-block',
                            }"
                        ></div>
                        {{ i.colorName }}
                    </a-select-option>
                </a-select>
                <a-input-search
                    class="mt-3"
                    :value="tab == 'incomplete' ? incompleteSearch : completeSearch"
                    @input="searchChange($event.target.value)"
                    placeholder="input search text"
                    enter-button
                    :allowClear="true"
                />
                <br />

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
                    :data-source="incompletedTasks"
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
                    :data-source="completedTasks"
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
</template>

<script>
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
    name: "AllTodos",
    components: {},
    data() {
        return {
            tab: "incomplete",
            filter: [],
            model: false,
            completedFilter: [],
            incompletedFilter: [],
            columns,
            incompleteSearch: "",
            completeSearch: "",
        };
    },
    methods: {
        deleteTodo(id) {
            this.$store.commit("deleteTodo", { id });
        },
        toggleStatus(id, status) {
            this.$store.commit("toogleStatus", { id, status });
        },
        filterChangeComplete(value) {
            this.completedFilter = value;
        },
        filterChangeIncomplete(value) {
            this.incompletedFilter = value;
        },
        callback(key) {
            this.tab = key;
        },
        updateTodoData(data) {
            this.$emit("updateTodoData", data);
        },
        searchChange(value) {
            if (this.tab == "incomplete") {
                this.incompleteSearch = value;
            } else {
                this.completeSearch = value;
            }
        },
    },
    computed: {
        completedTasks() {
            if (this.completeSearch.length > 0 && this.completedFilter.length > 0) {
                return this.$store.getters.completedTasks.filter(
                    (t) =>
                        t.todo.toLowerCase().includes(this.completeSearch.toLowerCase()) &&
                        this.completedFilter.includes(t.color)
                );
            } else if (this.completedFilter.length > 0) {
                return this.$store.getters.completedTasks.filter((t) =>
                    this.completedFilter.includes(t.color)
                );
            } else if (this.completeSearch.length > 0) {
                return this.$store.getters.completedTasks.filter((t) =>
                    t.todo.toLowerCase().includes(this.completeSearch.toLowerCase())
                );
            } else {
                return this.$store.getters.completedTasks;
            }
        },
        incompletedTasks() {
            if (this.incompleteSearch.length > 0 && this.incompletedFilter.length > 0) {
                return this.$store.getters.incompletedTasks.filter(
                    (t) =>
                        t.todo.toLowerCase().includes(this.incompleteSearch.toLowerCase()) &&
                        this.incompletedFilter.includes(t.color)
                );
            } else if (this.incompletedFilter.length > 0) {
                return this.$store.getters.incompletedTasks.filter((t) =>
                    this.incompletedFilter.includes(t.color)
                );
            } else if (this.incompleteSearch.length > 0) {
                return this.$store.getters.incompletedTasks.filter((t) =>
                    t.todo.toLowerCase().includes(this.incompleteSearch.toLowerCase())
                );
            } else {
                return this.$store.getters.incompletedTasks;
            }
        },
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },

        completedTaskColor() {
            return this.$store.getters.completedTaskColor;
        },
        incompletedTaskColor() {
            return this.$store.getters.incompletedTaskColor;
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
