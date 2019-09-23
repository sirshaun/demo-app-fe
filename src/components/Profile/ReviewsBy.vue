<template>
	<div>
		<div
			class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
		>
			<div
				class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
			>
				Past Reviews
			</div>
			<div class="py-4 px-5 bg-white">
				<div class="font-light">
					Nobody to review right now. Looks like it’s time for another
					trip!
				</div>
			</div>
		</div>

		<div
			class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
		>
			<div
				class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
			>
				Past Reviews You’ve Written
			</div>
			<div class="py-4 px-5 bg-white">
				<div v-for="(review, index) in reviews">
					<div class="flex items-start">
						<img
							class="w-12 h-12 rounded-full mr-4"
							:src="review.reviewer_photo"
							alt="Avatar"
						/>
						<div class="text-sm">
							<p class="font-semibold text-sm leading-none mb-3">
								Review for {{ review.reviewee_name }}
							</p>
							<div class="font-light text-sm">
								<p>
									{{ review.content }}
								</p>
								<div class="font-thin text-gray-600 mt-1">
									{{ review.date }}
								</div>
							</div>
						</div>
					</div>
					<hr
						class="my-4 border-gray-300"
						v-show="index != reviews.length - 1"
					/>
				</div>
			</div>
		</div>

		<div
			class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
			v-show="showExpired"
		>
			<div
				class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
			>
				Expired Reviews
			</div>
			<div class="py-4 px-5 bg-white">
				<div class="font-light mb-6">
					Unfortunately, the deadline to submit a public review for
					this user has passed. If there's something you need to share
					with us about your experience, you can always submit private
					feedback that our teams will review.
				</div>
				<div class="flex items-start" v-for="trip in expired">
					<img
						class="w-16 h-16 rounded-full mr-4"
						:src="trip.host_photo"
						alt="Avatar"
					/>
					<div class="text-sm">
						<p class="font-light text-sm">
							Your time to write a review for {{ trip.host }} has
							expired.
						</p>
						<a
							class="font-light text-sm text-indigo-500 hover:text-indigo-200 cursor-pointer"
							>View Itinerary</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		reviews: {
			type: Array,
			required: true,
		},
		expired: {
			type: Number,
			required: true,
		},
	},
	computed: {
		showExpired() {
			return !!this.expired.length
		},
	},
}
</script>
