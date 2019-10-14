<template>
  <div>
    <div class="flex flex-col px-4">
      <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
        Successful hosting starts with an accurate calendar
      </h1>

      <p class="mt-6 text-lg font-light">
        Guests will book available days instantly. Only get booked when you can
        host by keeping your calendar and availability settings up-to-date.
      </p>
      <p class="text-lg mt-4 font-light">
        Cancelling disrupts guests’ plans. If you cancel because your calendar
        is inaccurate, you’ll be charged a penalty fee and the dates won’t be
        available for anyone else to book.
      </p>

      <div class="flex flex-wrap mt-6">
        <div class="w-full">
          <div class="mb-4">
            <input
              type="checkbox"
              id="grid-calendar"
              value="Yes"
              v-model="agree"
            />
            <label
              for="grid-calendar"
              class="ml-1 font-light inline-block w-11/12"
              >Got it! I’ll keep my calendar up to date.</label
            >
          </div>
          <p v-show="agreeError" class="text-red-500 text-xs italic">
            Please check the box
          </p>
        </div>
      </div>
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
      agree: '',
      agreeError: false,
    }
  },
  methods: {
    checkAgreement() {
      this.agreeError = this.agree == ''
    },
    updateListing() {
      this.$store.dispatch('updateCalendarConsent', {
        calendarConsent: this.agree,
      })
    },
    updateAndContinue() {
      this.checkAgreement()

      if (!this.agreeError) {
        this.updateListing()

        this.next()
      }
    },
    updateAndExit() {
      this.checkAgreement()

      if (!this.agreeError) {
        this.updateListing()

        this.checkpoint()
      }
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('calendarConsent'))
        this.agree = listing.calendarConsent
    },
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
