<template>
    <div>
        <a-modal
            :visible="visible"
            :title="details.id ? 'Edit Todo : ' + details.number : 'Add Todo'"
            :closable="false"
            @ok="handleOk"
            @cancel="closeModel"
        >
            <input
                type="text"
                placeholder="Todo"
                :value="details.todo"
                class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                autofocus
                ref="todo"
                @input="updateTask($event.target.value)"
                autocomplete="off"
            />
            Pick Color :
            <input
                type="color"
                :value="details.color"
                name="color"
                class="rounded-lg my-2"
                @input="updateColor($event.target.value)"
            />
            <br />
        </a-modal>
    </div>
</template>
<script>
export default {
    props: {
        details: {
            type: Object,
            default() {
                return {
                    todo: "",
                    color: "#ddd",
                };
            },
        },
    },
    computed: {
        AllTodos() {
            return this.$store.getters.AllTodos;
        },
    },
    data() {
        return {
            visible: true,
        };
    },
    methods: {
        updateTask(value) {
            this.$emit("updateTask", value);
        },
        updateColor(value) {
            this.$emit("updateColor", value);
        },
        closeModel() {
            this.visible = false;
            setTimeout(() => {
                this.$emit("toogleModel");
            }, 400);
        },
        handleOk() {
            let todo = this.details.todo;
            let id = this.details.id || null;
            let update = true;
            let alltodo = [...this.AllTodos];
            if (todo != "") {
                alltodo.map((t) => {
                    if (t.todo.toUpperCase() == todo.toUpperCase()) {
                        if (t.id != id) {
                            update = false;
                        }
                    }
                });
                if (update) {
                    this.visible = false;
                    setTimeout(() => {
                        this.$emit("SubmitTodo");
                    }, 400);
                } else {
                    this.$store.commit("updateAlert", { text: "Todo Repeated" });
                }
            } else {
                this.$store.commit("updateAlert", { text: "Please enter todo title" });
            }
        },
    },
};
</script>
