<template lang="pug">
    el-tabs
        el-tab-pane(label="查询")
            el-col(:span="12")
                Retrieve
        el-tab-pane(label="增加")
            el-col(:span="8")
                Create
        el-tab-pane(label="修改")
            el-col(:span="8")
                Update
        el-tab-pane(label="删除") 删除
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
        <!--<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>-->
        <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
        <!--<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
        <!--<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    <!--</el-tabs>-->
</template>
<script>
    import Retrieve from './Retrieve'
    import Create from './Create'
    import Update from './Update'
    export default {
        data() {
            return {
                //activeName: 'second'
            };
        },
        components:{
            Retrieve,
            Create,
            Update
        },
        methods: {
            // handleClick(tab, event) {
            //     console.log(tab, event);
            // }
        }
    };
</script>
