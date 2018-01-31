import * as types from './types'
export default {
    // [types.ID_QUERY_ERROR](state){
    //     state.idQueryInfo={
    //         errorMessage:'ID格式输入错误！'
    //     }
    // },
    [types.LOG_IN](state, {data}){
        state.loginInfo=data;
    },
    [types.LOG_IN_ERROR](state, {data}){
        state.loginInfo=data;
    },
    [types.LOG_OUT](state){
        state.loginInfo={};
        state.userInfo={};
        state.idQueryInfo={};
    },
    [types.LOAD_HEADER_PORTRAIT_URL](state,data){
        state.userInfo=data;
    },
    [types.ID_QUERY](state, data) {
        if (data.length === 0) {
            state.idQueryInfo = {
                isFound: 0,
                errorMessage: '没有找到该数据！'
            }
        } else {
            state.idQueryInfo = {
                isFound: 1,
                // id: data.id,
                // name: data.name,
                // password: data.password,
                // birthday: data.birthday
            };
            let formatDate=new Date(data[0].birthday);
            data[0].birthday=`${formatDate.getFullYear()}-${formatDate.getMonth()+1}-${formatDate.getDate()}`;
            state.idQueryResult = data;
        }
    },
    [types.CREATE_SUBMIT](state,res){
        if(typeof(res)==='object'){
            state.createSubmitInfo.createSuccessful=1;
            state.createSubmitResult=res;
        }else{
            state.createSubmitInfo.createSuccessful=0;
            state.createSubmitResult=res;
        }
        //console.log(state.createSubmitInfo.createSuccessful);
    },
    [types.UPDATE_SUBMIT_ERROR](state,code){
        if(code===420){
            state.updateSubmitInfo.errorMessage='没有要更新的数据！';
            state.updateSubmitInfo.updateSuccessful=0
        }
        if(code===520){
            state.updateSubmitInfo.errorMessage='没有该数据！';
            state.updateSubmitInfo.updateSuccessful=0
        }
    },
    [types.UPDATE_SUBMIT](state,res){
        if(typeof(res)==='string'){
            state.updateSubmitInfo.errorMessage='服务器内部错误！';
            state.updateSubmitInfo.updateSuccessful=0
        }else{
            state.updateSubmitResult=res;
            state.updateSubmitInfo.updateSuccessful=1
            //console.log(res);
        }
    },
    [types.ID_DELETE_ERROR](state,code){
        if(code===520){
            state.idDeleteInfo.errorMessage='没有该数据！';
            state.idDeleteInfo.idDeleteSuccessful=0;
        }
        if(code===500){
            state.idDeleteInfo.errorMessage='服务器内部错误！';
            state.idDeleteInfo.idDeleteSuccessful=0;
        }
    },
    [types.ID_DELETE](state,res){
        state.idDeleteInfo.idDeleteSuccessful=1;
        state.idDeleteResult=res;
    }
}
