<template>
    <div>
        <div class="bg-yellow-900 py-4">
            <div class="container mx-auto flex items-center justify-between">
                <div class="text-red-100 text-4xl">Todo</div>
                <div class="text-red-200 text-1xl">Number of Todos : {{ noOfTodos }}</div>
            </div>
        </div>
        <div class="container mx-auto my-7">
            <add-todo />
            <todos />
        </div>
    </div>
</template>

<script>
import todos from "./components/todos.vue";
import addTodo from "./components/addTodo.vue"

export default {
    name: "Main",
    components: {
        'todos': todos,
        addTodo
    },
    computed: {
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },
    },
};
</script>

<style></style>
