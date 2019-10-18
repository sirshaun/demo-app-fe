<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900">
      Is the pin in the right place?
    </h1>
    <p class="font-light tracking-wide">
      If needed, you can adjust the map so the pin is in the right location.
      Only confirmed guests will see this, so they know how to get to your
      place.
    </p>

    <div class="flex flex-wrap mt-6">
      <div class="w-full text-gray-700 text-sm tracking-wide">
        {{ address }}
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <GmapMap
        :center="{ lat: 10, lng: 10 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
    </div>

    <Footer
      :back="back"
      :next="updateAndContinue"
      next-btn-text="Yes, that's right"
    />
  </div>
</template>

<script>
import googlemap from '@/map/google-map.js'

// import GoogleMap from "@/components/GoogleMap";
import Footer from '@/components/BecomeHost/Footer'

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
      address: '',
      long: '',
      lat: '',
    }
  },
  methods: {
    updateListingState() {
      this.$store.dispatch('updateCoordinates', {
        long: this.long,
        lat: this.lat,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 1,
        page: step ? 6 : 5,
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

      /*if (listing.hasOwnProperty('country')) var country = listing.country

      if (listing.hasOwnProperty('street')) var street = listing.street

      if (listing.hasOwnProperty('aptNum')) var aptNum = listing.aptNum

      if (listing.hasOwnProperty('city')) var city = listing.city

      if (listing.hasOwnProperty('state')) var state = listing.state

      if (listing.hasOwnProperty('postcode'))
        var postcode = listing.postcode*/

      if (listing.hasOwnProperty('address')) this.address = listing.address

      if (listing.hasOwnProperty('longitude')) this.long = listing.longitude

      if (listing.hasOwnProperty('latitude')) this.lat = listing.latitude

      // '12 Lewton Road, Mount Waverley, VIC 3149, Australia'
    },
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
