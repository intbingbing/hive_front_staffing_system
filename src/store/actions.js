import * as types from './types'
import * as api from './api'
import { formatDate } from '../utils/publicFunction'
import md5 from 'crypto-js/md5'
import hex from 'crypto-js/enc-hex'
import router from '../router'
import * as tmpTypes from './types'

export default {
    async [types.TEST]({commit},index){
        let res = await api.test(index);
        commit(types.TEST,res);
    },

    async [types.INIT]({commit},index){
        //this.dispatch(tmpTypes.GET_ALL_STAFF_INFO);
        this.dispatch(tmpTypes.GET_POST_MAP_DEPARTMENT);
        this.dispatch(tmpTypes.GET_POST_CASCADER);
    },

    async [types.GET_ALL_STAFF_INFO] ({commit}) {
        let res = await api.getAllStaffInfo();
        commit(types.GET_ALL_STAFF_INFO,res);
    },

    // async [types.GET_POST] ({commit}) {
    //     let res = await api.getPost();
    //     commit(types.GET_POST,res);
    // },
    //
    // async [types.GET_DEPARTMENT] ({commit}) {
    //     let res = await api.getDeportment();
    //     commit(types.GET_DEPARTMENT,res);
    // },

    async [types.GET_POST_CASCADER] ({commit}) {
        let res = await api.getPostCascader();
        commit(types.GET_POST_CASCADER,res);
    },

    async [types.GET_POST_MAP_DEPARTMENT] ({commit}) {
        let res = await api.getPostMapDepartment();
        commit(types.GET_POST_MAP_DEPARTMENT,res);
    },

    async [types.GET_CLOCK_IN] ({commit},dateObj) {
        let res = await api.getClockIn(dateObj);
        commit(types.GET_CLOCK_IN,res);
    },

    async [types.GET_ATTENDANCE] ({commit},dateObj) {
        let res = await api.getAttendance(dateObj);
        commit(types.GET_ATTENDANCE,res);
    },

    async [types.GET_DEPARTMENT_ATTENDANCE_RATE] ({commit},dateObj) {
        let res = await api.getDepartmentAttendanceRate(dateObj);
        commit(types.GET_DEPARTMENT_ATTENDANCE_RATE,res);
    },

    async [types.GET_DEPARTMENT_FILE_LIST] ({commit},dateObj) {
        let res = await api.getDepartmentFileList();
        commit(types.GET_DEPARTMENT_FILE_LIST,res);
    },

    async [types.GET_NOTICE] ({commit}) {
        let res = await api.getNotice();
        commit(types.GET_NOTICE,res);
    },

    async [types.UPDATE_STAFF] ({commit},updateStaffObj) {
        updateStaffObj.employee_entry_time = formatDate(updateStaffObj.employee_entry_time);
        let res = await api.updateStaff(updateStaffObj);
        commit(types.UPDATE_STAFF,res);
    },

    async [types.UPDATE_ASSOCIATION] ({commit},updateAssociationObj) {
        let res = await api.updateAssociation(updateAssociationObj);
        commit(types.UPDATE_ASSOCIATION,res);
    },

    async [types.UPDATE_FILE_NAME] ({commit},fileObj) {
        let res = await api.renameFile(fileObj);
        commit(types.UPDATE_FILE_NAME,res);
    },

    async [types.CREATE_STAFF] ({commit},createStaffObj) {
        createStaffObj.employee_entry_time = formatDate(createStaffObj.employee_entry_time);
        let res = await api.createStaff(createStaffObj);
        commit(types.CREATE_STAFF,res);
    },

    async [types.CREATE_ASSOCIATION] ({commit},createAssociationObj) {
        let res = await api.createAssociation(createAssociationObj);
        commit(types.CREATE_ASSOCIATION,res);
    },

    async [types.CREATE_NOTICE] ({commit},createNoticeObj) {
        let res = await api.createNotice(createNoticeObj);
        commit(types.CREATE_NOTICE,res);
    },

    async [types.DELETE_STAFF] ({commit},deleteStaffIndexObj) {
        let res = await api.deleteStaff(deleteStaffIndexObj);
        commit(types.DELETE_STAFF,res);
    },

    async [types.DELETE_ASSOCIATION] ({commit},deleteAssociationIndexObj) {
        let res = await api.deleteAssociation(deleteAssociationIndexObj);
        commit(types.DELETE_ASSOCIATION,res);
    },

    async [types.DELETE_FILE] ({commit},fileObj) {
        let res = await api.deleteFile(fileObj);
        commit(types.DELETE_FILE,res);
    },

    async [types.LOG_IN] ({commit},{username,password}) {
        //console.log(`roles:${username}; pass:${password}`);
        let salt = 'types.ID_QUERY_ERROR';
        password=salt+password;
        let secret = md5(password).toString(hex);
        secret=md5(secret).toString(hex);
        console.log(`salt:${salt};pass:${password};secret:${secret}`);
        let res = await api.login(username,secret);
        if(res.data.tag===0){
            commit(types.LOG_IN_ERROR,res.data);
        }else{
            commit(types.LOG_IN,res.data);
            router.push({ name: 'staff_management' })
        }
    },
    async [types.ID_QUERY] ({commit},{id}) {
        // if(isNaN(parseInt(id))){
        //     commit(types.ID_QUERY_ERROR);
        //     return 0;
        // }
        //console.log(id);
        const res = await api.idQuery(id);
        commit(types.ID_QUERY,res)
    },
    async [types.CREATE_SUBMIT] ({commit},{name,password,checkPassword,birthday}) {
        birthday=formatDate(birthday);
        const res = await api.createSubmit({name,password,checkPassword,birthday});
        commit(types.CREATE_SUBMIT,res);
        //console.log(createValidForm)
    },
    async [types.UPDATE_SUBMIT] ({commit},updateForm){
        //修改前先查询是否存在!
        let idQuery=await api.idQuery(updateForm.id);
        if(idQuery.statusCode === '400231'){
            commit(types.UPDATE_SUBMIT_ERROR,idQuery);
        }else{
            updateForm.birthday = formatDate(updateForm.birthday);
            const res = await api.updateSubmit(updateForm);
            commit(types.UPDATE_SUBMIT,res)
        }
    },
    async [types.ID_DELETE] ({commit},idDeleteForm) {
        let res= await api.idDelete(idDeleteForm);
        if(res.statusCode==='200220'){
            commit(types.ID_DELETE,res);
        } else {
            commit(types.ID_DELETE_ERROR,res)
        }
    }
}
