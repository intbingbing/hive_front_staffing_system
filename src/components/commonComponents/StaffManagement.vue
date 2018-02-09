<template lang="pug">
    section
        el-row(style="margin:0")
            el-col(:span="6")
                el-input(prefix-icon="el-icon-search" placeholder="搜索姓名" v-model="searchValue" size="mini")
            el-col(:span="2")
            el-col
                el-button(type="primary" size="mini") 新增
                el-button(size="mini") 导出
                el-button(type="danger" size="mini") 删除
        el-row
            el-col(:span="24")
                //row-dblclick:双击行事件(row,event),row当前行对象；select:手动勾选box事件，selection：选中的对象数组,row，本次勾选行对象；
                el-table(:data="pagingStaffInfo" border size="mini" :stripe="true" @row-dblclick="dbclick" @select="selectBox")
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
        el-row
            el-col(:span="16")
                el-pagination(@size-change="handleSizeChange",
                @current-change="handleCurrentChange",
                :current-page="currentPage",
                :page-sizes="[10, 20, 50, 100, 200, 500]",
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper",
                :total="staffCount")
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
                return this.staffInfo.length;
            },
            //计算当前分页的数据
            pagingStaffInfo(){
                let currentPageStaffInfo=[];
                if(this.searchValue===''){
                    this.init();
                    let currentPageHeaderIndex=(this.currentPage-1)*this.pageSize;
                    let currentPageTailIndex=currentPageHeaderIndex+this.pageSize-1;
                    let tmpIndex=0;
                    for(let index=currentPageHeaderIndex;index<currentPageTailIndex+1;index++){
                        currentPageStaffInfo[tmpIndex++]=this.allStaffInfo[index];
                    }
                }else{
                    //currentPageStaffInfo = this.staffInfo = this.staffInfo.filter(this.searchFilter);
                    let tmp = this.allStaffInfo.filter(this.searchFilter);
                    //console.log(this.searchValue);
                    //this.staffInfo.splice(0);
                    currentPageStaffInfo=[...tmp];
                    this.staffInfo=[...tmp];
//                    for(let index in tmp){
//                        this.staffInfo[index]=currentPageStaffInfo[index]=tmp[index];
//                    }
                }
                return currentPageStaffInfo;
            }
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                searchValue:'',
                staffInfo:[],
                employee_name_arr:[],
                filters_post_name:[],
                filters_department_name:[],
                filters_employee_salary:[],
            }
        },
        methods: {
            dbclick(row,event){
                console.log(row);
                console.log(event);
            },
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
                this.pageSize=val;
            },
            handleCurrentChange(val) {
                this.currentPage=val;
            },
            init(){
                this.staffInfo=[...this.allStaffInfo];
                //初始化表头过滤器 :filters
                this.filters_post_name.splice(0);
                for(let tmp of this.postInfo){
                    let tmpObj={text:tmp['post_name'],value:tmp['post_name']};
                    this.filters_post_name.push(tmpObj);
                }
                this.filters_department_name.splice(0);
                for(let tmp of this.departmentInfo){
                    let tmpObj={text:tmp['department_name'],value:tmp['department_name']};
                    this.filters_department_name.push(tmpObj);
                }

                this.filters_employee_salary.splice(0);
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
            searchFilter(val) {
                //console.log(val['employee_name'].indexOf(this.searchValue));
                //console.log(this.searchValue);
                return val['employee_name'].indexOf(this.searchValue) > -1;
            },
            selectBox(selection,row){
                return selection;
            }
        },
        mounted:function () {
            this.init();
        },
        watch: {
        },
    }
</script>
<style lang="less" scoped>
    section{
        .top{
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            .el-col{

            }
            .el-col{

            }
            .el-col{
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
            }
        }
        .el-row{

        }
        .el-row{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 10px;
            .el-col{
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }
    }
</style>
