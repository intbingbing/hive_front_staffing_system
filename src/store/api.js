import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import router from '../router'

Vue.use(VueAxios,axios);

const baseUrl='http://122.112.210.98:3000';
const loginUrl='/login';
const idQueryUrl = '/idquery';
const createSubmitUrl='/addsubmit';
const updateSubmitUrl='/update';
const idDeleteUrl='/iddelete';
const checkCookieUrl='/checkCookie';
const clearCookieUrl='/clear_cookie';

const getAllStaffInfoUrl='/user/hive_all_employee';
// const getPostUrl='/user/hive_post';
// const getDepartmentUrl='/user/hive_department';
const getPostMapDepartmentUrl='/user/hive_post_map_department';
const getPostCascaderUrl='/user/hive_post_cascader';
const readStaffUrl='/user/hive_employee';
const updateStaffUrl='/user/hive_employee';
const createStaffUrl='/user/hive_employee';
const deleteStaffUrl='/user/hive_employee';
const associationUrl='/user/hive_association';
const attendanceUrl='/user/hive_attendance';
const clockInUrl='/user/hive_clock_in';
const departmentAttendanceRateUrl='/user/hive_clock_in_department';
const departmentFileListUrl='/user/hive_department_file_list';
const departmentFileUrl='/user/hive_department_file';
const noticeUrl='/user/hive_notice';
const testUrl='/user/hive_test';

axios.defaults.withCredentials = true;

//V2.0
export async function test(index){
    return (await axios.get(`${baseUrl}${testUrl}/${index}`)).data;
}

export async function getAllStaffInfo(){
    return (await axios.get(`${baseUrl}${getAllStaffInfoUrl}`)).data;
}

// export async function getPost(){
//     return (await axios.get(`${baseUrl}${getPostUrl}`)).data;
// }
//
// export async function getDeportment(){
//     return (await axios.get(`${baseUrl}${getDepartmentUrl}`)).data;
// }

export async function getPostMapDepartment(){
    return (await axios.get(`${baseUrl}${getPostMapDepartmentUrl}`)).data;
}
//后端处理好的级联选择器所需要的json格式，post映射department
export async function getPostCascader(){
    return (await axios.get(`${baseUrl}${getPostCascaderUrl}`)).data;
}

export async function getClockIn(dateObj){
    return (await axios.get(`${baseUrl}${clockInUrl}/${dateObj.date}`)).data;
}

//按天获取所有员工打卡记录
export async function getAttendance(dateObj){
    return (await axios.get(`${baseUrl}${attendanceUrl}/${dateObj.date}`)).data;
}

export async function getDepartmentAttendanceRate(dateObj){
    return (await axios.get(`${baseUrl}${departmentAttendanceRateUrl}/${dateObj.date}`)).data;
}

export async function getDepartmentFileList(dateObj){
    return (await axios.get(`${baseUrl}${departmentFileListUrl}`)).data;
}

export async function getNotice(){
    return (await axios.get(`${baseUrl}${noticeUrl}`)).data;
}

export async function updateStaff(updateStaffObj){
    return (await axios.put(`${baseUrl}${updateStaffUrl}`,qs.stringify(
        updateStaffObj
    ))).data;
}

export async function updateAssociation(updateAssociationObj){
    return (await axios.put(`${baseUrl}${associationUrl}`,qs.stringify(
        updateAssociationObj
    ))).data;
}

export async function renameFile(fileObj){
    return (await axios.put(`${baseUrl}${departmentFileUrl}`,qs.stringify(
        fileObj
    ))).data;
}

export async function createStaff(createStaffObj){
    return (await axios.post(`${baseUrl}${createStaffUrl}`,qs.stringify(
        createStaffObj
    ))).data;
}

export async function createAssociation(createAssociationObj){
    return (await axios.post(`${baseUrl}${associationUrl}`,qs.stringify(
        createAssociationObj
    ))).data;
}

export async function createNotice(createNoticeObj){
    return (await axios.post(`${baseUrl}${noticeUrl}`,qs.stringify(
        createNoticeObj
    ))).data;
}

export async function deleteStaff(deleteStaffIndexObj){
    return (await axios.delete(`${baseUrl}${deleteStaffUrl}/${deleteStaffIndexObj.id}`)).data;
}

export async function deleteAssociation(deleteAssociationIndexObj){
    return (await axios.delete(`${baseUrl}${associationUrl}/${deleteAssociationIndexObj.id}`)).data;
}

export async function deleteFile(fileObj){
    return (await axios.delete(`${baseUrl}${departmentFileUrl}/${fileObj.name}`)).data;
}

//V1.0
export async function login(username,secret){
    return (await axios.post(`${baseUrl}${loginUrl}`,qs.stringify({
        username,secret
    })))
}

export async function checkCookie(){
    return (await axios.get(`${baseUrl}${checkCookieUrl}`)).data;
}

export async function clearCookie(){
    return (await axios.get(`${baseUrl}${clearCookieUrl}`)).data;
}

export async function idQuery(idQueryValue){
    //let res=axios.get(`${baseUrl}${idQueryUrl}?id=${idQueryValue}`);
    //res.then((val)=>console.log(val.data));
    return (await axios.get(`${baseUrl}${idQueryUrl}?id=${idQueryValue}`)).data
}

export async function createSubmit({name,password,checkPassword,birthday}) {
    return (await axios.post(`${baseUrl}${createSubmitUrl}`,qs.stringify({
        name,password,checkPassword,birthday
    }))).data;
    // return (await axios({url:`${baseUrl}${createSubmitUrl}`,
    //     method:'post',
    //     transformRequest:[()=>
    //         `name=${name}&password=${password}&checkPassword=${checkPassword}&birthday=${birthday}`
    //     ]
    // }))
}

export async function updateSubmit(updateForm) {
    //console.log(updateForm);
    return (await axios.post(`${baseUrl}${updateSubmitUrl}`,qs.stringify(updateForm))).data;
}

export async function idDelete(idDeleteForm) {
    return (await axios.post(`${baseUrl}${idDeleteUrl}`,qs.stringify(idDeleteForm))).data;
}
