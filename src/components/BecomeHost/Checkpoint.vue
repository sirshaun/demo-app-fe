<template>
	<div class="flex flex-wrap">
		<div class="w-1/2">
			<h1 class="font-semibold text-xl text-gray-900">
				Great progress, Shaun!
			</h1>
			<p>
				Now let’s get some details about your place so you can publish
				your listing.
			</p>

			<div class="clearfix mt-6">
				<div class="float-left">
					<div class="flex flex-col">
						<div>Beds, bathrooms, amenities and more</div>
						<div>
							<a
								class="text-indigo-600 hover:opacity-50 cursor-pointer"
								@click="reviewStepOne"
								>Change</a
							>
						</div>
					</div>
				</div>
				<div class="float-right">
					<img
						src="/img/ikonate/ok-circle-indigo-700.svg"
						class="h-10"
					/>
				</div>
			</div>

			<hr class="border-gray-300 my-6" />

			<div class="flex flex-col" :class="{ 'opacity-50': true }">
				<div>Step 2</div>
				<div>Set the scene</div>
				<div>Set the Photos, short description, title</div>
				<div v-if="false">
					<a
						class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
						@click="continueToStepTwo"
					>
						Continue
					</a>
				</div>
			</div>

			<hr class="border-gray-300 my-6" />

			<div class="flex flex-col" :class="{ 'opacity-50': true }">
				<div>Step 3</div>
				<div>Get ready for guests</div>
				<div>Booking settings, calendar, price</div>
				<div v-if="false">
					<a
						class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
						@click="continueToStepThree"
					>
						Continue
					</a>
				</div>
			</div>
		</div>
		<div class="w-1/2"></div>
	</div>
</template>

<script>
export default {
	props: {
		step: { type: Number, required: true },
		page: { type: Number, required: true },
		checkpoint: { type: Function, required: true },
	},
	methods: {
		reviewStepOne() {
			this.checkpoint()
			this.$emit('review-step-one')
		},
		continueToStepTwo() {
			this.checkpoint()
			this.$emit('continue-to-step-two')
		},
		reviewStepTwo() {
			this.checkpoint()
			this.$emit('review-step-two')
		},
		continueToStepThree() {
			this.checkpoint()
			this.$emit('continue-to-step-three')
		},
		reviewStepThree() {
			this.checkpoint()
			this.$emit('review-step-three')
		},
	},
}
</script>
