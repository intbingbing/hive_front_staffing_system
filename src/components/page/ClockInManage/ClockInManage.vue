<template lang="pug">
    section
        div
            el-row(style="margin:0")
                el-col
                    el-button(size="mini" @click="exportExcel") 导出
        div#attendance
        ClockInRateTable
</template>

<script>
    import { mapState } from 'vuex'
    import ClockInRateTable from './ClockInRateTable.vue'
    import * as echarts from 'echarts'
    import * as vintage from '../../../../theme/vintage'
    export default {
        components:{
            ClockInRateTable
        },
        computed: {
            ...mapState([
                'getClockInRes',
            ]),
        },
        data() {
            return {
                selectClockInDate:[],
                charts: '',
                chartsSource:[],
                opinion:[],
                opinionData:[],
                getClockInRateTag:''
            }
        },
        methods: {
            exportExcel() {
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['ID', '姓名', '职位', '部门', '权限', '薪水',
                        '学历', '专业', '工作年限', '入职时间', '联系方式', '身份证号码', '住址'];
                    const filterVal = ['employee_id', 'employee_name', 'post_name', 'department_name',
                        'permissions_des', 'employee_salary', 'employee_edu', 'employee_professional',
                        'employee_work_seniority', 'employee_entry_time', 'employee_phone',
                        'employee_identity_card_number','employee_address'];
                    const list = this.selectEmployeeArr;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel(tHeader, data, '员工信息表')
                })
            },
            drawPie(id){
                this.charts = echarts.init(document.getElementById(id));
                this.charts.setOption({

                    backgroundColor:'#fff',
                    dataset: {
                        source: this.chartsSource
                    },
                    title: {text: '近5天出勤率趋势'},
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        right:'8%',
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {type: 'category',},
                    yAxis: {
                        type: 'value',
                        axisLabel:{
                            formatter:'{value}%'
                        },
                        min:value=>parseInt(value.min-1),
                        max:value=>parseInt(value.max+1),
                    },
                    series: [
                        {type:'line', smooth: true,},
                        {type:'line', smooth: true,},
                        {type:'line', smooth: true,}
                    ]
                })
            }
        },
        mounted:async function () {
            this.selectClockInDate = ['20180219','20180220','20180221','20180222','20180223'];
            this.$store.commit(this.$types.CLEAR_CLOCK_IN_RATE);
            //let promises = this.selectClockInDate.map(date => this.$store.dispatch(this.$types.GET_CLOCK_IN,{date}));
            for(let index in this.selectClockInDate){
                await this.$store.dispatch(this.$types.GET_CLOCK_IN,{date:this.selectClockInDate[index]});
            }
            let tmp = [];
            tmp.push(['日期','出勤率','准时上班率','准时下班率']);
            //await this.$store.dispatch(types.GET_ALL_STAFF_INFO);
            //{"date":"2018-02-23","attendance_rate":1,"clock_in_punctuality_rate":1,"clock_out_punctuality_rate":1}
            for(let val of this.getClockInRes){
                tmp.push([val.date,val.attendance_rate*100,val.clock_in_punctuality_rate*100,val.clock_out_punctuality_rate*100])
            }
            this.chartsSource = tmp;
            //await this.$store.dispatch(this.$types.GET_CLOCK_IN,{ date : this.selectClockIn} );
            this.$nextTick(function() {
                this.drawPie('attendance')
            })
            //this.init();
        },
        watch: {
        },
    }
</script>
<style lang="less" scoped>
    section{
        #attendance{
            width: 1000px;
            height: 300px;
        }
        .el-col{
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
        }
    }
</style>
