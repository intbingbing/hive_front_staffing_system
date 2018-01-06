<template lang="pug">
    div#create
        el-form(:model="createValidForm" label-width="70px" :rules="rules" ref="createValidForm" status-icon=true)
            el-form-item(label="姓名" prop="nameCreateValue")
                el-input(v-model="createValidForm.nameCreateValue" placeholder="请输入姓名")
            el-form-item(label="密码" prop="passwordCreateValue")
                el-input(v-model="createValidForm.passwordCreateValue" placeholder="请输入密码" type="password")
            el-form-item(label="确认" prop="checkPassword")
                el-input(v-model="createValidForm.checkPassword" placeholder="请再次输入密码" type="password")
            el-form-item(label="生日" prop="birthdayCreateValue")
                el-date-picker(style="width:100%"
                                v-model="createValidForm.birthdayCreateValue"
                                type="date" placeholder="请选择生日"
                                default-value="1995-01-01" ref="birthdayDom")
            el-form-item
                el-row(:gutter="10")
                    el-col(:span="12")
                        el-button(type="primary" style="width:100%" @click="createSubmit") Create
                    el-col(:span="12")
                        el-button(type="danger" style="width:100%") Reset
        <!--el-row(:gutter="10")-->
            <!--el-col(:span="6")-->
                <!--el-input(v-model="createValidForm.nameCreateValue" placeholder="请输入姓名" ref="inputDom")-->
            <!--el-col(:span="7")-->
                <!--el-input(v-model="createValidForm.passwordCreateValue" placeholder="请输入密码")-->
            <!--el-col(:span="7")-->
                <!--el-date-picker(style="width:100%"  v-model="createValidForm.birthdayCreateValue" type="date" placeholder="请选择生日" default-value="1995-01-01" ref="birthdayDom")-->
            <!--el-col(:span="4")-->
                <!--el-button(plain style="width:100%") Create-->
</template>

<script>
    export default {
        name: 'create',
        data:function () {
            let checkPassword=(rule, value, callback)=>{
                if(value!==this.createValidForm.passwordCreateValue){
                    return callback(new Error('两次密码输入不一致！'));
                }
                callback();
            };
            return {
                createValidForm:{
                    nameCreateValue:'',
                    passwordCreateValue:'',
                    checkPassword:'',
                    birthdayCreateValue:''
                },
                rules:{
                    nameCreateValue:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                    passwordCreateValue:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' }
                    ],
                    checkPassword:[
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator:checkPassword, trigger: 'blur' }
                    ],
                    birthdayCreateValue:[
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            createSubmit:function () {
                console.log('sss')
            }
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
