<template>
	<div v-show="show">
		<p class="px-10 font-light text-sm">
			<slot name="message"
				>You have no upcoming trips. Start exploring ideas for your next
				trip.</slot
			>
		</p>
		<div class="px-10 mt-5">
			<slot name="link"
				><router-link to="/">
					<a
						class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
						>Explore Workcation
					</a>
				</router-link>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	props: ['show'],
}
</script>
