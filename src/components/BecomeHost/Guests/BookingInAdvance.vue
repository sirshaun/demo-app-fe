<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      How far in advance can guests book?
    </h1>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-booking"
            v-model="booking"
          >
            <option v-for="(option, index) in bookingOptions" :key="index">
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

    <div class="mt-10 w-3/5 font-semibold tracking-wide text-sm text-gray-600">
      <span class="text-indigo-600">Tip:</span> Avoid cancelling or declining
      guests by only unblocking dates you can host.
    </div>

    <Footer
      :back="back"
      :next="updateAndContinue"
      :checkpoint="updateAndExit"
    />
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
    return {
      booking: 'Dates unavailable by default',
      bookingError: false,
      bookingOptions: [
        'Any time',
        '3 months in advance',
        '6 months in advance',
        '9 months in advance',
        '1 year',
        'Dates unavailable by default',
      ],
    }
  },
  methods: {
    updateListing() {
      this.$store.dispatch('updateBookingInAdvancePeriod', {
        advancePeriod: this.booking,
      })
    },
    updateAndContinue() {
      this.updateListing()

      this.next()
    },
    updateAndExit() {
      this.updateListing()

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('advancePeriod'))
        this.booking = listing.advancePeriod
    },
  },
  created() {
    this.initializeValues()
  },
  watch: {
    booking: {
      immediate: true,
      handler: function(booking) {
        if (booking == 'Any time') {
          this.$root.$emit('update-months-for-calendar-snippet', ['year', 3])
        } else if (booking == 'Dates unavailable by default') {
          this.$root.$emit('update-months-for-calendar-snippet', [
            'month',
            3,
            'unavailable',
          ])
        } else if (booking == '1 year') {
          this.$root.$emit('update-months-for-calendar-snippet', ['year', 2])
        } else {
          this.$root.$emit('update-months-for-calendar-snippet', [
            'month',
            parseInt(booking),
          ])
        }
      },
    },
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint()
      },
    },
  },
}
</script>
