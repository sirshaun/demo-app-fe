<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900">
			What spaces can guests use?
		</h1>
		<p>
			Include common areas, but don’t add spaces that aren’t on your
			property.
		</p>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<div class="mb-4" v-for="(option, index) in spaces">
					<input
						type="checkbox"
						:id="index"
						:value="option"
						v-model="checkedSpaces"
					/>
					<label
						:for="index"
						class="ml-1 font-light inline-block w-11/12"
						>{{ option }}</label
					>
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
					class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
					@click="next"
				>
					Finish
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
			checkedSpaces: [],
			spaces: [
				'Private living room',
				'Kitchen',
				'Laundry - washer',
				'Laundry - dryer',
				'Parking',
				'Gym',
				'Pool',
				'Hot tub',
				'Elevator',
			],
		}
	},
}
</script>
