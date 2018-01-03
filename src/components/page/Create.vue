<template lang="pug">
    div#create
        el-row(:gutter="10")
            el-col(:span="7")
                el-input(v-model="nameCreateValue" placeholder="请输入姓名" ref="inputDom")
            el-col(:span="7")
                el-input(v-model="passwordCreateValue" placeholder="请输入密码")
            el-col(:span="7")
                el-date-picker(style="width:100%"  v-model="birthdayCreateValue" type="date" placeholder="请选择生日" default-value="1995-01-01" ref="birthdayDom")
            el-col(:span="3")
                el-button(plain style="width:100%") Create
</template>

<script>
    export default {
        name: 'create',
        data:function () {
            return {
                nameCreateValue:'',
                passwordCreateValue:'',
                birthdayCreateValue:''
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
