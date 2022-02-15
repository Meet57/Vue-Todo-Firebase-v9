<template>
    <div>
        <a-modal
            :visible="visible"
            title="Basic Modal"
            :closable="false"
            @ok="handleOk"
            @cancel="closeModel"
        >
            {{ details }}
        </a-modal>
    </div>
</template>
<script>
export default {
    props: {
        details: {
            type: Object,
        },
    },
    data() {
        return {
            visible: true,
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
            this.visible = false;
            setTimeout(() => {
                this.$emit("toogleModel");
            }, 400);
        },
    },
};
</script>
