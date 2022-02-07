<template>
    <div class="my-5">
        <p class="mb-2 text-black text-2xl">Add todo</p>
        <div class="">
            <input
                type="text"
                class="rounded-tl-lg rounded-bl-lg bg-green-500 text-white placeholder-white px-3 py-3 focus:bg-green-700"
                placeholder="Todos"
                v-model="task.todo"
            />
            <button
                class="rounded-tr-lg rounded-br-lg hover:bg-green-700 bg-green-500 text-white px-4 py-3 border-l-2 border-white"
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
                id: Date.now(),
                todo: "",
                status: false,
            },
        };
    },
    methods: {
        addTodo(){
            this.$store.commit('addTodo',this.task)
        }
    },
};
</script>

<style></style>
