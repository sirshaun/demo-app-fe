<template>
	<Transition name="fade">
		<div
			class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-max"
		>
			<div
				class="modal-overlay absolute w-full h-full bg-gray-900 opacity-75"
			></div>

			<div
				class="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
				@click="dismiss"
			>
				<svg
					class="h-6 text-white fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path
						d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
					/>
				</svg>
				<span class="text-sm">(Esc)</span>
			</div>

			<slot></slot>
		</div>
	</Transition>
</template>

<script>
export default {
	props: {
		show: { required: true },
		preventBackgroundScrolling: { default: true },
	},
	methods: {
		dismiss() {
			this.$emit('close-modal')
		},
	},
	watch: {
		show: {
			immediate: true,
			handler: function(show) {
				if (show) {
					this.preventBackgroundScrolling &&
						document.body.style.setProperty('overflow', 'hidden')
				}
				/*else {
					this.preventBackgroundScrolling &&
						document.body.style.removeProperty('overflow')
				}*/
			},
		},
	},
	mounted() {
		const overlay = document.querySelector('.modal-overlay')
		const listener = e => this.dismiss()

		overlay.addEventListener('click', listener)

		this.$once('hook:beforeDestroy', () => {
			this.preventBackgroundScrolling &&
				document.body.style.removeProperty('overflow')

			overlay.removeEventListener('click', listener)
		})

		document.onkeydown = evt => {
			evt = evt || window.event
			var isEscape = false
			if ('key' in evt) {
				isEscape = evt.key === 'Escape' || evt.key === 'Esc'
			} else {
				isEscape = evt.keyCode === 27
			}

			if (isEscape && this.show) {
				this.dismiss()
			}
		}
	},
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
