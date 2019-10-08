import Vue from 'vue'

import store from './store/store.js'
import router from './routes/router.js'
import googlemap from './map/google-map.js'
import axios from 'axios'

import './main.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
	baseURL: process.env.VUE_APP_API_URI,
})

const app = new Vue({
	store,
	router,
}).$mount('#app')
