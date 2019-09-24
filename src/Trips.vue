<template>
	<div class="">
		<Navigation :profileImage="user.profileImage" />

		<div class="bg-gray-200 pb-16">
			<h1
				class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
			>
				Upcoming <span class="text-indigo-500">plans</span>
			</h1>
			<p class="px-10 font-light text-sm">
				You have no upcoming trips. Start exploring ideas for your next
				trip.
			</p>
			<div class="px-10 mt-5">
				<router-link to="\">
					<a
						class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
						>Explore Workcation
					</a>
				</router-link>
			</div>

			<div class="bg-pattern h-20 w-full mt-4 mb-10"></div>

			<h1
				class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
			>
				Past <span class="text-indigo-500">trips</span>
			</h1>

			<div class="mt-4 px-10">
				<div class="flex content-center flex-wrap">
					<div
						class="cursor-pointer m-3 max-w-sm"
						style="height: 239.95px; width: 359.5px"
						v-for="trip in pastTrips"
					>
						<img class rounded" :src="trip.imageUrl"
						:alt="trip.imageAlt" />
						<div class="mt-1 px-1">
							<p
								class="text-gray-600 text-xs uppercase font-light tracking-wide leading-none"
							>
								{{ trip.date }}
							</p>
							<p class="text-sm font-light leading-none">
								{{ trip.city }}
							</p>
							<p
								class="text-gray-600 text-xs font-light leading-none"
							>
								{{
									pluralize(
										'reservation',
										trip.reservations,
										true
									)
								}}
							</p>
						</div>
					</div>
				</div>
			</div>

			<hr class="mt-20 mb-10 mx-10" />

			<div class="px-10 font-light">
				Can’t find your reservation here?
				<a class="text-indigo-600 hover:text-indigo-200 cursor-pointer"
					>Visit the Help Center.</a
				>
			</div>
		</div>

		<BackButton />

		<Footer />
	</div>
</template>

<script>
import axios from 'axios'
import Pluralize from 'pluralize'

import Navigation from './components/Navigation.vue'
import BackButton from './components/BackButton'
import Footer from './components/Footer'

export default {
	components: { Navigation, BackButton, Footer },
	data() {
		return {
			user: {},
			upcomingTrips: [],
			pastTrips: [],
		}
	},
	computed: {},
	methods: {
		fetchProfile() {
			axios
				.get('http://demo-app-be.test/user/profile', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				})
				.then(
					res => {
						this.user = res.data.user
						// this.trips = res.data.trips
					},
					error => {
						console.log(error)
					}
				)
		},
		fetchTrips() {
			axios
				.get('http://demo-app-be.test/user/trips', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				})
				.then(
					res => {
						this.upcomingTrips = res.data.upcoming
						this.pastTrips = res.data.past
					},
					error => {
						console.log(error)
					}
				)
		},
		pluralize(word, count = 0, inclusive) {
			return Pluralize(word, count, inclusive)
		},
	},
	mounted() {
		if (!Store.state.isLogged) {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		} else {
			this.fetchTrips()

			this.fetchProfile()
		}
	},
}
</script>
