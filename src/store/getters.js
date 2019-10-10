export const getters = {
  progress: state => {
    return !state.listing.progress;
  },
  listing_id: state => {
    return state.listing.id;
  }
};
