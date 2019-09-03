<template>
    <div>
        <Navigation title="Featured properties" />

        <div class="bg-gray-200">
            <h1
                class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
            >
                Featured
                <span class="text-indigo-500">properties</span>
            </h1>
            <h2 class="text-xl text-gray-900"></h2>
            <div
                class="min-h-screen px-12 inline-flex items-center justify-center"
                v-for="property in properties"
            >
                <PropertyCard :property="property" />
            </div>
        </div>

        <BackButton />
    </div>
</template>

<script>
import axios from 'axios'

import Navigation from './components/Navigation'
import PropertyCard from './components/PropertyCard'
import BackButton from './components/BackButton'

export default {
    components: { PropertyCard, Navigation, BackButton },
    props: ['id'],
    data() {
        return {
            properties: [],
        }
    },
    methods: {
        fetchProperties() {
            axios.get('http://demo-app-be.test/destination/' + this.id).then(
                res => {
                    this.properties = res.data
                },
                error => {
                    console.log(error)
                }
            )
        },
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        },
    },
    mounted() {
        this.fetchProperties()
    },
}
</script>
