<template lang="pug">
    el-container
        el-aside(width="200px")
            div.logo
            AdminAside
        el-container
            el-header(height="54px") AdminAside
            el-main
                router-view
            el-footer(height="20px") Footer
</template>
<script>
    import AdminAside from '../common/AdminAside.vue'
    export default {
        components:{
            AdminAside
        },
        data:function () {
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
    .el-container{
        height: 99.9vh;
        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            .logo{
                height: 54px;
            }
        }
        .el-container{
            .el-header {
                background-color: #B3C0D1;
                color: #333;
            }
            .el-main {
                color: #333;
            }
            .el-footer {
                background-color: #B3C0D1;
                color: #333;
            }
        }
    }






</style>
