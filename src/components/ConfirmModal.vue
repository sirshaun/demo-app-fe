<template></template>

<script>
import Modal from './Modal'

export default {
	components: { Modal },
	props: {
		name: { type: String },
		deleteUrl: { type: String, required: true },
		redirectRoute: { type: String, required: true },
	},
	methods: {
		canncel() {
			//
		},
		confirm() {
			//
		},
	},
}
</script>
