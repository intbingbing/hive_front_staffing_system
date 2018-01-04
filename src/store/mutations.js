import * as types from './types'
export default {
    [types.INCREMENT](state) {
        state.count++;
    },
    [types.DECREMENT](state) {
        state.count--;
    },
    // [types.ID_QUERY_ERROR](state){
    //     state.idQueryInfo={
    //         errorMessage:'ID格式输入错误！'
    //     }
    // },
    [types.ID_QUERY](state, {data}) {
        if (typeof(data) === 'string') {
            state.idQueryInfo = {
                isFound: 0,
                errorMessage: '没有找到该数据！'
            }
        } else {
            // state.idQueryInfo = {
            //     isFound: 1,
            //     id: data.id,
            //     name: data.name,
            //     password: data.password,
            //     birthday: data.birthday
            // };
            state.idQueryResult = data;
        }
    }
}
