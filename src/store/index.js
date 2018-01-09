import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);

const state={
    count:10,
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
    updateSubmitResult:{}
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
