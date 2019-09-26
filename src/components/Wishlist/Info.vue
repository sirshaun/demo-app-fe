<template>
	<Transition name="slide-fade">
		<div>
			<div class="clearfix mt-6">
				<div class="float-left">
					<a
						class="cursor-pointer text-indigo-600 hover:text-indigo-200"
					>
						All lists
					</a>
				</div>
				<a
					class="float-right text-white h-14 w-14 p-2 rounded-full inline-flex items-center cursor-pointer bg-white border border-gray-200 shadow-inner hover:shadow"
					@click="toggleEdit"
				>
					<img src="/img/ikonate/edit.svg" class="h-6" />
				</a>
			</div>

			<div class="mt-8">
				<h1 class="text-3xl text-gray-800 font-bold leading-tight">
					{{ wishlist.name }}
				</h1>
				<div class="font-light text-normal">
					<span>{{ dates }}</span>
					&bull;
					<span>{{
						pluralize('guest', wishlist.numberOfGuests, true)
					}}</span>
				</div>
				<div class="mt-8">
					<a
						class="bg-transparent hover:bg-indigo-500 text-indigo-700 hover:text-white p-2 border border-indigo-500 hover:border-transparent rounded cursor-pointer"
						>Invite others
					</a>
				</div>

				<hr class="border-gray-400 my-10 -mx-10" />

				<div>
					<h5 class="tracking-wide">
						{{ pluralize('stay', stays.length, true) }}
					</h5>

					<div class="mt-4">
						<div class="" v-for="(stay, index) in stays">
							<StaysSlide :images="stay.images" />

							<div class="mt-1 px-1">
								<div class="flex items-baseline">
									<div
										class="text-gray-600 text-xs uppercase font-semibold tracking-wide"
									>
										{{ stay.accommodation }}
										&bull;
										{{ pluralize('bed', stay.beds, true) }}
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
									<span class="text-gray-600 text-xs ml-2">{{
										stay.reviews
									}}</span>
								</div>
							</div>
							<div class="clearfix">
								<div class="float-right">
									<a
										class="bg-transparent hover:bg-indigo-500 text-indigo-700 hover:text-white p-2 border border-indigo-500 hover:border-transparent rounded cursor-pointer"
										>Check price & availability
									</a>
								</div>
							</div>
							<hr
								class="my-8 border-gray-300"
								v-show="index != stays.length - 1"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
import Pluralize from 'pluralize'

import StaysSlide from './StaysSlide'

export default {
	components: { StaysSlide },
	props: {
		wishlist: {
			type: Object,
			require: true,
		},
		stays: {
			type: Array,
			require: true,
		},
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
		pluralize(word, count = 0, inclusive) {
			return Pluralize(word, count, inclusive)
		},
		toggleEdit() {
			this.$emit('edit-button-clicked')
		},
	},
}
</script>

<style scoped>
.slide-fade-enter-active {
	transition: all 0.5s ease;
}
.slide-fade-leave-active {
	transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
	transform: translateX(10px);
	opacity: 0;
}
</style>
