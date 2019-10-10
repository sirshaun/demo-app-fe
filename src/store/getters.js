export const getters = {
	progress: state => {
		return !state.listing.progress
	},
	listing_id: state => {
		return state.listing.id
	},
	photosUploaded: state => {
		return !!state.listing.photos.length
	},
	title: state => {
		return state.listing.title
	},
}
