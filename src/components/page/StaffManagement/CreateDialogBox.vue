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
                    el-col(:span="8")
                        el-form-item(label="权限")
                            el-select(v-model="tmpStaffInfo.permissions_id")
                                el-option(v-for="item in permissionsSelect" :key="item.value" :label="item.label" :value="item.value")
                    el-col(:span="16")
                        el-form-item(label="住址")
                            el-input(v-model="tmpStaffInfo.employee_address" clearable)
            div(slot="footer" class="dialog-footer")
                el-button(size="small" @click="showDialog=false") 取 消
                el-button(type="primary" size="small" @click="submitCreate") 确 定
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
                'edu',
                'permissionsSelect',
                'createStaffRes'
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
                confirmedStaffInfo: {},
                tmpStaffInfo: {},
            };
        },
        methods: {
            createStaff() {
                this.showDialog = true;
            },
            handleChange(val) {
                //console.log(val);
            },
            async submitCreate() {
                this.tmpStaffInfo["association_id"] = this.createPostCascader[this.createPostCascader.length-1];
                //console.log(this.tmpStaffInfo);
                await this.$store.dispatch(this.$types.CREATE_STAFF,this.tmpStaffInfo);
                await this.$store.dispatch(this.$types.GET_ALL_STAFF_INFO);
                this.showDialog = false;
                if(this.createStaffRes.statusCode==='200210'){
                    this.$notify.success({
                        title: '创建成功！',
                        message:`员工ID：${this.createStaffRes.data.employee_id}`,
                        duration:4000,
                    });
                }else{
                    this.$notify.error({
                        title: '其他错误！',
                        message: this.updateStaffRes,
                        duration:6000,
                    });
                }
            },
            watch: {},
            //异步请求
            mounted() {
                this.$store.dispatch(types.GET_POST_CASCADER);
            }
        }
    }
</script>
<style scoped>
    .el-select,.el-cascader{
        width:100%;
    }
</style>
