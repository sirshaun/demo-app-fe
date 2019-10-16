<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-900">
      Something special for your first guests
    </h1>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <div class="flex justify-between items-start">
          <div>
            <label for="offer20">
              <div class="font-light">
                Offer 20% off to your first guests
                <span
                  class="bg-gray-300 uppercase text-sm font-normal tracking-wide p-1"
                >
                  recommended
                </span>
              </div>
              <div class="mt-1 font-light text-xs tracking-wide leading-snug">
                The first 3 guests who book your place will get 20% off their
                stay. This special offer can attract new guests and help you get
                the 3 reviews you need for a star rating.
              </div>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="offer20"
              value="offer20"
              name="specialOffer"
              v-model="specialOffer"
            />
          </div>
        </div>

        <hr class="border-gray-300 my-8" />

        <div class="flex justify-between items-start">
          <div>
            <label for="noOffer">
              <div class="font-light">
                Don't add a special offer
              </div>
              <div class="mt-1 font-light text-xs tracking-wide leading-snug">
                Once you publish your listing, you won’t be able to add this
                offer.
              </div>
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="noOffer"
              value="noOffer"
              name="specialOffer"
              v-model="specialOffer"
            />
          </div>
        </div>
        <p v-show="specialOfferError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
        <hr class="border-gray-300 my-8" />
      </div>
    </div>

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
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
      specialOffer: '',
      specialOfferError: false,
    }
  },
  methods: {
    checkSpecialOffer() {
      this.specialOfferError = this.specialOffer == ''
    },
    proceed() {
      this.checkSpecialOffer()

      if (!this.specialOfferError) this.updateAndContinue()
    },
    updateListing() {
      this.$store.dispatch('updateListingSpecialOfferFirst', {
        specialOffer: this.specialOffer,
      })
    },
    updateAndContinue() {
      if (!this.maxStayError) {
        this.updateListing()

        this.next()
      }
    },
    updateAndExit() {
      if (!this.maxStayError) {
        this.updateListing()

        this.checkpoint()
      }
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('specialOfferFirst'))
        this.specialOffer = listing.specialOfferFirst
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
