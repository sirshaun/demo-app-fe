<template>
	<div>
		<Navbar
			v-if="!checkpoint"
			:header="navText"
			:page="page"
			:progress="progress"
			:save-and-exit="saveAndExit"
			:show-save-and-exit-btn="showSaveAndExitBtn"
			:checkpoint="checkpoint"
			:review="review"
			:goto-page="gotoPage"
		/>

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
import Navbar from './components/BecomeHost/Navbar'
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
		Navbar,
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
			review: false,
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
		gotoPage(page) {
			this.page = page
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
		saveAndExit() {
			this.$emit('save-and-exit', page)
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
