<template>
	<div>
		<div
			class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
		>
			<div
				class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
			>
				Past Reviews
			</div>
			<div class="py-4 px-5 bg-white">
				<div class="font-light mb-5">
					Reviews are written at the end of a reservation through
					Workcation. Reviews you’ve received will be visible both
					here and on your public profile.
				</div>
				<div class="flex items-start">
					<div class="w-16 text-center mr-4">
						<img
							class="w-16 h-16 rounded-full mr-4"
							src="/img/23.png"
							alt="Avatar"
						/>
						<div class="text-gray-600 font-thin leading-tight mt-1">
							John Doe
						</div>
					</div>
					<div class="text-sm">
						<p class="font-light text-sm leading-none">
							Shaun was a pleasure to host during his visit to
							Harare. Most courteous and considerate, and good fun
							to chat with.
						</p>
						<hr class="my-4 border-gray-300" />
						<div class="font-light text-sm leading-none">
							<div class="flex items-center mb-1">
								<img
									src="/img/ikonate/lock-alt.svg"
									class="h-4 mr-1"
								/>
								<span class="font-semibold"
									>Private feedback:</span
								>
							</div>
							<p>
								Thanks again for your visit. Good luck in your
								exploration of the city, and do not hesitate to
								reach out for a place to stay in the future!
							</p>
							<div class="font-thin text-gray-600 mt-3">
								June 2018
							</div>
						</div>
					</div>
				</div>
				<hr class="my-8" />
				<div class="flex items-start">
					<div class="w-16 text-center mr-4">
						<img
							class="w-16 h-16 rounded-full mr-4"
							src="/img/23.png"
							alt="Avatar"
						/>
						<div class="text-gray-600 font-thin leading-tight mt-1">
							Jane Doe
						</div>
					</div>
					<div class="text-sm">
						<p class="font-light text-sm leading-none">
							Shaun was the perfect guest! it was a pleasure to
							host him in our apartment :)) he was very
							communicative and understanding
						</p>
						<hr class="my-4 border-gray-300" />
						<div class="font-light text-sm leading-none">
							<div class="flex items-center mb-1">
								<img
									src="/img/ikonate/lock-alt.svg"
									class="h-4 mr-1"
								/>
								<span class="font-semibold"
									>Private feedback:</span
								>
							</div>
							<p>
								Thanks again for your visit. Good luck in your
								exploration of the city, and do not hesitate to
								reach out for a place to stay in the future!
							</p>
							<div class="font-thin text-gray-600 mt-3">
								February 2018
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['user'],
}
</script>
