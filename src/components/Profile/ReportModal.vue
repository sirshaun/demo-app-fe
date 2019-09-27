<template>
	<Modal
		@close-modal="cancel"
		:show="modalOn"
		:prevent-background-scrolling="false"
	>
		<div
			class="modal-container bg-white md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-3/4 pb-4"
		>
			<div class="modal-content py-4 text-left px-6">
				<div class="cursor-pointer z-50 mb-6" @click="cancel">
					<img
						class="w-4 h-4 md:h-8 md:w-8"
						src="/img/ikonate/close.svg"
						alt=""
					/>
				</div>

				<ErrorMessage
					v-show="error"
					title=""
					message="Tell us why you're reporting"
					@dismiss-form-error-message="dismiss"
				/>

				<div class="pl-4 md:pl-8">
					<div class="tracking-wide mb-6">
						<p class="text-2xl font-bold">What's happening?</p>
						<div class="flex items-center">
							<img
								src="/img/ikonate/lock-alt.svg"
								class="h-4 mr-1"
							/>
							<span class="font-semibold"
								>This will only be shared with Workcation.</span
							>
						</div>
					</div>

					<div class="py-1">
						<div v-for="option in options">
							<label
								:for="option.key"
								class="ml-1 font-light inline-block w-11/12"
								>{{ option.text }}</label
							>
							<input
								type="radio"
								:id="option.key"
								:value="option.text"
								name="reason"
								v-model="reason"
							/>
							<hr class="border-gray-300 my-6" />
						</div>
					</div>

					<div class="mt-6">
						<a
							class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
							@click="confirm"
						>
							OK
						</a>
					</div>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from '@/components/Modal'
import ErrorMessage from '@/components/Form/ErrorMessage'

export default {
	components: { Modal, ErrorMessage },
	props: {
		reportUrl: { type: String, required: true },
		modalOn: { type: Boolean, required: true },
	},
	data() {
		return {
			options: [
				{
					key: 'scam',
					text: 'I think they’re scamming or spamming me',
				},
				{ key: 'offensive', text: 'They’re being offensive' },
				{ key: 'other', text: 'Something else' },
			],
			reason: '',
			error: false,
		}
	},
	methods: {
		cancel() {
			this.$emit('close-report-modal')
		},
		confirm() {
			if (this.reason != '') {
				this.$http.post(
					this.reportUrl,
					{
						reason: this.reason,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								'token'
							)}`,
						},
					}
				)

				this.$emit('complaint-lodged')
			} else {
				this.error = true
			}
		},
		dismiss() {
			this.error = !this.error
		},
	},
}
</script>
