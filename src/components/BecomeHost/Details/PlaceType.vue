<template>
	<div class="flex flex-col">
		<h1 class="font-semibold text-2xl text-gray-900">
			What kind of place are you listing?
		</h1>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-listing"
				>
					First, let's narrow down things
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-listing"
						v-model="listing"
					>
						<option v-for="option in listingOptions">
							{{ option }}
						</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg
							class="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-type"
				>
					Now choose a property type
				</label>
				<div class="relative">
					<select
						class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						:disabled="listing == ''"
						id="grid-type"
						v-model="type"
					>
						<option v-for="option in typeOptions">
							{{ option }}
						</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg
							class="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/>
						</svg>
					</div>
				</div>
				<!-- <div
					class="font-light text-xs"
					v-show="caseParticularTypes.includes(type)"
				>
					A casa particular is a type of accommodation found in Cuba
					that may be more like a private apartment or a room in a bed
					and breakfast.
				</div> -->
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-type"
				>
					Is this set up as a dedicated guest space?
				</label>
				<div class="mb-4" v-for="option in roomOptions">
					<input
						type="radio"
						:id="option.key"
						:value="option.text"
						name="room"
						v-model="room"
					/>
					<label
						:for="option.key"
						class="ml-1 font-light inline-block w-11/12"
						>{{ option.text }}</label
					>
					<div class="font-light text-sm">{{ option.descr }}</div>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="w-full px-3">
				<label
					class="block text-gray-600 text-xs font-bold mb-2"
					for="grid-type"
				>
					Is this set up as a dedicated guest space?
				</label>
				<div class="mb-4">
					<input
						type="radio"
						id="yes"
						value="yes"
						name="sapce"
						v-model="space"
					/>
					<label
						for="yes"
						class="ml-1 font-light inline-block w-11/12"
						>Yes, it’s primarily set up for guests</label
					>
				</div>
				<div class="mb-4">
					<input
						type="radio"
						id="no"
						value="no"
						name="sapce"
						v-model="space"
					/>
					<label for="no" class="ml-1 font-light inline-block w-11/12"
						>No, I keep my personal belongings here
					</label>
				</div>
			</div>
		</div>

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
					Next
				</a>
			</div>
		</div>

		<CaseModal @close-case-modal="toggleModal" v-if="caseModal" />
	</div>
</template>

<script>
import CaseModal from '@/components/BecomeHost/CaseModal'

export default {
	components: { CaseModal },
	props: {
		back: { type: Function, required: true },
		next: { type: Function, required: true },
		checkpoint: { type: Function, required: true },
	},
	data() {
		return {
			listing: '',
			listingOptions: ['Apartment', 'House', 'Bed and Breakfast'],
			type: '',
			caseModal: false,
			caseParticularTypes: [
				'Bed and breakfast',
				'Case particular (Cuba)',
				'Minsu (Taiwan)',
				'Nature lodge',
				'Pension (South Korea)',
				'Ryokan (Japan)',
				'Serviced apartment',
			],
			room: '',
			roomOptions: [
				{
					key: 'entire',
					text: 'Entire place',
					descr:
						'Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.',
				},
				{
					key: 'private',
					text: 'Private room',
					descr:
						'Guests have their own private room for sleeping. Other areas could be shared.',
				},
				{
					key: 'shared',
					text: 'Shared room',
					descr:
						'Guests sleep in a bedroom or a common area that could be shared with others.',
				},
			],
			space: '',
		}
	},
	computed: {
		typeOptions() {
			if (this.listing == 'Apartment') {
				return [
					'Apartment',
					'Condominium',
					'Case particular (Cuba)',
					'Loft',
					'Serviced apartment',
				]
			}
			if (this.listing == 'House') {
				return [
					'House',
					'Bungalow',
					'Cabin',
					'Case particular (Cuba)',
					'Chalet',
					'Cottage',
					'Cycladic house',
					'Dammuso (Italy)',
					'Dome house',
					'Earth house',
					'Farm stay',
					'Houseboat',
					'Hut',
					'Lighthouse',
					'Pension (South Korea)',
					"Sherperd's hut (U.K., France)",
					'Tiny house',
					'Townhouse',
					'Trullo (italy)',
					'Villa',
				]
			}
			if (this.listing == 'Bed and Breakfast') {
				return [
					'Bed and breakfast',
					'Case particular (Cuba)',
					'Farm stay',
					'Minsu (Taiwan)',
					'Nature lodge',
					'Ryokan (Japan)',
				]
			}
		},
	},
	methods: {
		toggleModal() {
			this.caseModal = !this.caseModal
		},
	},
	watch: {
		type: {
			immediate: false,
			handler: function(type) {
				this.caseModal = this.caseParticularTypes.includes(type)
			},
		},
	},
}
</script>
