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
		bedroomSpaces: {},
		bathrooms: '',
		private: '',
		country: '',
		streetAddress: '',
		apartmentNumber: '',
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

	UPDATE_LISTING_PLACE(state, obj) {
		Vue.set(state.listing, 'listing', obj.listing)
		Vue.set(state.listing, 'property', obj.property)
		Vue.set(state.listing, 'rooms', obj.rooms)
		Vue.set(state.listing, 'roomType', obj.roomType)
		Vue.set(state.listing, 'spaceType', obj.spaceType)
	},

	UPDATE_LISTING_BEDROOMS(state, obj) {
		Vue.set(state.listing, 'guests', obj.guests)
		Vue.set(state.listing, 'bedrooms', obj.bedrooms)
		Vue.set(state.listing, 'beds', obj.beds)
		Vue.set(state.listing, 'bedroomSpaces', obj.bedroomSpaces)
	},

	UPDATE_LISTING_BATHS(state, obj) {
		Vue.set(state.listing, 'bathrooms', obj.bathrooms)
		Vue.set(state.listing, 'private', obj.private)
	},

	UPDATE_LISTING_LOCATION(state, obj) {
		Vue.set(state.listing, 'country', obj.country)
		Vue.set(state.listing, 'street', obj.street)
		Vue.set(state.listing, 'apartmentNumber', obj.aptNum)
		Vue.set(state.listing, 'city', obj.city)
		Vue.set(state.listing, 'state', obj.state)
		Vue.set(state.listing, 'postcode', obj.postcode)
	},

	UPDATE_LISTING_COORDINATES(state, obj) {
		Vue.set(state.listing, 'longitude', obj.long)
		Vue.set(state.listing, 'latitude', obj.lat)
	},

	UPDATE_LISTING_AMENITIES(state, obj) {
		Vue.set(state.listing, 'amenities', obj.basic)
		Vue.set(state.listing, 'safetyAmenities', obj.safety)
	},

	UPDATE_LISTING_SHARED_SPACES(state, obj) {
		Vue.set(state.listing, 'spaces', obj.spaces)
	},
}

const actions = {
	updatePlaceType(context, data) {
		context.commit('UPDATE_LISTING_PLACE', data)
	},
	updateBedrooms(context, data) {
		context.commit('UPDATE_LISTING_BEDROOMS', data)
	},
	updateBaths(context, data) {
		context.commit('UPDATE_LISTING_BATHS', data)
	},
	updateLocation(context, data) {
		context.commit('UPDATE_LISTING_LOCATION', data)
	},
	updateCoordinates(context, data) {
		context.commit('UPDATE_LISTING_COORDINATES', data)
	},
	updateAmenities(context, data) {
		context.commit('UPDATE_LISTING_AMENITIES', data)
	},
	updateSharedSpaces(context, data) {
		context.commit('UPDATE_LISTING_SHARED_SPACES', data)
	},
}

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	mutations,
	actions,
})
