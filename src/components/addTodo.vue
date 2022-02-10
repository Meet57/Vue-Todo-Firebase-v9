<template>
    <div class="">
        <!-- <div class="flex items-center justify-between">
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
            </form> -->
        <!--  -->

        <model-slot v-if="model" class="center w-1/3">
            <template #header> Add Form </template>
            <template #body>
                <form class="body mt-2">
                    <input
                        type="text"
                        ref="todo"
                        placeholder="Todo"
                        v-model="task.todo"
                        autocomplete="off"
                        class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        autofocus
                    />
                    <label for="color" class="mr-2">Pick Color:</label>
                    <input
                        type="color"
                        v-model="task.color"
                        name="color"
                        class="rounded-lg my-2"
                        id=""
                    />
                    <br />
                    <button
                        class="border-blue-400 border px-3 py-0.5 rounded transition-all text-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-white focus:outline-none"
                        type="submit"
                        v-on:click.prevent="addTodo"
                    >
                        Add
                    </button>
                    <button
                        class="ml-2 border-red-400 border px-3 py-0.5 rounded transition-all text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none"
                        type="cancel"
                        v-on:click="model = false"
                    >
                        Cancel
                    </button>
                </form>
            </template>
        </model-slot>
        <div class="flex items-center justify-between">
            <div>
                <p class="mb-2 text-black text-2xl">Add todo</p>
                <button
                    class="rounded-lg hover:bg-blue-500 bg-blue-400 text-white px-4 py-3 border-l-2 border-white"
                    v-on:click="model = true"
                >
                    Add Todo
                </button>
            </div>
            <!--  -->
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
import modelSlotVue from "./modelSlot.vue";

export default {
    name: "AddTodo",
    components: {
        "model-slot": modelSlotVue,
    },
    data() {
        return {
            model: false,
            task: {
                todo: "",
                status: false,
                color: "#ffffff",
            },
        };
    },
    watch: {
        model: function (newvalue) {
            if (newvalue) {
                setTimeout(() => {
                    this.$refs.todo.focus();
                });
            }
        },
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
                    this.task = { todo: "", status: false, color: null };
                    this.model = false;
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

<style scoped>
.center {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
}
</style>
