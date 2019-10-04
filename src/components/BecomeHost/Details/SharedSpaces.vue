<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900 px-4">
			What spaces can guests use?
		</h1>
		<p class="px-4">
			Include common areas, but don’t add spaces that aren’t on your
			property.
		</p>

		<div class="flex flex-wrap mt-6">
			<div class="w-full px-3">
				<div class="mb-4" v-for="(option, index) in spaces">
					<input
						type="checkbox"
						:id="index"
						:value="option"
						v-model="checkedSpaces"
					/>
					<label
						:for="index"
						class="ml-1 font-light inline-block w-11/12"
						>{{ option }}</label
					>
				</div>
			</div>
		</div>

		<Footer
			:back="back"
			:next="next"
			:checkpoint="checkpoint"
			next-btn-text="Done"
		/>
	</div>
</template>

<script>
import Footer from '@/components/BecomeHost/Footer'

export default {
	components: { Footer },
	props: {
		back: { type: Function, required: true },
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
	},
	data() {
		return {
			checkedSpaces: [],
			spaces: [
				'Private living room',
				'Kitchen',
				'Laundry - washer',
				'Laundry - dryer',
				'Parking',
				'Gym',
				'Pool',
				'Hot tub',
				'Elevator',
			],
		}
	},
}
</script>
