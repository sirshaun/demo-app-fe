<template>
	<div class="">
		<Navigation :profileImage="user.profileImage" :isHost="user.host" />

		<div class="h-screen bg-gray-200">
			<h1
				class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
			>
				Wish<span class="text-indigo-500">lists</span>
			</h1>

			<div
				class="px-8 py-8 mx-auto md:px-64"
				v-show="userList.length > 0"
			>
				<Banner>
					<template v-slot:left
						>Your lists</template
					>
					<template v-slot:right>{{
						pluralize('List', userList.length, true)
					}}</template>
				</Banner>

				<Grid :list="userList" />
			</div>

			<!-- TODO: place content for no user lists  -->

			<div class="px-8 py-8 mx-auto md:px-64">
				<Banner>
					<template v-slot:left
						>Popular lists</template
					>
					<template v-slot:right>
						<a
							class="text-indigo-600 hover:text-indigo-200 cursor-pointer"
							>View more...</a
						>
					</template>
				</Banner>

				<Grid :list="popList" />
			</div>
		</div>

		<BackButton />
	</div>
</template>

<script>
import Pluralize from 'pluralize'

import Navigation from './components/Navigation.vue'
import Banner from './components/Wishlist/Banner.vue'
import Grid from './components/Wishlist/Grid.vue'
import BackButton from './components/BackButton'

export default {
	components: { Navigation, Banner, Grid, BackButton },
	data() {
		return {
			user: {},
			userList: [],
			popList: [],
		}
	},
	computed: {},
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
					},
					error => {
						console.log(error)
					}
				)
		},
		fetchWishlists() {
			this.$http
				.get('/user/wishlists', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				})
				.then(
					res => {
						this.userList = res.data.user_list
						this.popList = res.data.popular_list
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
		if (!this.$store.state.isLogged) {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		} else {
			this.fetchWishlists()

			this.fetchProfile()
		}
	},
}
</script>
