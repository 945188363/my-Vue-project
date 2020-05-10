// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import less from 'less'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8888/gateway'

Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.prototype.$message = ElementUI.Message
Vue.use(less)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
