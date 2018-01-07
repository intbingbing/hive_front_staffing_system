import * as types from './types'
import * as api from './api'
import router from '../router'

export default {
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
    }
}
