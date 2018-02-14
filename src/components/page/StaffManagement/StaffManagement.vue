<template lang="pug">
    section
        el-row(style="margin:0")
            el-col(:span="6")
                el-input(prefix-icon="el-icon-search" placeholder="搜索姓名" v-model="searchValue" size="mini")
            el-col(:span="2")
            el-col
                el-button(type="primary" size="mini" @click="createStaff") 新增
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
                            el-button(size="mini" @click="dbclick(scope.row)") 编辑
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
        el-row
            DialogBox(ref="childMethod")
        el-row
            CreateDialogBox(ref="creaeteChildMethod")
</template>

<script>
    import * as types from '../../../store/types'
    import DialogBox from './UpdateDialogBox.vue'
    import CreateDialogBox from './CreateDialogBox.vue'
    import { mapState } from 'vuex'
    export default {
        components:{
            DialogBox,
            CreateDialogBox
        },
        computed:{
            ...mapState([
                'allStaffInfo',
                'postInfo',
                'departmentInfo',
                'createStaffRes',
                'deleteStaffRes',
            ]),
            staffCount () {
                return this.staffInfo.length;
            },
            pageCount(){
                return parseInt(this.staffCount/this.pageSize)+1;
            },
            //计算当前分页的数据
            pagingStaffInfo(){
                let currentPageStaffInfo=[];
                if(this.searchValue===''){
                    this.init();
                    let currentPageHeaderIndex=(this.currentPage-1)*this.pageSize;
                    let currentPageTailIndex='';
                    if(this.currentPage===this.pageCount){
                        currentPageTailIndex = currentPageHeaderIndex + this.staffCount % this.pageSize - 1;
                    }else{
                        currentPageTailIndex=currentPageHeaderIndex+this.pageSize-1;
                    }
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
                emptyStaff:{},
            }
        },
        methods: {
            dbclick(row){
                this.$refs.childMethod.editStaffInfo(row);
                //console.log(row);
                //console.log(event);
            },
            createStaff(){
                this.$refs.creaeteChildMethod.createStaff();
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

            handleEdit(scope) {
                console.log(scope);
                //console.log(row);
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该员工, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$store.dispatch(types.DELETE_STAFF,{id:row.employee_id});
                    this.$store.dispatch(types.GET_ALL_STAFF_INFO);
                    this.$store.dispatch(types.GET_POST_MAP_DEPARTMENT);
                    if(this.deleteStaffRes.statusCode==='200240'){
                        this.$notify.success({
                            title: '删除成功！',
                            duration:2000,
                        });
                    }else if(this.deleteStaffRes.statusCode==='40241'){
                        this.$notify.error({
                            title: '删除的值不存在！',
                            duration:2000,
                        });
                    }else{
                        this.$notify.error({
                            title: '其他错误！',
                            message: this.deleteStaffRes,
                            duration:6000,
                        });
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration:2000
                    });
                });


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
