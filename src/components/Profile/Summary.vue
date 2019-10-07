<template>
	<div>
		<div class="text-6xl text-gray-400">“</div>
		<div class="-mt-10 -mb-16 font-light">{{ about }}</div>
		<div class="text-6xl text-gray-400 mb-4">_</div>
		<div class="flex items-center">
			<svg
				class="h-4 mr-4 text-gray-600 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z" />
			</svg>
			<span class="font-light"> Lives in {{ location }}</span>
		</div>
		<div class="flex items-center" v-show="atLeastOneLanguage">
			<svg
				class="h-4 mr-4 text-gray-600 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-2.25a8 8 0 0 0 4-2.46V9a2 2 0 0 1-2-2V3.07a7.95 7.95 0 0 0-3-1V3a2 2 0 0 1-2 2v1a2 2 0 0 1-2 2v2h3a2 2 0 0 1 2 2v5.75zm-4 0V15a2 2 0 0 1-2-2v-1h-.5A1.5 1.5 0 0 1 4 10.5V8H2.25A8.01 8.01 0 0 0 8 17.75z"
				/>
			</svg>
			<span class="font-light"> Speaks {{ normalizedLanguages }}</span>
		</div>
		<div class="flex items-center" v-show="!!work">
			<svg
				class="h-4 mr-4 text-gray-600 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<path
					d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
				/>
			</svg>
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
