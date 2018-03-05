<template lang="pug">
    el-container.home
        el-aside(width="230px")
            div.logo
                router-link(to="/user/home")
                    img(src="../../assets/xiao.png" width="200px" height="54px")
            AdminAside
        el-container
            el-header(height="54px")
                span
                    a(href="#") 门户
                span
                    a(href="#") 流程
                span
                    a(href="#") 微博
                span
                    a(href="#") 协同
            el-main
                router-view
            el-footer(height="20px")
                ConFooter
</template>
<script>
    import AdminAside from '../common/AdminAside.vue'
    import ConFooter from '../common/ConFooter.vue'
    export default {
        components:{
            AdminAside,
            ConFooter
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
            background-color: #2a2e34;
            color: #333333;
            .logo{
                background-color: #008df6;
                height: 54px;
                display: flex;
                justify-content:center;
            }
        }
        .el-container{
            .el-header {
                background-color:#0070c1;
                color: #333;
                display: flex;
                justify-content:start;
                align-items:center;
                span{
                    font-size: 14px;
                    padding: 0 12px;
                    a{
                        color: rgb(164, 204, 235);
                        text-decoration:none;
                    }
                    a:hover{
                        color:#fff;
                    }
                }
            }
            .el-main {
                color: #333;
            }
            .el-footer {
            }
        }
    }





</style>
