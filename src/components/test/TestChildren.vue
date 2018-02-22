<template lang="pug">
    div



</template>

<script>
    export default {
        name: '',
        methods:{
        },
        data:function () {
            return {
                asideGroup:[
                    {
                        title:'公告管理',
                        children:[]
                    },
                    {
                        title:'人事管理',
                        children:[
                            {
                                title:'公司管理'
                            },
                            {
                                title:'部门管理'
                            },
                            {
                                title:'职位管理'
                            },
                            {
                                title:'员工管理'
                            }
                        ]
                    },
                    {
                        title:'考勤管理',
                        children:[
                            {
                                title:'签到签退'
                            },
                            {
                                title:'请假查看'
                            }
                        ]
                    },
                    {
                        title:'我的部门',
                        children:[
                            {
                                title:'部门文件'
                            },
                        ]
                    },
                    {
                        title:'图表',
                        children:[]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
