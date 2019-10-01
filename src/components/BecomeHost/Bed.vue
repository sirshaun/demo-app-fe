<template>
	<div class="clearfix mt-6">
		<div class="float-left font-light">
			<div class="leading-none">{{ name }}</div>
		</div>
		<div class="float-right">
			<Counter :initial-counter="beds" :func="updateNumberOfBeds" />
		</div>
	</div>
</template>

<script>
import Counter from '@/components/Form/Counter'

export default {
	components: { Counter },
	props: {
		name: { type: String, required: true },
		func: { type: Function, required: true },
	},
	data() {
		return {
			beds: 0,
		}
	},
	methods: {
		updateNumberOfBeds(num) {
			this.beds = num
		},
	},
	watch: {
		beds: {
			immediate: false,
			handler: function(beds) {
				console.log('changed')
				this.func(this.name, beds)
			},
		},
	},
}
</script>
