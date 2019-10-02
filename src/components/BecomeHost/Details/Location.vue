<template>
	<div class="flex flex-col" v-show="countries[0]">
		<h1 class="font-semibold text-2xl text-gray-900">
			Where’s your place located?
		</h1>
		<p>
			Guests will only get your exact address once they’ve booked a
			reservation.
		</p>

		<div class="flex flex-wrap">
			<a
				class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white p-2 border border-indigo-500 hover:border-transparent rounded flex items-center"
			>
				<img
					src="/img/ikonate/location-indigo-700.svg"
					class="h-6 mr-2"
				/>
				<span class="font-thin">Use current location</span>
			</a>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-bedrooms"
				>
					Country / Region
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-country"
						v-model="country"
					>
						<option
							v-for="country in countries"
							:value="country.code"
						>
							{{ country.name }}
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
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-street"
				>
					Street Address
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					id="grid-street"
					type="text"
					placeholder="e.g. 123 Main St"
					v-model="street"
				/>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-apt-num"
				>
					Apt, Suite. (optional)
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					id="grid-apt-num"
					type="text"
					placeholder="e.g. Unit 401"
					v-model="aptNum"
				/>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-city"
				>
					City
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					id="grid-city"
					type="text"
					placeholder="e.g. Surrey Hills"
					v-model="city"
				/>
			</div>
			<div class="w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-state"
				>
					State
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					id="grid-state"
					type="text"
					placeholder="e.g. NSW"
					v-model="state"
				/>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-postcode"
				>
					Zip code
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					id="grid-postcode"
					type="text"
					placeholder="e.g. 2010"
					v-model="postcode"
				/>
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
export default {
	props: {
		back: { type: Function, required: true },
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
	},
	data() {
		return {
			countries: [],
			country: '',
			street: '',
			aptNum: '',
			city: '',
			state: '',
			postcode: '',
		}
	},
	methods: {
		fetchCountries() {
			this.$http.get('/location/countries').then(
				res => {
					this.countries = res.data
				},
				error => {
					console.log(error)
				}
			)
		},
	},
	mounted() {
		this.fetchCountries()
	},
}
</script>
