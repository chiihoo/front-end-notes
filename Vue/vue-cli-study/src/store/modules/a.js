const state = {
  money1: 1
}
const mutations = {
  // payload可以传参
  add(state, payload) {
    state.money1 += payload
  },
  reduce(state, payload) {
    state.money1 -= payload
  }
}
const actions = {
  add({ commit }, payload) {
    commit('add', payload)
  },
  reduce({ commit }, payload) {
    commit('reduce', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}