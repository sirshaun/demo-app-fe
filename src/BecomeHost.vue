<template>
	<div>
		<div v-if="!checkpoint">
			<nav class="nav-float-alt pt-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center text-white pl-6">
						<router-link to="/">
							<img
								class="h-6"
								src="/img/logo-mini.svg"
								alt="Workcation"
							/>
						</router-link>
						<div
							class="ml-6 text-gray-900 font-light text-lg tracking-wide"
						>
							{{ navText }}
						</div>
					</div>
					<div
						class="font-light text-indigo-600 tracking-wide text-lg cursor-pointer pr-6 hover:text-indigo-400"
						@click="checkpoint = true"
						v-if="showSaveAndExitBtn"
					>
						Save and Exit
					</div>
				</div>
				<div
					class="flex justify-between mt-4 border-t border-gray-400 bg-gray-100"
					v-if="review"
				>
					<div
						class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
						:class="{
							'bg-gray-200': page == 1,
							'hover:bg-gray-300': page != 1,
						}"
						@click="page = 1"
					>
						Place type
					</div>
					<div
						class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
						:class="{
							'bg-gray-200': page == 2,
							'hover:bg-gray-300': page != 2,
						}"
						@click="page = 2"
					>
						Bedrooms
					</div>
					<div
						class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
						:class="{
							'bg-gray-200': page == 3,
							'hover:bg-gray-300': page != 3,
						}"
						@click="page = 3"
					>
						Baths
					</div>
					<div
						class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
						:class="{
							'bg-gray-200': page == 4 || page == 5,
							'hover:bg-gray-300': page != 4 || page != 5,
						}"
						@click="page = 4"
					>
						Location
					</div>
					<div
						class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
						:class="{
							'bg-gray-200': page == 6,
							'hover:bg-gray-300': page != 6,
						}"
						@click="page = 6"
					>
						Amenities
					</div>
					<div
						class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
						:class="{
							'bg-gray-200': page == 7,
							'hover:bg-gray-300': page != 7,
						}"
						@click="page = 7"
					>
						Shared spaces
					</div>
				</div>
				<div class="w-full">
					<div class="h-1 relative bg-gray-200" v-if="!checkpoint">
						<span
							:style="{ width: progress }"
							class="block h-full relative overflow-hidden bg-indigo-400"
						></span>
					</div>
				</div>
			</nav>
		</div>

		<div class="bg-gray-100 min-h-screen w-3/5 px-6 pt-10 pb-20">
			<div
				class="ml-64"
				:class="{ 'mt-32': !checkpoint, 'mt-6': checkpoint }"
			>
				<!-- Step One -->
				<PlaceType
					v-if="page == 1 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<Bedrooms
					v-if="page == 2 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<Baths
					v-if="page == 3 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<Location
					v-if="page == 4 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<LocationConfirm
					v-if="page == 5 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<Amenities
					v-if="page == 6 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<SharedSpaces
					v-if="page == 7 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>

				<!-- Checkpoint -->
				<Checkpoint
					:checkpoint="toggleCheckpoint"
					:step="step"
					:page="page"
					@review-step-one="stepOneReview"
					@continue-to-step-two="proceedStepTwo"
					@review-step-two="proceedStepTwo"
					@continue-to-step-three="proceedStepThree"
					@review-step-three="proceedStepThree"
					v-if="checkpoint"
				/>

				<!-- Step Two -->
				<Photos
					v-if="page == 8 && !checkpoint"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
					:uploadUrl="''"
				/>
				<Description
					v-if="page == 9 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>
				<Name
					v-if="page == 10 && !checkpoint"
					:back="prevPage"
					:next="nextPage"
					:checkpoint="toggleCheckpoint"
				/>

				<!-- Step Three -->
			</div>
		</div>
	</div>
</template>

<script>
import PlaceType from './components/BecomeHost/Details/PlaceType'
import Bedrooms from './components/BecomeHost/Details/Bedrooms'
import Baths from './components/BecomeHost/Details/Baths'
import Location from './components/BecomeHost/Details/Location'
import LocationConfirm from './components/BecomeHost/Details/LocationConfirm'
import Amenities from './components/BecomeHost/Details/Amenities'
import SharedSpaces from './components/BecomeHost/Details/SharedSpaces'
import Checkpoint from './components/BecomeHost/Checkpoint'
import Photos from './components/BecomeHost/Scenery/Photos'
import Description from './components/BecomeHost/Scenery/Description'
import Name from './components/BecomeHost/Scenery/Name'

export default {
	components: {
		PlaceType,
		Bedrooms,
		Baths,
		Location,
		LocationConfirm,
		Amenities,
		SharedSpaces,
		Checkpoint,
		Photos,
		Description,
		Name,
	},
	data() {
		return {
			user: {},
			listing: {},
			page: 1,
			step: 1,
			text: [
				'Step 1: Start with the basics',
				'Step 2: Set the scene',
				'Step 3: Get ready for guests',
			],
			checkpoint: false,
			review: true,
		}
	},
	computed: {
		navText() {
			return this.text[this.step - 1]
		},
		progress() {
			if (this.review) return '100%'

			if (this.step == 1) {
				var progress = parseInt((this.page / 7) * 100)
			}

			if (this.step == 2) {
				// starts at page 8 ergo page 8 is page 1 for step 2
				var progress = parseInt(((this.page - 7) / 3) * 100)
			}

			if (this.step == 3) {
				// TODO
			}

			return progress + '%'
		},
		showSaveAndExitBtn() {
			if (this.step == 1 && !this.review) return false

			return true
		},
	},
	methods: {
		prevPage() {
			this.page -= 1
		},
		nextPage() {
			this.page += 1
		},
		toggleCheckpoint() {
			this.checkpoint = !this.checkpoint
		},
		stepOneReview() {
			this.step = 1
			this.page = 1
			this.review = true
		},
		proceedStepTwo() {
			this.step = 2
			this.page = 8
		},
		proceedStepThree() {
			this.step = 2
			this.page = 8
		},
	},
	watch: {
		page: {
			immediate: true,
			handler: function(page) {
				if (page > 7 && this.step == 1) {
					this.toggleCheckpoint()
				} else if (page > 10 && this.step == 2) {
					this.toggleCheckpoint()
				}
			},
		},
	},
	created() {
		if (!this.$store.state.isLogged) {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		} else {
			this.listing = this.$store.state.listing
		}
	},
}
</script>
