import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state={
  count:10
};

const mutations={
  increment(state,n){
    state.count+=n;
  },
  decrement(state){
    state.count--;
  }
};
// const actions={
//   increment:({
//     commit
//   })=>{
//     commit('increment');
//   }
// };

export default new Vuex.Store({
  // actions,
  mutations,
  state
})
