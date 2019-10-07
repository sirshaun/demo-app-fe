<template>
	<div class="flex flex-col" v-show="countries[0]">
		<h1 class="font-semibold text-2xl text-gray-900 px-4">
			Where’s your place located?
		</h1>
		<p class="px-4">
			Guests will only get your exact address once they’ve booked a
			reservation.
		</p>

		<div class="flex flex-wrap mt-6 px-4">
			<a
				class="bg-white hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white p-2 border border-indigo-500 hover:border-transparent rounded flex items-center"
			>
				<svg
					class="h-5 fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M0 0l20 8-8 4-2 8z" />
				</svg>
				<span class="font-thin ml-2">Use current location</span>
			</a>
		</div>

		<div class="flex flex-wrap mt-6">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 tracking-wide text-light mb-2"
					for="grid-bedrooms"
				>
					Country / Region
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						:class="{
							'border-red-500 bg-red-100 mb-1': countryError,
						}"
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
				<p v-show="countryError" class="text-red-500 text-xs italic">
					Please select an option
				</p>
			</div>
		</div>

		<div class="flex flex-wrap mt-6">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 tracking-wide text-light mb-2"
					for="grid-street"
				>
					Street Address
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					:class="{
						'border-red-500 bg-red-100 mb-1': streetError,
					}"
					id="grid-street"
					type="text"
					placeholder="e.g. 123 Main St"
					v-model="street"
				/>
				<p v-show="streetError" class="text-red-500 text-xs italic">
					Please enter street number
				</p>
			</div>
		</div>

		<div class="flex flex-wrap mt-6">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 tracking-wide text-light mb-2"
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

		<div class="flex flex-wrap mt-6">
			<div class="w-1/2 px-3">
				<label
					class="block text-gray-600 tracking-wide text-light mb-2"
					for="grid-city"
				>
					City
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					:class="{
						'border-red-500 bg-red-100 mb-1': cityError,
					}"
					id="grid-city"
					type="text"
					placeholder="e.g. Surrey Hills"
					v-model="city"
				/>
				<p v-show="cityError" class="text-red-500 text-xs italic">
					Please enter city
				</p>
			</div>
			<div class="w-1/2 px-3">
				<label
					class="block text-gray-600 tracking-wide text-light mb-2"
					for="grid-state"
				>
					State
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					:class="{
						'border-red-500 bg-red-100 mb-1': stateError,
					}"
					id="grid-state"
					type="text"
					placeholder="e.g. NSW"
					v-model="state"
				/>
				<p v-show="stateError" class="text-red-500 text-xs italic">
					Please enter state
				</p>
			</div>
		</div>

		<div class="flex flex-wrap mt-6">
			<div class="w-1/2 px-3">
				<label
					class="block text-gray-600 tracking-wide text-light mb-2"
					for="grid-postcode"
				>
					Zip code
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
					:class="{
						'border-red-500 bg-red-100 mb-1': postcodeError,
					}"
					id="grid-postcode"
					type="text"
					placeholder="e.g. 2010"
					v-model="postcode"
				/>
				<p v-show="postcodeError" class="text-red-500 text-xs italic">
					Please enter postcode / zip code
				</p>
			</div>
		</div>

		<Footer :back="back" :next="proceed" :checkpoint="checkpoint" />
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
			countries: [],
			country: '',
			street: '',
			aptNum: '',
			city: '',
			state: '',
			postcode: '',
			countryError: false,
			streetError: false,
			cityError: false,
			stateError: false,
			postcodeError: false,
		}
	},
	computed: {
		errors() {
			return (
				this.countryError ||
				this.streetError ||
				this.cityError ||
				this.stateError ||
				this.postcodeError
			)
		},
	},
	methods: {
		checkCountry() {
			this.countryError = this.country == ''
		},
		checkStreet() {
			this.streetError = this.street == ''
		},
		checkAptNum() {
			this.aptNumError = this.aptNum == ''
		},
		checkCity() {
			this.cityError = this.city == ''
		},
		checkState() {
			this.stateError = this.state == ''
		},
		checkPostcode() {
			this.postcodeError = this.postcode == ''
		},
		proceed() {
			this.checkCountry() ||
				this.checkStreet() ||
				this.checkCity() ||
				this.checkState() ||
				this.checkPostcode()

			if (!this.errors) this.updateAndContinue()
		},
		updateAndContinue() {
			this.$store.dispatch('updateLocation', {
				country: this.country,
				street: this.street,
				aptNum: this.aptNum,
				city: this.city,
				state: this.state,
				postcode: this.postcode,
			})

			this.next()
		},
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
