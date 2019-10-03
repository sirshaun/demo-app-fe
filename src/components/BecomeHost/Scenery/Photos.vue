<template>
	<div class="flex flex-col">
		<div class="flex flex-wrap">
			<h1 class="font-semibold text-2xl text-gray-900">
				Add photos to your listing
			</h1>
			<a
				class="flex items-center text-indigo-600 hover:opacity-75 ml-10 cursor-pointer"
				@click="toggleModal"
			>
				<img
					src="/img/ikonate/lightbulb-indigo-600.svg"
					class="h-6 mr-2"
				/>
				<span>Photo tips</span>
			</a>
		</div>

		<div class="text-sm font-light tracking-wide text-gray-900">
			Photos help guests imagine staying in your place. You can start with
			one and add more after you publish.
		</div>

		<form
			:action="uploadUrl"
			class="dropzone border-dashed border-2 border-gray-300 rounded p-2"
			id="my-awesome-dropzone"
		>
			<div
				class="w-full dz-message cursor-pointer"
				style="height: 350px; background-image: url('/img/collage.png')"
			>
				<div class="flex flex-col items-center">
					<div class="">
						<a
							class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
						>
							Continue
						</a>
					</div>
					<div class="text-gray-600 font-light tracking-wide">
						or drag them in
					</div>
				</div>
			</div>
		</form>

		<hr class="border-gray-300 my-6" />

		<div class="clearfix mt-6">
			<div class="float-left">
				<a
					class="flex items-center text-indigo-600 hover:opacity-50 cursor-pointer"
					@click="back"
				>
					<img
						src="/img/ikonate/chevron-left-indigo-600.svg"
						class="h-6 mr-1"
					/>
					<span class="font-thin">Back</span>
				</a>
			</div>
			<div class="float-right">
				<a
					class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
					@click="next"
				>
					Skip for now
				</a>
			</div>
		</div>

		<PhotoTipModal
			@close-tips-modal="toggleModal"
			v-if="modalOn"
			:modal-on="modalOn"
		/>
	</div>
</template>

<script>
import Dropzone from 'dropzone'

import PhotoTipModal from '@/components/BecomeHost/PhotoTipModal'

export default {
	components: { PhotoTipModal },
	props: {
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
		uploadUrl: { type: String, required: true },
	},
	data() {
		return {
			uploaded: false,
			modalOn: false,
		}
	},
	methods: {
		back() {
			this.checkpoint()
		},
		toggleModal() {
			this.modalOn = !this.modalOn
		},
	},
}
</script>
