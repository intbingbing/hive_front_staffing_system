import * as types from './types'
import * as api from './api'
import md5 from 'crypto-js/md5'
import hex from 'crypto-js/enc-hex'
import router from '../router'

export default {
    async [types.LOG_IN] ({commit},{username,password}) {
        //console.log(`user:${username}; pass:${password}`);
        let salt = 'types.ID_QUERY_ERROR';
        password=salt+password;
        let secret = md5(password).toString(hex);
        secret=md5(secret).toString(hex);
        //console.log(`salt:${salt};pass:${password};secret:${secret}`);
        let res = await api.login(username,secret);
        if(res.data.tag===0){
            commit(types.LOG_IN_ERROR,{data:res.data});
        }else{
            commit(types.LOG_IN,{data:res.data});
            router.push({ name: 'Container' })
        }
    },
    async [types.ID_QUERY] ({commit},{id}) {
        // if(isNaN(parseInt(id))){
        //     commit(types.ID_QUERY_ERROR);
        //     return 0;
        // }
        //console.log(id);
        const res = await api.idQuery(id);
        commit(types.ID_QUERY,{data:res})
    },
    async [types.CREATE_SUBMIT] ({commit},{name,password,checkPassword,birthday}) {
        if(name&&password&&checkPassword&&birthday){
            birthday=`${birthday.getFullYear()}-${birthday.getMonth()+1}-${birthday.getDate()}`;
            const res = await api.createSubmit({name,password,checkPassword,birthday});
            commit(types.CREATE_SUBMIT,res)
        }
        //console.log(createValidForm)
    },
    async [types.UPDATE_SUBMIT] ({commit},updateForm){
        let code=0;
        if(!(updateForm.name||updateForm.password||updateForm.birthday)){
            code=420;//420表示为满足条件：没有要更新的值！
            commit(types.UPDATE_SUBMIT_ERROR,code)
        }else{
            //修改前先查询是否存在!
            let idQuery=await api.idQuery(updateForm.id);
            if(typeof(idQuery)==='string'){
                code=520;//520表示服务器未查询到该数据
                commit(types.UPDATE_SUBMIT_ERROR,code);
            }else{
                const res =await api.updateSubmit(updateForm);
                commit(types.UPDATE_SUBMIT,res)
            }
        }
    },
    async [types.ID_DELETE] ({commit},idDeleteForm) {
        let code=0;
        let idQueryResult=await api.idQuery(idDeleteForm.id);
        if(typeof(idQueryResult)==='string') {
            code = 520 ;//520表示服务器未查询到该数据
            commit(types.ID_DELETE_ERROR,code);
        }else{
            let res= await api.idDelete(idDeleteForm);
            if(res.statusCode===500){
                code=500;   //500服务器内部错误
                commit(types.ID_DELETE_ERROR,code)
            }
            if(res.statusCode===200){
                commit(types.ID_DELETE,res);
            }
        }
    }
}
