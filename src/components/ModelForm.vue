<template>
    <div>
        <a-modal
            :visible="visible"
            :title="task.id ? 'Edit Todo : ' + task.number : 'Add Todo'"
            :closable="false"
            @ok="handleOk"
            @cancel="closeModel"
        >
            <input
                type="text"
                placeholder="Todo"
                v-model="task.todo"
                class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                autofocus
                ref="todo"
                autocomplete="off"
            />
            Pick Color :
            <input type="color" v-model="task.color" name="color" class="rounded-lg my-2" />
            <br />
            <a-radio-group v-model="task.color">
                <a-radio-button value="#FF0000"> Red </a-radio-button>
                <a-radio-button value="#0000FF"> Blue </a-radio-button>
                <a-radio-button value="#00FF00"> Green </a-radio-button>
                <a-radio-button value="#000000"> Black </a-radio-button>
            </a-radio-group>
            <br />
            <br />
            Status :
            <a-switch v-model="task.status" />
        </a-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

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
        ...mapGetters("task", ["allTodos"]),
        // allTodos() {
        //     return this.$store.getters.allTodos;
        // },
    },
    data() {
        return {
            visible: true,
            task: { ...this.details },
        };
    },
    methods: {
        closeModel() {
            this.visible = false;
            setTimeout(() => {
                this.$emit("toogleModel");
            }, 400);
        },
        handleOk() {
            let todo = this.task.todo;
            let id = this.task.id || null;
            let update = true;
            let alltodo = [...this.allTodos];
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
                        this.$emit("submit", this.task);
                    }, 400);
                } else {
                    this.$store.dispatch("alert/alert", { text: "Todo Repeated" });
                }
            } else {
                this.$store.dispatch("alert/alert", { text: "Please enter todo title" });
            }
        },
    },
};
</script>
