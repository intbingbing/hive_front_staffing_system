<template lang="pug">
    div(style="margin-top:15px")
        el-row(:gutter="20")
            el-col(:span="5")
                el-input(v-model="nameCreateValue" placeholder="请输入姓名" ref="inputDom")
            el-col(:span="5")
                el-input(v-model="passwordCreateValue" placeholder="请输入姓名")
            el-col(:span="5")
                el-date-picker(style=`width:125px` v-model="birthdayCreateValue" type="date" placeholder="请选择生日" default-value="1990-01-01")
            el-col(:span="5")
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
                inputWidth:''
            }
        },
        mounted:function(){
            this.inputWidth=this.$refs.inputDom.$el.offsetWidth;
        }
    }
</script>

<style scoped>

</style>
