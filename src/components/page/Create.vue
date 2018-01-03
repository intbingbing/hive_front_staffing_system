<template lang="pug">
    div(style="margin-top:60px")
        el-row(:gutter="20")
            el-col(:span="7")
                el-input(v-model="nameCreateValue" placeholder="请输入姓名" ref="inputDom")
            el-col(:span="7")
                el-input(v-model="passwordCreateValue" placeholder="请输入密码")
            el-col(:span="7")
                el-date-picker(:style="{width:inputWidth+'px'}"  v-model="birthdayCreateValue" type="date" placeholder="请选择生日" default-value="1995-01-01" ref="birthdayDom")
            el-col(:span="3" align="right")
                el-button(plain) Create
        p {{inputWidth}}
</template>

<script>
    export default {
        name: 'create',
        data:function () {
            return {
                nameCreateValue:'',
                passwordCreateValue:'',
                birthdayCreateValue:'',
                inputWidth:'',
                screenWidth: document.body.clientWidth
            }
        },
        mounted:function(){
            this.inputWidth=this.$refs.inputDom.$el.offsetWidth;
            console.log(this.$refs.birthdayDom.$el.offsetWidth);
            const that = this;
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
        watch:{
            screenWidth (val) {
                this.inputWidth=this.$refs.inputDom.$el.offsetWidth;
            }
        }
    }
</script>

<style scoped>

</style>
