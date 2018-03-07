<template lang="pug">
    el-container.home(v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.9)")
        el-aside(width="230px")
            div.logo
                router-link(to="/user/home")
                    img(src="../../static/xiao.png" width="200px" height="54px")
            AdminAside
        el-container
            el-header(height="54px")
                ConHeader
            el-main
                router-view
            el-footer(height="20px")
                ConFooter
</template>
<script>
    import { mapState } from 'vuex'
    import AdminAside from '../common/AdminAside.vue'
    import ConFooter from '../common/ConFooter.vue'
    import ConHeader from '../common/ConHeader.vue'
    export default {
        components:{
            AdminAside,
            ConFooter,
            ConHeader
        },
        computed: {
            ...mapState([
                'loading',
            ]),
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

            }
            .el-main {
                /*background-color: rgba(255,255,255,1);*/
            }
            .el-footer {
            }
        }
    }





</style>
