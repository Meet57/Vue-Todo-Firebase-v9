<template>
    <tr class="border-gray-200 bg-gray-600 text-white">
        <td class="px-3 py-2">{{ row.number }}</td>
        <td class="px-3 py-2">
            {{ row.todo }}
        </td>
        <td :style="{ backgroundColor: row.color }"></td>
        <td class="px-3 py-2">
            <i
                class="far fa-check-circle fa-lg"
                :style="[row.status ? { color: 'cyan' } : { color: 'pink' }]"
                v-on:click="toggleStatus(row.id)"
            ></i>
        </td>
        <td class="px-3 py-2">
            <template v-if="!del">
                <i
                    class="far fa-edit fa-lg mr-3"
                    :style="{ color: '#5ef7ff' }"
                    v-on:click="editTodo()"
                ></i>
                <i
                    class="far fa-trash-alt fa-lg"
                    :style="{ color: '#ff5e5e' }"
                    v-on:click="toogleDelete()"
                ></i>
            </template>
            <template v-else>
                <p>Do you want to delete it ?</p>
                <i class="fas fa-check text-2xl" style="color: red" v-on:click="deleteTodo"></i>
                <i
                    class="fas fa-times text-2xl ml-2"
                    style="color: lightgreen"
                    v-on:click="toogleDelete"
                ></i>
            </template>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        row: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            del: false,
            todo: this.row.todo,
        };
    },
    computed: {
        AllTodos() {
            return this.$store.getters.AllTodos;
        },
    },
    methods: {
        toggleStatus(id) {
            this.$store.commit("toogleStatus", { id, status: this.row.status });
        },
        toogleDelete() {
            this.del = !this.del;
        },
        deleteTodo() {
            this.$store.commit("deleteTodo", { id: this.row.id });
        },
        editTodo() {
            this.$store.commit("editTodo", this.row);
        },
        // updateTodo() {
        //     if (this.todo !== "") {
        //         let update = true;
        //         this.AllTodos.map((t) => {
        //             if (t.todo.toUpperCase() == this.todo.toUpperCase()) {
        //                 if (t.id != this.row.id) {
        //                     update = false;
        //                 }
        //             }
        //         });
        //         if (update) {
        //             this.$store.commit("updateTodo", { todo: this.todo, id: this.row.id });
        //         } else {
        //             this.$store.commit("updateAlert", { text: "Todo Repeated" });
        //         }
        //     } else {
        //         this.$store.commit("updateAlert", { text: "Please enter some text" });
        //     }
        // },
    },
};
</script>

<style></style>
