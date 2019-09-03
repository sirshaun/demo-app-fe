<template>
	<div>
		<Navigation title="Featured properties" />

		<div class="md:px-64 pt-20">
			<div class="flex text-gray-800">
				<div class="w-1/3">
					<div
						class="w-9/12 flex flex-col bg-white border rounded shadow"
					>
						<div class="px-4 py-2 m-2">
							<img
								class="w-16 h-16 md:h-24 md:w-24 rounded-full mx-auto"
								src="/img/69.png"
								alt="Avatar"
							/>
							<div class="text-center mt-3">Update photo</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<div class="flex items-center">
								<img
									src="/img/ikonate/chat-alt.svg"
									class="h-4"
								/>
								&nbsp;<span class="font-thin"> 1 review</span>
							</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/verified.svg"
									class="h-4"
								/>
								&nbsp;<span class="font-thin"> Verified</span>
							</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<div class="font-semibold mb-4">
								Shaun's provided
							</div>
							<div class="flex items-center mb-2">
								<img
									src="/img/ikonate/ok-circle.svg"
									class="h-4"
								/>
								&nbsp;<span class="font-thin">
									Government ID</span
								>
							</div>
							<div class="flex items-center mb-2">
								<img
									src="/img/ikonate/ok-circle.svg"
									class="h-4"
								/>
								&nbsp;<span class="font-thin">
									Email address</span
								>
							</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/ok-circle.svg"
									class="h-4"
								/>
								&nbsp;<span class="font-thin">
									Phone number</span
								>
							</div>
						</div>
					</div>
				</div>
				<div class="w-2/3 mb-20">
					<div class="flex flex-col bg-white border rounded shadow">
						<div class="px-4 py-2 mx-2 my-6">
							<div class="text-5xl font-light">
								Hi, I'm Shaun
							</div>
							<div class="font-light text-md -mt-1">
								Joined 2017 - Edit profile
							</div>
							<div class="text-6xl text-gray-400">“</div>
							<div class="-mt-10 -mb-16 font-light">
								Software developer trying to spread positivity
								and love through my projects. Zimbabwean born,
								Australian based. Love reading books and manga
								in the outdoors.
							</div>
							<div class="text-6xl text-gray-400 mb-4">_</div>
							<div class="flex items-center">
								<img
									src="/img/ikonate/home-alt.svg"
									class="h-4 mr-4"
								/>
								<span class="font-light">
									Lives in Matabeleland South Province,
									Zimbabwe</span
								>
							</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6">
							<div class="font-semibold text-2xl mb-6">
								1 review
							</div>
							<div class="">
								<div
									class="text-xs font-semibold mb-4 tracking-normal"
								>
									June 2018
								</div>
								<div class="font-light mb-4">
									Shaun was a pleasure to host during his
									visit to Vancouver. Most courteous and
									considerate, and good fun to chat with.
								</div>
								<div class="flex items-center">
									<img
										class="w-10 h-10 rounded-full mr-4"
										src="/img/23.png"
										alt="Avatar"
									/>
									<div class="text-sm">
										<p
											class="font-semibold text-sm leading-none mb-1"
										>
											John, Harare, Harare
										</p>
										<p
											class="text-gray-600 font-thin text-xs"
										>
											Joined in 2017 - Report
										</p>
									</div>
								</div>
							</div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6">
							<p>Reviews by you</p>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 mx-2 my-6">
							<p>Report this profile</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

import Navigation from './components/Navigation.vue'
import BackButton from './components/BackButton'

export default {
	components: { Navigation, BackButton },
	props: ['user'],
}
</script>
