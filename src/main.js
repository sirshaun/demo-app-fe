import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Properties from './Properties.vue'

import './main.css'

Vue.use(VueRouter)
Vue.config.productionTip = false

// 1. Define route components.
const NotFound = { template: '<p>Page not found</p>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
const routes = [
	{ path: '/', component: App },
	{ path: '/destination/:id/properties', component: Properties, props: true },
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

// new Vue({
//   render: h => h(App)
// }).$mount("#app")
