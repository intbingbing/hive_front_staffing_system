<template lang="pug">
    header
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'second'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
<style scoped>
    header{
        background-color: #14938b;
        width: 100%;
        height: 100%;
    }
</style>
