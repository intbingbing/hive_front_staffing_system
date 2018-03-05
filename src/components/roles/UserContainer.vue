<template lang="pug">
    el-container.home
        el-aside(width="230px")
            div.logo
                router-link(to="/user/home")
                    img(src="../../static/xiao.png" width="200px" height="54px")
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
            background-color: rgba(42,46,52,0.6);
            .logo{
                background-color: rgba(5,32,44,0.5);
                height: 54px;
                display: flex;
                justify-content:center;
            }
        }
        .el-container{
            .el-header {
                background-color:rgba(255,255,255,0.2);
                color: #aaaaaa;
                display: flex;
                justify-content:start;
                align-items:center;
                span{
                    font-size: 14px;
                    padding: 0 12px;
                    a{
                        color: #ccc;
                        text-decoration:none;
                    }
                    a:hover{
                        color:#fff;
                    }
                }
            }
            .el-main {
                /*background-color: rgba(255,255,255,1);*/
            }
            .el-footer {
            }
        }
    }





</style>
