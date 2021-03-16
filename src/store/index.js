import Vue from 'vue'
import Vuex from 'vuex'
import { _getUser } from '@api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aCurrentIndex: sessionStorage.getItem('aCurrentIndex'),
    hCurrentIndex: sessionStorage.getItem('hCurrentIndex'),
    currentUser: sessionStorage.getItem('currentUser') && JSON.parse(sessionStorage.getItem('currentUser')),
    allUser: sessionStorage.getItem('allUser') && JSON.parse(sessionStorage.getItem('allUser'))
  },
  getters: {

  },
  mutations: {
    setACurrentIndex (state) {
      state.aCurrentIndex = sessionStorage.getItem('aCurrentIndex')
    },
    setCurrentUser (state, data) {
      sessionStorage.setItem('currentUser', JSON.stringify(data))
      state.currentUser = data
    },
    setAllUser (state, data) {
      sessionStorage.setItem('allUser', JSON.stringify(data))
      state.allUser = data
    }
  },
  actions: {
    async fetchAllUser ({ commit }) {
      const res = await _getUser()
      commit('setAllUser', res)
    }
  },
  modules: {
  }
})
