<template>
	<div
		class="bg-gray-100 min-h-screen w-3/5 px-6 pt-10 pb-20"
		:class="{ 'md:mt-22': !checkpoint }"
	>
		<div class="mb-10" v-if="!checkpoint">
			<nav class="nav-float justify-start">
				<div class="flex items-center flex-shrink-0 text-white mr-6">
					<router-link to="/">
						<img
							class="h-10"
							src="/img/logo-mini.svg"
							alt="Workcation"
						/>
					</router-link>
				</div>
				<div class="font-light text-lg tracking-wide">
					{{ navText }}
				</div>
				<!-- TODO: Add save and exit button -->
			</nav>
		</div>

		<!-- Progress bar -->

		<!-- Stepper -->
		<!-- Place Type, Bedrooms, Baths, Location, Amenities, Shared spaces -->

		<div class="ml-64">
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
			page: 1,
			step: 1,
			text: [
				'Step 1: Start with the basics',
				'Step 2: Set the scene',
				'Step 3: Get ready for guests',
			],
			checkpoint: false,
		}
	},
	computed: {
		navText() {
			return this.text[this.step - 1]
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
}
</script>
