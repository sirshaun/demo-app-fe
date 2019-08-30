<template>
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-email"
			>
				Email
			</label>
			<input
				class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
				:class="{ 'border-red-500 mb-3': emailError }"
				id="grid-email"
				type="text"
				placeholder="janedoe@example.com"
				v-model="email"
				@blur="checkEmail"
			/>
			<p v-show="emailError" class="text-red-500 text-xs italic">
				{{ emailErrorMessage }}
			</p>
		</div>
		<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-mobile"
			>
				Mobile
			</label>
			<input
				class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
				:class="{ 'border-red-500 mb-3': mobileError }"
				id="grid-mobile"
				type="text"
				placeholder="0772000000"
				v-model="mobile"
				@blur="checkMobile"
			/>
			<p v-show="mobileError" class="text-red-500 text-xs italic">
				{{ mobileErrorMessage }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			emailError: false,
			mobile: '',
			mobileError: false,
			emailErrorMessage: '',
			mobileErrorMessage: '',
		}
	},
	methods: {
		checkEmail() {
			var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

			if (this.email == '' || !re.test(this.email)) {
				this.emailError = true
				this.emailErrorMessage =
					this.email == ''
						? 'Please fill out this field.'
						: 'Please enter a valid email address.'
			} else {
				this.emailError = false
				this.checkContatInfoAcquired()
			}
		},
		checkMobile() {
			var re = /^0\d{9}$/

			if (this.mobile == '' || !re.test(this.mobile)) {
				this.mobileError = true
				this.mobileErrorMessage =
					this.mobile == ''
						? 'Please fill out this field.'
						: 'Please enter a valid mobile address.'
			} else {
				this.mobileError = false
				this.checkContatInfoAcquired()
			}
		},
		checkContatInfoAcquired() {
			if (!this.emailError && !this.mobileError) {
				this.$emit('contact-info-filled-out', [
					this.email,
					this.mobile,
					false,
				])
			} else {
				this.$emit('contact-info-filled-out', [
					this.email,
					this.mobile,
					true,
				])
			}
		},
	},
}
</script>
