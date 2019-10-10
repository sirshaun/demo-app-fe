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
}
