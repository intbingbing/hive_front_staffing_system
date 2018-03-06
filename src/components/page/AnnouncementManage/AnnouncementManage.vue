<template lang="pug">
    section
        el-row
            el-col(:span="18")
                el-button(type="primary" size="small" icon="el-icon-circle-plus-outline" @click="showDialog=true") 发布
                el-alert(v-for="(value,key,index) in this.getNoticeRes" :key="value.notice_id"
                        :title="value.notice_title"
                        :type="value.notice_type"
                        :description="value.notice_text")
        el-row
            el-col
                el-dialog(title="发布公告" :visible.sync="showDialog" width="40%" :show-close="false")
                    el-form(:model="addNotice" size="small" label-position="right"  label-width="80px")
                        el-row
                            el-col(:span="18")
                                el-form-item(label="标题")
                                    el-input(v-model="addNotice.notice_title")
                                el-form-item(label="等级")
                                    el-select(v-model="addNotice.notice_type")
                                        el-option(v-for="val of level"
                                            :key="val.tag" :label="val.des" :value="val.tag")
                                el-form-item(label="内容")
                                    el-input(type="textarea" v-model="addNotice.notice_text")
                    div(slot="footer" class="dialog-footer")
                        el-button(size="small" @click="showDialog=false") 取 消
                        el-button(type="primary" size="small" @click="submitNotice") 确 定
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState([
                'createNoticeRes',
                'getNoticeRes',
            ]),
        },
        name: '',
        data:function () {
            return {
                showDialog:false,
                addNotice:{notice_title:'',notice_type:'',notice_text:'',auth_id:'',notice_date:'',employee_id:''},
                level:[{tag:'success',des:'成功'},{tag:'info',des:'信息'},{tag:'warning',des:'警告'},{tag:'error',des:'错误'}],
            }
        },
        methods:{
            init(){
                this.$store.dispatch(this.$types.GET_NOTICE);
            },
            async submitNotice(){
                this.showDialog = false;
                this.addNotice.auth_id=this.$store.state.loginInfo.auth_id;
                this.addNotice.employee_id=this.$store.state.loginInfo.employee_id;
                this.addNotice.notice_date = new Date();
                this.addNotice.notice_title = `${this.addNotice.notice_title}                   ----用户 ${this.$store.state.loginInfo.username} 发布于 ${this.addNotice.notice_date}`;
                await this.$store.dispatch(this.$types.CREATE_NOTICE,this.addNotice);
                if(this.createNoticeRes.code==='200210'){
                    this.$notify.success({title: `发布成功！`, message:`公告ID：${this.createNoticeRes.data.notice_id}`,duration:2000,});
                    await this.$store.dispatch(this.$types.GET_NOTICE);
                }else{
                    this.$notify.error({title: `发布失败`,message:this.createNoticeRes, duration:2000,});
                }
            }
        },
        mounted:function () {
            this.init();
        }
    }
</script>

<style scoped>
    .el-button{
        margin-bottom: 10px;
    }
    .el-row .el-form-item>.el-form-item__content>.el-select>.el-input>.el-input__inner{
        color:#606266;
    }
    .el-input{
        width:100%;
    }
    .el-alert{
        margin-top: 10px;
    }
</style>
