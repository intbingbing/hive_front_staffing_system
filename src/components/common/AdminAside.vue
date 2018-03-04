<template lang="pug">
    el-menu(
    class="el-menu-vertical-demo"
    background-color="rgba(0,0,0,0)"
    text-color="rgb(161, 158, 158)"
    active-text-color="#fff"
    v-bind:unique-opened='true'
    :router="true"
    )
        template(v-for="(item, index) in asideGroup")
            template(v-if="item.children[0]")
                el-submenu(:index="item.index")
                    template(slot="title")
                        i(:class="item.icon")
                        span {{ item.title }}
                    el-menu-item(:index="child.index" v-for="(child, i) in item.children" :key="i" :route="{path: child.path}") {{ child.title }}
            template(v-else)
                el-menu-item(:index="item.index" :route="{path: item.path}")
                    i(:class="item.icon")
                    span {{ item.title }}
</template>

<script>
    export default {
        data:function () {
            return {
                asideGroup:[
                    {
                        title:'公告管理',
                        index:'1',
                        icon:'el-icon-document',
                        path:'/user/announcement',
                        children:[]
                    },
                    {
                        title:'人事管理',
                        index:'2',
                        icon:'el-icon-setting',
                        path:'',
                        children:[
                            {
                                title:'公司管理',
                                index:'2-1',
                                path:'/user/personnel_management/company_management',
                            },
                            {
                                title:'部门管理',
                                index:'2-2',
                                path:'/user/personnel_management/department_management',
                            },
                            {
                                title:'职位管理',
                                index:'2-3',
                                path:'/user/personnel_management/position_management',
                            },
                            {
                                title:'员工管理',
                                index:'2-4',
                                path:'/user/personnel_management/staff_management',
                            }
                        ]
                    },
                    {
                        title:'考勤管理',
                        index:'3',
                        icon:'el-icon-view',
                        path:'',
                        children:[
                            {
                                title:'签到签退',
                                index:'3-1',
                                path:'/user/attendance_management/clock_in',
                            },
                            {
                                title:'请假查看',
                                index:'3-2',
                                path:'/user/attendance_management/leave',
                            }
                        ]
                    },
                    {
                        title:'我的部门',
                        index:'4',
                        icon:'el-icon-location-outline',
                        path:'',
                        children:[
                            {
                                title:'部门文件',
                                index:'4-1',
                                path:'/user/my_department/department_file',
                            },
                        ]
                    },
                    {
                        title:'图表',
                        index:'5',
                        icon:'el-icon-sort',
                        path:'/user/chart',
                        children:[]
                    }
                ]
            }
        },
        name: '',
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu{
        border:0;
        padding: 15px;
        /*font-weight: 600;*/
    }
</style>
