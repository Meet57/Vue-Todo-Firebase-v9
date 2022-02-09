<template>
    <div class="my-5">
        <p class="mb-2 text-black text-2xl">Add todo</p>
        <div class="flex items-center justify-between">
            <form class="">
                <input
                    type="text"
                    class="rounded-tl-lg rounded-bl-lg bg-blue-400 text-white placeholder-white px-3 py-3 focus:bg-blue-500"
                    placeholder="Todos"
                    v-model="task.todo"
                />
                <button
                    class="rounded-tr-lg rounded-br-lg hover:bg-blue-500 bg-blue-400 text-white px-4 py-3 border-l-2 border-white"
                    v-on:click.prevent="addTodo"
                    type="submit"
                >
                    Add
                </button>
            </form>
            <div class="bg-gray-100 border border-gray-600 p-4 ml-3 rounded-xl">
                <i class="far fa-check-circle fa-lg" :style="{ color: 'cyan' }"></i> - Task
                Completed
                <br />
                <i class="far fa-check-circle fa-lg" :style="{ color: 'pink' }"></i> - Task
                Inomplete
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddTodo",
    data() {
        return {
            task: {
                todo: "",
                status: false,
            },
        };
    },
    computed: {
        AllTodos() {
            return this.$store.getters.AllTodos;
        },
    },
    methods: {
        addTodo() {
            if (this.task.todo !== "") {
                let add = true;
                this.AllTodos.map((t) => {
                    if (t.todo.toUpperCase() == this.task.todo.toUpperCase()) {
                        add = false;
                    }
                });
                if (add) {
                    this.$store.commit("addTodo", this.task);
                    this.task = { todo: "", status: false };
                } else {
                    this.$store.commit("updateAlert", { text: "Todo Repeated" });
                }
            } else {
                this.$store.commit("updateAlert", { text: "Please enter some text" });
            }
            // if (this.task.todo !== "") {
            // }
        },
    },
};
</script>

<style></style>
