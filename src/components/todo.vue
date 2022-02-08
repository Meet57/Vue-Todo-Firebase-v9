<template>
    <tr class="border-gray-200 bg-gray-600 text-white">
        <td class="px-3 py-2">{{ row.number }}</td>
        <td class="px-3 py-2">
            <template v-if="edit">
                <input
                    type="text"
                    v-model="todo"
                    placeholder="Edit Todo"
                    class="focus:border focus:border-blue-300 focus:ring-blue-400 border px-3 py-0.5 rounded bg-transparent border-green-500 text-green-500 placeholder-green-500"
                />
            </template>
            <template v-else>
                {{ row.todo }}
            </template>
        </td>
        <td class="px-3 py-2">
            <i
                class="far fa-check-circle fa-lg"
                :style="[row.status ? { color: 'cyan' } : { color: 'pink' }]"
                v-on:click="toggleStatus(row.id)"
            ></i>
        </td>
        <td class="px-3 py-2">
            <template v-if="edit">
                <button
                    class="border-green-400 border px-3 py-0.5 rounded transition-all text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white focus:outline-none"
                    v-on:click="updateTodo"
                >
                    Update
                </button>
                <button
                    class="ml-2 border-red-400 border px-3 py-0.5 rounded transition-all text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none"
                    v-on:click="toogleEdit"
                >
                    Cancel
                </button>
            </template>
            <template v-else>
                <i
                    class="far fa-edit fa-lg mr-3"
                    :style="{ color: '#5ef7ff' }"
                    v-on:click="toogleEdit"
                ></i>
                <i
                    class="far fa-trash-alt fa-lg"
                    :style="{ color: '#ff5e5e' }"
                    v-on:click="deleteTodo(row.id)"
                ></i>
            </template>
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
    data() {
        return {
            edit: false,
            todo: this.row.todo,
        };
    },
    computed: {
        AllTodos() {
            return this.$store.getters.AllTodos;
        },
    },
    methods: {
        toggleStatus(id) {
            this.$store.commit("toogleStatus", { id, status: this.row.status });
        },
        deleteTodo(id) {
            this.$store.commit("deleteTodo", { id: id });
        },
        toogleEdit() {
            this.edit = !this.edit;
        },
        updateTodo() {
            if (this.todo !== "") {
                let update = true;
                this.AllTodos.map((t) => {
                    if (t.todo.toUpperCase() == this.todo.toUpperCase()) {
                        if (t.id != this.row.id) {
                            update = false;
                        }
                    }
                });
                if (update) {
                    this.edit = !this.edit;
                    this.$store.commit("updateTodo", { todo: this.todo, id: this.row.id });
                } else {
                    this.$store.commit("updateAlert", { text: "Todo Repeated" });
                }
            } else {
                this.$store.commit("updateAlert", { text: "Please enter some text" });
            }
        },
    },
};
</script>

<style></style>
