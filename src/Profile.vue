<template>
	<div>
		<Navigation title="Featured properties" />

		<div class="md:px-20 pt-20">
			<div class="flex -mx-10 text-gray-900">
				<div class="w-1/3 px-10">
					<div class="flex flex-col bg-white border rounded shadow">
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
				<div class="w-2/3 px-10">
					<div class="flex flex-col bg-white border rounded shadow">
						<div class="px-4 py-2 m-2">
							<h1>Hi, I'm Shaun</h1>
							<p>Joined 2017 - Edit profile</p>
							<p>"</p>
							<p>
								Software developer trying to spread positivity
								and love through my projects. Zimbabwean born,
								Australian based. Love reading books and manga
								in the outdoors.
							</p>
							<p>_</p>
							<p>
								Lives in Matabeleland South Province, Zimbabwe
							</p>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<h1>1 Review</h1>
							<p>Joined 2018</p>
							<p>
								Shaun was a pleasure to host during his visit to
								Vancouver. Most courteous and considerate, and
								good fun to chat with.
							</p>
							<div><!-- Reviewer goes here --></div>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<h1>Reviews by you</h1>
						</div>
						<hr class="mx-5" />
						<div class="px-4 py-2 m-2">
							<h1>Report this profile</h1>
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
