<template>
	<div class="fixed w-full h-full top-0 left-0 flex justify-start mt-22">
		<div
			class="overflow-y-scroll h-custom w-2/5"
			:class="leftPanelClassList"
		>
			<slot name="left-panel"></slot>
		</div>
		<div class="h-full w-3/5" :class="rightPanelClassList">
			<slot name="right-panel"></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		leftPanelClassList: {
			type: String,
			default: '',
		},
		rightPanelClassList: {
			type: String,
			default: '',
		},
	},
}
</script>
