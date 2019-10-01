<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900">
			What kind of place are you listing?
		</h1>
		<p>
			Check that you have enough beds to accommodate all your guests
			comfortably.
		</p>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<div class="clearfix mt-6">
					<div class="float-left font-light">
						<div class="leading-none">Guests</div>
						<!-- <div class="text-xs tracking-wider">
							Ages 2-12
						</div> -->
					</div>
					<div class="float-right">
						<Counter
							:initial-counter="guests"
							:func="updateNumberOfGuests"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-bedrooms"
				>
					How many bedrooms can guests use?
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-bedrooms"
						v-model="bedrooms"
					>
						<option v-for="option in bedroomOptions">
							{{ option }}
						</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg
							class="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-beds"
				>
					How many beds can guests use?
				</label>
				<div class="clearfix mt-6">
					<div class="float-left font-light">
						<div class="leading-none">Beds</div>
					</div>
					<div class="float-right">
						<Counter
							:initial-counter="beds"
							:func="updateNumberOfBeds"
						/>
					</div>
				</div>
			</div>
		</div>

		<h1 class="font-semibold text-xl text-gray-900">
			Sleeping arrangements
		</h1>
		<p>
			Sharing the types of beds in each room can help people understand
			the sleeping arrangements.
		</p>

		<Bedroom
			v-for="(room, index) in bedroomComponents"
			:name="'Bedroom ' + (index + 1)"
			:key="room"
		/>

		<hr class="border-gray-300 my-6" />

		<div class="clearfix mt-6">
			<div class="float-left">
				<a
					class="flex items-center text-indigo-600 hover:opacity-50 cursor-pointer"
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
				>
					Next
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import Pluralize from 'pluralize'

import Counter from '@/components/Form/Counter'
import Bedroom from './Bedroom'

export default {
	components: { Counter, Bedroom },
	data() {
		return {
			guests: 0,
			bedrooms: '',
			beds: 0,
			bedroomComponents: 0,
		}
	},
	methods: {
		updateNumberOfGuests(num) {
			this.guests = num
		},
		updateNumberOfBeds(num) {
			this.beds = num
		},
		pluralize(word, count = 0, inclusive) {
			return Pluralize(word, count, inclusive)
		},
	},
	computed: {
		bedroomOptions() {
			var options = []

			for (var i = 1; i < 51; i++) {
				if (i == 1) {
					options.push(i + ' bedroom')
				} else {
					options.push(i + ' bedrooms')
				}
			}

			return options
		},
	},
	watch: {
		bedrooms: {
			immediate: false,
			handler: function(bedrooms) {
				this.bedroomComponents = parseInt(bedrooms[0])
			},
		},
	},
}
</script>
