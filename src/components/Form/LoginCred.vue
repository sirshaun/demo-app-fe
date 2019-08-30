<template>
	<div class="flex flex-wrap -mx-3 mb-6">
		<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-username"
			>
				Username
			</label>
			<input
				class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				:class="{ 'border-red-500 mb-3': usernameError }"
				id="grid-username"
				type="text"
				placeholder="notpeteysgirl"
				v-model="username"
				@blur="checkUsername"
			/>
			<p v-show="usernameError" class="text-red-500 text-xs italic">
				{{ usernameErrorMessage }}
			</p>
		</div>
		<div class="w-full md:w-1/2 px-3">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-password"
			>
				Password
			</label>
			<input
				class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				:class="{ 'border-red-500 mb-3': passwordError }"
				id="grid-password"
				type="password"
				placeholder="******************"
				v-model="password"
				@blur="checkPassword"
			/>
			<p v-show="passwordError" class="text-red-500 text-xs italic">
				{{ passwordErrorMessage }}
			</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			username: '',
			usernameError: false,
			usernameErrorMessage: '',
			password: '',
			passwordError: false,
			passwordErrorMessage: '',
		}
	},
	methods: {
		checkUsername() {
			if (this.username == '') {
				this.usernameError = true
				this.usernameErrorMessage = 'Please fill out this field.'
			} else {
				this.usernameError = false

				this.isUsernameUnique()

				this.loginCredentialsAcquired()
			}
		},
		checkPassword() {
			var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

			if (this.password == '' || !this.password.match(decimal)) {
				this.passwordError = true
				this.passwordErrorMessage =
					this.password == ''
						? 'Please fill out this field.'
						: 'Password must be between 8 to 15 characters, and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'
			} else {
				this.passwordError = false
				this.loginCredentialsAcquired()
			}
		},
		loginCredentialsAcquired() {
			if (!this.usernameError && !this.passwordError) {
				this.$emit('login-creds-filled-out', [
					this.username,
					this.password,
					false,
				])
			} else {
				this.$emit('login-creds-filled-out', [
					this.username,
					this.password,
					true,
				])
			}
		},
		async isUsernameUnique() {
			let response = await axios.get(
				'http://demo-app-be.test/user/username/' +
					this.username +
					'/unique'
			)

			if (!response.data.isUnique) {
				this.usernameError = true
				this.usernameErrorMessage = 'Username already in use.'
			} else {
				this.usernameError = false
			}
		},
	},
}
</script>
