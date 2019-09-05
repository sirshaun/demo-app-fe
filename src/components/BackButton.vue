<template>
	<div class="clearfix">
		<a @click="goBack" class="btn-float">
			<img class="h-full" src="/img/ikonate/arrow-left.svg" alt="Back" />
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
