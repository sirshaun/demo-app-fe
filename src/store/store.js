import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	isLogged: !!localStorage.getItem('token'),
	listing: {
		listing: '',
		property: '',
		rooms: '',
		roomType: '',
		spaceType: '',
		guests: '',
		bedrooms: '',
		beds: '',
		bedroomSpaces: [],
		commonSpace: [],
		bathrooms: '',
		private: '',
		country: '',
		streetAddress: '',
		aptNumber: '',
		city: '',
		state: '',
		postcode: '',
		coordinates: {
			latitude: '',
			longitude: '',
		},
		amenities: [],
		safetyAmenities: [],
		spaces: [],
	},
}

const mutations = {
	LOGIN_USER(state) {
		state.isLogged = true
	},

	LOGOUT_USER(state) {
		state.isLogged = false
	},

	UPDATE_LISTING(state, listing) {
		state.listing = listing
	},
}

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	mutations,
})
