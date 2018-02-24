<template>
    <div>
        <div class="block">
            <span class="demonstration">默认 click 触发子菜单</span>
            <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
            </el-cascader>
        </div>
        <div class="block">
            <span class="demonstration">hover 触发子菜单</span>
            <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="selectedOptions2"
                :props="valueName"
                @change="handleChange">
            </el-cascader>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                valueName:{
                    value:'association_id',
                    label:'association_name',
                },
                options: [
                    {
                        "association_id": 1,
                        "association_name": "上海德聚仁和有限公司",
                        "association_is_department": 1,
                        "association_pid": 0,
                        "children": [
                            {
                                "association_id": 2,
                                "association_name": "总裁办",
                                "association_is_department": 1,
                                "association_pid": 1,
                                "children": [
                                    {
                                        "association_id": 10,
                                        "association_name": "CEO",
                                        "association_is_department": 0,
                                        "association_pid": 2
                                    },
                                    {
                                        "association_id": 11,
                                        "association_name": "总裁办助理",
                                        "association_is_department": 0,
                                        "association_pid": 2
                                    }
                                ]
                            },
                            {
                                "association_id": 3,
                                "association_name": "技术部",
                                "association_is_department": 1,
                                "association_pid": 1,
                                "children": [
                                    {
                                        "association_id": 4,
                                        "association_name": "开发一部",
                                        "association_is_department": 1,
                                        "association_pid": 3,
                                        "children": [
                                            {
                                                "association_id": 13,
                                                "association_name": "开发一部主管",
                                                "association_is_department": 0,
                                                "association_pid": 4
                                            },
                                            {
                                                "association_id": 14,
                                                "association_name": "Java开发",
                                                "association_is_department": 0,
                                                "association_pid": 4
                                            },
                                            {
                                                "association_id": 15,
                                                "association_name": "Python开发",
                                                "association_is_department": 0,
                                                "association_pid": 4
                                            },
                                            {
                                                "association_id": 16,
                                                "association_name": "前端开发",
                                                "association_is_department": 0,
                                                "association_pid": 4
                                            }
                                        ]
                                    },
                                    {
                                        "association_id": 5,
                                        "association_name": "运维部",
                                        "association_is_department": 1,
                                        "association_pid": 3,
                                        "children": [
                                            {
                                                "association_id": 17,
                                                "association_name": "运维主管",
                                                "association_is_department": 0,
                                                "association_pid": 5
                                            },
                                            {
                                                "association_id": 18,
                                                "association_name": "运维工程师",
                                                "association_is_department": 0,
                                                "association_pid": 5
                                            }
                                        ]
                                    },
                                    {
                                        "association_id": 12,
                                        "association_name": "技术经理",
                                        "association_is_department": 0,
                                        "association_pid": 3
                                    }
                                ]
                            },
                            {
                                "association_id": 6,
                                "association_name": "财务部",
                                "association_is_department": 1,
                                "association_pid": 1,
                                "children": [
                                    {
                                        "association_id": 19,
                                        "association_name": "财务经理",
                                        "association_is_department": 0,
                                        "association_pid": 6
                                    },
                                    {
                                        "association_id": 20,
                                        "association_name": "会计",
                                        "association_is_department": 0,
                                        "association_pid": 6
                                    },
                                    {
                                        "association_id": 21,
                                        "association_name": "出纳",
                                        "association_is_department": 0,
                                        "association_pid": 6
                                    }
                                ]
                            },
                            {
                                "association_id": 7,
                                "association_name": "行政部",
                                "association_is_department": 1,
                                "association_pid": 1,
                                "children": [
                                    {
                                        "association_id": 22,
                                        "association_name": "行政经理",
                                        "association_is_department": 0,
                                        "association_pid": 7
                                    },
                                    {
                                        "association_id": 23,
                                        "association_name": "前台",
                                        "association_is_department": 0,
                                        "association_pid": 7
                                    },
                                    {
                                        "association_id": 24,
                                        "association_name": "人事",
                                        "association_is_department": 0,
                                        "association_pid": 7
                                    },
                                    {
                                        "association_id": 25,
                                        "association_name": "人事助理",
                                        "association_is_department": 0,
                                        "association_pid": 7
                                    }
                                ]
                            },
                            {
                                "association_id": 8,
                                "association_name": "市场部",
                                "association_is_department": 1,
                                "association_pid": 1,
                                "children": [
                                    {
                                        "association_id": 26,
                                        "association_name": "市场经理",
                                        "association_is_department": 0,
                                        "association_pid": 8
                                    },
                                    {
                                        "association_id": 27,
                                        "association_name": "商务",
                                        "association_is_department": 0,
                                        "association_pid": 8
                                    },
                                    {
                                        "association_id": 28,
                                        "association_name": "销售",
                                        "association_is_department": 0,
                                        "association_pid": 8
                                    }
                                ]
                            },
                            {
                                "association_id": 9,
                                "association_name": "运营部",
                                "association_is_department": 1,
                                "association_pid": 1,
                                "children": [
                                    {
                                        "association_id": 29,
                                        "association_name": "运营经理",
                                        "association_is_department": 0,
                                        "association_pid": 9
                                    },
                                    {
                                        "association_id": 30,
                                        "association_name": "产品运营",
                                        "association_is_department": 0,
                                        "association_pid": 9
                                    },
                                    {
                                        "association_id": 31,
                                        "association_name": "新媒体运营",
                                        "association_is_department": 0,
                                        "association_pid": 9
                                    }
                                ]
                            }
                        ]
                    }
                ],
                selectedOptions: [],
                selectedOptions2: []
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
        },
        mounted(){
            //console.log(this.options[0]);
        }
    };
</script>
