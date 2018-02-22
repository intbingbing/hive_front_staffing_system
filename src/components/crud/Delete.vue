<template lang="pug">
    div
        el-form(:model="idDeleteForm" :rules="rules" ref="idDeleteForm" status-icon=true)
            el-form-item(prop="idDeleteValue" )
                el-input(placeholder="请输入要删除的ID" v-model.number="idDeleteForm.idDeleteValue" prefix-icon="el-icon-search"  @keyup.enter.native="idDelete")
                    el-button(slot="append" v-on:click="idDelete") Delete
                        //表单内只有一个input，默认回车自动刷新页面
                        input(style="display:none")
            //p(v-show="idQueryInfo.errorMessage || idQueryInfo.id") {{idQueryInfo.errorMessage || `ID:${idQueryInfo.id},Name:${idQueryInfo.name},Password:${idQueryInfo.password},Birthday:${idQueryInfo.birthday}`}}
            //p(v-if="idQueryInfo.isFound===0") 没有找到记录！
            el-alert(v-if="idDeleteInfo.idDeleteSuccessful===0" :title="idDeleteInfo.errorMessage" type="error" center show-icon :closable="false")
            <!--el-table(v-else-if="idQueryInfo.isFound===1" :data="idQueryResult" style="width:100%" border size="small")-->
                <!--el-table-column(prop="id" label="ID" width="80px")-->
                <!--el-table-column(prop="name" label="Name")-->
                <!--el-table-column(prop="password" label="Password")-->
                <!--el-table-column(prop="birthday" label="Birthday" width="200px")-->
            el-alert(v-else-if="idDeleteInfo.idDeleteSuccessful===1" title="删除成功！" type="success" center show-icon :closable="false")
            span(v-else)
</template>

<script>
    import * as types from '../../store/types'
    import { mapState } from 'vuex'
    export default {
        name: "read",
        data(){
            return {
                idDeleteForm:{
                    idDeleteValue:''
                },
                rules:{
                    idDeleteValue:[
                        { required:true,message:'请输入ID！' },
                        { type:"number",message:'请输入数字格式！' }
                    ]
                }
            }
        },
        methods:{
            idDelete:function () {
                this.$refs.idDeleteForm.validate((valid) => {
                    if(valid){
                        this.$store.dispatch(types.ID_DELETE,{
                            id:this.idDeleteForm.idDeleteValue
                        })
                    }else{
                        return false
                    }
                })
            }
        },
        computed:{
            ...mapState([
                'idDeleteInfo',
                'idDeleteResult'
            ])
        }
    }
</script>

<style scoped>
    div{
        margin-top:15px
    }
</style>
