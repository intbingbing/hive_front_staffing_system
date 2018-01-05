<template lang="pug">
    el-tabs
        el-tab-pane(label="查询")
            Read
        el-tab-pane(label="增加") 增加
        el-tab-pane(label="删除") 删除
        el-tab-pane(label="修改") 修改
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
        <!--<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>-->
        <!--<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>-->
        <!--<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
        <!--<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    <!--</el-tabs>-->
</template>
<script>
    import Read from './Read'
    export default {
        data() {
            return {
                //activeName: 'second'
            };
        },
        components:{
            Read
        },
        methods: {
            // handleClick(tab, event) {
            //     console.log(tab, event);
            // }
        }
    };
</script>
