import Vue from 'vue'

export const mutations = {
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
    Vue.set(state.listing, 'address', obj.address)
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

  UPDATE_LISTING_PROGRESS(state, obj) {
    Vue.set(state.listing, 'progress', obj.progress)
  },

  SET_LISTING_ID(state, obj) {
    Vue.set(state.listing, 'id', obj.id)
  },

  UPDATE_LISTING_PHOTOS(state, obj) {
    Vue.set(state.listing, 'photos', obj.photos)
  },

  UPDATE_LISTING_SUMMARY(state, obj) {
    Vue.set(state.listing, 'description', obj.description)
    Vue.set(state.listing, 'spaceDescription', obj.spaceDescription)
    Vue.set(state.listing, 'hostAvailability', obj.hostAvailability)
    Vue.set(state.listing, 'neighborhood', obj.neighborhood)
    Vue.set(state.listing, 'gettingAround', obj.gettingAround)
  },

  UPDATE_LISTING_TITLE(state, obj) {
    Vue.set(state.listing, 'title', obj.title)
  },

  UPDATE_LISTING_ADDITIONAL_REQUIREMENTS(state, obj) {
    Vue.set(state.listing, 'additionalRequirements', obj.additionalRequirements)
  },

  UPDATE_LISTING_HOUSE_RULES(state, obj) {
    Vue.set(state.listing, 'houseRules', obj.houseRules)
    Vue.set(state.listing, 'customRules', obj.customRules)
    Vue.set(state.listing, 'houseDetails', obj.houseDetails)
  },

  UPDATE_LISTING_CALENDAR_CONSENT(state, obj) {
    Vue.set(state.listing, 'calendarConsent', obj.calendarConsent)
  },

  UPDATE_HOST_INTRO_SETTINGS(state, obj) {
    Vue.set(state.listing, 'hostExperience', obj.experience)
    Vue.set(state.listing, 'hostingFrequency', obj.frequency)
  },

  UPDATE_LISTING_NOTICE_PERIOD(state, obj) {
    Vue.set(state.listing, 'noticePeriod', obj.period)
    Vue.set(state.listing, 'deadlineTime', obj.deadline)
    Vue.set(state.listing, 'checkInStart', obj.checkInStart)
    Vue.set(state.listing, 'checkInEnd', obj.checkInEnd)
  },

  UPDATE_LISTING_ADVANCED_BOOKING_PERIOD(state, obj) {
    Vue.set(state.listing, 'advancePeriod', obj.advancePeriod)
  },

  UPDATE_LISTING_STAY_LIMITS(state, obj) {
    Vue.set(state.listing, 'minNightStays', obj.minNightStays)
    Vue.set(state.listing, 'maxNightStays', obj.maxNightStays)
    Vue.set(state.listing, 'stayException', obj.stayException)
  },

  UPDATE_LISTING_PRICING(state, obj) {
    Vue.set(state.listing, 'basePrice', obj.basePrice)
    Vue.set(state.listing, 'minimumPrice', obj.minPrice)
    Vue.set(state.listing, 'maximumPrice', obj.maxPrice)
    Vue.set(state.listing, 'currency', obj.currency)
  },

  UPDATE_LISTING_SPECIAL_OFFER_FIRST(state, obj) {
    Vue.set(state.listing, 'specialOfferFirst', obj.specialOffer)
  },
}
