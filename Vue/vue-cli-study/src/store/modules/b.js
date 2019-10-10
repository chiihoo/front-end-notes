const state = {
  count1: 10
}
const mutations = {
  add(state) {
    state.count1++
  },
  reduce(state) {
    state.count1--
  }
}
const actions = {
  add({ commit }) {
    commit('add')
  },
  reduce({ commit }) {
    commit('reduce')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}