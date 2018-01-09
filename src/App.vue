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
    import read from './components/page/Retrieve'
    import create from './components/page/Create.vue'
    import test from './components/page/Test'
    import * as types from './store/types'
    export default {
        name: 'app',
        methods:{
            increment(){
                this.$store.commit(types.INCREMENT)
            },
            decrement(){
                this.$store.commit(types.DECREMENT)
            }
        },
        computed:{
            ...mapState([
                'count'
            ])
        },
        components:{
            read,
            create,
            test,
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
        margin-top: 60px;
    }
    *{
        font-size: 14px;
    }
</style>
