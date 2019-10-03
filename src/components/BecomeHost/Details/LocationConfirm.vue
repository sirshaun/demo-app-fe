<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900">
			Is the pin in the right place?
		</h1>
		<p>
			If needed, you can adjust the map so the pin is in the right
			location. Only confirmed guests will see this, so they know how to
			get to your place.
		</p>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				{{ address }}
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<!-- Map goes here -->
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
					Yes, that's right
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
		address: {
			type: String,
			default: '12 Lewton Road, Mount Waverley, VIC 3149, Australia',
		},
	},
}
</script>
