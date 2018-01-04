<template lang="pug">
    div
        el-form(:model="idValidForm" :rules="rules" ref="idValidForm" status-icon=true)
            el-form-item(prop="idQueryValue" )
                el-input(placeholder="请输入要查找的ID" v-model.number="idValidForm.idQueryValue" prefix-icon="el-icon-search" v-on:keyup.13.native="idQuery")
                    el-button(slot="append" v-on:click="idQuery") Read
            //p(v-show="idQueryInfo.errorMessage || idQueryInfo.id") {{idQueryInfo.errorMessage || `ID:${idQueryInfo.id},Name:${idQueryInfo.name},Password:${idQueryInfo.password},Birthday:${idQueryInfo.birthday}`}}
            el-table(:data="idQueryResult" style="width:100%" border size="small")
                el-table-column(prop="id" label="ID")
                el-table-column(prop="name" label="Name")
                el-table-column(prop="password" label="Password")
                el-table-column(prop="birthday" label="Birthday")
</template>

<script>
    import * as types from '../../store/types'
    import { mapState } from 'vuex'
    export default {
        name: "read",
        data(){
            return {
                idValidForm:{
                    idQueryValue:''
                },
                rules:{
                    idQueryValue:[
                        { required:true,message:'请输入ID！' },
                        { type:"number",message:'请输入数字格式！' }
                    ]
                }
            }
        },
        methods:{
            idQuery:function () {
                this.$refs.idValidForm.validate((valid) => {
                    if(valid){
                        this.$store.dispatch(types.ID_QUERY,{
                            id:this.idValidForm.idQueryValue
                        })
                    }else{
                        return false
                    }
                })
            }
        },
        computed:{
            ...mapState([
                'idQueryInfo',
                'idQueryResult'
            ])
        }
    }
</script>

<style scoped>
    div{
        margin-top:15px
    }
</style>
