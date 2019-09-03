<template>
	<div>
		<Navigation title="Login" :showLogin="false" />

		<div class="py-10 bg-gray-200 flex justify-center">
			<div class="w-full max-w-md">
				<FormError
					v-show="formError"
					title="Login failed!"
					:message="errorMessage"
					@dismiss-form-error-message="dismiss"
				/>
				<form
					@submit.prevent="attemptLogin"
					class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<div class="mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="username"
						>
							Username / Email
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							v-model="username"
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div class="mb-6">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="password"
						>
							Password
						</label>
						<div class="relative">
							<input
								class="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								v-model="password"
								id="password"
								:type="passwordFieldType"
								placeholder="******************"
							/>
							<div
								class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
							>
								<img
									class="h-8"
									:src="passwordInlineImg"
									alt="Eye"
									@click="togglePasswordVisibility"
								/>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-gray-900">
							<input
								class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
								value="Sign In"
							/>&nbsp; or
							<router-link to="/sign-up">
								<a
									class="bg-indigo-transparent text-indigo-500 text-sm focus:outline-none"
									href="#"
									>Sign Up</a
								>
							</router-link>
						</span>
						<a
							class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
							href="#"
						>
							Forgot Password?
						</a>
					</div>
				</form>
				<p class="text-center text-gray-500 text-xs">
					&copy;2019 Workcation All rights reserved.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Navigation from './components/Navigation'
import FormError from './components/FormError'

export default {
	components: { FormError, Navigation },
	data() {
		return {
			loginError: false,
			username: '',
			password: '',
			formError: false,
			showPassword: false,
			errorMessage: 'Check your credentials and try again',
		}
	},
	computed: {
		passwordInlineImg() {
			return this.showPassword
				? '/img/ikonate/eye-crossed.svg'
				: '/img/ikonate/eye.svg'
		},
		passwordFieldType() {
			return this.showPassword ? 'text' : 'password'
		},
	},
	methods: {
		attemptLogin(event) {
			if (this.username != '' || this.password != '') {
				this.login(event)
			}
		},
		login(event) {
			axios
				.post('http://demo-app-be.test/login', {
					username: this.username,
					password: this.password,
				})
				.then(
					response => {
						localStorage.setItem('token', response.token)
						Store.commit('LOGIN_USER')
						this.$router.push('/')
					},
					error => {
						this.formError = true

						if (error.response.data.message) {
							this.errorMessage = error.response.data.message
						} else {
							this.errorMessage =
								'Check your credentials and try again'
						}
					}
				)
		},
		dismiss() {
			this.formError = false
			this.password = ''
		},
		togglePasswordVisibility() {
			this.showPassword = !this.showPassword
		},
	},
	beforeCreate() {
		if (Store.state.isLogged) {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push('/')
		}
	},
}
</script>
