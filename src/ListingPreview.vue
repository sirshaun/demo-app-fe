<template>
  <div>{{ listing }}</div>
            <CheckAvailability :listing="listing" :pluralize="pluralize" />
</template>

<script>
import googlemap from '@/map/google-map.js'
import Pluralize from 'pluralize'

import Navigation from './components/Navigation'
import CheckAvailability from './components/CheckAvailability'
import Footer from './components/Footer'

export default {
  components: {
    Navigation,
    CheckAvailability,
    Footer,
  },
  data() {
    return {
      listing_id: this.$route.params.listing,
      listing: this.$store.state.listing,
      user: {},
    }
  },
  computed: {
    bedrooms() {
      if (this.listing.bedrooms.toLowerCase() == 'studio') {
        return '1 bedroom'
      }

      return this.listing.bedrooms
    },
    bathrooms() {
      var setting = this.listing.private ? 'private' : 'shared'

      return (
        this.listing.bathrooms +
        ' ' +
        setting +
        ' ' +
        this.pluralize('bath', this.listing.bathrooms, false)
      )
    },
    smokeDetectorPresent() {
      return this.listing.safetyAmenities.includes('Smoke detector')
    },
    carbonDetectorPresent() {
      return this.listing.safetyAmenities.includes('Carbon monoxide detector')
    },
    detectorText() {
      if (this.smokeDetectorPresent && this.carbonDetectorPresent) {
        return ''
      } else if (this.smokeDetectorPresent && !this.carbonDetectorPresent) {
        return "The host hasn't reported carbon monoxide detectors on the property."
      } else if (!this.smokeDetectorPresent && this.carbonDetectorPresent) {
        return "The host hasn't reported smoke detectors on the property."
      } else {
        return "The host hasn't reported smoke or carbon monoxide detectors on the property."
      }
    },
    totalAmenities() {
      return this.listing.safetyAmenities.length + this.listing.amenities.length
    },
    dateJoined() {
      if (!this.user.hasOwnProperty('created_at')) return new Date()

      var dateTime = this.user.created_at.split(' ')

      var date = dateTime[0].split('-')
      var yyyy = date[0]
      var mm = date[1] - 1
      var dd = date[2]

      var time = dateTime[1].split(':')
      var h = time[0]
      var m = time[1]
      var s = parseInt(time[2]) //get rid of that 00.0;

      return new Date(yyyy, mm, dd, h, m, s)
    },
    vagueAddress() {
      return (
        this.listing.suburb +
        ', ' +
        this.listing.state +
        ', ' +
        this.listing.countryLong
      )
    },
    coordinates() {
      return {
        lat: parseFloat(this.listing.latitude),
        lng: parseFloat(this.listing.longitude),
      }
    },
    checkInTimes() {
      if (this.listing.checkInStart.toLowerCase() == 'flexible')
        return 'Flexible'

      if (this.listing.checkInEnd != '')
        return this.listing.checkInStart + ' - ' + this.listing.checkInEnd

      if (this.listing.checkInEnd.toLowerCase() == 'flexible')
        return 'After ' + this.listing.checkInStart

      return this.listing.checkInStart
    },
  },
  methods: {
    cleanImagePath(path) {
      if (process.env.VUE_APP_ENV == 'local') {
        var arr = path.split('/')

        return '/stock/' + arr[arr.length - 1]
      }

      return path
    },
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive)
    },
    fetchProfile() {
      this.$http
        .get('/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(
          res => {
            this.user = res.data.user
            // this.reviews = res.data.reviews
            // this.listings = res.data.listings
          },
          error => {
            console.log(error)
          }
        )
    },
  },
  created() {
    if (this.listing_id != this.listing.id) {
      window.close()
    } else {
      this.fetchProfile()
    }
  },
}
</script>
