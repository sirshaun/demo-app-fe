import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
	isLogged: !!localStorage.getItem('token'),
	listing: {},
}

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	mutations,
	actions,
	getters,
	plugins: [createPersistedState()],
})
