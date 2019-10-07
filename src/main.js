import Vue from 'vue'

import store from './store/store.js'
import router from './routes/router.js'
import axios from 'axios'

import './main.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
	baseURL: 'http://demo-app-be.test/',
})

const app = new Vue({
	store,
	router,
}).$mount('#app')
