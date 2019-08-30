<template></template>

<script>
export default {
	name: 'logout',
	mounted() {
		localStorage.removeItem('token')
		Store.commit('LOGOUT_USER')
		this.$router.push('/')
	},
}
</script>
