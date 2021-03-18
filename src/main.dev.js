import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element'
import './assets/css/global.less'
import './assets/fonts/iconfont.css'

import myPlugins from './plugins/myPlugins'
Vue.config.productionTip = false
Vue.use(myPlugins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
