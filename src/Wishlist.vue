<template>
	<div>
		<Navigation :profileImage="user.profileImage" />

		<div class="bg-gray-200 md:mt-22">
			<div class="flex">
				<div class="w-2/5 bg-white h-65">
					<div class="clearfix">
						<div class="float-left">All lists</div>
						<div class="float-right">
							<img src="/img/ikonate/edit.svg" class="h-4 mr-2" />
						</div>
					</div>

					<div>
						<h1>{{ wishlist.name }}</h1>
						<div>
							<span>{{ dates }}</span>
							<span>{{
								pluralize(
									'Guest',
									wishlist.numberOfGuests,
									true
								)
							}}</span>
						</div>
						<div>
							<a
								class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded cursor-pointer"
								>Invite others
							</a>
						</div>

						<hr class="my-6" />

						<div>
							<h5>
								{{ pluralize('stay', stays.length, true) }}
							</h5>
						</div>
					</div>
				</div>
				<div class="w-3/5 bg-gray-900 h-64"></div>
			</div>
		</div>

		<BackButton />
	</div>
</template>

<script>
import axios from 'axios'
import Pluralize from 'pluralize'

import Navigation from './components/Navigation.vue'
import BackButton from './components/BackButton'

export default {
	components: { Navigation, BackButton },
	data() {
		return {
			user: {},
			wishlist: {},
			stays: [],
		}
	},
	computed: {
		dates() {
			if (this.wishlist.check_in && this.wishlist.check_out) {
				// return formatted dates
			}

			return 'No dates'
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
		fetchStays() {
			axios
				.get('http://demo-app-be.test/user/wishlists/' + 1, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				})
				.then(
					res => {
						this.wishlist = res.data.wishlist
						this.stays = res.data.stays
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
			this.fetchStays()

			this.fetchProfile()
		}
	},
}
</script>
