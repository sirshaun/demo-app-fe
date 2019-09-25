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

							<div>
								<div class="" v-for="(stay, index) in stays">
									<StaysSlide :images="stay.images" />

									<div class="mt-1 px-1">
										<div class="flex items-baseline">
											<div
												class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
											>
												{{ stay.accommodation }}
												&bull;
												{{
													pluralize(
														'bed',
														stay.beds,
														true
													)
												}}
											</div>
										</div>
										<p
											class="font-semibold text-sm leading-tight truncate"
										>
											{{ stay.title }}
										</p>
										<div>
											{{ stay.price }}
											<span class="text-gray-600 text-sm"
												>/ wk</span
											>
										</div>
										<div class="flex items-center">
											<svg
												v-for="i in 5"
												:key="i"
												viewBox="0 0 24 24"
												:class="
													i <= stay.rating
														? 'text-indigo-500'
														: 'text-gray-400'
												"
												class="h-3 w-3 fill-current"
											>
												<path
													d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
												/>
											</svg>
											<span
												class="text-gray-600 text-xs ml-2"
												>{{ stay.reviews }}</span
											>
										</div>
									</div>
									<div class="clearfix">
										<div class="float-right">
											<a
												class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded cursor-pointer"
												>Check price & availability
											</a>
										</div>
									</div>
									<hr
										class="my-4 border-gray-300"
										v-show="index != stays.length - 1"
									/>
								</div>
							</div>
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

import Navigation from './components/Navigation'
import StaysSlide from './components/Wishlist/StaysSlide'
import BackButton from './components/BackButton'

export default {
	components: { Navigation, StaysSlide, BackButton },
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
