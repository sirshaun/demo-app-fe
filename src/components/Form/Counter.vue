<template>
	<div class="flex items-center">
		<img
			src="/img/ikonate/remove-indigo-500.svg"
			class="h-6 md:h-8 mr-4"
			:class="{
				'opacity-25 cursor-default': floor,
				'cursor-pointer': !floor,
			}"
			@click="decrement"
		/>
		<span class="font-thin">{{ counter }}</span>
		<img
			src="/img/ikonate/add-indigo-500.svg"
			class="h-6 md:h-8 ml-4"
			:class="{
				'opacity-25 cursor-default': ceil,
				'cursor-pointer': !ceil,
			}"
			@click="increment"
		/>
	</div>
</template>

<script>
export default {
	props: {
		initialCounter: { type: Number, required: true },
		func: { type: Function, required: true },
		min: { type: Number, default: 0 },
		max: { type: Number, default: 100 },
		accuracy: { type: Number, default: 1 },
	},
	data() {
		return {
			counter:
				this.initialCounter < this.min ? this.min : this.initialCounter,
		}
	},
	methods: {
		increment() {
			if (this.counter < this.max) this.counter += this.accuracy
		},
		decrement() {
			if (this.counter > this.min) this.counter -= this.accuracy
		},
	},
	computed: {
		floor() {
			return this.counter == this.min
		},
		ceil() {
			return this.counter == this.max
		},
	},
	watch: {
		counter: {
			immediate: false,
			handler: function(counter) {
				this.func(counter)
			},
		},
	},
}
</script>
