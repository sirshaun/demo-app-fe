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
          Average weekly price with {{ weeklyDiscount }}% discount
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
          {{ weeklyDiscountErrorMessage }}
        </p>
        <div
          class="text-indigo-600 font-light text-lg mt-2 cursor-pointer hover:text-indigo-200"
          @click="useWeeklyTip"
        >
          Tip: {{ suggestedWeeklyDiscount }} %
        </div>
        <div class="mt-1 font-light text-sm">{{ weeklyDiscountFeedback }}</div>
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
          Average monthly price with {{ monthlyDiscount }}% discount
          <strong>{{ monthlyPriceWithDiscount }}</strong>
        </div>
        <div class="relative overflow-hidden">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-6 leading-tight focus:outline-none focus:bg-white"
            :class="{ 'border-red-500 bg-red-100 mb-1': monthlyDiscountError }"
            id="grid-monthly-discount"
            type="text"
            placeholder=""
            v-model="monthlyDiscount"
          />
          <span
            id="monthlyDiscountLabel"
            class="absolute font-light text-gray-600 w-20"
            style="top: 11px; left: 45px"
            >% off</span
          >
        </div>
        <p v-show="monthlyDiscountError" class="text-red-500 text-xs italic">
          {{ monthlyDiscountErrorMessage }}
        </p>
        <div
          class="text-indigo-600 font-light text-lg mt-2 cursor-pointer hover:text-indigo-200"
          @click="useMonthlyTip"
        >
          Tip: {{ suggestedMonthlyDiscount }} %
        </div>
        <div class="mt-1 font-light text-sm">{{ monthlyDiscountFeedback }}</div>
      </div>
    </div>

    <!-- dummy divs -->
    <div class="dummy" id="weeklyDiscountText">{{ weeklyDiscount }}</div>
    <div class="dummy" id="monthlyDiscountText">{{ monthlyDiscount }}</div>

    <Footer :back="back" :next="proceed" />
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
  computed: {
    errors() {
      return this.weeklyDiscountError || this.monthlyDiscountError
    },
    weeklyPriceWithDiscount() {
      var price = this.price * 7 * ((100 - this.weeklyDiscount) / 100)
      return this.moneyFormat(price)
    },
    monthlyPriceWithDiscount() {
      var price = this.price * 30 * ((100 - this.monthlyDiscount) / 100)
      return this.moneyFormat(price)
    },
    showWeeklyPriceWithDiscount() {
      return (
        (this.weeklyDiscount != 0 || this.weeklyDiscount != '') &&
        this.weeklyDiscount < 100
      )
    },
    showMonthlyPriceWithDiscount() {
      return (
        (this.monthlyDiscount != 0 || this.monthlyDiscount != '') &&
        this.monthlyDiscount < 100
      )
    },
    weeklyDiscountFeedback() {
      if (this.weeklyDiscount == '')
        return 'Travellers searching for stays longer than a week typically book listings with discounts.'

      if (this.weeklyDiscount < 16)
        return 'Increase your discount to raise the chance of getting booked by weekly travellers searching in suburb_here.'

      return 'Nice! Get ready to host week-long stays.'
    },
    monthlyDiscountFeedback() {
      if (this.monthlyDiscountError) return ''

      if (this.monthlyDiscount == '')
        return '68% of travellers staying longer than one month book listings with discounts greater than 20%.'

      if (this.monthlyDiscount < 44)
        return 'Set a higher discount to increase the likelihood you get booked by travellers searching for monthly stays in suburb_here.'

      return 'Great! Your discount helps make your listing attractive to travellers searching for month-long stays.'
    },
    weeklyDiscountErrorMessage() {
      if (this.weeklyDiscount > 99 || this.weeklyDiscount < 0)
        return 'Please use a weekly discount of at least 0 but no more than 99'

      return 'Please make your monthly discount at least as high as your weekly.'
    },
    monthlyDiscountErrorMessage() {
      if (this.monthlyDiscount > 99 || this.monthlyDiscount < 0)
        return 'Please use a monthly discount of at least 0 but no more than 99'

      return 'Please make your monthly discount at least as high as your weekly.'
    },
  },
  data() {
    return {
      weeklyDiscount: 0,
      weeklyDiscountError: false,
      monthlyDiscount: 0,
      monthlyDiscountError: false,
      suggestedWeeklyDiscount: 21,
      suggestedMonthlyDiscount: 49,
      price: 0,
      suburb: '',
    }
  },
  methods: {
    useWeeklyTip() {
      this.weeklyDiscount = this.suggestedWeeklyDiscount
    },
    useMonthlyTip() {
      this.monthlyDiscount = this.suggestedMonthlyDiscount
    },
    checkWeeklyDiscount() {
      this.weeklyDiscountError =
        this.weeklyDiscount > this.monthlyDiscount || this.weeklyDiscount > 99
    },
    checkMonthlyDiscount() {
      this.monthlyDiscountError =
        this.weeklyDiscount > this.monthlyDiscount || this.monthlyDiscount > 99
    },
    moneyFormat(num) {
      return num.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    proceed() {
      this.checkWeeklyDiscount() || this.checkMonthlyDiscount()

      if (!this.errors) this.updateAndContinue()
    },
    updateListing() {
      this.$store.dispatch('updateListingDiscounts', {
        weeklyDiscount: this.weeklyDiscount,
        monthlyDiscount: this.monthlyDiscount,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 24 : 23,
      })
    },
    updateAndContinue() {
      if (!this.maxStayError) {
        this.updateListing()

        this.updateProgress(true)

        this.next()
      }
    },
    updateAndExit() {
      if (!this.maxStayError) {
        this.updateListing()

        this.updateProgress(false)

        this.checkpoint()
      }
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('weeklyDiscount'))
        this.weeklyDiscount = listing.weeklyDiscount

      if (listing.hasOwnProperty('monthlyDiscount'))
        this.monthlyDiscount = listing.monthlyDiscount

      this.price = listing.basePrice
      this.suburb = listing.suburb || 'Mount Waverly'
    },
  },
  created() {
    this.initializeValues()
  },
  watch: {
    weeklyDiscount: {
      immediate: true,
      handler: function(weeklyDiscount) {
        this.checkWeeklyDiscount()
        this.checkMonthlyDiscount()

        // supress monthly discount error so user focuses on one error
        if (this.monthlyDiscountError) this.monthlyDiscountError = false

        if (weeklyDiscount == 0) this.weeklyDiscount = ''

        const dummyDivWeekly = document.getElementById('weeklyDiscountText')
        const labelWeeklyDiscount = document.getElementById(
          'weeklyDiscountLabel'
        )

        if (dummyDivWeekly) {
          if (weeklyDiscount == '') {
            var offset = 50
          } else {
            var width = dummyDivWeekly.clientWidth
            var offset = width + 50
          }

          labelWeeklyDiscount.style.left = offset + 'px'
        }
      },
    },
    monthlyDiscount: {
      immediate: true,
      handler: function(monthlyDiscount) {
        this.checkWeeklyDiscount()
        this.checkMonthlyDiscount()

        // supress weekly discount error so user focuses on one error
        if (this.weeklyDiscountError) this.weeklyDiscountError = false

        if (monthlyDiscount == 0) this.monthlyDiscount = ''

        const dummyDivMonthly = document.getElementById('monthlyDiscountText')
        const labelMonthlyDiscount = document.getElementById(
          'monthlyDiscountLabel'
        )

        if (dummyDivMonthly) {
          if (monthlyDiscount == '') {
            var offset = 50
          } else {
            var width = dummyDivMonthly.clientWidth
            var offset = width + 50
          }

          labelMonthlyDiscount.style.left = offset + 'px'
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

<style scoped>
.dummy {
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
  white-space: nowrap; /* Thanks to Herb Caudill comment */
}
</style>
