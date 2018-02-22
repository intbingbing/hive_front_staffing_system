<template lang="pug">
    //禁止右键
    section.bg(oncontextmenu="return false" onselectstart="return false" ondragstart="return false")
        vue-particles.particles(color="#fff" :particleSize="2" linesColor="#fff" clickMode="repulse" :moveSpeed="2")
        el-card.login-form
            div
                img(src="../../assets/logo.png")
                h1 Vue示例
            div#fill
            el-form(:model="loginForm" :rules="rules" ref="loginForm")
                el-form-item(prop="username")
                    el-input(prefix-icon="el-icon-view" placeholder="账号" v-model="loginForm.username" :autofocus="true")
                el-form-item(prop="password")
                    el-input(prefix-icon="el-icon-remove-outline" placeholder="密码" v-model="loginForm.password" type="password"   @keyup.enter.native="login")
                el-form-item
                    el-row(:gutter="10")
                        el-col(:span="12")
                            el-button(@click="login" type="primary") 登录
                        el-col(:span="12")
                            el-button(type="danger" v-on:click="resetForm('loginForm')") 重置
</template>

<script>
    import * as types from '../../store/types'
    import { mapState } from 'vuex'
    export default {
        computed:{
            ...mapState([
                'loginInfo'
            ]),
            listenLoginInfo(){
                return this.loginInfo;
            }
        },
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入帐号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            login (){
                this.$refs.loginForm.validate((valid) => {
                    if(valid){
                        this.$store.dispatch(types.LOG_IN,{
                            username:this.loginForm.username,
                            password:this.loginForm.password
                        })
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted:function(){
        },
        watch:{
            listenLoginInfo(newVal,oldVal){
                if(Object.keys(this.loginInfo).length!==0) {
                    if(this.loginInfo.statusCode==='200112'){
                        this.$notify.success({
                            message: '登录成功！',
                            duration: 2000,
                            showClose: false
                        })
                    }else if(this.loginInfo.statusCode==='400112'){
                        this.$notify.error({
                            message: '密码错误！',
                            duration: 2000,
                            showClose: false
                        })
                    }else if(this.loginInfo.statusCode==='400111'){
                        this.$notify.error({
                            message: '没有该用户！',
                            duration: 2000,
                            showClose: false
                        })
                    }else if(this.loginInfo.statusCode==='500100'){
                        this.$notify.error({
                            title:'服务器内部错误！',
                            message: '请联系管理员！',
                            duration: 0,
                            showClose: true
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .bg {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background: linear-gradient(to bottom right , rgb(50,102,152) , rgb(102,204,203));
        /*background: url(../../assets/bg8.jpg);*/
        /*background-size: cover;*/
        /*background-repeat: no-repeat;*/
        .login-form {
            margin-top: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.1);
            position: absolute;
            z-index:999;
            box-shadow: 15px 15px 40px #222;
            div{
                img{
                    width:40px;
                }
                h1{
                    color:#fff;
                    display: inline;
                }
            }
            form {
                width:300px;
                button {
                    width: 100%;
                }
            }
        }
    }
    .particles{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;

    }
    #fill{
        height: 10px;
    }
</style>
