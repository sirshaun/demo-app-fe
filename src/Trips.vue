<template>
	<div class="">
		<Navigation title="Profile" />

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
					>
						<img
							class="rounded"
							src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						/>
						<div class="mt-1 px-1">
							<p
								class="text-gray-600 text-xs uppercase font-light tracking-wide leading-none"
							>
								June 2018
							</p>
							<p class="text-sm font-light leading-none">
								Harare
							</p>
							<p
								class="text-gray-600 text-xs font-light leading-none"
							>
								1 reservation
							</p>
						</div>
					</div>
					<div
						class="cursor-pointer m-3 max-w-sm"
						style="height: 239.95px; width: 359.5px"
					>
						<img
							class="rounded"
							src="https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<div class="mt-1 px-1">
							<div class="">
								<p
									class="text-gray-600 text-xs uppercase font-light tracking-wide leading-none"
								>
									December 2018
								</p>
								<p class="text-sm font-light leading-none">
									Bulawayo
								</p>
								<p
									class="text-gray-600 text-xs font-light leading-none"
								>
									1 reservation
								</p>
							</div>
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

import Navigation from './components/Navigation.vue'
import BackButton from './components/BackButton'
import Footer from './components/Footer'

export default {
	components: { Navigation, BackButton, Footer },
	data() {
		return {
			user: {},
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
			this.fetchProfile()
		}
	},
}
</script>
