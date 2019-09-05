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
				<div class="font-light">
					Nobody to review right now. Looks like it’s time for another
					trip!
				</div>
			</div>
		</div>

		<div
			class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
		>
			<div
				class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
			>
				Past Reviews You’ve Written
			</div>
			<div class="py-4 px-5 bg-white">
				<div class="flex items-start">
					<img
						class="w-12 h-12 rounded-full mr-4"
						src="/img/23.png"
						alt="Avatar"
					/>
					<div class="text-sm">
						<p class="font-semibold text-sm leading-none mb-3">
							Review for John
						</p>
						<div class="font-light text-sm">
							<p>
								Lovely apartment, really great place to stay.
								John is very welcoming and assistive. I
								definitely enjoyed my stay here.
							</p>
							<div class="font-thin text-gray-600 mt-1">
								June 2018
							</div>
						</div>
					</div>
				</div>
				<hr class="my-4 border-gray-300" />
				<div class="flex items-start">
					<img
						class="w-12 h-12 rounded-full mr-4"
						src="/img/23.png"
						alt="Avatar"
					/>
					<div class="text-sm">
						<p class="font-semibold text-sm leading-none mb-3">
							Review for Jane
						</p>
						<div class="font-light text-sm">
							<p>
								Jane was a wonderful host and the house was
								beautiful and always clean. great locations, and
								the neighborhood is very quiet and safe. Jane
								would always ask me if I needed anything else,
								and we had great conversations when we were in
								the common spaces together.
							</p>
							<div class="font-thin text-gray-600 mt-1">
								February 2018
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
		>
			<div
				class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
			>
				Expired Reviews
			</div>
			<div class="py-4 px-5 bg-white">
				<div class="font-light mb-6">
					Unfortunately, the deadline to submit a public review for
					this user has passed. If there's something you need to share
					with us about your experience, you can always submit private
					feedback that our teams will review.
				</div>
				<div class="flex items-start">
					<img
						class="w-16 h-16 rounded-full mr-4"
						src="/img/23.png"
						alt="Avatar"
					/>
					<div class="text-sm">
						<p class="font-light text-sm">
							Your time to write a review for Johnny has expired.
						</p>
						<a
							class="font-light text-sm text-indigo-500 hover:text-indigo-200 cursor-pointer"
							>View Itinerary</a
						>
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
