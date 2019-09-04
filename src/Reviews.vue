<template>
	<div>
		<Navigation title="Profile Reviews" />

		<div class="bg-gray-200">
			<h1
				class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
			>
				Reviews
				<span class="text-indigo-500">by you</span>
			</h1>

			<div class="container w-2/3 mx-auto px-6 py-10">
				<ul class="flex border-b border-gray-400">
					<li class="-mb-px mr-1" v-for="(tab, index) in tabs">
						<a
							class="inline-block py-2 px-4 font-semibold"
							:class="{
								'text-indigo-600 border-b-4 border-gray-400':
									tab.active,
								'text-indigo-500 hover:text-indigo-200 cursor-pointer': !tab.active,
							}"
							@click="toggleTabs(index)"
							>{{ tab.title }}</a
						>
					</li>
				</ul>

				<!--  -->
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
			tabs: [
				{ title: 'Reviews about you', active: true },
				{ title: 'Reviews by you', active: false },
			],
		}
	},
	methods: {
		toggleTabs(index) {
			for (var i = this.tabs.length - 1; i >= 0; i--) {
				if (index == i) {
					this.tabs[i].active = true
				} else {
					this.tabs[i].active = false
				}
			}
		},
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