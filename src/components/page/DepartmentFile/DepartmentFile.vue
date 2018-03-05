<template lang="pug">
    section
        el-row
            el-col(:span="4")
                el-upload.upload-demo(:action="submitUrl"
                    :on-preview="handlePreview"
                    :multiple="true"
                    :limit="3"
                    :on-exceed="handleExceed"
                    drag
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess")
                    i.el-icon-upload
                    div.el-upload__text 将文件拖到此处，或
                        em 点击上传
                    div.el-upload__tip(slot="tip") 不能超过5M
                    div.el-upload__tip(slot="tip")
            el-table(:data="getDepartmentFileListRes"  border size="mini")
                el-table-column(prop="name" label="文件名")
                el-table-column(label="创建者")
                    template(slot-scope="scope")
                        span 技术部-技术经理-曹小波
                el-table-column(label="操作")
                    template(slot-scope="scope")
                        el-button(size="mini" type="primary")
                            a(:href="scope.row.url" :download="scope.row.originalname") 下载
                        el-button(size="mini" @click="rename(scope.row)" type="info") 重命名
                        el-button(size="mini" type="danger" @click="deleteFile(scope.row.name)") 删除
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                fileList: [],
                submitUrl:'http://122.112.210.98:3000/user/hive_department_file/'

            };
        },
        computed: {
            ...mapState([
                'getDepartmentFileListRes',
                'deleteFileRes'
            ]),
        },
        methods: {
            deleteFile(fileName){
                this.$confirm('此操作将永久删除文件, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async ()=>{
                    await this.$store.dispatch(this.$types.DELETE_FILE,{name:fileName});
                    if(this.deleteFileRes.code==='200240'){
                        this.$notify.success({title: `删除成功`,duration:2000,});
                        await this.$store.dispatch(this.$types.GET_DEPARTMENT_FILE_LIST);
                    }else{
                        this.$notify.error({title: `删除失败`,message:this.deleteFileRes, duration:6000,});
                    }
                }).catch(()=>{});
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            beforeAvatarUpload(file) {
                //const isJPG = file.type === 'image/jpeg';
                const isLt5M = file.size / 1024 / 1024 < 5;
//
//                if (!isJPG) {
//                    this.$message.error('上传头像图片只能是 JPG 格式!');
//                }
                if (!isLt5M) {
                    this.$message.error('上传大小不能超过 5MB!');
                }
                return isLt5M;
            },
            rename(file) {
                this.$prompt('请输入文件名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:file.originalname
                }).then(async ({ value }) => {
                    await this.$store.dispatch(this.$types.UPDATE_FILE_NAME,{oldPath:file.name,newPath:value});
                    await this.$store.dispatch(this.$types.GET_DEPARTMENT_FILE_LIST)
                }).catch(() => {});
            },
            handleSuccess(response, file, fileList){
                if(response.code==='200210'){
                    this.$notify.success({title: `上传成功`, message:`文件名：${file.name}`,duration:2000,});
                    this.$store.dispatch(this.$types.GET_DEPARTMENT_FILE_LIST);
                }else{
                    this.$notify.error({title: `上传失败`,message:response, duration:2000,});
                }
            },
            async init(){
                await this.$store.dispatch(this.$types.GET_DEPARTMENT_FILE_LIST);
                this.fileList = this.getDepartmentFileListRes ;
            }
        },
        mounted:function () {
            this.init();
        }
    }
</script>
<style scoped>
    a{
        text-decoration:none;
        color:#fff;
    }
    table ,tr,.el-table__row:hover{
    }
</style>
