<template lang="pug">
    section
        div#title
            span
                a(href="#") 门户
            span
                a(href="#") 流程
            span
                a(href="#") 微博
            span
                a(href="#") 协同
        div#head-container
            el-dropdown
                div#header-portrait.el-dropdown-link
                    a(href="#")
                        img.user(:src="userInfo.headerPortraitSrc")
                el-dropdown-menu(slot="dropdown")
                    el-dropdown-item
                        router-link(to="/user/home")
                            i.el-icon-info &nbsp;&nbsp;主页
                    el-dropdown-item
                        i.el-icon-setting &nbsp;&nbsp;设置
                    el-dropdown-item
                        a(@click="logout")
                            i.el-icon-circle-close &nbsp;&nbsp;退出
</template>

<script>
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
            };
        },
        methods: {
            async logout(){
                console.log('clear')
                await api.clearCookie();
                this.$store.commit(types.LOG_OUT);
                this.$router.push({ name: 'Login' })
            }
        }
    };
</script>

<style scoped lang="less">
    section{
        width:100%;
        display: flex;
        justify-content:space-between;
        #title{
            display: flex;
            align-items: center;
        }
        #head-container{
            display: flex;
            align-items: center;
        }
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
    span{
        font-size: 14px;
        padding: 0 12px;
        a{
            color: #ccc;
            text-decoration:none;
        }
        a:hover{
            color:#fff;
        }
    }
</style>
