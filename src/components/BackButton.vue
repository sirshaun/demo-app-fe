<template>
	<div class="clearfix">
		<a
			@click="goBack"
			class="btn-float text-white hover:text-indigo-500 hover:bg-white"
		>
			<svg
				class="h-full fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<path
					d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"
				/>
			</svg>
		</a>
	</div>
</template>

<script>
export default {
	methods: {
		goBack() {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		},
	},
}
</script>
