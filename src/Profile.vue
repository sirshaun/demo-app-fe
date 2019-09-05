<template>
	<div>
		<Navigation title="Profile" />

		<div class="md:px-64 pt-20 bg-gray-200">
			<div class="flex text-gray-800">
				<div class="w-1/3">
					<div
						class="w-9/12 flex flex-col bg-white border rounded shadow"
					>
						<div class="px-4 py-2 m-2">
							<img
								class="w-16 h-16 md:h-24 md:w-24 rounded-full mx-auto"
								src="/img/69.png"
								alt="Avatar"
							/>
							<div class="text-center mt-3">Update photo</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<a
								class="flex items-center text-indigo-600 hover:text-indigo-200"
								@click="scrollTo('profile-reviews')"
							>
								<img
									src="/img/ikonate/chat-alt.svg"
									class="h-4 mr-2"
								/>
								<span class="font-thin">1 review</span>
							</a>

							<router-link to="/profile">
								<a
									class="flex items-center text-indigo-600 hover:text-indigo-200"
								>
									<img
										src="/img/ikonate/verified.svg"
										class="h-4 mr-2"
									/>
									<span class="font-thin">Verified</span>
								</a>
							</router-link>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<div class="font-semibold mb-4">
								{{ user.first_name }} provided
							</div>
							<div class="flex items-center mb-2">
								<img
									src="/img/ikonate/ok-circle.svg"
									class="h-4 mr-2"
								/>
								<span class="font-thin"> Government ID</span>
							</div>
							<div class="flex items-center mb-2">
								<img
									src="/img/ikonate/ok-circle.svg"
									class="h-4 mr-2"
								/>
								<span class="font-thin"> Email address</span>
							</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/ok-circle.svg"
									class="h-4 mr-2"
								/>
								<span class="font-thin"> Phone number</span>
							</div>
						</div>
					</div>
				</div>
				<div class="w-2/3 mb-20">
					<div class="flex flex-col bg-white border rounded shadow">
						<div class="px-4 py-2 mx-2 my-6">
							<div class="text-5xl font-light">
								Hi, I'm {{ user.first_name }}
							</div>
							<div class="font-light text-md -mt-1">
								Joined {{ dateJoined.getFullYear() }} &bull;
								<router-link to="/profile">
									<a
										class="text-indigo-600 hover:text-indigo-200"
										>Edit profile</a
									></router-link
								>
							</div>
							<div class="text-6xl text-gray-400">“</div>
							<div class="-mt-10 -mb-16 font-light">
								Software developer trying to spread positivity
								and love through my projects. Zimbabwean born,
								Australian based. Love reading books and manga
								in the outdoors.
							</div>
							<div class="text-6xl text-gray-400 mb-4">_</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/home-alt.svg"
									class="h-4 mr-4"
								/>
								<span class="font-light">
									Lives in {{ user.state }} Province,
									Zimbabwe</span
								>
							</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/chat.svg"
									class="h-4 mr-4"
								/>
								<span class="font-light">
									Speaks English, Ndebele, Shona</span
								>
							</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/suitcase-alt.svg"
									class="h-4 mr-4"
								/>
								<span class="font-light">
									Work: iCode, iCreate</span
								>
							</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6">
							<div class="font-semibold text-2xl mb-6">
								{{ user.first_name }}' Listings
							</div>
							<Slider />
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6" id="profile-reviews">
							<div class="font-semibold text-2xl mb-6">
								2 reviews
							</div>
							<div class="">
								<div
									class="text-xs font-semibold mb-4 tracking-normal"
								>
									June 2018
								</div>
								<div class="font-light mb-4">
									Shaun was a pleasure to host during his
									visit to Harare. Most courteous and
									considerate, and good fun to chat with.
								</div>
								<div class="flex items-center">
									<img
										class="w-10 h-10 rounded-full mr-4"
										src="/img/23.png"
										alt="Avatar"
									/>
									<div class="text-sm">
										<p
											class="font-semibold text-sm leading-none mb-1"
										>
											John, Harare, Harare
										</p>
										<p
											class="text-gray-600 font-thin text-xs"
										>
											Joined in 2017 - Report
										</p>
									</div>
								</div>
							</div>
							<hr class="my-6" />
							<div class="">
								<div
									class="text-xs font-semibold mb-4 tracking-normal"
								>
									December 2018
								</div>
								<div class="font-light mb-4">
									Shaun was the perfect guest! it was a
									pleasure to host him in our apartment :)) he
									was very communicative and understanding
								</div>
								<div class="flex items-center">
									<img
										class="w-10 h-10 rounded-full mr-4"
										src="/img/23.png"
										alt="Avatar"
									/>
									<div class="text-sm">
										<p
											class="font-semibold text-sm leading-none mb-1"
										>
											Jane, Bulawayo, Bulawayo
										</p>
										<p
											class="text-gray-600 font-thin text-xs"
										>
											Joined in 2017 - Report
										</p>
									</div>
								</div>
							</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6">
							<router-link to="/profile/reviews">
								<a class="text-indigo-600 hover:text-indigo-200"
									>Reviews by you</a
								></router-link
							>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6">
							<router-link to="/profile">
								<a class="text-indigo-600 hover:text-indigo-200"
									>Report this profile</a
								></router-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BackButton />
	</div>
</template>

<script>
import axios from 'axios'

import Navigation from './components/Navigation.vue'
import BackButton from './components/BackButton'
import Slider from './components/Slider'

export default {
	components: { Navigation, BackButton, Slider },
	data() {
		return {
			user: {},
		}
	},
	computed: {
		dateJoined() {
			if (!this.user.hasOwnProperty('created_at')) return new Date()

			var dateTime = this.user.created_at.split(' ')

			var date = dateTime[0].split('-')
			var yyyy = date[0]
			var mm = date[1] - 1
			var dd = date[2]

			var time = dateTime[1].split(':')
			var h = time[0]
			var m = time[1]
			var s = parseInt(time[2]) //get rid of that 00.0;

			return new Date(yyyy, mm, dd, h, m, s)
		},
	},
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
		scrollTo(hash) {
			location.hash = '#' + hash
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
