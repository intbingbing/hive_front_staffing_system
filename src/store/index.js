import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);

const state={
    userInfo:{},
    loginInfo:{},
    idQueryInfo:{
        errorMessage:'',
        isFound:'',
        id:'',
        name:'',
        password:'',
        birthday:''
    },
    idQueryResult:[],
    createSubmitInfo:{
        createSuccessful:''
    },
    createSubmitResult:[],
    updateSubmitInfo:{
        updateSuccessful:'',
        errorMessage:''
    },
    updateSubmitResult:{},
    idDeleteInfo:{
        idDeleteSuccessful:'',
        errorMessage:''
    },
    idDeleteResult:{},
    allStaffInfo:[],
    postInfo:[],
    departmentInfo:[],
    getClockInRes:[],
    getAttendanceRes:[],
    getDepartmentAttendanceRes:[],
    getDepartmentFileListRes:[],
    renameFileRes:{},
    deleteFileRes:{},
    postMapDepartmentInfo:[],
    postCascader:{},
    updateStaffRes:[],
    updateAssociationRes:[],
    createStaffRes:{},
    createAssociationRes:{},
    getNoticeRes:[],
    createNoticeRes:{},
    deleteStaffRes:{},
    deleteAssociationRes:{},
    edu:['博士','硕士','本科','大专','中专','高中','初中','其他'],
    permissionsSelect:[{value:1,label:'超级管理员'},{value:2,label:'管理员'},{value:3,label:'普通用户'}],
    propertySelect:[{value:1,label:'部门'},{value:0,label:'职位'}],
    valueName:{value:'association_id', label:'association_name',children: 'children'},
    loading:false,
    test:''
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})
