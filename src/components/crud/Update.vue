<template lang="pug">
    div#create
        el-form(:model="updateValidForm" label-width="70px" :rules="rules" ref="updateValidForm" status-icon=true)
            el-form-item(label="ID" prop="idUpdateValue")
                el-input(v-model.number="updateValidForm.idUpdateValue" placeholder="请输入ID")
            el-form-item(label="姓名" prop="nameUpdateValue")
                el-input(v-model="updateValidForm.nameUpdateValue" placeholder="请输入姓名")
            el-form-item(label="密码" prop="passwordUpdateValue")
                el-input(v-model="updateValidForm.passwordUpdateValue" placeholder="请输入密码" type="password")
            el-form-item(label="确认" prop="checkPassword")
                el-input(v-model="updateValidForm.checkPassword" placeholder="请再次输入密码" type="password")
            el-form-item(label="生日" prop="birthdayUpdateValue")
                el-date-picker(style="width:100%"
                                v-model="updateValidForm.birthdayUpdateValue"
                                type="date" placeholder="请选择生日"
                                default-value="1995-01-01" ref="birthdayDom")
            el-form-item
                el-row(:gutter="10")
                    el-col(:span="12")
                        el-button(type="primary" style="width:100%" @click="updateSubmit") Update
                    el-col(:span="12")
                        el-button(type="danger" style="width:100%" @click="resetForm('updateValidForm')") Reset
</template>

<script>
    import * as types from '../../store/types'
    import { mapState } from 'vuex'
    export default {
        name: 'create',
        data:function () {
            let checkPassword=(rule, value, callback)=>{
                if(value!==this.updateValidForm.passwordUpdateValue){
                    return callback(new Error('两次密码输入不一致！'));
                }
                callback();
            };
            return {
                updateValidForm:{
                    idUpdateValue:'',
                    nameUpdateValue:'',
                    passwordUpdateValue:'',
                    checkPassword:'',
                    birthdayUpdateValue:''
                },
                rules:{
                    idUpdateValue:[
                        { required: true, message: 'ID为必填项！', trigger: 'blur' },
                        { type:"number", message:'请输入数字格式！' }
                    ],
                    nameUpdateValue:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                    passwordUpdateValue:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' }
                    ],
                    checkPassword:[
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator:checkPassword, trigger: 'blur' }
                    ],
                    birthdayUpdateValue:[
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            updateSubmit () {
                this.$refs.updateValidForm.validate(async (valid) => {
                    if(valid){
                        await this.$store.dispatch(types.UPDATE_SUBMIT,{
                            id:this.updateValidForm.idUpdateValue,
                            name:this.updateValidForm.nameUpdateValue,
                            password:this.updateValidForm.passwordUpdateValue,
                            birthday:this.updateValidForm.birthdayUpdateValue
                        });
                        if(this.updateSubmitInfo.updateSuccessful===1){
                            this.$notify.success({
                                title: '更新成功！',
                                message: `ID:${this.updateSubmitResult.id}`,
                                duration:6000,
                                showClose: false
                            });
                        }else{
                            this.$notify.error({
                                title: '错误！',
                                message: this.updateSubmitInfo.errorMessage,
                                duration:6000,
                                showClose: false
                            });
                        }
                    }else{
                        return false
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed:{
            ...mapState([
                'updateSubmitInfo',
                'updateSubmitResult'
            ])
        },
        mounted:function(){
            //this.inputWidth=this.$refs.inputDom.$el.offsetWidth;
            //console.log(this.$refs.birthdayDom.$el.offsetWidth);
        }
    }
</script>

<style scoped>
    #create{
        margin-top: 20px;
    }
</style>
