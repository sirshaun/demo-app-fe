<template>
	<div>
		<nav class="flex items-center justify-between flex-wrap bg-white p-6">
			<div class="flex items-center flex-shrink-0 text-white mr-6">
				<img class="h-10" src="/img/logo.svg" alt="Workcation" />&nbsp;
				<span class="font-semibold text-xl tracking-tight">{{
					title
				}}</span>
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
				<div class="text-sm lg:flex-grow"></div>
				<div v-show="showLogin">
					<router-link to="/login">
						<a
							class="inline-block text-sm px-4 py-2 leading-none border rounded text-indigo-500 border-indigo-500 hover:border-transparent hover:text-white hover:bg-indigo-500 mt-4 lg:mt-0"
							>Login</a
						>
					</router-link>
				</div>
				<div v-show="!showLogin">
					<router-link to="/logout">
						<a
							class="inline-block text-sm px-4 py-2 leading-none border rounded text-indigo-500 border-indigo-500 hover:border-transparent hover:text-white hover:bg-indigo-500 mt-4 lg:mt-0"
							>Logout</a
						>
					</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	props: ['title'],
	computed: {
		showLogin() {
			return !Store.state.isLogged
		},
	},
}
</script>
