<template>
  <div class="flex flex-col mb-20" v-show="countries[0]">
    <h1 class="font-semibold text-2xl text-gray-900">
      Where’s your place located?
    </h1>
    <p class="font-light tracking-wide">
      Guests will only get your exact address once they’ve booked a reservation.
    </p>

    <div class="flex flex-wrap mt-6">
      <a
        class="bg-white hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white p-2 border border-indigo-500 hover:border-transparent rounded flex items-center cursor-pointer"
        @click="getCurrentPosition"
      >
        <svg
          class="h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 0l20 8-8 4-2 8z" />
        </svg>
        <span class="font-thin ml-2">Use current location</span>
      </a>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-bedrooms"
        >
          Country / Region
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': countryError,
            }"
            id="grid-country"
            v-model="country"
          >
            <option
              v-for="(country, index) in countries"
              :value="country.code"
              :key="index"
            >
              {{ country.name }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
        <p v-show="countryError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-street"
        >
          Street Address
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          :class="{
            'border-red-500 bg-red-100 mb-1': streetError,
          }"
          id="grid-street"
          type="text"
          placeholder="e.g. 123 Main St"
          v-model="street"
        />
        <p v-show="streetError" class="text-red-500 text-xs italic">
          Please enter street number
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-apt-num"
        >
          Apt, Suite. (optional)
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          id="grid-apt-num"
          type="text"
          placeholder="e.g. Unit 401"
          v-model="aptNum"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-1/2 pr-2">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-city"
        >
          City
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          :class="{
            'border-red-500 bg-red-100 mb-1': cityError,
          }"
          id="grid-city"
          type="text"
          placeholder="e.g. Surrey Hills"
          v-model="city"
        />
        <p v-show="cityError" class="text-red-500 text-xs italic">
          Please enter city
        </p>
      </div>
      <div class="w-1/2 pl-2">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-state"
        >
          State
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          :class="{
            'border-red-500 bg-red-100 mb-1': stateError,
          }"
          id="grid-state"
          type="text"
          placeholder="e.g. NSW"
          v-model="state"
        />
        <p v-show="stateError" class="text-red-500 text-xs italic">
          Please enter state
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-1/2 pr-2">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-postcode"
        >
          Zip code
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          :class="{
            'border-red-500 bg-red-100 mb-1': postcodeError,
          }"
          id="grid-postcode"
          type="text"
          placeholder="e.g. 2010"
          v-model="postcode"
        />
        <p v-show="postcodeError" class="text-red-500 text-xs italic">
          Please enter postcode / zip code
        </p>
      </div>
    </div>

    <Footer :back="back" :next="proceed" />
  </div>
</template>

<script>
import Footer from '@/components/BecomeHost/Footer'

import axios from 'axios'

const componentForm = {
  street_number: 'short_name',
  street_address: 'long_name',
  route: 'short_name',
  locality: 'short_name',
  colloquial_area: 'short_name',
  neighborhood: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'short_name',
  postal_code: 'short_name',
}

