<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900 px-4">
			Is the pin in the right place?
		</h1>
		<p class="px-4">
			If needed, you can adjust the map so the pin is in the right
			location. Only confirmed guests will see this, so they know how to
			get to your place.
		</p>

		<div class="flex flex-wrap mt-6">
			<div class="w-full px-3 text-gray-700 text-sm tracking-wide">
				{{ address }}
			</div>
		</div>

		<div class="flex flex-wrap mt-6">
			<div class="px-3">
				<GmapMap
					:center="{ lat: 10, lng: 10 }"
					:zoom="7"
					map-type-id="terrain"
					style="width: 500px; height: 300px"
				>
					<GmapMarker
						:key="index"
						v-for="(m, index) in markers"
						:position="m.position"
						:clickable="true"
						:draggable="true"
						@click="center = m.position"
					/>
				</GmapMap>
			</div>
		</div>

		<Footer
			:back="back"
			:next="updateAndContinue"
			:checkpoint="checkpoint"
			next-btn-text="Yes, that's right"
		/>
	</div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap'
import Footer from '@/components/BecomeHost/Footer'

export default {
	components: { GoogleMap, Footer },
	props: {
		back: { type: Function, required: true },
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
		address: {
			type: String,
			default: '12 Lewton Road, Mount Waverley, VIC 3149, Australia',
		},
	},
	data() {
		return {
			long: '',
			lat: '',
			markers: [
				{
					position: {
						lat: 48.16091,
						lng: 16.38333,
					},
				},
				{
					position: {
						lat: 48.17427,
						lng: 16.32962,
					},
				},
				// ...
			],
		}
	},
	methods: {
		updateAndContinue() {
			this.$store.dispatch('updateCoordinates', {
				long: this.long,
				lat: this.lat,
			})

			this.next()
		},
	},
}
</script>
