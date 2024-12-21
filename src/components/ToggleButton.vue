<template>
    <button @click="$emit('toggle')">
        {{ darkMode ? "Light" : "Dark" }}
    </button>
</template>

<script>
export default {
    props: ["darkMode"],
};
</script>

<style>
button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #ffc107;
    color: #000;
    font-size: 16px;
}

button:hover {
    background-color: #e0a800;
}
</style>
