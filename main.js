import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
import { api, upload } from '@/api/index.js'

Vue.use(uView)
Vue.prototype.$api = api
Vue.prototype.$upload = upload
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()