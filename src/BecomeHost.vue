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

		<FirstStep v-if="step == 1" />
		<SecondStep v-if="step == 2" />
	</div>
</template>

<script>
import FirstStep from './components/BecomeHost/FirstStep'
import SecondStep from './components/BecomeHost/SecondStep'

export default {
	components: { FirstStep, SecondStep },
	data() {
		return {
			user: {},
			step: 2,
			text: ['', 'Step 1: Start with the basics'],
			type: '',
			typeOptions: ['Apartment', 'House', 'Bed and Breakfast', 'Other'],
		}
	},
	computed: {
		navText() {
			return this.text[this.step]
		},
	},
}
</script>
