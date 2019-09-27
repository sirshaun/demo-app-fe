<template>
	<div class="">
		<Navigation :profileImage="user.profileImage" />

		<div class="bg-gray-200 pb-16 md:mt-22">
			<div>
				<h1
					class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
				>
					Upcoming <span class="text-indigo-500">trips</span>
				</h1>
				<Banner :show="!upcoming" />
				<Grid :show="upcoming" :trips="upcomingTrips" />
			</div>

			<hr class="mx-10 my-10" />

			<div>
				<h1
					class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
				>
					Past <span class="text-indigo-500">trips</span>
				</h1>

				<Banner :show="!past">
					<template v-slot:message>
						You have no past trips. Start exploring ideas for your
						next trip.
					</template>
					<template v-slot:link>
						<router-link to="/" v-show="upcoming">
							<a
								class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
								>Explore Workcation
							</a>
						</router-link>
					</template>
				</Banner>
				<Grid :show="past" :trips="pastTrips" />
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
import Navigation from './components/Navigation.vue'
import Banner from './components/Trips/Banner.vue'
import Grid from './components/Trips/Grid.vue'
import BackButton from './components/BackButton'
import Footer from './components/Footer'

export default {
	components: { Navigation, Banner, Grid, BackButton, Footer },
	data() {
		return {
			user: {},
			upcomingTrips: [],
			pastTrips: [],
		}
	},
	computed: {
		upcoming() {
			return !!this.upcomingTrips.length
		},
		past() {
			return !!this.pastTrips.length
		},
	},
	methods: {
		fetchProfile() {
			this.$http
				.get('/user/profile', {
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
			this.$http
				.get('/user/trips', {
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
