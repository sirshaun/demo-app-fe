<template>
	<div class="clearfix">
		<a
			@click="toggleShow"
			class="btn-float footer"
			:class="{ close: showFooter }"
		>
			<div class="flex items-center flex-shrink-0">
				<img
					class="h-4 w-4"
					:src="
						showFooter
							? '/img/ikonate/close-white.svg'
							: '/img/ikonate/language-white.svg'
					"
					alt=""
				/>
				<span class="ml-1 text-sm">{{
					showFooter ? 'Close' : 'Terms, Privacy & More'
				}}</span>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	props: ['showFooter'],
	methods: {
		toggleShow() {
			this.$emit('footer-btn-clicked')
		},
	},
}
</script>
