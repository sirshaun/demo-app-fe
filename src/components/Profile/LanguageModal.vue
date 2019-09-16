<template>
	<Transition name="fade">
		<div
			class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-max"
		>
			<div
				class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
			></div>

			<div
				class="modal-container bg-white md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-3/4"
			>
				<div
					class="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
				>
					<img
						class="w-4 h-4 md:h-8 md:w-8"
						src="/img/ikonate/close-white.svg"
						alt=""
					/>
					<span class="text-sm">(Esc)</span>
				</div>

				<!-- Add margin if you want to see some of the overlay behind the modal-->
				<div class="modal-content py-4 text-left px-6">
					<div class="cursor-pointer z-50 mb-6" @click="closeModal">
						<img
							class="w-4 h-4 md:h-8 md:w-8"
							src="/img/ikonate/close.svg"
							alt=""
						/>
					</div>

					<div class="pl-4 md:pl-8">
						<div class="leading-normal mb-6">
							<p class="text-2xl font-bold">Languages I Speak</p>
							<p class="text-sm font-light">
								We have many international travelers who
								appreciate hosts who can speak their language.
							</p>
						</div>

						<div v-for="chkBx in languageCheckboxes" class="py-1">
							<input
								type="checkbox"
								:id="chkBx.language"
								:name="chkBx.language"
								:checked="chkBx.checked"
								@click="addLanguage(chkBx.language)"
							/>
							<label
								:for="chkBx.language"
								class="ml-1 font-light inline-block w-11/12"
								>{{ chkBx.language }}</label
							>
						</div>

						<div class="mt-2">
							<button
								class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								@click="updateLanguagesSpoken"
							>
								Done
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
import axios from 'axios'

export default {
	props: {
		languagesSelected: {
			type: Array,
			default: () => [],
		},
		modalOn: { type: Boolean },
	},
	data() {
		return {
			languages: [],
			spokenLanguages: [],
		}
	},
	computed: {
		languageCheckboxes() {
			return this.languages.map((lng, i) => {
				return {
					language: lng,
					checked: this.languagesSelected.includes(lng),
				}
			})
		},
	},
	methods: {
		closeModal() {
			this.$emit('close-language-modal')
		},
		updateLanguagesSpoken() {
			this.$emit(
				'update-languages-spoken',
				this.mergeArrays(this.spokenLanguages, this.languagesSelected)
			)

			this.closeModal()
		},
		fetchLanguages() {
			axios.get('http://demo-app-be.test/language').then(
				res => {
					this.languages = res.data
				},
				error => {
					console.log(error)
				}
			)
		},
		addLanguage(lng) {
			this.spokenLanguages.push(lng)
		},
		mergeArrays(...arrays) {
			let jointArray = []

			arrays.forEach(array => {
				jointArray = [...jointArray, ...array]
			})
			const uniqueArray = jointArray.reduce((newArray, item) => {
				if (newArray.includes(item)) {
					return newArray
				} else {
					return [...newArray, item]
				}
			}, [])
			return uniqueArray
		},
	},
	mounted() {
		this.fetchLanguages()

		const overlay = document.querySelector('.modal-overlay')
		const listener = e => this.closeModal()

		overlay.addEventListener('click', listener)

		this.$once('hook:destroyed', () => {
			overlay.removeEventListener('click', listener)
		})

		document.onkeydown = evt => {
			evt = evt || window.event
			var isEscape = false
			if ('key' in evt) {
				isEscape = evt.key === 'Escape' || evt.key === 'Esc'
			} else {
				isEscape = evt.keyCode === 27
			}

			if (isEscape && this.modalOn) {
				this.closeModal()
			}
		}
	},
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
