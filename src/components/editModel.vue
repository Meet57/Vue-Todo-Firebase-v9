<template>
    <div class="center w-1/3" v-if="getEditDetails != null">
        <!-- <div class="bg-gray-200 rounded-lg shadow p-5">
            <div class="header text-2xl">Edit Todo</div>
            <form class="body mt-2">
                <div class="text-opacity-50">ID : {{ getEditDetails.number }}</div>
                <input
                    type="text"
                    id="text"
                    ref="todo"
                    placeholder="Todo"
                    :value="getEditDetails.todo"
                    class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    autofocus
                />
                <button
                    class="border-green-400 border px-3 py-0.5 rounded transition-all text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white focus:outline-none"
                    type="submit"
                    v-on:click.prevent="updateTodo"
                >
                    Update
                </button>
                <button
                    class="ml-2 border-red-400 border px-3 py-0.5 rounded transition-all text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none"
                    type="cancel"
                    v-on:click="cancelTodo"
                    @keyup.esc="$emit('cancelTodo')"
                >
                    Cancel
                </button>
            </form>
        </div> -->
        <model-slot>
            <template #header> Edit Form </template>
            <template #id>ID : {{ getEditDetails.number }}</template>
            <template #body>
                <form class="body mt-2">
                    <input
                        type="text"
                        id="text"
                        ref="todo"
                        placeholder="Todo"
                        :value="getEditDetails.todo"
                        class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        autofocus
                    />
                    <label for="color" class="mr-2">Pick Color:</label>
                    <input
                        type="color"
                        :value="getEditDetails.color"
                        ref="color"
                        name="color"
                        class="rounded-lg my-2"
                        id=""
                    />
                    <br />
                    <button
                        class="border-green-400 border px-3 py-0.5 rounded transition-all text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white focus:outline-none"
                        type="submit"
                        v-on:click.prevent="updateTodo"
                    >
                        Update
                    </button>
                    <button
                        class="ml-2 border-red-400 border px-3 py-0.5 rounded transition-all text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none"
                        type="cancel"
                        v-on:click="cancelTodo"
                    >
                        Cancel
                    </button>
                </form>
            </template>
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
            todo: "",
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
        getEditDetails: function (newvalue) {
            if (newvalue != null) {
                setTimeout(() => {
                    this.$refs.todo.focus();
                });
            }
        },
    },
    methods: {
        cancelTodo() {
            this.$store.commit("cancelTodo");
        },
        updateTodo() {
            let todo = this.$refs.todo.value;
            let color = this.$refs.color.value;
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
}
</style>
