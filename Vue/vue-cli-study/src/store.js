import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increment(state){
      state.count++
    },
    decrement(state){
      state.count--
    }
  },
  actions:{
    // increment(context){
    //   context.commit('increment')
    // },
    // increment:({commit})=>{
    //   commit('increment')
    // },
    increment({commit}){
      // 提交的是mutations里面的方法
      commit('increment')
    },
    // 等同于底下这个，当然底下这个的语法不对
    // increment ({ commit: context.commit }) {
    //   context.commit('increment');
    // }

    decrement({commit}){
      commit('decrement')
    }
  }
})

export default store