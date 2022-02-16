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
            <div class="flex items-center justify-between mb-5">
                <div>
                    <p class="mb-2 text-black text-2xl">Add todo</p>
                    <button
                        class="rounded-lg hover:bg-blue-500 bg-blue-400 text-white px-4 py-3 border-l-2 border-white"
                        v-on:click="toogleModel()"
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
            <model-form
                v-if="visible"
                :details="modelTodoData"
                @updateTask="(task) => (this.modelTodoData.todo = task)"
                @updateColor="(color) => (this.modelTodoData.color = color)"
                @toogleModel="toogleModel"
                @SubmitTodo="SubmitTodo"
            />
            <!-- <edit-model /> -->
            <!-- <add-todo /> -->
            <todos @updateTodoData="updateTodoData" />
        </div>
    </div>
</template>

<script>
import todos from "./components/todos.vue";
// import addTodo from "./components/addTodo.vue";
import alert from "./components/Alert.vue";
// import editModel from "./components/editModel.vue";
import modelForm from "./components/modelForm.vue";

export default {
    name: "Main",
    data() {
        return {
            visible: false,
            modelTodoData: null,
        };
    },
    components: {
        todos,
        // addTodo,
        alert,
        // "edit-model": editModel,
        "model-form": modelForm,
    },
    methods: {
        toogleModel() {
            if (this.visible) {
                this.modelTodoData = null;
            } else {
                this.modelTodoData = {
                    todo: "",
                    color: "#dddddd",
                };
            }
            this.visible = !this.visible;
        },
        updateTodoData(content) {
            this.visible = true;
            this.modelTodoData = { ...content };
        },
        SubmitTodo() {
            if (this.modelTodoData.id) {
                this.$store.commit("updateTodo", {
                    todo: this.modelTodoData.todo,
                    id: this.modelTodoData.id,
                    color: this.modelTodoData.color,
                });
            } else {
                this.$store.commit("addTodo", this.modelTodoData);
            }
            this.visible = false;
            this.modelTodoData = null;
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
