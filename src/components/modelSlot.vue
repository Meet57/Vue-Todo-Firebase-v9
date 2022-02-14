<template>
    <div class="bg-gray-200 rounded-lg shadow p-5">
        <slot class="header text-4xl text-pink-400" name="header"> </slot>
        <br />
        <slot name="id" class="text-opacity-50"></slot>
        <slot name="body" class="body mt-2">
            <form action="">
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
                <button
                    class="border-green-400 border px-3 py-0.5 rounded transition-all text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white focus:outline-none"
                    type="submit"
                    v-on:click.prevent="updateTodo"
                >
                    {{ details.todo.length > 0 ? "Update" : "Add" }}
                </button>
                <button
                    class="ml-2 border-red-400 border px-3 py-0.5 rounded transition-all text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white focus:outline-none"
                    type="cancel"
                    v-on:click="cancelTodo"
                >
                    Cancel
                </button>
            </form>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        details: {
            type: Object,
        },
    },
    methods: {
        updateTask(value) {
            this.$emit("updateTask", value);
        },
        updateColor(value) {
            this.$emit("updateColor", value);
        },
        cancelTodo() {
            this.$emit("cancelTodo");
        },
        updateTodo() {
            this.$emit("updateTodo");
        },
    },
    created() {
        setTimeout(() => {
            this.$refs.todo.focus();
        });
    },
};
</script>

<style></style>
