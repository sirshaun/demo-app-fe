<template>
	<div
		class="h-screen overflow-hidden bg-gray-100"
		v-if="user.spokenLanguages"
	>
		<Navigation :profileImage="user.profileImage" />

		<FullScreen
			leftPanelClassList="text-gray-900 px-10"
			rightPanelClassList="bg-gray-900 mx-auto"
		>
			<template v-slot:left-panel>
				<Info
					:wishlist="wishlist"
					:stays="stays"
					v-show="!editOn"
					@edit-button-clicked="toggleEdit"
				/>

				<Settings
					:initial-name="wishlist.name"
					:initial-dates="initialDates"
					:initial-adults="wishlist.adults"
					:initial-children="wishlist.children"
					:initial-infants="wishlist.infants"
					:initial-privacy="privacy"
					:friends="wishlist.friends"
					:wishlist-id="wishlist.id"
					v-show="editOn"
					@cancel-button-clicked="toggleEdit"
					@update-wishlist-settings="updateInfo"
				/>
			</template>
			<template v-slot:right-panel>
				<!-- map goes here  -->
			</template>
		</FullScreen>

		<BackButton />
	</div>
</template>

<script>
import axios from 'axios'

import Navigation from './components/Navigation'
import FullScreen from './components/FullScreen'
import Info from './components/Wishlist/Info'
import Settings from './components/Wishlist/Settings'
import BackButton from './components/BackButton'

export default {
	components: { Navigation, FullScreen, Info, Settings, BackButton },
	data() {
		return {
			user: {},
			wishlist: {},
			stays: [],
			editOn: false,
		}
	},
	computed: {
		privacy() {
			return this.wishlist.private ? 'Invite only' : 'Everyone'
		},
		initialDates() {
			if (
				this.wishlist.dates === null &&
				typeof this.wishlist.dates === 'object'
			) {
				return null
			}

			return {
				start: new Date(this.wishlist.dates.start * 1000),
				end: new Date(this.wishlist.dates.end * 1000),
			}
		},
	},
	methods: {
		toggleEdit() {
			this.editOn = !this.editOn
		},
		updateInfo(wishlist) {
			this.wishlist = wishlist

			this.toggleEdit()
		},
		editButtonClicked() {
			this.toggleEdit()
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
