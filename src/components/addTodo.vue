<template>
    <div class="my-5">
        <p class="mb-2 text-black text-2xl">Add todo</p>
        <div class="">
            <input
                type="text"
                class="rounded-tl-lg rounded-bl-lg bg-blue-400 text-white placeholder-white px-3 py-3 focus:bg-blue-500"
                placeholder="Todos"
                v-model="task.todo"
            />
            <button
                class="rounded-tr-lg rounded-br-lg hover:bg-blue-500 bg-blue-400 text-white px-4 py-3 border-l-2 border-white"
                v-on:click="addTodo"
            >
                Add
            </button>
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
    methods: {
        addTodo() {
            this.$store.commit("addTodo", this.task);
        },
    },
};
</script>

<style></style>
