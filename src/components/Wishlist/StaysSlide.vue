<template>
	<Glider :multi="true" :perView="1">
		<ul class="glide__slides">
			<li class="glide__slide max-w" v-for="image in images">
				<img class="rounded" :src="image.url" :alt="image.alt" />
			</li>
		</ul>
	</Glider>
</template>

<script>
import Glider from '@/components/Glider'

export default {
	components: { Glider },
	props: ['images'],
}
</script>
