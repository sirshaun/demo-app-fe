export const getters = {
	inProgress: state => {
		return !state.listing.completed
	},
	inReview: state => {
		return state.listing.reviewing
	},
}
