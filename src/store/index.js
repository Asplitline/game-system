import Vue from 'vue'
import Vuex from 'vuex'
import { _getUser } from '@api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aCurrentIndex: sessionStorage.getItem('aCurrentIndex'),
    hCurrentIndex: sessionStorage.getItem('hCurrentIndex'),
    currentUser: sessionStorage.getItem('currentUser') && JSON.parse(sessionStorage.getItem('currentUser')),
    allUser: sessionStorage.getItem('allUser') && JSON.parse(sessionStorage.getItem('allUser')),
    currentPost: sessionStorage.getItem('currentPost') && JSON.parse(sessionStorage.getItem('currentPost'))
    // allPost: sessionStorage.getItem('allPost') && JSON.parse(sessionStorage.getItem('allPost'))
  },
  getters: {
    findUserNameById: (state) => (id) => {
      const user = state.allUser.find(item => {
        return item.id === id
      })
      return (user && user.name) || '已注销'
    }
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
    },
    setCurrentPost (state, data) {
      sessionStorage.setItem('currentPost', JSON.stringify(data))
      state.currentPost = data
    }
    // setAllPost (state, data) {
    //   sessionStorage.setItem('allPost', JSON.stringify(data))
    //   state.allPost = data
    // }
  },
  actions: {
    async fetchAllUser ({ commit }) {
      const res = await _getUser()
      commit('setAllUser', res)
    }
    // async fetchAllPost ({ commit }) {
    //   const res = await _getPost()
    //   commit('setAllPost', res)
    // }
  },
  modules: {
  }
})
