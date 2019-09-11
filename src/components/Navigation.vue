<template>
	<div class="mb-10">
		<nav class="nav-float">
			<div class="flex items-center flex-shrink-0 text-white mr-6">
				<router-link to="/">
					<img
						class="h-10"
						src="/img/logo-mini.svg"
						alt="Workcation"
					/>
				</router-link>
			</div>
			<div class="block lg:hidden">
				<button
					class="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white"
				>
					<svg
						class="fill-current h-3 w-3"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div
				class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
			>
				<div class="relative flex-grow" v-show="showSearch">
					<input
						class="transition focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-3/5 appearance-none leading-normal"
						id="search-term"
						type="text"
						placeholder='Try "Bulawayo"'
						v-model="searchTerm"
					/>
					<div
						class="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center"
					>
						<img
							class="h-5"
							src="/img/ikonate/search-light-gray.svg"
							alt=""
						/>
					</div>
				</div>
				<div class="text-lg text-right lg:flex-grow">
					<a
						href="#"
						class="block mt-4 lg:inline-block lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4"
					>
						Become a host
					</a>
					<router-link to="/wishlists">
						<a
							class="block mt-4 lg:inline-block lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4"
							v-show="loggedIn"
						>
							Saved
						</a>
					</router-link>
					<router-link to="/trips">
						<a
							class="block mt-4 lg:inline-block lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4"
							v-show="loggedIn"
						>
							Trips
						</a>
					</router-link>
					<a
						href="#"
						class="block mt-4 lg:inline-block lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4"
						v-show="loggedIn"
					>
						Messages
					</a>
					<a
						href="#"
						class="block mt-4 lg:inline-block lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4"
					>
						Help
					</a>
				</div>
				<div v-show="!loggedIn">
					<router-link to="/login">
						<a
							class="inline-block text-sm px-4 py-2 leading-none border rounded text-indigo-500 border-indigo-500 hover:border-transparent hover:text-white hover:bg-indigo-500 mt-4 lg:mt-0"
							>Login</a
						>
					</router-link>
				</div>
				<div v-show="loggedIn">
					<nav-dropdown>
						<span
							slot="link"
							class="text-lg text-right lg:flex-grow text-indigo-500"
						>
							<span
								class="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo-200 mr-4"
							>
								<img
									class="w-4 h-4 md:h-8 md:w-8 rounded-full"
									src="/img/69.png"
									alt="Avatar"
								/>
							</span>
						</span>
						<div
							slot="dropdown"
							class="bg-white shadow rounded border overflow-hidden"
						>
							<router-link to="/profile">
								<a
									class="block px-4 py-3 border-b text-indigo-500 bg-white hover:text-indigo-200 cursor-pointer whitespace-no-wrap"
									>Profile</a
								>
							</router-link>
							<a
								class="block px-4 py-3 border-b text-indigo-500 bg-white hover:text-indigo-200 cursor-pointer whitespace-no-wrap"
								>Invite Friends</a
							>
							<a
								class="block px-4 py-3 border-b text-indigo-500 bg-white hover:text-indigo-200 cursor-pointer whitespace-no-wrap"
								>Refer Hosts</a
							>
							<a
								class="block px-4 py-3 border-b text-indigo-500 bg-white hover:text-indigo-200 cursor-pointer whitespace-no-wrap"
								>Your Guidebook</a
							>
							<a
								class="block px-4 py-3 border-b text-indigo-500 bg-white hover:text-indigo-200 cursor-pointer whitespace-no-wrap"
								>Gift Cards</a
							>
							<router-link to="/logout">
								<a
									class="block px-4 py-3 border-b text-indigo-500 bg-white hover:text-indigo-200 cursor-pointer whitespace-no-wrap"
									>Logout</a
								>
							</router-link>
						</div>
					</nav-dropdown>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import NavDropdown from './NavDropdown'

export default {
	components: { NavDropdown },
	props: {
		showSearch: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			searchTerm: '',
		}
	},
	computed: {
		loggedIn() {
			return Store.state.isLogged
		},
	},
}
</script>
