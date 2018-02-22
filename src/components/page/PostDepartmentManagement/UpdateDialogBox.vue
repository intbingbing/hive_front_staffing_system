<template lang="pug">
    section
        el-dialog(title="信息修改" :visible.sync="showDialog" width="40%" :show-close="false")
            el-form(:model="tmpNodeData" size="small" label-position="right"  label-width="80px")
                el-row
                    el-col(:span="18")
                        el-form-item(:label="tmpNodeData.department_is_department?'部门名':'职位名'")
                            el-input(v-model="tmpNodeData.label")
                        el-form-item(label="属性")
                            el-select(v-model="tmpNodeData.department_is_department")
                                el-option(v-for="val of this.$store.state.propertySelect"
                                    :key="val.value" :label="val.label" :value="val.value")
                        el-form-item(label="所在部门" v-if="tmpNodeData.department_pid!==0")
                            el-select(v-model="tmpNodeData.department_pid")
                                el-option(v-for="val of departmentGroup"
                                    :key="val.department_id" :label="val.department_name" :value="val.department_id")
            div(slot="footer" class="dialog-footer")
                el-button(size="small" @click="showDialog=false") 取 消
                el-button(type="primary" size="small" @click="submitCreate") 确 定
</template>
<script>
    export default {
        data() {
            return {
                showDialog: false,
                tmpNodeData:{},
                confirmNodeData:{},
                departmentGroup:[],
            };
        },
        methods:{
            changeDialogStatus(node){
                //console.log(node.data);
//                console.log(typeof node);
                this.showDialog = true;
                for(let key in node.data){
                    this.$set(this.tmpNodeData,key,node.data[key])
                }
            },
            submitCreate(){

            },
        },
        mounted(){
            for(let val of this.$store.state.test){
                if(val.department_is_department===1){
                    this.departmentGroup.push(val);
                }
            }
        }
    };
</script>

<style scoped>
    .el-select,.el-input{
        width:100%;
    }
</style>
