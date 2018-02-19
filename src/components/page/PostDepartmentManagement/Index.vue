<template lang="pug">
    section
        el-row
            el-col(:span="12")
                div.custom-tree-container
                    el-tree(:data="tmpData"
                        node-key="value"
                        accordion
                        ref="tree"
                        @node-click="nodeClick"
                        expand-on-click-node
                        :default-expanded-keys="[6]"
                        :expand-on-click-node="false"
                        :render-content="renderContent")
                    el-button(@click="getNode") test
                    el-button(@click="") newFormDialogBox
        el-row
            el-col
                UpdateDialogBox(ref="updateDialogBox")
</template>
<script>
    import { mapState } from 'vuex'
    import UpdateDialogBox from './UpdateDialogBox.vue'
    export default {
        components:{
            UpdateDialogBox
        },
        computed: {
            ...mapState([
                'postCascader',
                'departmentInfo',
                'postInfo',
                'test'
            ]),
        },
            data() {
                return {
                    tmpData: [],
                    maxID: '',
                }
            },
            methods: {
                appendDepartment(data, node) {
                    this.$prompt('请输入<strong><span style="color:#ff7825">部门</span></strong>名', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then((inputContent) => {
                        const newChild = {
                            value: this.maxID + 1,
                            department_pid: data.value,
                            department_is_department: 1,
                            label: inputContent.value,
                            children: []
                        };
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }
                        data.children.push(newChild);
                        this.maxID++;
                    }).catch(() => {
                    });
                },

                appendPost(data, node) {
                    this.$prompt('请输入<strong><span style="color:#ff7825">职位</span></strong>名', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then((inputContent) => {
                        const newChild = {
                            value: this.maxID + 1,
                            department_pid: data.value,
                            department_is_department: 0,
                            label: inputContent.value,
                            children: []
                        };
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }
                        data.children.push(newChild);
                        this.maxID++;
                    }).catch(() => {
                    });
                },

                update(data,node){
                    console.log(node)
                },
                treeToJson(tree){
                    //console.log(tree);
                    let arJsonData = tree;
                    let arJson = [];    //格式化后数据
                    function refining(arJsonData,arJson) {//将嵌套的JSON对象遍历出来，转为二维数组
                        for (let i = 0; i < arJsonData.length; i++) {
                            arJson.push({department_id:arJsonData[i].value,department_name:arJsonData[i].label,
                                department_pid:arJsonData[i].department_pid,department_is_department:arJsonData[i].department_is_department});
                            if(arJsonData[i].children){
                                refining(arJsonData[i].children,arJson);
                            }
                        }
                    }
                    refining(arJsonData,arJson);
                    //console.log(arJson)
                    return arJson;
                },

                getNode(){
                    //this.treeToJson(1);
                    //console.log(this.$refs.tree.root.data);
                    console.log(this.treeToJson(this.$refs.tree.root.data));
                    //this.treeToJson(this.$refs.tree.root.data);
                },
                openDialog(node) {
                    this.$refs.updateDialogBox.changeDialogStatus(node);
                },
                nodeClick() {
                },
                remove(node, data) {
                    console.log(node);
                    //console.log(data===this.tmpData);
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.value === data.value);
                    children.splice(index, 1);
                },

                renderContent(h, { node, data, store }) {
                    return (
                        <span class="custom-tree-node">
                            <span>{node.label}</span>
                            <span>
                                <el-button type="text" size="small" icon="el-icon-circle-plus-outline" on-click={ () => this.appendDepartment(data,node) }>部门</el-button>
                                <el-button type="text" size="small" icon="el-icon-circle-plus-outline" on-click={ () => this.appendPost(data,node) }>职位</el-button>
                                <el-button type="text" size="small" icon="el-icon-edit" on-click={ () => this.openDialog(node) }>修改</el-button>
                                <el-button type="text" size="small" icon="el-icon-delete" on-click={ () => this.remove(node, data) }>删除</el-button>
                            </span>
                        </span>);
                }
            },
            mounted() {
//            /**
//             * json格式转树状结构
//             * @param   {json}      json数据
//             * @param   {String}    id的字符串
//             * @param   {String}    父id的字符串
//             * @param   {String}    children的字符串
//             * @return  {Array}     数组
//             */
                this.maxID = this.test[this.test.length - 1]['department_id'];

                function transData(a, idStr, pidStr, chindrenStr) {
                    let r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0,
                        len = a.length;
                    for (; i < len; i++) {
                        hash[a[i][id]] = a[i];
                    }
                    for (; j < len; j++) {
                        let aVal = a[j], hashVP = hash[aVal[pid]];
                        if (hashVP) {
                            !hashVP[children] && (hashVP[children] = []);
                            hashVP[children].push(aVal);
                        } else {
                            r.push(aVal);
                        }
                    }
                    return r;
                }
                //格式转换，字段替换
                this.tmpData = transData(this.test, 'department_id', 'department_pid', 'children');
                let tmpStr = JSON.stringify(this.tmpData);
                tmpStr = tmpStr.replace(/department_id/g, "value");
                tmpStr = tmpStr.replace(/department_name/g, "label");
                this.tmpData = JSON.parse(tmpStr);

                //this.$refs.tree.updateKeyChildren(1,[{label:'上海把弄湿',value:100}])
                //console.log(this.maxID)
                //console.log(this.tmpData);


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
