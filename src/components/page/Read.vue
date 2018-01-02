<template lang="pug">
  div(style="margin-top:15px")
    el-input(placeholder="请输入要查找的ID" v-model="idQueryValue" prefix-icon="el-icon-search" v-on:keyup.13.native="idQuery")
      el-button(slot="append" v-on:click="idQuery") Read
    el-alert(v-show="idQueryInfo.errorMessage || idQueryInfo.id" :title="idQueryInfo.errorMessage || `ID:${idQueryInfo.id},Name:${idQueryInfo.name},Password:${idQueryInfo.password},Birthday:${idQueryInfo.birthday}`" type="success" show-icon)
</template>

<script>
    import * as types from '../../store/types'
    import { mapState } from 'vuex'
    export default {
        name: "read",
        data(){
            return {
                idQueryValue:''
            }
        },
        methods:{
            idQuery:function () {
                this.$store.dispatch(types.ID_QUERY,{id:this.idQueryValue})
            }
        },
        computed:{
            ...mapState([
                'idQueryInfo'
            ])
        }
    }
</script>

<style scoped>

</style>
