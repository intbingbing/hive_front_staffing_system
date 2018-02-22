<template lang="pug">
    div
        TestChildren
            h4 我是parent
            h4(slot="footer") 我是parent slot="footer"
            h4(slot="header") 我是parent slot="header"
</template>
<script>
    import TestChildren from './TestChildren.vue'
    export default {
        data: function () {
            return {
                msg:''
            }
        },
        components:{
            TestChildren
        },
        methods:{
            change(msg){
                this.msg=msg;
            }
        }
    }
</script>
