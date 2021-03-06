<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900">
      What kind of place are you listing?
    </h1>
    <p class="font-light tracking-wide">
      Check that you have enough beds to accommodate all your guests
      comfortably.
    </p>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <div class="flex flex-wrap items-center">
          <div class="w-1/3 font-light leading-none">Guests</div>
          <div class="w-1/3">
            <Counter
              :initial-counter="guests"
              :func="updateNumberOfGuests"
              :min="1"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-2/3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-bedrooms"
        >
          How many bedrooms can guests use?
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-bedrooms"
            v-model="bedrooms"
          >
            <option v-for="(option, index) in bedroomOptions" :key="index">
              {{ option }}
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
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-beds"
        >
          How many beds can guests use?
        </label>
        <div class="flex flex-wrap items-center mt-4">
          <div class="w-1/3 font-light leading-none">Beds</div>
          <div class="w-1/3">
            <Counter
              :initial-counter="beds"
              :func="updateNumberOfBeds"
              :min="1"
            />
          </div>
        </div>
      </div>
    </div>

    <h1 class="font-semibold text-xl text-gray-900 px-4 mt-8">
      Sleeping arrangements
    </h1>
    <p class="px-4">
      Sharing the types of beds in each room can help people understand the
      sleeping arrangements.
    </p>

    <hr class="border-gray-300 mt-6 mb-6 mx-2" />

    <Bedroom
      v-for="(room, index) in bedroomComponents"
      :name="'Bedroom ' + (index + 1)"
      :key="room"
      :spaces="bedroomSpaces"
      @bedroom-beds-updated="updateBedroomSpaces"
    />

    <Bedroom
      name="Common spaces"
      key="51"
      :spaces="bedroomSpaces"
      @bedroom-beds-updated="updateBedroomSpaces"
    />

    <Footer :back="back" :next="updateAndContinue" />
  </div>
</template>

<script>
import Pluralize from 'pluralize'

import Counter from '@/components/Form/Counter'
import Bedroom from '@/components/BecomeHost/Bedroom'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { Counter, Bedroom, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      guests: 1,
      bedrooms: '',
      beds: 1,
      bedroomComponents: 0,
      bedroomSpaces: {},
    }
  },
  methods: {
    updateNumberOfGuests(num) {
      this.guests = num
    },
    updateNumberOfBeds(num) {
      this.beds = num
    },
    updateBedroomSpaces(name, data) {
      var sluggedName = name.toLowerCase().replace(' ', '_')

      this.bedroomSpaces[sluggedName] = data
    },
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive)
    },
    updateListingState() {
      this.$store.dispatch('updateBedrooms', {
        guests: this.guests,
        bedrooms: this.bedrooms,
        beds: this.beds,
        bedroomSpaces: this.bedroomSpaces,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 1,
        page: step ? 3 : 2,
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
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('guests')) this.guests = listing.guests

      if (listing.hasOwnProperty('bedrooms')) this.bedrooms = listing.bedrooms

      if (listing.hasOwnProperty('beds')) this.beds = listing.beds

      if (listing.hasOwnProperty('bedroomSpaces')) {
        // less performant solution for deep cloning an object
        this.bedroomSpaces = JSON.parse(JSON.stringify(listing.bedroomSpaces))

        this.restoreSpaces()
      }
    },
    restoreSpaces() {
      this.bedroomComponents = Object.keys(this.bedroomSpaces).length - 1
    },
  },
  computed: {
    listingObj() {
      return this.$store.state.listing
    },
    bedroomOptions() {
      var options = []

      options.push('Studio')

      for (var i = 1; i < 51; i++) {
        if (i == 1) {
          options.push(i + ' bedroom')
        } else {
          options.push(i + ' bedrooms')
        }
      }

      return options
    },
  },
  watch: {
    bedrooms: {
      immediate: false,
      handler: function(bedrooms) {
        if (bedrooms == 'Studio') {
          this.bedroomComponents = 0
        } else {
          this.bedroomComponents = parseInt(bedrooms[0])
        }
      },
    },
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.updateAndExit()
      },
    },
  },
  created() {
    this.initializeValues()
  },
}
</script>
