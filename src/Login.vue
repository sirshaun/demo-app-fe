<template>
    <div>
        <Navigation :showSearch="false" />

        <div class="bg-gray-200">
            <h1
                class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
            >
                Log<span class="text-indigo-500">in</span>
            </h1>

            <div class="py-10 flex justify-center">
                <div class="w-full max-w-md">
                    <ErrorMessage
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
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
                                />
                                <span class="ml-2 text-gray-700"
                                    >or
                                    <router-link to="/sign-up">
                                        <a
                                            class="bg-transparent text-indigo-500 ml-1 focus:outline-none"
                                            >Sign Up</a
                                        >
                                    </router-link>
                                </span>
                            </span>
                            <a
                                class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                                href="#"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                    <!-- <p class="text-center text-gray-500 text-xs">
                        &copy;2019 Workcation All rights reserved.
                    </p> -->
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ErrorMessage from './components/Form/ErrorMessage'

export default {
    components: { ErrorMessage, Navigation, Footer },
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
        attemptLogin() {
            if (this.username != '' || this.password != '') {
                this.login()
            }
        },
        login() {
            this.$http
                .post('/login', {
                    username: this.username,
                    password: this.password,
                })
                .then(
                    response => {
                        localStorage.setItem('token', response.data.token)
                        this.$store.commit('LOGIN_USER')
                        this.$router.push('/profile')
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
        if (this.$store.state.isLogged) {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        }
    },
}
</script>
