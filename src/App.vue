<template>
    <div>
        <div class="bg-yellow-900 py-4">
            <div class="container mx-auto flex items-center justify-between">
                <div class="text-red-100 text-4xl">Todo</div>
                <div class="text-red-200 text-1xl">
                    Number of Todos : {{ noOfTodos }} | Incomplete task : {{ incompleteTask }}
                </div>
            </div>
        </div>
        <div class="container mx-auto my-7">
            <alert />
            <add-todo />
            <todos />
        </div>
    </div>
</template>

<script>
import todos from "./components/todos.vue";
import addTodo from "./components/addTodo.vue";
import alert from "./components/Alert.vue";

export default {
    name: "Main",
    components: {
        todos: todos,
        addTodo,
        alert,
    },
    computed: {
        noOfTodos() {
            return this.$store.getters.numberOftodos;
        },
        incompleteTask() {
            return this.$store.getters.incompleteTask;
        },
    },
    created() {
        this.$store.commit("getTodo");
    },
};
</script>

<style>
li,
i {
    cursor: pointer;
}
</style>
