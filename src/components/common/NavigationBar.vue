<template lang="pug">
    header
        div#header-content
            img.logo(:src="logo")
            span.title Vue.js
            <!--div#header-portrait-->
                <!--img.user(:src="userInfo.headerPortraitURL")-->
            el-dropdown
                div#header-portrait.el-dropdown-link
                    a(href="#")
                        img.user(:src="userInfo.headerPortraitSrc")
                el-dropdown-menu(slot="dropdown")
                    el-dropdown-item
                        i.el-icon-info &nbsp;&nbsp;主页
                    el-dropdown-item
                        i.el-icon-setting &nbsp;&nbsp;设置
                    el-dropdown-item
                        a(@click="logout")
                            i.el-icon-circle-close &nbsp;&nbsp;退出

        //span.logout 登出
</template>
<script>
    import logo from '../../assets/logo.png'
    import { mapState } from 'vuex'
    import * as types from '../../store/types'
    import * as api from '../../store/api'
    export default {
        computed:{
            ...mapState([
                'userInfo',
                'loginInfo'
            ])
        },
        data() {
            return {
                activeName: 'second',
                logo
            };
        },
        methods: {
            async logout(){
                await api.clearCookie();
                this.$store.commit(types.LOG_OUT);
                this.$router.push({ name: 'Login' })
            }
        }
    };
</script>
<style lang="less" scoped>
    header{
        background-color: #14938b;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        #header-content{
            width:1000px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .logo{
                width:40px;
                height:40px;
                -webkit-animation: turn 2s 3;
                animation: turn 2s 3;
            }
            .title{
                color:#fff;
                /*display: inline-block;*/
                /*line-height: 30px;*/
                font-size: 24px;
                /*margin:10px 5px;*/
            }
            .el-dropdown{
                margin-left: auto;
                #header-portrait{
                    width:30px;
                    height:30px;
                    .user{
                        width:100%;
                        height:100%;
                        object-fit: cover;
                        border-radius: 2px;
                        border: 1px solid #fff;
                        /*margin-left: auto;*/
                    }
                }
            }
        }
    }
    @-webkit-keyframes turn {
        to {
            -webkit-transform: rotateY(360deg);
        }
    }

    @keyframes turn {
        to {
            transform: rotateY(360deg);
        }
    }

    #box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        #header-content{
            width:1000px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            #other{

            }
            #header-portrait{
                width:30px;
                height:30px;
                margin-left: auto;  //占用剩余空间
            }
        }
    }
</style>
