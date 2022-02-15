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
            <button v-on:click="toogleModel()" class="border border-black p-2">Model</button>
            <alert />
            <model-form v-if="visible" :details="todoData" @toogleModel="toogleModel" />
            <!-- <edit-model /> -->
            <add-todo />
            <todos @updateTodoData="updateTodoData" />
        </div>
    </div>
</template>

<script>
import todos from "./components/todos.vue";
import addTodo from "./components/addTodo.vue";
import alert from "./components/Alert.vue";
// import editModel from "./components/editModel.vue";
import modelForm from "./components/modelForm.vue";

export default {
    name: "Main",
    data() {
        return {
            visible: false,
            todoData: null,
        };
    },
    components: {
        todos,
        addTodo,
        alert,
        // "edit-model": editModel,
        "model-form": modelForm,
    },
    methods: {
        toogleModel() {
            if (!this.visible) {
                this.todoData = null;
            }
            this.visible = !this.visible;
        },
        updateTodoData(content) {
            this.visible = true;
            this.todoData = content;
        },
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
