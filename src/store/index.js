import Vue from 'vue'
import Vuex from 'vuex'
import { _getUser, _getPostList, _getCategory } from '@api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aCurrentIndex: sessionStorage.getItem('aCurrentIndex'),
    hCurrentIndex: sessionStorage.getItem('hCurrentIndex'),
    currentUser: sessionStorage.getItem('currentUser') && JSON.parse(sessionStorage.getItem('currentUser')),
    currentPost: sessionStorage.getItem('currentPost') && JSON.parse(sessionStorage.getItem('currentPost')),
    allUser: sessionStorage.getItem('allUser') && JSON.parse(sessionStorage.getItem('allUser')),
    allPost: sessionStorage.getItem('allPost') && JSON.parse(sessionStorage.getItem('allPost')),
    allCategory: sessionStorage.getItem('allCategory') && JSON.parse(sessionStorage.getItem('allCategory'))
  },
  getters: {
    getUserNameById: (state) => (id) => {
      const user = state.allUser.find(item => {
        return item.id === id
      })
      return (user && user.name) || 'not found'
    },
    getPostTitleById: (state) => (id) => {
      const post = state.allPost.find(item => {
        return item.id === id
      })
      return (post && post.title) || 'not found'
    },
    getCategoryNameById: (state) => (id) => {
      id = parseInt(id)
      const category = state.allCategory.find(item => {
        return item.id === id
      })
      return (category && category.name) || 'not found'
    },
    getMiniCategoryList: (state) => () => {
      return state.allCategory.map((item) => {
        return { id: item.id, name: item.name }
      })
    }
  },
  mutations: {
    setACurrentIndex (state) {
      state.aCurrentIndex = sessionStorage.getItem('aCurrentIndex')
    },
    setHCurrentIndex (state) {
      state.hCurrentIndex = sessionStorage.getItem('hCurrentIndex')
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
    },
    setAllPost (state, data) {
      sessionStorage.setItem('allPost', JSON.stringify(data))
      state.allPost = data
    },
    setAllCategory (state, data) {
      sessionStorage.setItem('allCategory', JSON.stringify(data))
      state.allCategory = data
    }
  },
  actions: {
    async fetchAllUser ({ commit }) {
      const res = await _getUser()
      commit('setAllUser', res)
    },
    async fetchAllPost ({ commit }, query) {
      const { list } = await _getPostList(query)
      commit('setAllPost', list)
    },
    async fetchAllCategory ({ commit }) {
      const res = await _getCategory()
      commit('setAllCategory', res)
    }
  },
  modules: {
  }
})
