<template>
    <div>
        <div class="bg-yellow-900 py-4">
            <div class="container mx-auto flex items-center justify-between">
                <div class="text-red-100 text-4xl">Todo</div>
                <div class="text-red-200 text-1xl">
                    Number of Todos : {{ numberOftodos }}
                    <button
                        type="button"
                        class="inline-block px-6 py-2 border-2 ml-3 border-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        v-on:click="signOut"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
        <div class="container mx-auto my-2">
            <model-form
                v-if="visible"
                :details="modelTodoData"
                @toogleModel="toogleModel"
                @submit="submit"
            />
            <todos @updateTodoData="updateTodoData" @toogleModel="toogleModel" />
        </div>
    </div>
</template>

<script>
import todos from "./components/Todos";
import modelForm from "./components/ModelForm";
import { mapGetters } from "vuex";

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
        submit(data) {
            if (data.id) {
                this.$store.dispatch("task/updateTodo", {
                    todo: data.todo,
                    id: data.id,
                    color: data.color,
                    status: data.status,
                });
            } else {
                console.log(data);
                this.$store.dispatch("task/addTodo", data);
            }
            this.visible = false;
            this.modelTodoData = null;
        },
        signOut() {
            this.$store.dispatch("auth/signOut");
        },
    },
    computed: {
        ...mapGetters("task", ["numberOftodos", "incompleteTask"]),
        ...mapGetters("auth", ["cred"]),
    },
    created() {
        if (this.cred == null) {
            this.$router.push("/");
        }
        this.$store.dispatch("task/getTodo");
    },
};
</script>

<style>
li,
i {
    cursor: pointer;
}
</style>
