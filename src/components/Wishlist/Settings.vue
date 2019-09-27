<template>
	<div>
		<form @submit.prevent="saveChanges" class="mb-10">
			<div class="clearfix mt-6">
				<div class="float-left">
					<a
						class="cursor-pointer text-indigo-600 hover:text-indigo-200"
						@click="rollbackChanges"
					>
						Cancel
					</a>
				</div>
				<div class="float-right">
					<input
						class="bg-indigo-500 hover:bg-indigo-700 text-white tracking-wider p-2 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						value="Save"
					/>
				</div>
			</div>

			<div class="mt-6">
				<h1 class="text-3xl text-gray-800 font-bold tracking-wide">
					Settings
				</h1>

				<div class="mt-16">
					<div class="flex flex-wrap">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="grid-name"
							>
								Name
							</label>
							<input
								class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-name"
								type="text"
								placeholder=""
								v-model="name"
							/>
						</div>
					</div>

					<hr class="border-gray-300 my-6 -mx-10" />

					<div class="flex flex-wrap">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="grid-name"
							>
								Dates
							</label>
							<div class="v-date-picker">
								<DatePicker
									:value="dates"
									mode="range"
									:columns="$screens({ default: 1, lg: 2 })"
									color="indigo"
									v-model="dates"
								/>
							</div>
						</div>
					</div>

					<hr class="border-gray-300 my-6 -mx-10" />

					<div class="flex flex-wrap">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							>
								Guests
							</label>
							<div class="clearfix mt-6">
								<div class="float-left font-light">
									Adults
								</div>
								<div class="float-right">
									<Counter
										:initial-counter="adults"
										:func="updateNumberOfAdults"
									/>
								</div>
							</div>
							<hr class="border-gray-300 my-6" />
							<div class="clearfix mt-6">
								<div class="float-left font-light">
									<div class="leading-none">Children</div>
									<div class="text-xs tracking-wider">
										Ages 2-12
									</div>
								</div>
								<div class="float-right">
									<Counter
										:initial-counter="children"
										:func="updateNumberOfChildren"
									/>
								</div>
							</div>
							<hr class="border-gray-300 my-6" />
							<div class="clearfix mt-6">
								<div class="float-left font-light">
									<div class="leading-none">Infants</div>
									<div class="text-xs tracking-wider">
										Under 2
									</div>
								</div>
								<div class="float-right">
									<Counter
										:initial-counter="infants"
										:func="updateNumberOfInfants"
									/>
								</div>
							</div>
						</div>
					</div>

					<hr class="border-gray-300 my-6 -mx-10" />

					<div class="flex flex-wrap">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="grid-privacy"
							>
								Privacy
							</label>
							<div class="relative">
								<select
									class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-privacy"
									v-model="privacy"
								>
									<option v-for="option in privacyOptions">
										{{ option }}
									</option>
								</select>
								<div
									class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
								>
									<svg
										class="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path
											d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<hr class="border-gray-300 my-6 -mx-10" />

					<div class="flex flex-wrap">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4"
							>
								Friends
							</label>
							<a
								class="text-indigo-600 cursor-pointer hover:text-indigo-200"
								>Invite more</a
							>
							<hr class="border-gray-300 my-6" />
							<FriendsList
								:friends="friends"
								:func="updateFriendsList"
							/>
						</div>
					</div>

					<hr class="border-gray-300 my-6 -mx-10" />

					<div class="flex flex-wrap mt-16">
						<div class="w-full px-3">
							<a
								class="text-indigo-600 cursor-pointer hover:text-indigo-200"
								@click="toggleDeleteModal"
								>Delete this list</a
							>
						</div>
					</div>
				</div>
			</div>
		</form>
		<ConfirmModal
			:name="name"
			:delete-url="'/user/wishlists/' + wishlistId + '/delete'"
			:redirect-route="'/wishlists'"
			:modal-on="deleteModalOn"
			v-if="deleteModalOn"
			@close-confirm-modal="toggleDeleteModal"
		/>
	</div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

import FriendsList from './FriendsList'
import Counter from '@/components/Form/Counter'
import ConfirmModal from '@/components/ConfirmModal'

export default {
	components: { DatePicker, FriendsList, Counter, ConfirmModal },
	props: {
		initialName: { type: String },
		initialDates: { type: Object },
		initialAdults: { type: Number },
		initialChildren: { type: Number },
		initialInfants: { type: Number },
		initialPrivacy: { type: String },
		friends: { type: Array },
		wishlistId: { type: Number },
	},
	data: function() {
		return {
			name: this.initialName,
			dates: this.initialDates,
			adults: this.initialAdults,
			children: this.initialChildren,
			infants: this.initialInfants,
			privacy: this.initialPrivacy,
			privacyOptions: ['Invite only', 'Everyone'],
			deleteModalOn: false,
		}
	},
	methods: {
		updateNumberOfAdults(num) {
			this.adults = num
		},
		updateNumberOfChildren(num) {
			this.children = num
		},
		updateNumberOfInfants(num) {
			this.infants = num
		},
		updateFriendsList(friend) {
			//
		},
		convertDate(dateObj, key) {
			if (dateObj === null && typeof dateObj === 'object') {
				return null
			}
			return dateObj[key].toLocaleDateString()
		},
		toggleDeleteModal() {
			this.deleteModalOn = !this.deleteModalOn
		},
		saveChanges() {
			this.$http
				.post(
					'/user/wishlists/' + this.wishlistId + '/update',
					{
						name: this.name,
						adults: this.adults,
						children: this.children,
						infants: this.infants,
						privacy: this.privacy,
						check_in: this.convertDate(this.dates, 'start'),
						check_out: this.convertDate(this.dates, 'end'),
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								'token'
							)}`,
						},
					}
				)
				.then(res => {
					this.$emit('update-wishlist-settings', res.data.wishlist)
				})
				.catch(error => {
					console.log(error)
				})
		},
		rollbackChanges() {
			this.$emit('cancel-button-clicked')
		},
	},
}
</script>
