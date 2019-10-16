export const actions = {
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

  updateProgress(context, data) {
    context.commit('UPDATE_LISTING_PROGRESS', data)
  },

  setListingId(context, data) {
    context.commit('SET_LISTING_ID', data)
  },

  updatePhotos(context, data) {
    context.commit('UPDATE_LISTING_PHOTOS', data)
  },

  updateSummary(context, data) {
    context.commit('UPDATE_LISTING_SUMMARY', data)
  },

  updateTitle(context, data) {
    context.commit('UPDATE_LISTING_TITLE', data)
  },

  updateAdditionalRequirements(context, data) {
    context.commit('UPDATE_LISTING_ADDITIONAL_REQUIREMENTS', data)
  },

  updateHouseRules(context, data) {
    context.commit('UPDATE_LISTING_HOUSE_RULES', data)
  },

  updateCalendarConsent(context, data) {
    context.commit('UPDATE_LISTING_CALENDAR_CONSENT', data)
  },

  updateSettingsIntro(context, data) {
    context.commit('UPDATE_HOST_INTRO_SETTINGS', data)
  },

  updateNoticePeriod(context, data) {
    context.commit('UPDATE_LISTING_NOTICE_PERIOD', data)
  },

  updateBookingInAdvancePeriod(context, data) {
    context.commit('UPDATE_LISTING_ADVANCED_BOOKING_PERIOD', data)
  },

  updateListingStayLimit(context, data) {
    context.commit('UPDATE_LISTING_STAY_LIMITS', data)
  },

  updateListingPricing(context, data) {
    context.commit('UPDATE_LISTING_PRICING', data)
  },

  updateListingSpecialOfferFirst(context, data) {
    context.commit('UPDATE_LISTING_SPECIAL_OFFER_FIRST', data)
  },
}
