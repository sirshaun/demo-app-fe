export const getters = {
  step: state => {
    return state.listing.step
  },
  page: state => {
    return state.listing.page
  },
  status: state => {
    return state.listing.status
  },
  checkpoint: state => {
    return state.listing.checkpoint
  },
  lastPageNumber: state => {
    return state.listing.lastPageNumber
  },
  listing_id: state => {
    return state.listing.id
  },
  photosUploaded: state => {
    if (typeof state.listing.photos == 'undefined') return false

    return !!state.listing.photos.length
  },
  stepTwoComplete: state => {
    return typeof state.listing.title != 'undefined'
  },
  stepThreeComplete: state => {
    return state.listing.status == 'complete'
  },
  listingExists: state => {
    return !(
      Object.entries(state.listing).length === 0 &&
      state.listing.constructor === Object
    )
  },
}
