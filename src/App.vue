<template lang="pug">
    div#id
        router-view
        <!--el-row-->
            <!--el-col(:span="12" :offset="6")-->
                <!--read-->
        <!--el-row-->
            <!--el-col(:span="12" :offset="6")-->
                <!--create-->
        <!--el-row-->
            <!--el-col(:span="12" :offset="6")-->
                //test
</template>

<script>
    import { mapActions , mapGetters , mapState , mapMutations } from "vuex"
    import read from './components/crud/Retrieve'
    import create from './components/crud/Create.vue'
    import test from './components/test/TestParent'
    import * as types from './store/types'
    export default {
        name: 'app',
        computed:{
            ...mapState([
                'count'
            ])
        },
        components:{
            read,
            create,
            test,
        },
        methods:{
//            init(){
//                this.$store.dispatch(types.GET_ALL_STAFF_INFO);
//                this.$store.dispatch(types.GET_POST);
//                this.$store.dispatch(types.GET_DEPARTMENT);
//                this.$store.dispatch(types.GET_POST_MAP_DEPARTMENT);
//                this.$store.dispatch(types.GET_POST_CASCADER);
//                this.$store.dispatch(types.TEST,9);
//            },
        },
        mounted:function () {
            //初始化封装在action INIT中，三个请求：GET_ALL_STAFF_INFO，GET_POST_MAP_DEPARTMENT，GET_POST_CASCADER
            this.$store.dispatch(this.$types.INIT);
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 56px;
    }
    #id{
        /*background:rgba(255,255,255,1);*/
        background: url("static/bg.jpg") no-repeat center center fixed;
        background-size: cover;
    }
    table .cell,.el-pager .number,.el-pagination>.el-pager>.el-icon-more{
        color:#fff;
    }
    .el-table th, .el-table tr{
        background: transparent;
    }
    .el-table, .el-table__expanded-cell{
        background: transparent;
    }
    .el-checkbox__inner{
        background: transparent;
    }
    .el-checkbox{
        color:rgba(0,0,0,0)
    }
    .el-input__inner{
        background: transparent;
    }
    .el-pagination button.disabled{
        background: transparent;
    }
    .el-dialog, .el-pager li{
        background: transparent;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev{
        background: transparent;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: transparent;
    }

    .el-dialog{
        background: #fff;
    }
    .el-tree{
        background: transparent;
        color:#fff;
    }
    button span{
        color:#fff
    }
    .el-button--default span{
        color:#606266
    }
    .el-icon-arrow-down{
        color:#fff
    }
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover {
        background-color: rgba(5,32,44,0.5)
    }
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: rgba(5,32,44,0.5)
    }
    .el-menu-item:focus, .el-menu-item:hover {
        background-color: rgba(255,255,255,1)
    }
    .el-upload-dragger {
        background-color: #0000;
    }
    .el-upload-dragger .el-upload__text{
        color:#ddd
    }
    .el-notification__content>p,.el-select-dropdown__item>span{
        color: #606266;
    }
    .el-pagination__total ,.el-pagination__jump,.el-pagination__jump>.el-pagination__editor>.el-input__inner{
        color: #ffffff;
    }
    .el-input--small>.el-input__inner,.el-message-box__message>p,.el-message-box__title>span{
        color: #606266;
    }
    .el-button--primary>span{
        color: #ffffff;
    }
    /**{*/
        /*color:#ddd*/
    /*}*/
</style>
