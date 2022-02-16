<template>
    <div class="mt-2">
        <!-- filter -->
        <a-select
            v-if="tab == 'incomplete'"
            class="w-1/3"
            :title="'Incomplete Task Filter'"
            mode="multiple"
            :value="incompletedFilter"
            :placeholder="'Incomplete Task Filter'"
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
            class="w-1/3"
            mode="multiple"
            :value="completedFilter"
            :title="'Complete Task Filter'"
            @change="filterChangeComplete"
            :placeholder="'Complete Task Filter'"
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
        <!-- filter end -->
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
                <!-- Table Over -->
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
// import todo from "./todo.vue";

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
    components: {
        // todo: todo,
        // DownOutlined: DownOutlined,
    },
    data() {
        return {
            tab: "incomplete",
            filter: [],
            model: false,
            completedFilter: [],
            incompletedFilter: [],
            columns,
        };
    },
    watch: {},
    methods: {
        deleteTodo(id) {
            // console.log(id);
            this.$store.commit("deleteTodo", { id });
        },
        toggleStatus(id, status) {
            // console.log(id);
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
