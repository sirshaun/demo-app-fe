<template>
	<div>
		<div class="text-6xl text-gray-400">“</div>
		<div class="-mt-10 -mb-16 font-light">
			Software developer trying to spread positivity and love through my
			projects. Zimbabwean born, Australian based. Love reading books and
			manga in the outdoors.
		</div>
		<div class="text-6xl text-gray-400 mb-4">_</div>
		<div class="flex items-center">
			<img src="/img/ikonate/home-alt.svg" class="h-4 mr-4" />
			<span class="font-light">
				Lives in {{ user.state }} Province, Zimbabwe</span
			>
		</div>
		<div class="flex items-center">
			<img src="/img/ikonate/chat.svg" class="h-4 mr-4" />
			<span class="font-light"> Speaks English, Ndebele, Shona</span>
		</div>
		<div class="flex items-center">
			<img src="/img/ikonate/suitcase-alt.svg" class="h-4 mr-4" />
			<span class="font-light"> Work: iCode, iCreate</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['user'],
}
</script>
