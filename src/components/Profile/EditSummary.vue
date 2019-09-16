<template>
	<div>
		<form @submit.prevent="saveChanges" class="mt-10">
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-about"
					>
						About
					</label>
					<textarea
						rows="6"
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
						id="grid-about"
						v-model="about"
					></textarea>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-location"
					>
						Location
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-location"
						type="text"
						placeholder=""
						v-model="location"
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-languages"
					>
						Languages I Speak
					</label>
					<div class="flex flex-wrap items-center justify-content">
						<div
							class="flex items-center bg-indigo-200 text-indigo-800 font-light text-sm tracking-wide py-1 px-2 mr-2 rounded-lg"
							v-for="lng in languages"
						>
							{{ lng }}
							<img
								class="ml-1 w-2 h-2 md:h-4 md:w-4 cursor-pointer"
								src="/img/ikonate/close-indigo-800.svg"
								alt=""
								@click="removeLanguage(lng)"
							/>
						</div>
						<a
							class="cursor-pointer text-indigo-600 hover:text-indigo-200"
							@click="toggleModal"
							>Add more</a
						>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-work"
					>
						Work
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-work"
						type="text"
						placeholder=""
						v-model="work"
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mt-10">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<span>
						<input
							class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							value="Save"
						/>
						<a
							class="cursor-pointer bg-transparent text-indigo-500 hover:text-indigo-200 ml-2 text-sm focus:outline-none"
							@click="rollbackChanges"
							>Cancel</a
						>
					</span>
				</div>
			</div>
		</form>

		<LanguageModal
			@close-language-modal="toggleModal"
			@update-languages-spoken="updateLanguagesSpoken"
			v-show="modalOn"
			:modalOn="modalOn"
			:languagesSelected="this.languages"
			:key="componentKey"
		/>
	</div>
</template>

<script>
import axios from 'axios'

import LanguageModal from './LanguageModal'

const body = document.querySelector('body')

export default {
	components: { LanguageModal },
	props: ['user'],
	data() {
		return {
			about: '',
			location: '',
			languages: [],
			work: '',
			modalOn: false,
			componentKey: 0,
		}
	},
	methods: {
		saveChanges() {
			//
		},
		rollbackChanges() {
			this.$emit('cancel-edit-profile')
		},
		toggleModal() {
			this.modalOn = !this.modalOn

			if (this.modalOn) this.forceRerender()

			body.classList.toggle('modal-active')
		},
		updateLanguagesSpoken(data) {
			console.log(data)
			this.languages = data
		},
		removeLanguage(lng) {
			var index = this.languages.indexOf(lng)
			if (index > -1) {
				this.languages.splice(index, 1)
			}
		},
		forceRerender() {
			this.componentKey += 1
		},
	},
}
</script>
