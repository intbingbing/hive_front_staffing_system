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
        background:rgba(255,255,255,1);
        /*background: url("./assets/bg2.jpg") no-repeat center center fixed;*/
        /*background-size: cover;*/
    }


</style>
