import Vue from 'vue'
import Vuex from 'vuex'
import money from './modules/a.js'
import count from './modules/b.js'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    money,
    count
  }
})