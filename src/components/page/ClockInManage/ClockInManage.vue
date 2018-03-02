<template lang="pug">
    section
        div
            el-row(style="margin:0")
                el-col
                    el-tooltip.item(effect="dark" content="导出当天所有员工打卡记录" placement="right")
                        el-button(type="primary" size="mini" @click="exportExcel" :loading="loadingStatus") 导出
        div#attendance
        ClockInRateTable(:parentAttendRate="toSonDepartRate")
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
                'getAttendanceRes',
                'getDepartmentAttendanceRes',
            ]),
        },
        data() {
            return {
                selectClockInDate:[],
                charts: '',
                chartsAttendanceRate:[],
                chartsDepartmentRate:[],
                toSonDepartRate:[],
                opinion:[],
                opinionData:[],
                getClockInRateTag:'',
                loadingStatus:false
            }
        },
        methods: {
            async exportExcel() {
                this.loadingStatus=true;
                await this.$store.dispatch(this.$types.GET_ATTENDANCE,{date:'20180220'});
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['ID', '姓名', '职位', '部门', '签到时间', '签退时间'];
                    const filterVal = ['employee_id', 'employee_name', 'association_name', 'department_name', 'attendance_am', 'attendance_pm'];
                    const list = this.getAttendanceRes;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel(tHeader, data, '员工签到信息表')
                });
                this.loadingStatus=false;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //echats配置
            drawLine(id){
                this.charts = echarts.init(document.getElementById(id));
                this.charts.setOption({
                    dataset:[
                        {source: this.chartsAttendanceRate},
                        {source: this.chartsDepartmentRate},
                    ],
                    title: [
                        {text: '近5天出勤率趋势总览',left:'20%'},
                        {text: '各部门平均出勤率',right:'20%'},
                    ],
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: [
                        {orient:'vertical',itemGap:7,left:'5px',bottom:'5px',data:[
                            {name: '出勤率',},
                            {name: '准时上班率',},
                            {name: '准时下班率',}
                            ]
                        },
                        {orient:'vertical',itemGap:7,right:'5px',bottom:'5px',data:[
                            {name: '总裁办',},
                            {name: '技术部',},
                            {name: '开发一部',},
                            {name: '运维部',},
                            {name: '财务部',},
                            {name: '行政部',},
                            {name: '市场部',},
                            {name: '运营部',},
                        ]},
                    ],
                    grid: [
                        {left: '10%',right:'62%'},
                        {left: '46%',right:'10%'},
                    ],
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis:[
                        {type: 'category',gridIndex: 0},
                        {type: 'category',gridIndex: 1},
                    ],
                    yAxis:[
                        {
                            type: 'value',
                            axisLabel:{
                                formatter:'{value}%'
                            },
                            min:value=>parseInt(value.min-1),
                            max:value=>parseInt(value.max+1),
                            gridIndex: 0,
                            position:'right',
                        },
                        {
                            type: 'value',
                            axisLabel:{
                                formatter:'{value}%'
                            },
                            min:value=>parseInt(value.min-1),
                            max:value=>parseInt(value.max+1),
                            gridIndex: 1
                        },
                    ],
                    series: [
                        {type:'line', smooth: true,xAxisIndex:0,yAxisIndex:0,datasetIndex:0,},
                        {type:'line', smooth: true,xAxisIndex:0,yAxisIndex:0,datasetIndex:0,},
                        {type:'line', smooth: true,xAxisIndex:0,yAxisIndex:0,datasetIndex:0,},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                        {type:'line', smooth: true,xAxisIndex:1,yAxisIndex:1,datasetIndex:1},
                    ]
                });
                window.onresize=this.charts.resize;
            },
            async init(){
                this.selectClockInDate = ['20180219','20180220','20180221','20180222','20180223'];
                this.$store.commit(this.$types.CLEAR_CLOCK_IN_RATE);
                this.$store.commit(this.$types.CLEAR_DEPARTMENT_ATTENDANCE_RATE);
                //let promises = this.selectClockInDate.map(date => this.$store.dispatch(this.$types.GET_CLOCK_IN,{date}));
                for(let index in this.selectClockInDate){
                    await this.$store.dispatch(this.$types.GET_CLOCK_IN,{date:this.selectClockInDate[index]});
                    await this.$store.dispatch(this.$types.GET_DEPARTMENT_ATTENDANCE_RATE,{date:this.selectClockInDate[index]});
                }
                let tmpAttendance = [];
                tmpAttendance.push(['日期','出勤率','准时上班率','准时下班率']);
                //await this.$store.dispatch(types.GET_ALL_STAFF_INFO);
                //{"date":"2018-02-23","attendance_rate":1,"clock_in_punctuality_rate":1,"clock_out_punctuality_rate":1}
                for(let val of this.getClockInRes){
                    tmpAttendance.push([val.date,parseFloat((val.attendance_rate*100).toFixed(2)),parseFloat((val.clock_in_punctuality_rate*100).toFixed(2)),parseFloat((val.clock_out_punctuality_rate*100).toFixed(2))])
                }
                this.chartsAttendanceRate = tmpAttendance;
                //await this.$store.dispatch(this.$types.GET_CLOCK_IN,{ date : this.selectClockIn} );

                let tmpDepartRate = [];
                let tmpContainer = ['日期'];
                for(let departVal of this.getDepartmentAttendanceRes[0]){
                    tmpContainer.push(departVal.department_name);
                }
                tmpDepartRate.push(tmpContainer);
                for(let dateVal of this.getDepartmentAttendanceRes){
                    tmpContainer = [];
                    for(let departVal of dateVal){
                        tmpContainer[0] = departVal.date;
                        if(departVal.attendance_rate===undefined){
                            departVal.attendance_rate=0;
                        }
                        if(departVal.clock_in_rate===undefined){
                            departVal.clock_in_rate=0;
                        }
                        if(departVal.clock_out_rate===undefined){
                            departVal.clock_out_rate=0;
                        }
                        tmpContainer.push((parseFloat((((departVal.attendance_rate + departVal.clock_in_rate + departVal.clock_out_rate)/3*100)).toFixed(2))));
//                        if(departVal.department_id===3){
//                            console.log(departVal.attendance_rate );
//                            console.log(departVal.clock_in_rate );
//                            console.log(departVal.clock_out_rate );
//                        }
                    }
                    tmpDepartRate.push(tmpContainer);
                }
                this.chartsDepartmentRate = tmpDepartRate;
                for(let arrVal of this.chartsDepartmentRate){
                    let tmpObj = {};
                    for(let index in arrVal){
                        tmpObj[index] = arrVal[index];
                        //this.toSonDepartRate.push({})
                    }
                    this.toSonDepartRate.push(tmpObj);
                }
                //console.log(this.toSonDepartRate);
                //console.log(this.chartsAttendanceRate);
                //console.log(JSON.stringify(tmpDepartRate));
                this.$nextTick(function() {
                    this.drawLine('attendance');
                })


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
        #attendance{
            width: 100%;
            height: 300px;
        }
        .el-col{
            position: absolute;
            z-index:10;
        }
        /*.el-col{*/
            /*display: flex;*/
            /*justify-content: flex-end;*/
            /*align-items: flex-end;*/
            /*margin-bottom: 10px;*/
        /*}*/
    }
</style>
