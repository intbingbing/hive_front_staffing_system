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
            increment(){
                this.$store.commit(types.INCREMENT)
            },
            decrement(){
                this.$store.commit(types.DECREMENT)
            },
            init(){
                this.$store.dispatch(types.GET_ALL_STAFF_INFO);
                //this.$store.dispatch(types.GET_POST);
                //this.$store.dispatch(types.GET_DEPARTMENT);
                this.$store.dispatch(types.GET_POST_MAP_DEPARTMENT);
                this.$store.dispatch(types.GET_POST_CASCADER);
                //this.$store.dispatch(types.TEST,9);
            },
        },
        mounted:function () {
            this.init();
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
</style>
