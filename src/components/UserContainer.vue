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
    import NavigationBar from './commonComponents/NavigationBar'
    import Tabs from './crud/Tabs'
    import ConFooter from './commonComponents/ConFooter'
    export default {
        name: 'container',
        data: function () {
            return {
                a:100
            }
        },
        components:{
            NavigationBar,
            Tabs,
            ConFooter
        },
        mounted(){
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
        .el-tabs{
            width:1000px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
