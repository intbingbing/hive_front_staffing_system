import * as types from './types'
import * as api from './api'
import router from '../router'

export default {
    async [types.ID_QUERY] ({commit},{id}) {
        if(isNaN(parseInt(id))){
            commit(types.ID_QUERY_ERROR);
            return 0;
        }
        const res = await api.idQuery(id);
        commit(types.ID_QUERY,{data:res})
    }
}
