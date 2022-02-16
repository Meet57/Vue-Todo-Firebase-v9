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
        <div class="container mx-auto my-2">
            <alert />
            <model-form
                v-if="visible"
                :details="modelTodoData"
                @updateTask="(task) => (this.modelTodoData.todo = task)"
                @updateColor="(color) => (this.modelTodoData.color = color)"
                @updateStatus="(status) => (this.modelTodoData.status = status)"
                @toogleModel="toogleModel"
                @SubmitTodo="SubmitTodo"
            />
            <todos @updateTodoData="updateTodoData" @toogleModel="toogleModel" />
        </div>
    </div>
</template>

<script>
import todos from "./components/todos.vue";
import alert from "./components/Alert.vue";
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
                    status: false,
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
                    status: this.modelTodoData.status,
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
