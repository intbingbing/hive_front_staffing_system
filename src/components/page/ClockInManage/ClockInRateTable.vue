<template lang="pug">
    section
        el-row
            el-col(:span="24")
                //row-dblclick:双击行事件(row,event),row当前行对象；select:手动勾选box事件，selection：选中的对象数组,row，本次勾选行对象；
                el-table(:data="this.$store.state.getClockInRes" border size="mini" stripe)
                    el-table-column(prop="date" label="日期")
                    el-table-column(prop="attendance_rate" label="到岗率")
                    el-table-column(prop="clock_in_punctuality_rate" label="按时上班率")
                    el-table-column(prop="clock_out_punctuality_rate" label="按时下班率")
</template>

<script>
    export default {
        name: ''
    }
</script>

<style scoped>

</style>
