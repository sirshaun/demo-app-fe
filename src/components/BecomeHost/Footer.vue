<template>
	<div
		class="fixed bg-gray-100 w-2/5 bottom-0 pb-10 z-max"
		:class="{ 'shadow-top': shadowOn }"
	>
		<hr class="border-gray-300 mb-6 -mx-2" />

		<div v-show="false">{{ yScroll }}</div>

		<div class="clearfix">
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
			yScroll: 0,
			shadowOn: false,
		}
	},
	methods: {
		onScroll() {
			var supportPageOffset = window.pageXOffset !== undefined
			var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat'

			this.yScroll = supportPageOffset
				? window.pageYOffset
				: isCSS1Compat
				? document.documentElement.scrollTop
				: document.body.scrollTop
		},
	},
	watch: {
		yScroll: {
			immediate: true,
			handler: function(yScroll) {
				this.shadowOn = yScroll == 0
			},
		},
	},
	mounted() {
		const listener = e => this.onScroll()

		window.addEventListener('scroll', listener)

		this.$once('hook:beforeDestroy', () => {
			window.removeEventListener('scroll', listener)
		})
	},
}
</script>

<style scoped>
.shadow-top {
	box-shadow: 0 -10px 5px -10px rgba(0, 0, 0, 0.1);
}
</style>
