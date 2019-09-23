<template>
	<div>
		<div class="text-6xl text-gray-400">“</div>
		<div class="-mt-10 -mb-16 font-light">{{ about }}</div>
		<div class="text-6xl text-gray-400 mb-4">_</div>
		<div class="flex items-center">
			<img src="/img/ikonate/home-alt.svg" class="h-4 mr-4" />
			<span class="font-light"> Lives in {{ location }}</span>
		</div>
		<div class="flex items-center" v-show="atLeastOneLanguage">
			<img src="/img/ikonate/chat.svg" class="h-4 mr-4" />
			<span class="font-light"> Speaks {{ normalizedLanguages }}</span>
		</div>
		<div class="flex items-center" v-show="!!work">
			<img src="/img/ikonate/suitcase-alt.svg" class="h-4 mr-4" />
			<span class="font-light"> Work: {{ work }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['about', 'location', 'languages', 'work'],
	computed: {
		normalizedLanguages() {
			return typeof this.languages == 'undefined'
				? []
				: this.languages.join(', ')
		},
		atLeastOneLanguage() {
			return !!this.normalizedLanguages
		},
	},
}
</script>
