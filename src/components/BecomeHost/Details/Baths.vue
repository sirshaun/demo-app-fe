<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900">
			How many bathrooms?
		</h1>
		<p>
			Count bathrooms that don’t have a shower or bathtub as a half
			bathroom.
		</p>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<div class="clearfix mt-6">
					<div class="float-left font-light">
						<div class="leading-none">Bathrooms</div>
					</div>
					<div class="float-right">
						<Counter
							:initial-counter="bathrooms"
							:func="updateNumberOfBathrooms"
							:accuracy="0.5"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-type"
				>
					Are any of the bathrooms private?
				</label>
				<div class="mb-4" v-for="option in privacyOptions">
					<input
						type="radio"
						:id="option.key"
						:value="option.text"
						name="privateBathroom"
						v-model="privateBathroom"
					/>
					<label
						:for="option.key"
						class="ml-1 font-light inline-block w-11/12"
						>{{ option.text }}</label
					>
				</div>
			</div>
		</div>

		<hr class="border-gray-300 my-6" />

		<div class="clearfix mt-6">
			<div class="float-left">
				<a
					class="flex items-center text-indigo-600 hover:opacity-50 cursor-pointer"
					@click="back"
				>
					<img
						src="/img/ikonate/chevron-left-indigo-600.svg"
						class="h-6 mr-1"
					/>
					<span class="font-thin">Back</span>
				</a>
			</div>
			<div class="float-right">
				<a
					class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
					@click="next"
				>
					Next
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import Counter from '@/components/Form/Counter'

export default {
	components: { Counter },
	props: {
		back: { type: Function, required: true },
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
	},
	data() {
		return {
			bathrooms: 0,
			privateBathroom: '',
			privacyOptions: [
				{ key: 'yes', text: 'Yes' },
				{ key: 'no', text: 'No, they’re shared' },
			],
		}
	},
	methods: {
		updateNumberOfBathrooms(num) {
			this.bathrooms = num
		},
	},
}
</script>