export default {
  components: { Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      countries: [],
      address: '',
      country: '',
      street: '',
      streetNumber: '',
      streetName: '',
      aptNum: '',
      city: '',
      state: '',
      postcode: '',
      lat: '',
      long: '',
      countryError: false,
      streetError: false,
      cityError: false,
      stateError: false,
      postcodeError: false,
    }
  },
  computed: {
    errors() {
      return (
        this.countryError ||
        this.streetError ||
        this.cityError ||
        this.stateError ||
        this.postcodeError
      )
    },
  },
  methods: {
    checkCountry() {
      this.countryError = this.country == ''
    },
    checkStreet() {
      this.streetError = this.street == ''
    },
    checkAptNum() {
      this.aptNumError = this.aptNum == ''
    },
    checkCity() {
      this.cityError = this.city == ''
    },
    checkState() {
      this.stateError = this.state == ''
    },
    checkPostcode() {
      this.postcodeError = this.postcode == ''
    },
    proceed() {
      this.checkCountry() ||
        this.checkStreet() ||
        this.checkCity() ||
        this.checkState() ||
        this.checkPostcode()

      if (!this.errors) this.updateAndContinue()
    },
    updateListingState() {
      this.$store.dispatch('updateLocation', {
        address: this.address,
        country: this.country,
        streetNumber: this.streetNumber,
        streetName: this.streetName,
        aptNum: this.aptNum,
        city: this.city,
        state: this.state,
        postcode: this.postcode,
      })

      this.$store.dispatch('updateCoordinates', {
        long: this.long,
        lat: this.lat,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 1,
        page: step ? 5 : 4,
      })
    },
    updateAndContinue() {
      this.updateListingState()

      this.updateProgress(true)

      this.next()
    },
    updateAndExit() {
      this.updateListingState()

      this.updateProgress(false)

      this.checkpoint()
    },
    fetchCountries() {
      this.$http.get('/location/countries').then(
        res => {
          this.countries = res.data
        },
        error => {
          console.log(error)
        }
      )
    },
    setBounds() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          })
          this.autocomplete.setBounds(circle.getBounds())
        })
      }
    },
    collateAddressData() {
      let place = this.autocomplete.getPlace()

      this.lat = place.geometry.location.lat()
      this.long = place.geometry.location.lng()

      this.fillInAddress(place.address_components)

      this.getCityFromCoordinates()
    },
    fillInAddress(addressComponents) {
      var address = []

      for (var i = 0; i < addressComponents.length; i++) {
        var addressType = addressComponents[i].types[0]
        if (componentForm[addressType]) {
          address[addressType] =
            addressComponents[i][componentForm[addressType]]
        }
      }

      this.address = document.getElementById('grid-street').value
      this.street = this.resolveStreetAddress(address)
      this.streetNumber = address['street_number'] || ''
      this.streetName = address['route'] || ''
      this.suburb = address['locality'] || ''
      this.state = address['administrative_area_level_1'] || ''
      this.country = address['country'] || ''
      this.postcode = address['postal_code'] || ''
      this.city = ''
    },
    getCurrentPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude
          this.long = position.coords.longitude

          this.reverseGeocode()
        })
      }
    },
    reverseGeocode() {
      axios
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            this.lat +
            ',' +
            this.long +
            '&location_type=ROOFTOP&result_type=street_number|street_address|route|locality|colloquial_area|neighborhood|administrative_area_level_1|postal_code|country&key=' +
            process.env.VUE_APP_GOOGLE_API_KEY
        )
        .then(
          res => {
            this.fillInAddress(res.data.results[0]['address_components'])
          },
          error => {
            console.log(error)
          }
        )
    },
    getCityFromCoordinates() {
      axios
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            this.lat +
            ',' +
            this.long +
            '&result_type=locality&key=' +
            process.env.VUE_APP_GOOGLE_API_KEY
        )
        .then(
          res => {
            if (res.data.results.length > 1)
              this.city = res.data.results[1]['address_components'][0].long_name
          },
          error => {
            console.log(error)
          }
        )
    },
    resolveStreetAddress(address) {
      if (address['street_number'])
        return address['street_number'] + ' ' + address['route']

      return this.address.split(',')[0]
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('country')) this.country = listing.country

      if (listing.hasOwnProperty('address')) this.address = listing.address

      if (listing.hasOwnProperty('street')) this.street = listing.street

      if (listing.hasOwnProperty('streetNumber'))
        this.streetNumber = listing.streetNumber

      if (listing.hasOwnProperty('streetName'))
        this.streetName = listing.streetName

      if (listing.hasOwnProperty('aptNum')) this.aptNum = listing.aptNum

      if (listing.hasOwnProperty('city')) this.city = listing.city

      if (listing.hasOwnProperty('state')) this.state = listing.state

      if (listing.hasOwnProperty('postcode')) this.postcode = listing.postcode

      if (listing.hasOwnProperty('latitude')) this.lat = listing.latitude

      if (listing.hasOwnProperty('longitude')) this.long = listing.longitude
    },
  },
  mounted() {
    this.fetchCountries()

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('grid-street'),
      { types: ['geocode'] }
    )
    this.setBounds()
    this.autocomplete.setFields([
      'address_component',
      'formatted_address',
      'geometry',
    ])

    const listener = () => this.collateAddressData()

    this.autocomplete.addListener('place_changed', listener)

    /*this.$once('hook:beforeDestroy', () => {
      this.autocomplete.removeListener('place_changed', listener)
    })*/
  },
  created() {
    this.initializeValues()
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.updateAndExit()
      },
    },
  },
}
</script>
