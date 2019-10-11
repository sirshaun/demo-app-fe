<template>
	<div class="flex justify-between">
		<div>Suitable for children (2-12)</div>
		<div>
			<YesNo
				name="children"
				:yes-option="{ key: 'yes', text: 'Yes' }"
				:no-option="{ key: 'no', text: 'No' }"
			/>
		</div>
	</div>
</template>

<script>
import YesNo from '@/components/Form/YesNo'

export default {
	components: { YesNo },
	props: {},
}
</script>
