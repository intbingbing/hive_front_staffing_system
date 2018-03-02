<template lang="pug">
    section
        el-row
            el-col(:span="10")
                //row-dblclick:双击行事件(row,event),row当前行对象；select:手动勾选box事件，selection：选中的对象数组,row，本次勾选行对象；
                el-table(:data="this.$store.state.getClockInRes" border size="mini" stripe)
                    el-table-column(prop="date" label="日期")
                    el-table-column(prop="attendance_rate" label="到岗率")
                    el-table-column(prop="clock_in_punctuality_rate" label="按时上班率")
                    el-table-column(prop="clock_out_punctuality_rate" label="按时下班率")
            el-col(:span="14")
                el-table(:data="parentAttendRate" border size="mini" stripe :show-header="false")
                    el-table-column(prop="0" width="100px" fixed="left")
                    el-table-column(prop="1")
                    el-table-column(prop="2")
                    el-table-column(prop="3")
                    el-table-column(prop="4")
                    el-table-column(prop="5")
                    el-table-column(prop="6")
                    el-table-column(prop="7")
                    el-table-column(prop="8")
</template>

<script>
    export default {
        name: '',
        props:['parentAttendRate'],
        mounted:function () {
            //console.log(this.props);
        }
    }
</script>

<style scoped lang="less">
    .el-row{
        .el-col{
            padding-right: 5px;
        }
        .el-col{
            padding-left: 5px;
        }
    }
</style>
