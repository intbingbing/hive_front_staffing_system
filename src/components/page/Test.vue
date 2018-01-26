<template lang="pug">
    div
        h1 WELCOME!
        p
            router-link(to="a") 去A
            router-link(to="b") 去B
        hr
        router-view
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        mounted:function () {
            console.log(this.$route);
            console.log(this.$router);
            //this.$router.push('/')
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                console.log('sssss')
            }
        },
        beforeRouteUpdate (to, from, next){
            // react to route changes...
            // don't forget to call next()
            console.log(to);
            console.log(from);
            console.log(next);
        }
    }
</script>
