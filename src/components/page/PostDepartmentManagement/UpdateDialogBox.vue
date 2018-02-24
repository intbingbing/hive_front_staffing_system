<template lang="pug">
    section
        el-dialog(title="信息修改" :visible.sync="showDialog" width="40%" :show-close="false")
            el-form(:model="tmpNodeData" size="small" label-position="right"  label-width="80px")
                el-row
                    el-col(:span="18")
                        el-form-item(:label="tmpNodeData.association_is_department?'部门名':'职位名'")
                            el-input(v-model="tmpNodeData.association_name")
                        el-form-item(label="属性")
                            el-select(v-model="tmpNodeData.association_is_department")
                                el-option(v-for="val of this.$store.state.propertySelect"
                                    :key="val.value" :label="val.label" :value="val.value")
                        el-form-item(label="所在部门" v-if="tmpNodeData.association_pid!==0")
                            el-select(v-model="tmpNodeData.association_pid")
                                el-option(v-for="val of departmentGroup"
                                    :key="val.association_id" :label="val.association_name" :value="val.association_id")
            div(slot="footer" class="dialog-footer")
                el-button(size="small" @click="showDialog=false") 取 消
                el-button(type="primary" size="small" @click="submitUpdate") 确 定
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState([
                'departmentInfo',
                'postInfo',
                'postMapDepartmentInfo',
                'updateAssociationRes',
            ]),
        },
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
                //console.log(node);
//                console.log(typeof node);
                this.showDialog = true;
                for(let key in node.data){
                    this.$set(this.tmpNodeData,key,node.data[key])
                }
                //console.log(this.tmpNodeData)

                for(let key in this.departmentInfo){
                    this.$set(this.departmentGroup,key,this.departmentInfo[key]);
                }
            },
            async submitUpdate(){
                //console.log(this.tmpNodeData);
                this.showDialog = false;
                let childIDArr = this.$utils.searchSonIDArr(this.tmpNodeData.association_id,this.postMapDepartmentInfo);
                if(childIDArr.includes(this.tmpNodeData.association_pid)){
                    this.$notify.error({
                        title: '错误',
                        message: '不能移动至自己的后代节点！',
                        duration:6000,
                    });
                }else{
                    let updateObj = {association_id:this.tmpNodeData.association_id, association_name:this.tmpNodeData.association_name,
                        association_is_department:this.tmpNodeData.association_is_department,association_pid:this.tmpNodeData.association_pid,};
                    await this.$store.dispatch(this.$types.UPDATE_ASSOCIATION,updateObj);
                    //defaultPostMapDepartment,职位绑定的值赋给tmpStaffInfo完成格式化
                    //await this.$store.dispatch(this.$types.UPDATE_STAFF,this.tmpStaffInfo);
                    await this.$store.dispatch(this.$types.GET_POST_CASCADER);
                    await this.$store.dispatch(this.$types.GET_POST_MAP_DEPARTMENT);
                    //this.$store.dispatch(this.$types.GET_ALL_STAFF_INFO);
                    if(this.updateAssociationRes.statusCode==='200220'){
                        this.$notify.success({
                            title: '更新成功！',
                            duration:2000,
                        });
                    }else if(this.updateAssociationRes.statusCode==='40221'){
                        this.$notify.error({
                            title: '没有要更新的值！',
                            duration:2000,
                        });
                    }else{
                        this.$notify.error({
                            title: '其他错误！',
                            message: this.updateAssociationRes,
                            duration:6000,
                        });
                    }
                }
            },
        },
        mounted(){
        }
    };
</script>

<style scoped>
    .el-select,.el-input{
        width:100%;
    }
</style>
