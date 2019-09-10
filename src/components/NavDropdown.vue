<template>
	<on-click-outside :do="handleClickOutside">
		<div class="relative">
			<div
				class="tile-img block cursor-pointer leading-tight"
				@click="open = !open"
			>
				<slot name="link"></slot>
			</div>
			<div
				class="absolute right-0 shadow-xl"
				v-show="open"
				style="margin-top: 23px"
			>
				<slot name="dropdown"></slot>
			</div>
		</div>
	</on-click-outside>
</template>

<script>
import OnClickOutside from './OnClickOutside'

export default {
	components: { OnClickOutside },
	data() {
		return {
			open: false,
		}
	},
	methods: {
		handleClickOutside() {
			if (this.open) {
				this.open = false
			}
		},
	},
}
</script>
