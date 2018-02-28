<template lang="pug">
    div#attendance
</template>
<script>
    import * as echarts from 'echarts'
    export default {
        name: '',
        data () {
            return {
                charts: '',
                opinion:[],
                opinionData:[]
            }
        },
        methods:{
            drawPie(id){
                this.charts = echarts.init(document.getElementById(id));
                this.charts.setOption({

                    dataset: {
                        source: [
                            ['日期','出勤率','准时到岗率','准时离岗率'],
                            ['周一',100,98.6,97.6,],
                            ['周二',100,99.6,97.6,],
                            ['周三',100,98.6,97.6,],
                            ['周四',100,97.6,97.6,],
                            ['周五',100,98.6,97.6,],
                            ['周六',100,99.6,97.6,],
                            ['周日',100,98.6,97.6,],
                        ]
                    },
                    title: {text: '测试'},
                    tooltip: {trigger: 'axis'},
                    legend: {},
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
                        min:value=>parseInt(value.min-2),
                        max:value=>parseInt(value.max+2),
                    },
                    series: [
                        {type:'line'},
                        {type:'line'},
                        {type:'line'},
                    ]
                })
            }
        },
        //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('attendance')
            })
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #attendance{
        width: 600px;
        height: 300px;
    }
</style>
