<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900">
			What amenities do you offer?
		</h1>
		<p>
			These are just the amenities guests usually expect, but you can add
			even more after you publish.
		</p>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<div class="mb-4" v-for="(option, index) in defaultAmenities">
					<input
						type="checkbox"
						:id="index"
						:value="option.value"
						v-model="checkedDefaultAmenities"
					/>
					<label
						:for="index"
						class="ml-1 font-light inline-block w-11/12"
						>{{ option.value }}</label
					>
					<div class="text-sm tracking wide ml-4">
						{{ option.descr }}
					</div>
				</div>
			</div>
		</div>

		<h1 class="font-semibold text-xl text-gray-900">
			Safety Amenities
		</h1>
		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<div class="mb-4" v-for="(option, index) in safetyAmenities">
					<input
						type="checkbox"
						:id="index"
						:value="option.value"
						v-model="checkedDefaultAmenities"
					/>
					<label
						:for="index"
						class="ml-1 font-light inline-block w-11/12"
						>{{ option.value }}</label
					>
					<div class="text-sm tracking wide ml-4">
						{{ option.descr }}
					</div>
				</div>
			</div>
		</div>

		<hr class="border-gray-300 my-6" />

		<div class="clearfix mt-6">
			<div class="float-left">
				<a
					class="flex items-center text-indigo-600 hover:opacity-50 cursor-pointer"
					@click="back"
				>
					<img
						src="/img/ikonate/chevron-left-indigo-600.svg"
						class="h-6 mr-1"
					/>
					<span class="font-thin">Back</span>
				</a>
			</div>
			<div class="float-right">
				<a
					class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
					@click="next"
				>
					Next
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		back: { type: Function, required: true },
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
	},
	data() {
		return {
			checkedDefaultAmenities: [],
			checkedSafetyAmenities: [],
			defaultAmenities: [
				{
					value: 'Essentials',
					descr: 'Towels, bed sheets, soap, toilet paper and pillows',
				},
				{ value: 'Air conditioning', descr: '' },
				{ value: 'Heat', descr: '' },
				{ value: 'Dryer', descr: '' },
				{ value: 'Hair dryer', descr: '' },
				{ value: 'Closet/drawers', descr: '' },
				{ value: 'Iron', descr: '' },
				{ value: 'TV', descr: '' },
				{ value: 'Fireplace', descr: '' },
				{ value: 'Private entrance', descr: '' },
				{ value: 'Shampoo', descr: '' },
				{ value: 'Wifi', descr: '' },
				{ value: 'Desk/workspace', descr: '' },
				{ value: 'Breakfast,coffee,tea', descr: '' },
			],
			safetyAmenities: [
				{
					value: 'Lock on bedroom door',
					descr: 'Private room can be locked for safety and privacy',
				},
				{ value: 'Fire extinguisher', descr: '' },
				{
					value: 'Carbon monoxide detector',
					descr:
						'Check your local laws, which may require a working carbon monoxide detector in every room',
				},
				{
					value: 'Smoke detector',
					descr:
						'Check your local laws, which may require a working smoke detector in every room',
				},
				{ value: 'First aid kit', descr: '' },
			],
		}
	},
}
</script>
