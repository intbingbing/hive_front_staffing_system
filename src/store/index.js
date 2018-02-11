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
    postMapDepartmentInfo:[],
    updateStaffRes:{},
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})
