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

axios.defaults.withCredentials = true;

export async function login(username,secret){
    return (await axios.post(`${baseUrl}${loginUrl}`,qs.stringify({
        username,secret
    })))
}

export async function checkCookie(){
    return (await axios.get(`${baseUrl}${checkCookieUrl}`)).data;
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
