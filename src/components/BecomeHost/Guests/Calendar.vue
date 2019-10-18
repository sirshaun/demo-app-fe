<template>
  <div class="flex flex-col px-4 text-gray-900">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Update your calendar
    </h1>
    <p class="font-light tracking-wide">
      Select dates to block or unblock.
    </p>

    <!-- calendar goes here -->

    <Footer :back="back" :next="updateAndContinue" />
  </div>
</template>

<script>
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
    return {}
  },
  methods: {
    updateListing() {
      // this.$store.dispatch('updateListingAvailability', {})
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 21 : 20,
      })
    },
    updateAndContinue() {
      this.updateListing()

      this.updateProgress(true)

      this.next()
    },
    updateAndExit() {
      this.updateListing()

      this.updateProgress(false)

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      // if (listing.hasOwnProperty('')) this. = listing.
    },
  },
  created() {
    this.initializeValues()
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint()
      },
    },
  },
}
</script>
