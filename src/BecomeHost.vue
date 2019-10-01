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

		<FirstStep v-if="step == 1" />
		<SecondStep v-if="step == 2" />
		<ThirdStep v-if="step == 3" />
		<FourthStep v-if="step == 4" />
		<FifthStep v-if="step == 5" />
		<SixthStep v-if="step == 6" />
		<SeventhStep v-if="step == 7" />
	</div>
</template>

<script>
import FirstStep from './components/BecomeHost/FirstStep'
import SecondStep from './components/BecomeHost/SecondStep'
import ThirdStep from './components/BecomeHost/ThirdStep'
import FourthStep from './components/BecomeHost/FourthStep'
import FifthStep from './components/BecomeHost/FifthStep'
import SixthStep from './components/BecomeHost/SixthStep'
import SeventhStep from './components/BecomeHost/SeventhStep'

export default {
	components: {
		FirstStep,
		SecondStep,
		ThirdStep,
		FourthStep,
		FifthStep,
		SixthStep,
		SeventhStep,
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
