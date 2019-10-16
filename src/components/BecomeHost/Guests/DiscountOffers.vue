<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-900">
      Length-of-stay prices
    </h1>
    <p class="font-light tracking-wide">
      Encourage travellers to book longer stays by offering a discount.
    </p>
    <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
      >Learn More</a
    >

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-weekly-discount"
        >
          Weekly discount
        </label>
        <div
          class="text-sm font-light tracking-wide leading-snug mb-2"
          v-if="showWeeklyPriceWithDiscount"
        >
          Average weekly price with 90% discount
          <strong>{{ weeklyPriceWithDiscount }}</strong>
        </div>
        <div class="relative overflow-hidden">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-6 leading-tight focus:outline-none focus:bg-white"
            :class="{ 'border-red-500 bg-red-100 mb-1': weeklyDiscountError }"
            id="grid-weekly-discount"
            type="text"
            placeholder=""
            v-model="weeklyDiscount"
          />
          <span
            id="weeklyDiscountLabel"
            class="absolute font-light text-gray-600 w-20"
            style="top: 11px; left: 45px"
            >% off</span
          >
        </div>
        <p v-show="weeklyDiscountError" class="text-red-500 text-xs italic">
          Please make your monthly discount at least as high as your weekly.
        </p>
        <div
          class="text-indigo-600 font-light text-lg mt-2 cursor-pointer hover:text-indigo-200"
        >
          Tip: 21 %
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-monthly-discount"
        >
          Monthly discount
        </label>
        <div
          class="text-sm font-light tracking-wide leading-snug mb-2"
          v-if="showMonthlyPriceWithDiscount"
        >
          Average monthly price with 90% discount
          <strong>{{ monthlyPriceWithDiscount }}</strong>
        </div>
        <div class="relative">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-6 leading-tight focus:outline-none focus:bg-white"
            :class="{ 'border-red-500 bg-red-100 mb-1': monthlyDiscountError }"
            id="grid-monthly-discount"
            type="text"
            placeholder=""
            v-model="monthlyDiscount"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700"
          >
            $
          </div>
        </div>
        <p v-show="monthlyDiscountError" class="text-red-500 text-xs italic">
          Please make your weekly discount at least as high as your monthly.
        </p>
        <div
          class="text-indigo-600 font-light text-lg mt-2 cursor-pointer hover:text-indigo-200"
        >
          Tip: 49 %
        </div>
      </div>
    </div>

    <!-- dummy divs -->
    <div class="dummy" id="weeklyDiscountText">{{ weeklyDiscount }}</div>
    <div v-show="false" id="monthlyDiscountText">{{ monthlyDiscount }}</div>

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
  </div>
</template>

<script>
import Footer from '@/components/BecomeHost/Footer'

// const dummyDivMonthly = document.getElementById('monthlyDiscountText')
// const labelMonthlyDiscount = document.getElementById('')

export default {
  components: { Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  computed: {
    errors() {
      return this.weeklyDiscountError || this.monthlyDiscountError
    },
    weeklyPriceWithDiscount() {
      return 90
    },
    monthlyPriceWithDiscount() {
      return 90
    },
    showWeeklyPriceWithDiscount() {
      return this.weeklyPriceWithDiscount != 0
    },
    showMonthlyPriceWithDiscount() {
      return this.monthlyPriceWithDiscount != 0
    },
  },
  data() {
    return {
      weeklyDiscount: 0,
      weeklyDiscountError: false,
      monthlyDiscount: 0,
      monthlyDiscountError: false,
    }
  },
  methods: {
    checkWeeklyDiscount() {
      this.weeklyDiscountError = this.weeklyDiscount > this.monthlyDiscount
    },
    checkMonthlyDiscount() {
      this.monthlyDiscountError = this.weeklyDiscount > this.monthlyDiscount
    },
    proceed() {
      this.checkSpecialOffer()

      if (!this.errors) this.updateAndContinue()
    },
    updateListing() {
      this.$store.dispatch('updateListingDiscounts', {
        weeklyDiscount: this.weeklyDiscount,
        monthlyDiscount: this.monthlyDiscount,
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

      if (listing.hasOwnProperty('weeklyDiscount'))
        this.weeklyDiscount = listing.weeklyDiscount

      if (listing.hasOwnProperty('monthlyDiscount'))
        this.monthlyDiscount = listing.monthlyDiscount
    },
  },
  created() {
    this.initializeValues()
  },
  watch: {
    weeklyDiscount: {
      immediate: true,
      handler: function(weeklyDiscount) {
        const dummyDivWeekly = document.getElementById('weeklyDiscountText')
        const labelWeeklyDiscount = document.getElementById(
          'weeklyDiscountLabel'
        )

        if (dummyDivWeekly) {
          if (weeklyDiscount == '') {
            var offset = 45
          } else {
            var width = dummyDivWeekly.clientWidth
            var offset = width + 45
          }

          labelWeeklyDiscount.style.left = offset + 'px'
        }
      },
    },
    monthlyDiscount: {
      immediate: true,
      handler: function(monthlyDiscount) {
        // var width = dummyDivMonthly.clientWidth
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

<style scoped>
.dummy {
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
  white-space: nowrap; /* Thanks to Herb Caudill comment */
}
</style>
