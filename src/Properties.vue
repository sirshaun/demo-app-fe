<template>
	<div id="app" class="antialised text-gray-900">
        <div class="bg-gray-200">
            <div class="p-8">
                <router-link to="/">
                    <a class="bg-transparent hover:text-indigo-700 text-indigo-400 font-semibold py-2 px-4">Go back</a>
                </router-link>
            </div>

            <div class="min-h-screen p-8 flex items-center justify-center" v-for="property in properties">
                <PropertyCard :property="property"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import PropertyCard from "./components/PropertyCard"

export default {
    name: "app",
    components: { PropertyCard },
    props: [ 'id' ],
    data() {
        return {
            properties: []
        }
    },
    methods: {
        fetchProperties() {
            axios.get('http://demo-app-be.test/destination/' + this.id).then((res) => {
                this.properties = res.data
            }, (error) => {
                console.log(error)
            })
        },
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        }
    },
    mounted() {
        this.fetchProperties()
    }
}
</script>

<style src="./main.css"></style>
