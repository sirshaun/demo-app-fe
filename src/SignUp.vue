<template>
	<div>
		<Navigation title="Sign Up" :showLogin="false" />

		<div class="bg-gray-200">
			<h1
				class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
			>
				Sign
				<span class="text-indigo-500">up</span>
			</h1>

			<div class="py-10 bg-gray-200 flex justify-center">
				<div class="w-full max-w-6xl">
					<FormError
						v-show="attemptFail"
						title="Sign up failed!"
						message="Please try again later."
						@dismiss-form-error-message="dismiss"
					/>

					<form
						@submit.prevent="attemptSignup"
						class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
						<Name @names-filled-out="appendFullName" />
						<Contact @contact-info-filled-out="appendContactInfo" />
						<LoginCred @login-creds-filled-out="appendLoginCreds" />
						<Location
							@location-info-filled-out="appendLocationInfo"
						/>
						<div class="flex flex-wrap -mx-3 mt-10">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<input
									class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									:class="{
										'opacity-50 cursor-not-allowed': formError,
									}"
									type="submit"
									value="Sign Up"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		<Footer />
	</div>
</template>

<script>
import axios from 'axios'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import FormError from './components/FormError'
import Name from './components/Form/Name'
import Contact from './components/Form/Contact'
import LoginCred from './components/Form/LoginCred'
import Location from './components/Form/Location'

export default {
	components: {
		FormError,
		Navigation,
		Name,
		Contact,
		LoginCred,
		Location,
		Footer,
	},
	data() {
		return {
			firstname: '',
			middlename: '',
			lastname: '',
			email: '',
			mobile: '',
			username: '',
			password: '',
			city: '',
			state: '',
			nameError: true,
			contactError: true,
			credError: true,
			locError: true,
			attemptFail: false,
		}
	},
	computed: {
		emptyPassword() {
			return this.password.length == 0
		},
		formError() {
			return (
				this.nameError ||
				this.contactError ||
				this.credError ||
				this.locError
			)
		},
	},
	methods: {
		appendFullName(data) {
			var firstname, middlename, lastname, error
			;[firstname, middlename, lastname, error] = data

			this.firstname = firstname
			this.middlename = middlename
			this.lastname = lastname

			this.nameError = error
		},
		appendContactInfo(data) {
			var email, mobile, error
			;[email, mobile, error] = data

			this.email = email
			this.mobile = mobile

			this.contactError = error
		},
		appendLoginCreds(data) {
			var username, password, error
			;[username, password, error] = data

			this.username = username
			this.password = password

			this.credError = error
		},
		appendLocationInfo(data) {
			console.log(data)
			var city, state, error
			;[city, state, error] = data

			this.city = city
			this.state = state

			this.locError = error
		},
		attemptSignup(event) {
			if (!this.formError) {
				this.signup(event)
			}
		},
		signup(event) {
			axios
				.post('http://demo-app-be.test/user/sign-up', {
					firstname: this.firstname,
					middlename: this.middlename,
					lastname: this.lastname,
					email: this.email,
					mobile: this.mobile,
					username: this.username,
					password: this.password,
					city: this.city,
					state: this.state,
				})
				.then(
					response => {
						localStorage.setItem('token', response.token)
						Store.commit('LOGIN_USER')
						this.$router.push('/')
					},
					error => {
						this.attemptFail = true
					}
				)
		},
		dismiss() {
			this.attemptFail = false
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
