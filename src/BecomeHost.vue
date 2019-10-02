<template>
	<div class="bg-gray-100 h-screen md:mt-22">
		<div class="mb-10">
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
			</nav>
		</div>

		<!-- Progress bar -->

		<!-- Stepper -->
		<!-- Place Type, Bedrooms, Baths, Location, Amenities, Shared spaces -->

		<PlaceType v-if="step == 1" />
		<Bedrooms v-if="step == 2" />
		<Baths v-if="step == 3" />
		<Location v-if="step == 4" />
		<LocationConfirm v-if="step == 5" />
		<Amenities v-if="step == 6" />
		<SharedSpaces v-if="step == 7" />
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

export default {
	components: {
		PlaceType,
		Bedrooms,
		Baths,
		Location,
		LocationConfirm,
		Amenities,
		SharedSpaces,
	},
	data() {
		return {
			user: {},
			step: 1,
			text: ['', 'Step 1: Start with the basics'],
		}
	},
	computed: {
		navText() {
			// TODO: Update when all steps are known
			return this.text[this.step]
		},
	},
}
</script>
