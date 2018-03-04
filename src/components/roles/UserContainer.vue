<template lang="pug">
    el-container
        el-aside(width="16%")
            div.logo
                router-link(to="/user/home")
                    img(src="../../assets/xiao.png" width="200px" height="54px")
            AdminAside
        el-container
            el-header(height="54px") header
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
            background-color: rgba(0,0,0,0.1);
            color: #333;
            .logo{
                background-color: #001852;
                height: 54px;
                display: flex;
                justify-content:center;
            }
        }
        .el-container{
            .el-header {
                background-color: rgba(0,0,0,0.1);
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
