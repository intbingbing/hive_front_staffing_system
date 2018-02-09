<template>
    <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.val"
            :label="item.label"
            :value="item.val">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    val: '选项1',
                    label: '黄金糕'
                }, {
                    val: '选项2',
                    label: '双皮奶'
                }, {
                    val: '选项3',
                    label: '蚵仔煎'
                }, {
                    val: '选项4',
                    label: '龙须面'
                }, {
                    val: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        }
    }
</script>
