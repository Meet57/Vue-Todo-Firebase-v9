<template>
    <div>
        <a-select
            class="w-full"
            :title="'Filter by color'"
            mode="multiple"
            v-model="colorList"
            :placeholder="'Filter by color'"
            ref="colorFilter"
        >
            <a-select-option v-for="i in list" :key="i.color">
                <div
                    class="rounded-full mr-3"
                    :style="{
                        backgroundColor: i.color,
                        height: '15px',
                        width: '15px',
                        display: 'inline-block',
                    }"
                ></div>
                {{ i.colorName }}
            </a-select-option>
        </a-select>
        <a-input-search
            class="mt-3"
            v-model="searchText"
            placeholder="input search text"
            enter-button
            :allowClear="true"
            ref="searchFilter"
        />
        <br />
    </div>
</template>

<script>
export default {
    name: "Custom-Filter",
    props: {
        value: {
            type: Object,
            default: undefined,
        },
    },
    watch: {},
    computed: {
        colorList: {
            get() {
                return (this.value || {}).colorList;
            },
            set(colorList) {
                this.$emit("input", { ...(this.value || {}), colorList });
            },
        },
        searchText: {
            get() {
                return (this.value || {}).searchText;
            },
            set(searchText) {
                this.$emit("input", { ...(this.value || {}), searchText: searchText });
            },
        },
        list: {
            get() {
                return (this.value || {}).list;
            },
            set(list) {
                this.$emit("input", { ...(this.value || {}), list });
            },
        },
    },
    methods: {},
};
</script>

<style></style>
