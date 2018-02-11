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
const getPostUrl='/user/hive_post';
const getDepartmentUrl='/user/hive_department';
const getPostMapDepartmentUrl='/user/hive_post_map_department';
const getPostCascaderUrl='/user/hive_post_cascader';
const postStaffUrl='/user/hive_employee';


axios.defaults.withCredentials = true;

//V2.0
export async function getAllStaffInfo(){
    return (await axios.get(`${baseUrl}${getAllStaffInfoUrl}`)).data;
}

export async function getPost(){
    return (await axios.get(`${baseUrl}${getPostUrl}`)).data;
}

export async function getDeportment(){
    return (await axios.get(`${baseUrl}${getDepartmentUrl}`)).data;
}

export async function getPostMapDepartment(){
    return (await axios.get(`${baseUrl}${getPostMapDepartmentUrl}`)).data;
}
//后端处理好的级联选择器所需要的json格式，post映射department
export async function getPostCascader(){
    return (await axios.get(`${baseUrl}${getPostCascaderUrl}`)).data;
}

export async function updateStaff(updateStaff){
    return (await axios.post(`${baseUrl}${postStaffUrl}`,qs.stringify(
        updateStaff
    ))).data;
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
