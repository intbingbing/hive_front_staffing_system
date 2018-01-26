<template lang="pug">
    el-container
        el-header
            NavigationBar
        el-main
            Tabs
        el-footer(height="20px")
            ConFooter
</template>
<script>
    import NavigationBar from './page/NavigationBar'
    import Tabs from './page/crud/Tabs'
    import ConFooter from './page/ConFooter'
    export default {
        name: 'container',
        data: function () {
            return {

            }
        },
        components:{
            NavigationBar,
            Tabs,
            ConFooter
        }
    }
</script>
<style scoped>
    .el-container{
        min-height: 96vh;
    }
    .el-header{
        padding:0;
    }
</style>
