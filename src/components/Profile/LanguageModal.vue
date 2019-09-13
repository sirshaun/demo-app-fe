<template>
	<Transition name="fade">
		<div
			class="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
			@click.self="closeModal"
		>
			<div
				class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8"
			>
				<button
					aria-label="close"
					class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
					@click.prevent="closeModal"
				>
					×
				</button>
				<slot />
			</div>
		</div>
	</Transition>
</template>

<script>
export default {
	props: {
		languagesSelected: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		closeModal() {
			this.$emit('close-language-modal')
		},
	},
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
