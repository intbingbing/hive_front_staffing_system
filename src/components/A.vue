<template lang="pug">
    section
        el-button(type="primary" @click="showDialog = true") 打开表单

        el-dialog(title="员工信息修改" :visible.sync="showDialog")
            el-form(:model="currentStaffInfo" size="mini" :inline="true" )
                el-row
                    el-col(:span="8")
                        el-form-item(label="姓名")
                            el-input(v-model="currentStaffInfo.employee_name")
                    el-col(:span="8")
                        el-form-item(label="职位")
                            el-select(v-model="currentStaffInfo.post_id" placeholder="请选择职位")
                                el-option(v-for="item in postInfo" :key="item.post_id" :label="item.post_name" :value="item.post_id")
                    el-col(:span="8")
                        el-form-item(label="部门")
                            el-input(v-model="getDepartmentIDByPost" disabled)
                el-row
                    el-col(:span="8")
                        el-form-item(label="月薪")
                            el-input(v-model="currentStaffInfo.employee_salary")
                    el-col(:span="8")
                        el-form-item(label="学历")
                            el-select(v-model="currentStaffInfo.employee_edu" placeholder="请选择学历")
                                el-option(v-for="(value, key, index) in edu" :key="key" :label="value" :value="value")
                    el-col(:span="8")
                        el-form-item(label="专业")
                            el-input(v-model="currentStaffInfo.employee_professional")
                el-row
                    el-col(:span="8")
                        el-form-item(label="入职时间")
                            el-date-picker(style="width:100%"
                            v-model="currentStaffInfo.employee_entry_time"
                            type="date" placeholder="请选择时间" ref="birthdayDom")
                    el-col(:span="8")
                        el-form-item(label="工作时间")
                            el-input(v-model="currentStaffInfo.employee_work_seniority")
                    el-col(:span="8")
                        el-form-item(label="联系方式")
                            el-input(v-model="currentStaffInfo.employee_phone")
                el-row
                    el-col
                        el-form-item(label="身份证号码")
                            el-input(v-model="currentStaffInfo.employee_identity_card_number")
            div(slot="footer" class="dialog-footer")
                el-button(@click="showDialog = false") 取 消
                el-button(type="primary" @click="test") 确 定
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState([
                'allStaffInfo',
                'postInfo',
                'departmentInfo'
            ]),
            getDepartmentIDByPost(){
                for(let postValue of this.postInfo){
                    for (let departmentValue of this.departmentInfo){
                        if(postValue.post_id===this.currentStaffInfo.post_id&&departmentValue.department_id===postValue.department_id){
                            return departmentValue.department_name;
                        }
                    }
                }
            }
        },
        data() {
            return {
                showDialog: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                departmentID:'',
                edu:['博士','硕士','本科','大专','中专','高中','初中','其他'],
                formLabelWidth: '120px',
                currentStaffInfo:{"department_id":1,"department_name":"总裁办","post_id":1,"post_name":"CEO","employee_id":1,"employee_name":"蔡国锋","employee_phone":"13179939313","employee_edu":"博士","employee_professional":"软件工程","employee_entry_time":"2015-03-04T16:00:00.000Z","employee_salary":"50000","employee_work_seniority":"20","employee_identity_card_number":"330880198011095000","permissions_id":3},
            };
        },
        methods:{
            test(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('sssssssssssss');
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    console.log('aaaaaaaaaaaaaa');
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    };
</script>
