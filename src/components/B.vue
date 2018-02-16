<template>
    <el-button @click="handleDownload">导出</el-button>
</template>

<style>

</style>

<script>
       export default {
            name: 'exportExcel',
            data() {
                return {
                    list:[
                        {
                            name:'韩版设计时尚风衣大',
                            number:'MPM00112',
                            salePrice:'￥999.00',
                            stocknums:3423,
                            salesnums:3423,
                        },
                        {
                            name:'韩版设计时尚风衣大',
                            number:'MPM00112',
                            salePrice:'￥999.00',
                            stocknums:3423,
                            salesnums:3423,
                        },
                    ],
                    listLoading: true,
                    downloadLoading: false,
                    filename: 'test'
                }
            },
            methods: {
                handleDownload() {
                    //this.downloadLoading = true
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
                        const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums']
                        const list = this.list
                        const data = this.formatJson(filterVal, list)
                        excel.export_json_to_excel(tHeader, data, this.filename)
                        //this.downloadLoading = false
                    })
                },
                formatJson(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => v[j]))
                },

//                export2Excel() {
//                    require.ensure([], () => {
//                        const { export_json_to_excel } = require('@/vendor/Export2Excel');
//                        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
//                        const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums'];
//                        const list = this.list;
//                        const data = this.formatJson(filterVal, list);
//                        export_json_to_excel(tHeader, data, 'test');
//                    })
//                },
//                formatJson(filterVal, jsonData) {
//                    return jsonData.map(v => filterVal.map(j => v[j]))
//                }

//                formatJson(filterVal, jsonData) {
//                    return jsonData.map(v => filterVal.map(j => {
//                        if (j === 'timestamp') {
//                            return parseTime(v[j])
//                        } else {
//                            return v[j]
//                        }
//                    }))
//                }
            }
        }
</script>
