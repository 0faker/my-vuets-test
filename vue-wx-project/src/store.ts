import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    // cyclePrescriptions: [],
    isBack: false,
    type: 'normal',
    msg: ''
  },
  mutations: {
    // showToast(state){
    //   state.type
    // }
  },
  actions: {

  },
});
