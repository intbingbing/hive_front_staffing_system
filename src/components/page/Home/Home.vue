<template lang="pug">
    section
        el-row
            el-col
        el-row
            el-col(:span="8")
                div#timer
                    el-row
                        el-col(:span="8")
                            div#time {{hour|fillDecade}}:{{minute|fillDecade}}
                        el-col(:span="8")
                            div
                                div {{year}}-{{month|fillDecade}}-{{day|fillDecade}}
                                div {{week|formatWeek}}
</template>

<script>
    export default {
        name: '',
        computed:{

        },
        data:function () {
            return {
                timer:0,
                year :'',
                month:'',
                day :'',
                hour :'',
                minute:'',
                week:'',
            }
        },
        methods:{
            init(){
                let date=new Date();
                this.year = `${date.getFullYear()}`;
                this.month= `${date.getMonth()+1}`;
                this.day = `${date.getDate()}`;
                this.hour = `${date.getHours()}`;
                this.minute= `${date.getMinutes()}`;
                this.week= `${date.getDay()}`;
                setInterval(()=>++this.timer,1000);
            }
        },
        mounted:function () {
            this.init();
        },
        filters: {
            fillDecade: function (value) {
                return value.length===2?value:`0${value}`;
            },
            formatWeek: function (value) {
                value = Number(value);
                switch(value){
                    case 0:
                        return 'Sunday';
                    case 1:
                        return 'Monday';
                    case 2:
                        return 'Tuesday';
                    case 3:
                        return 'Wednesday';
                    case 4:
                        return 'Thursday';
                    case 5:
                        return 'Friday';
                    case 6:
                        return 'Saturday'
                }
            },
        },
        watch:{
            timer(oldVal,newVal){
                let date=new Date();
                this.year = `${date.getFullYear()}`;
                this.month= `${date.getMonth()+1}`;
                this.day = `${date.getDate()}`;
                this.hour = `${date.getHours()}`;
                this.minute= `${date.getMinutes()}`;
                this.week= `${date.getDay()}`;
            }
        }
    }
</script>

<style scoped lang="less">
    section{
        height: 100%;
        .el-row{
            height: 25%;
            .el-col{

            }

        }
        .el-row{
            height: 26%;
            .el-col{
                height: 100%;
                #timer{
                    background: rgba(0,0,0,0.5);
                    height: 100%;
                    color:#fff;
                    .el-row{
                        .el-col{
                            div{
                            }
                        }
                    }
                }
            }

        }
    }

    #time{
        font-size: 40px;
        font-weight: 500;
    }

    .el-col{
        div{
            font-size: 10px;
            font-weight: 200;
            div{

            }
            div{

            }
        }
    }
</style>
