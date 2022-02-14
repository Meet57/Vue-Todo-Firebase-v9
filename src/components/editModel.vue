<template>
    <div class="center w-1/3" v-if="getEditDetails != null">
        <model-slot
            :details="task"
            @updateTask="updateTask"
            @updateColor="updateColor"
            @submit="updateTodo"
            @cancelTodo="cancelTodo"
            @updateTodo="updateTodo"
        >
            <template #header> Edit Form </template>
            <template #id>ID : {{ getEditDetails.number }}</template>
        </model-slot>
    </div>
</template>

<script>
import modelSlotVue from "./modelSlot.vue";
export default {
    name: "EditModel",
    components: {
        "model-slot": modelSlotVue,
    },
    data() {
        return {
            task: {},
        };
    },
    computed: {
        getEditDetails() {
            return this.$store.getters.getEditDetails;
        },
        AllTodos() {
            return this.$store.getters.AllTodos;
        },
    },
    watch: {
        getEditDetails: function (value) {
            if (value) {
                let { id, todo, color } = value;
                this.task.id = id;
                this.task.todo = todo;
                this.task.color = color;
            }
        },
    },
    methods: {
        cancelTodo() {
            this.$store.commit("cancelTodo");
        },
        updateTask(task) {
            this.task.todo = task;
        },
        updateColor(color) {
            this.task.color = color;
        },
        updateTodo() {
            let todo = this.task.todo;
            let color = this.task.color;
            let id = this.getEditDetails.id;
            if (todo != "") {
                let update = true;
                this.AllTodos.map((t) => {
                    if (t.todo.toUpperCase() == todo.toUpperCase()) {
                        if (t.id != id) {
                            update = false;
                        }
                    }
                });
                if (update) {
                    this.$store.commit("updateTodo", { todo: todo, id: id, color: color });
                    this.$store.commit("cancelTodo");
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

<style scoped>
.center {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
}
</style>
