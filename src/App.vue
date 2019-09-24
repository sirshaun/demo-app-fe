<template>
	<div>
		<div class="bg-gray-100 flex">
			<div
				class="px-8 py-12 mx-w-md mx-auto sm:mx-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12"
			>
				<div class="xl:max-w-lg xl:ml-auto">
					<img class="h-10" src="/img/logo.svg" alt="Workcation" />
					<img
						class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-72 sm:w-full sm:object-cover sm:object-center lg:hidden"
						src="/img/beach-work.jpg"
						alt="Woman Workcationing on the beach"
					/>
					<h1
						class="mt-6 sm:mt-8 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight"
					>
						You can work from anywhere.
						<br class="hidden lg:inline " /><span
							class="text-indigo-500"
							>Take advantage of it.</span
						>
					</h1>
					<p class="mt-2 sm:mt-4 text-gray-600 sm:text-xl">
						Workcation helps you find work-friendly rentals in
						beautiful locations so you can enjoy some nice weather
						even when you're not on vacation.
					</p>
					<div class="mt-4 sm:mt-6">
						<router-link :to="whereTo">
							<a class="btn btn-indigo shadow-lg sm:text-base"
								>Book your escape</a
							>
						</router-link>
						<!-- <a class="btn btn-gray sm:text-base" href="#">Learn more</a> -->
					</div>
				</div>
			</div>
			<div class="hidden lg:block lg:w-1/2 lg:relative">
				<img
					class="absolute inset-0 h-full w-full object-cover object-center"
					src="/img/beach-work.jpg"
					alt="Woman Workcationing on the beach"
				/>
			</div>
		</div>
		<div class="bg-gray-200">
			<div
				class="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8"
			>
				<h2 class="text-xl text-gray-900">Popular destinations</h2>
				<p class="text-gray-600">
					A selection of great work-friendly cities with lots to see
					and explore.
				</p>
				<div class="flex flex-wrap -mx-4">
					<div
						class="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3"
						v-for="destination in popularDestinations"
					>
						<DestinationCard :destination="destination" />
					</div>
				</div>
			</div>
		</div>

		<FooterButton
			:showFooter="!footerBtn"
			@footer-btn-clicked="toggleFooter"
		/>
		<Footer :floated="true" v-show="!footerBtn" />
	</div>
</template>

<script>
import axios from 'axios'

import DestinationCard from './components/DestinationCard'
import Footer from './components/Footer'
import FooterButton from './components/FooterButton'

export default {
	name: 'app',
	components: { DestinationCard, FooterButton, Footer },
	data() {
		return {
			popularDestinations: [],
			footerBtn: true,
		}
	},
	methods: {
		fetchDestinations() {
			axios.get('http://demo-app-be.test/destination').then(
				res => {
					this.popularDestinations = res.data
				},
				error => {
					console.log(error)
				}
			)
		},
		toggleFooter() {
			this.footerBtn = !this.footerBtn
		},
	},
	computed: {
		whereTo() {
			return Store.state.isLogged ? '/' : '/login'
		},
	},
	mounted() {
		this.fetchDestinations()
	},
}
</script>

<style src="./main.css"></style>
