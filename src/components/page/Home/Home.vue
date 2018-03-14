<template lang="pug">
    section
        el-row
            el-col
        el-row
            el-col(:span="8")
                div#timer
                    div#time {{hour|fillDecade}}:{{minute|fillDecade}}
                    div
                        div {{year}}-{{month|fillDecade}}-{{day|fillDecade}}
                        div#week {{week|formatWeek}}
                    div#weather
                        |Hello,
                        strong &nbsp;{{loginInfo.username}}&nbsp;!
                        |今天
                        strong &nbsp;{{weather.location.name}}
                        span &nbsp;天气
                        strong &nbsp;{{weather.now.text}} !
                        br/
                        span 最近更新：{{weather.last_update}}
        el-row
            el-col(:span="24")
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: '',
        computed:{
            ...mapState([
                'loginInfo',
            ]),
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
                weather:{"location":{"id":"","name":"","country":"","path":"","timezone":"","timezone_offset":""},"now":{"text":"","code":"","temperature":""},"last_update":""}
            }
        },
        methods:{
            async init(){
                this.weather = await this.$api.getWeather();
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
        .el-row:nth-child(1){
            height: 20%;
            .el-col{

            }

        }
        .el-row:nth-child(2){
            height: 20%;
            .el-col{
                height: 100%;
                #timer{
                    background: rgba(0,0,0,0.5);
                    height: 100%;
                    color:#fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-bottom: 10px;
                    position: relative;
                }
            }
        }
        .el-row:nth-child(3){
            margin: 20px -20px -20px -20px ;
            height: 60%;
            //background-color: rgba(200,200,200,0.5);
        }
    }

    #time{
        font-size: 45px;
        font-weight: 500;
        padding: 0 20px;
        padding-bottom: 30px;
    }
    #timer>div>div{
        padding: 0 20px;
        font-size: 15px;
        font-weight: 200;
    }
    #timer>div>#week{
        padding-bottom: 30px;
    }

    #weather{
        position: absolute;
        height: 50px;
        bottom: 0;
        font-size: 15px;
        padding-top: 10px;
        padding-left: 40px;
        font-weight: 200;
        width: 100%;
        span{
            display: inline-block;
        }
    }
</style>
