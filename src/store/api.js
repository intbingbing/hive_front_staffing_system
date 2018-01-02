import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.use(VueAxios,axios)

const baseUrl='http://122.112.210.98:3000'
const idQueryUrl = '/idquery'

export async function idQuery(idQueryValue){
    //let res=axios.get(`${baseUrl}${idQueryUrl}?id=${idQueryValue}`);
    //res.then((val)=>console.log(val.data));
    return (await axios.get(`${baseUrl}${idQueryUrl}?id=${idQueryValue}`)).data
}
