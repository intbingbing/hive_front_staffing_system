<template lang="pug">
    header
        img(:src="logo")
</template>
<script>
    import logo from '../../assets/logo.png'
    export default {
        data() {
            return {
                activeName: 'second',
                logo
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
    img{
        width:50px;
        height:50px;
        padding:5px 20px ;
    }
</style>
