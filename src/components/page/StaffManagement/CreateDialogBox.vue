<template lang="pug">
    section
        el-dialog(title="新增员工" :visible.sync="showDialog" width="70%" :show-close="false")
            el-form(:model="tmpStaffInfo" size="small" label-position="right"  label-width="80px")
                el-row(:gutter="20")
                    el-col(:span="8")
                        el-form-item(label="姓名")
                            el-input(v-model="tmpStaffInfo.employee_name")
                    el-col(:span="8")
                        el-form-item(label="职位")
                            el-cascader(
                            expand-trigger="hover"
                            :options="postCascader"
                            v-model="createPostCascader"
                            @change="handleChange"
                            separator=" - "
                            clearable
                            filterable)
                    el-col(:span="8")
                        el-form-item(label="联系方式")
                            el-input(v-model="tmpStaffInfo.employee_phone")
                el-row(:gutter="20")
                    el-col(:span="8")
                        el-form-item(label="月薪")
                            el-input(v-model="tmpStaffInfo.employee_salary")
                    el-col(:span="8")
                        el-form-item(label="学历")
                            el-select(v-model="tmpStaffInfo.employee_edu" placeholder="请选择学历")
                                el-option(v-for="(value, key, index) in edu" :key="key" :label="value" :value="value")
                    el-col(:span="8")
                        el-form-item(label="专业")
                            el-input(v-model="tmpStaffInfo.employee_professional")
                el-row(:gutter="20")
                    el-col(:span="8")
                        el-form-item(label="入职时间")
                            el-date-picker(style="width:100%"
                            v-model="tmpStaffInfo.employee_entry_time"
                            type="date" placeholder="请选择时间" ref="birthdayDom")
                    el-col(:span="8")
                        el-form-item(label="工作年限")
                            el-input(v-model="tmpStaffInfo.employee_work_seniority")
                    el-col(:span="8")
                        el-form-item(label="身份证")
                            el-input(v-model="tmpStaffInfo.employee_identity_card_number" clearable)
                el-row(:gutter="20")
                    el-col(:span="24")
                        el-form-item(label="住址")
                            el-input(v-model="tmpStaffInfo.employee_address" clearable)
            div(slot="footer" class="dialog-footer")
                el-button(size="small" @click="showDialog=false") 取 消
                el-button(type="primary" size="small" @click="submitChange") 确 定
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState([
                'allStaffInfo',
                'postInfo',
                'departmentInfo',
                'updateStaffRes',
                'postCascader',
            ]),
//            getDepartmentIDByPost(){
//                for (let departmentValue of this.departmentInfo){
//                    if(departmentValue.department_id===this.tmpStaffInfo.department_id){
//                        return departmentValue.department_name;
//                    }
//                }
//            }
        },
        data() {
            return {
                createPostCascader: [],
                postMapDepartment:[],
                showDialog: false,
                edu: ['博士', '硕士', '本科', '大专', '中专', '高中', '初中', '其他'],
                confirmedStaffInfo: {},
                tmpStaffInfo: {},
            };
        },
        methods: {
            createStaff() {
                this.showDialog = true;
            },
            handleChange(val) {
                console.log(val);
            },
            async submitChange() {
                this.tmpStaffInfo["department_id"] = this.createPostCascader[0];
                this.tmpStaffInfo["employee_id"] = this.createPostCascader[1];
                console.log(this.tmpStaffInfo);
//                this.showDialog=false;
//                //defaultPostMapDepartment,职位绑定的值赋给tmpStaffInfo完成格式化
//                this.tmpStaffInfo["department_id"] = this.defaultPostMapDepartment[0];
//                this.tmpStaffInfo["post_id"] = this.defaultPostMapDepartment[1];
//                await this.$store.dispatch(this.$types.UPDATE_STAFF,this.tmpStaffInfo);
//                await this.$store.dispatch(this.$types.GET_ALL_STAFF_INFO);
//                if(this.updateStaffRes.statusCode==='200220'){
//                    this.$notify.success({
//                        title: '更新成功！',
//                        duration:2000,
//                    });
//                }else if(this.updateStaffRes.statusCode==='40221'){
//                    this.$notify.error({
//                        title: '没有要更新的值！',
//                        duration:2000,
//                    });
//                }else{
//                    this.$notify.error({
//                        title: '其他错误！',
//                        message: this.updateStaffRes,
//                        duration:6000,
//                    });
//                }
//            }
            },
            watch: {},
            //异步请求
            mounted() {
                this.postCascader = this.$api.getPostCascader();
            }
        }
    }
</script>
<style scoped>
    .el-select,.el-cascader{
        width:100%;
    }
</style>
