<template>
	<div>
		<div class="text-6xl text-gray-400">“</div>
		<div class="-mt-10 -mb-16 font-light">{{ user.about }}</div>
		<div class="text-6xl text-gray-400 mb-4">_</div>
		<div class="flex items-center">
			<img src="/img/ikonate/home-alt.svg" class="h-4 mr-4" />
			<span class="font-light"> Lives in {{ user.location }}</span>
		</div>
		<div class="flex items-center" v-show="!!user.spokenLanguages">
			<img src="/img/ikonate/chat.svg" class="h-4 mr-4" />
			<span class="font-light"> Speaks {{ user.spokenLanguages }}</span>
		</div>
		<div class="flex items-center" v-show="!!user.work">
			<img src="/img/ikonate/suitcase-alt.svg" class="h-4 mr-4" />
			<span class="font-light"> Work: {{ user.work }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['user'],
}
</script>
