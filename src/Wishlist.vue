<template>
	<div class="">
		<Navigation title="Profile" />

		<div class="bg-gray-200">
			<h1
				class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
			>
				Wish<span class="text-indigo-500">lists</span>
			</h1>

			<div class="px-8 py-8 mx-auto md:px-64">
				<div
					class="clearfix text-gray-700 font-semibold tracking-wide mb-4 mx-2"
				>
					<div class="float-left">Your lists</div>
					<div class="float-right md:mr-5">3 Lists</div>
				</div>
				<div class="flex content-center flex-wrap">
					<div
						class="relative cursor-pointer m-3"
						style="height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 1<br />
								2 stays
							</div>
						</div>
					</div>
					<div
						class="relative cursor-pointer m-3"
						style="max-height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 2<br />
								1 stay
							</div>
						</div>
					</div>
					<div
						class="relative cursor-pointer m-3"
						style="max-height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 3<br />
								4 stays
							</div>
						</div>
					</div>
					<div
						class="relative cursor-pointer m-3"
						style="max-height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 4<br />
								2 stays
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="px-8 py-8 mx-auto md:px-64">
				<div
					class="clearfix text-gray-700 font-semibold tracking-wide mb-4 mx-2"
				>
					<div class="float-left">Popular lists</div>
					<div class="float-right md:mr-5">
						<a
							class="text-indigo-600 hover:text-indigo-200 cursor-pointer"
							>View more...</a
						>
					</div>
				</div>
				<div class="flex content-center flex-wrap">
					<div
						class="relative cursor-pointer m-3"
						style="height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 1<br />
								2 stays
							</div>
						</div>
					</div>
					<div
						class="relative cursor-pointer m-3"
						style="max-height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 2<br />
								1 stay
							</div>
						</div>
					</div>
					<div
						class="relative cursor-pointer m-3"
						style="max-height: 239.95px; width: 359.5px"
					>
						<img
							class="tile-img"
							src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<div class="absolute inset-x-0 bottom-0 max-w-md">
							<div
								class="text-white text-md font-semibold tracking-wide mx-4 my-2"
							>
								List 3<br />
								1 stay
							</div>
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

export default {
	components: { Navigation, BackButton },
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
