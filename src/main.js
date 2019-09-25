import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import Properties from './Properties.vue'
import SignUp from './SignUp.vue'
import Login from './Login.vue'
import Profile from './Profile.vue'
import Reviews from './Reviews.vue'
import Wishlists from './Wishlists.vue'
import Wishlist from './Wishlist.vue'
import Trips from './Trips.vue'
import Logout from './Logout.vue'

import './main.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

const state = {
	isLogged: !!localStorage.getItem('token'),
}

const mutations = {
	LOGIN_USER(state) {
		state.isLogged = true
	},

	LOGOUT_USER(state) {
		state.isLogged = false
	},
}

window.Store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	mutations,
})

// 1. Define route components.
const NotFound = { template: '<p>Page not found</p>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
const routes = [
	{ path: '/', component: App },
	{ path: '/properties', component: Properties, props: false },
	{ path: '/properties/:city', component: Properties, props: true },
	{ path: '/sign-up', component: SignUp },
	{ path: '/login', component: Login },
	{ path: '/profile', component: Profile },
	{ path: '/profile/reviews', component: Reviews },
	{ path: '/wishlists', component: Wishlists },
	{ path: '/wishlists/:wishlist', component: Wishlist },
	{ path: '/trips', component: Trips },
	{ path: '/logout', component: Logout },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	routes, // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
	router,
}).$mount('#app')
