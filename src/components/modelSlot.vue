<template>
    <div class="bg-gray-200 rounded-lg shadow p-5">
        <slot class="header text-2xl" name="header"> </slot>
        <br />
        <slot name="id" class="text-opacity-50"></slot>
        <slot name="body" class="body mt-2"> </slot>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
