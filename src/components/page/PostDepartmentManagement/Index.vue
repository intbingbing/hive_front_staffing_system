<template lang="pug">
    section
        <!--el-row-->
            <!--el-col-->
                <!--el-button(@click="clickTest") 点击-->
                <!--el-button-group-->
                    <!--el-button(type="primary" size="small" icon="el-icon-edit" @click="batchEdit") 修改-->
                    <!--el-button(type="danger" size="small" icon="el-icon-delete" @click="batchRemove") 删除-->
        el-row
            el-col(:span="12")
                div.custom-tree-container
                    el-tree(:data="tmpData"
                        :props="valueName"
                        node-key="association_id"
                        ref="tree"
                        @node-click="nodeClick"
                        expand-on-click-node
                        :highlight-current="true"
                        :default-expanded-keys="[1]"
                        :expand-on-click-node="false"
                        :render-content="renderContent"
                        :indent="20")
        el-row
            el-col
                UpdateDialogBox(ref="updateDialogBox")
        <!--el-row-->
            <!--el-col-->
                <!--BatchUpdateDialogBox(ref="batchUpdateDialogBox")-->
</template>
<script>
    import { mapState } from 'vuex'
    import UpdateDialogBox from './UpdateDialogBox.vue'
    //import BatchUpdateDialogBox from './BatchUpdateDialogBox.vue'
    export default {
        components:{
            UpdateDialogBox,
            //BatchUpdateDialogBox
        },
        computed: {
            ...mapState([
                'postCascader',
                'departmentInfo',
                'postInfo',
                'postMapDepartmentInfo',
                'valueName',
                'deleteAssociationRes',
                'createAssociationRes'
            ]),
        },
        data() {
            return {
                tmpData: [],
                maxID: '',
            }
        },
        methods: {
            clickTest(){
                console.log(this.$refs.tree.getCheckedNodes());
            },
//            batchEdit(){
//                if(this.$refs.tree.getCheckedNodes().length!==0){
//                    this.$refs.batchUpdateDialogBox.changeDialogStatus(this.$refs.tree.getCheckedNodes());
//                }else{
//                    this.$notify.error({title: '未选中数据！', duration:2000,});
//                }
//            },
//            batchRemove(){
//
//            },
            appendDepartment(data, node) {
                if(data.association_is_department===1){
                    this.$prompt('请输入<strong><span style="color:#ff7825">部门</span></strong>名', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(async (inputContent) => {
                        const newChild = {
                            association_id: this.maxID + 1,
                            association_pid: data.association_id,
                            association_is_department: 1,
                            association_name: inputContent.value,
                            children: []
                        };
                        await this.$store.dispatch(this.$types.CREATE_ASSOCIATION,newChild);
                        await this.$store.dispatch(this.$types.INIT);
                        if(this.createAssociationRes.statusCode==='200210'){
                            this.$notify.success({title: '部门添加成功！', duration:2000});
                        }else{
                            this.$notify.error({title: '其他错误！', message: this.deleteAssociationRes, duration:6000,});
                        }
                        //this.maxID++;
                    }).catch(() => {
                    });
                }else{
                    this.$notify.error({
                        title: '职位不应添加子项目！',
                        message:'请修改属性为部门',
                        duration:4000,
                    });
                }
            },

            appendPost(data, node) {
                if(data.association_is_department===1){
                    this.$prompt('请输入<strong><span style="color:#ff7825">职位</span></strong>名', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(async (inputContent) => {
                        const newChild = {
                            association_id: this.maxID + 1,
                            association_pid: data.association_id,
                            association_is_department: 0,
                            association_name: inputContent.value,
                            children: []
                        };
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }
                        data.children.push(newChild);
                        this.maxID++;
                        await this.$store.dispatch(this.$types.CREATE_ASSOCIATION,newChild);
                        await this.$store.dispatch(this.$types.INIT);
                        if(this.createAssociationRes.statusCode==='200210'){
                            this.$notify.success({title: '职位添加成功！', duration:2000});
                        }else{
                            this.$notify.error({title: '其他错误！', message: this.deleteAssociationRes, duration:6000,});
                        }
                        //await this.$store.dispatch(this.$types.GET_POST_MAP_DEPARTMENT);
                        //await this.$store.dispatch(this.$types.GET_POST_CASCADER);
                        //await this.$store.dispatch(this.$types.INIT);
                    }).catch(() => {
                    });
                }else{
                    this.$notify.error({
                        title: '职位不应添加子项目！',
                        message:'请修改属性为部门',
                        duration:4000,
                    });
                }
            },

            update(data,node){
                //console.log(node)
            },

            getNode(){
                //console.log(this.$utils.searchSonIDArr(3,this.postMapDepartmentInfo));
            },
            openDialog(node) {
                this.$refs.updateDialogBox.changeDialogStatus(node);
            },
            nodeClick() {
            },
            remove(node, data) {
                //console.log(JSON.stringify(node.data));
                let removeArr=[];
                let singleJson = this.$utils.treeToJson([node.data]);
                for(let val of singleJson){
                    removeArr.push(val.association_id);
                }
                removeArr.reverse();
                //console.log(data===this.tmpData);
                this.$confirm('此操作将删除该信息及其子选项, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async ()=>{
                    //并行异步请求
                    let promises = removeArr.map(id => this.$store.dispatch(this.$types.DELETE_ASSOCIATION,{id}));
                    for(let promise of promises){
                        await promise;
                    }
                    //await this.$store.dispatch(this.$types.DELETE_ASSOCIATION,{id:node.data.association_id});
                    await this.$store.dispatch(this.$types.INIT);
                    if(this.deleteAssociationRes.statusCode==='200240'){
                        this.$notify.success({title: '删除成功！', duration:2000});
                    }else if(this.deleteAssociationRes.statusCode==='40221'){
                        this.$notify.error({title: '没有要删除的值！', duration:2000,});
                    }else{
                        this.$notify.error({title: '其他错误！', message: this.deleteAssociationRes, duration:6000,});
                    }
//                    const parent = node.parent;
//                    const children = parent.data.children || parent.data;
//                    const index = children.findIndex(d => d.value === data.value);
//                    children.splice(index, 1);
                }).catch(()=>{})
            },

            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                        <span>{node.label}</span>
                        <span>
                            <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" on-click={ () => this.appendDepartment(data,node) }>部门</el-button>
                            <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" on-click={ () => this.appendPost(data,node) }>职位</el-button>
                            <el-button type="text" size="medium" icon="el-icon-edit" on-click={ () => this.openDialog(node) }>修改</el-button>
                            <el-button type="text" size="medium" icon="el-icon-delete" on-click={ () => this.remove(node, data) }>删除</el-button>
                        </span>
                    </span>);
            }
        },
        mounted() {
            this.maxID = this.postMapDepartmentInfo[this.postMapDepartmentInfo.length - 1]['association_id'];
            this.tmpData = JSON.parse(JSON.stringify(this.postCascader));
        },
        watch:{
            postCascader(newValue,oldValue){
                this.tmpData = JSON.parse(JSON.stringify(newValue));
            }
        }
    }
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
