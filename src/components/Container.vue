<template lang="pug">
    el-container
        el-header(height="54px")
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
<style lang="less" scoped>
    .el-container{
        min-height: 96vh;
        display: flex;
        .el-header{
            padding:0;
        }
        .el-main{
            width:1042px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
