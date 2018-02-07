<template lang="pug">
    section
        el-pagination(@size-change="handleSizeChange",
        @current-change="handleCurrentChange",
        :current-page="currentPage",
        :page-sizes="[10, 20, 50, 100, 200, 500]",
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper",
        :total="staffCount")
        el-table(:data="allStaffInfo" border size="small" :stripe="true"  :default-sort="{prop: 'employee_id'}")
            el-table-column(type="selection" width="35")
            el-table-column(prop="employee_id" label="工号" width="50px")
            el-table-column(prop="employee_name" label="姓名")
            el-table-column(prop="post_name" label="职位" :filters="this.filters_post_name" :filter-method="filterPostName")
            el-table-column(prop="department_name" label="部门" :filters="this.filters_department_name" :filter-method="filterDepartmentName")
            el-table-column(prop="employee_salary" label="薪水" :filters="this.filters_employee_salary" :filter-method="filterEmployeeSalary")
            el-table-column(prop="employee_edu" label="学历")
            el-table-column(prop="employee_work_seniority" label="参加工作")
            el-table-column(prop="employee_phone" label="联系方式")
            el-table-column(label="操作" width="160")
                template(slot-scope="scope")
                    el-button(size="mini" @click="handleEdit(scope.$index, scope.row)") 编辑
                    el-button(size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") 删除
</template>

<script>
    import * as types from '../../store/types'
    import { mapState } from 'vuex'
    export default {
        computed:{
            ...mapState([
                'allStaffInfo',
                'postInfo',
                'departmentInfo'
            ]),
            staffCount () {
                return this.allStaffInfo.length
            },
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 20,
                filters_post_name:[],
                filters_department_name:[],
                filters_employee_salary:[],
            }
        },
        methods: {
            //:filter-method
            filterPostName(value, row, column) {
                return row['post_name'] === value;
            },
            filterDepartmentName(value, row, column) {
                return row['department_name'] === value;
            },
            filterEmployeeSalary(value, row, column) {
                return row['employee_salary'] === value;
            },

            handleEdit(index, row) {
                row['employee_name']='郑凤'
                console.log(this.allStaffInfo[0]);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            init(){
                //初始化表头过滤器 :filters
                for(let tmp of this.postInfo){
                    let tmpObj={text:tmp['post_name'],value:tmp['post_name']};
                    this.filters_post_name.push(tmpObj);
                }
                for(let tmp of this.departmentInfo){
                    let tmpObj={text:tmp['department_name'],value:tmp['department_name']};
                    this.filters_department_name.push(tmpObj);
                }


                let employee_salary_tmp=[];
                for(let tmp of this.allStaffInfo){
                    employee_salary_tmp.push(tmp['employee_salary']);
                }
                //数组去重函数
                function unique (arr) {
                    return Array.from(new Set(arr))
                }
                employee_salary_tmp=unique(employee_salary_tmp);

                for(let tmp of employee_salary_tmp){
                    let tmpObj={text:tmp,value:tmp};
                    this.filters_employee_salary.push(tmpObj);
                }


            },
        },
        mounted:function () {
            this.init();
        }
    }
</script>
<style scoped>

</style>
