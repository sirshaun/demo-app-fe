<template>
	<div class="flex flex-wrap items-center mt-6">
		<div class="w-1/3 font-light leading-none">{{ name }}</div>
		<div class="w-1/3">
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
				// NOTE: name with white space are shortened to just the
				// first word of that name (to match the data in the parent)

				if (/\s/.test(this.name))
					var shortName = this.name.substr(0, this.name.indexOf(' '))

				this.func(shortName || this.name, beds)
			},
		},
	},
}
</script>
