<template>
	<div
		class="fixed bg-gray-100 w-5/12 bottom-0 pb-10"
		:class="{ 'shadow-top': shadowOn }"
	>
		<hr class="border-gray-300 mb-6 -mx-2" />

		<div class="clearfix">
			<div class="float-left">
				<a
					class="flex items-center text-indigo-600 hover:text-indigo-400 cursor-pointer"
					@click="back"
				>
					<svg
						class="h-6 mr-1 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path
							d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
						/>
					</svg>
					<span class="font-thin">Back</span>
				</a>
			</div>
			<div class="float-right">
				<!-- {{ yScroll - 89 - 16 }} -->
				<a
					class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
					@click="next"
				>
					{{ nextBtnText }}
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
		nextBtnText: { type: String, default: 'Next' },
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
