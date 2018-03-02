import * as types from './types'
import { formatDate } from '../utils/publicFunction'
export default {
    // [types.ID_QUERY_ERROR](state){
    //     state.idQueryInfo={
    //         errorMessage:'ID格式输入错误！'
    //     }
    // },

    [types.TEST](state,data){
        state.test = data;
    },

    [types.GET_ALL_STAFF_INFO](state,data){
        for(let value of data){
            value['employee_entry_time']=formatDate(value['employee_entry_time']);
        }
        state.allStaffInfo = data;
    },
    // [types.GET_POST](state,data){
    //     state.postInfo = data;
    // },
    // [types.GET_DEPARTMENT](state,data){
    //     state.departmentInfo = data;
    // },
    [types.GET_POST_CASCADER](state,data){
        state.postCascader = data;
    },
    [types.GET_POST_MAP_DEPARTMENT](state,data){
        state.postInfo=[];
        state.departmentInfo=[];
        for(let val of data){
            if(val["association_is_department"]===0){
                state.postInfo.push(val)
            }else{
                state.departmentInfo.push(val);
            }
        }
        state.postMapDepartmentInfo = data;
    },
    [types.GET_CLOCK_IN](state,data){
        state.getClockInRes.push(data);
    },
    [types.CLEAR_CLOCK_IN_RATE](state){
        state.getClockInRes=[];
    },
    [types.CLEAR_DEPARTMENT_ATTENDANCE_RATE](state){
        state.getDepartmentAttendanceRes=[];
    },
    [types.GET_ATTENDANCE](state,data){
        state.getAttendanceRes = data;
    },
    [types.GET_DEPARTMENT_ATTENDANCE_RATE](state,data){
        state.getDepartmentAttendanceRes.push(data) ;
    },
    [types.UPDATE_STAFF](state,data){
        state.updateStaffRes = data;
    },
    [types.UPDATE_ASSOCIATION](state,data){
        state.updateAssociationRes = data;
    },
    [types.CREATE_STAFF](state,data){
        state.createStaffRes = data;
    },
    [types.CREATE_ASSOCIATION](state,data){
        state.createAssociationRes = data;
    },
    [types.DELETE_STAFF](state,data){
        state.deleteStaffRes = data;
    },
    [types.DELETE_ASSOCIATION](state,data){
        state.deleteAssociationRes = data;
    },
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
        if (data.statusCode === '400231') {
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
    [types.UPDATE_SUBMIT_ERROR](state,res){
        if(res.statusCode==='400231'){
            state.updateSubmitInfo.errorMessage='没有该数据！';
            state.updateSubmitInfo.updateSuccessful=0
        }
    },
    [types.UPDATE_SUBMIT](state,res){
        if(res.statusCode===500){
            state.updateSubmitInfo.errorMessage='服务器内部错误！';
            state.updateSubmitInfo.updateSuccessful=0
        }else{
            state.updateSubmitResult=res;
            state.updateSubmitInfo.updateSuccessful=1
            //console.log(res);
        }
    },
    [types.ID_DELETE_ERROR](state,res){
        if(res.statusCode==='400221'){
            state.idDeleteInfo.errorMessage='没有该数据！';
            state.idDeleteInfo.idDeleteSuccessful=0;
        }
        if(res.statusCode===500){
            state.idDeleteInfo.errorMessage='服务器内部错误！';
            state.idDeleteInfo.idDeleteSuccessful=0;
        }
    },
    [types.ID_DELETE](state,res){
        state.idDeleteInfo.idDeleteSuccessful=1;
        state.idDeleteResult=res;
    }
}
