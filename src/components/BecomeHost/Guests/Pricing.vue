<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-900">
      Price Your Space
    </h1>
    <p class="font-semibold tracking-wide">
      Increase your chances of getting booked
    </p>
    <p class="font-light tracking-wide">
      Set up Smart Pricing to automatically keep your nightly prices competitive
      as demand in your area changes.
    </p>

    <div class="font-semibold text-2xl text-gray-900 mt-10">
      {{ subHeader }}
      <span
        class="bg-gray-300 uppercase text-sm font-normal tracking-wide p-1"
        v-if="smartPricingOn"
      >
        recommended
      </span>
    </div>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-base-price"
        >
          Base price
        </label>
        <div class="text-sm font-light tracking-wide leading-snug mb-2">
          This will be your default price for days when you decide to turn off
          Smart Pricing.
        </div>
        <div class="relative">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-6 leading-tight focus:outline-none focus:bg-white"
            :class="{ 'border-red-500 bg-red-100 mb-1': basePriceError }"
            id="grid-base-price"
            type="text"
            placeholder=""
            v-model="basePrice"
            @focus="updateHelpSlide(3)"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700"
          >
            $
          </div>
        </div>
        <p v-show="basePriceError" class="text-red-500 text-xs italic">
          Please use a base price of at least $15 but no more than $14,787.
        </p>
        <div class="text-indigo-600 font-light text-lg mt-2 flex items-center">
          Tip: $33 USD
          <svg
            class="ml-2 h-4 fill-current cursor-pointer"
            :class="{
              'text-indigo-200': baseTooltipOn,
              'text-indigo-400': !baseTooltipOn,
            }"
            id="base-price-tip"
            @click="toggleTooltip"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
            />
          </svg>
          <Tooltip
            :tip="tipText"
            :show="baseTooltipOn"
            :toggle-tooltip="toggleTooltip"
            v-if="baseTooltipOn"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-10" v-if="smartPricingOn">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-minimum-price"
        >
          Minimum price
        </label>
        <div class="text-sm font-light tracking-wide leading-snug mb-2">
          When demand for your space is low, nightly prices will drop to attract
          more guests to book. What’s the lowest price you’re comfortable with?
        </div>
        <div class="relative">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-6 leading-tight focus:outline-none focus:bg-white"
            :class="{ 'border-red-500 bg-red-100 mb-3': minimumPriceError }"
            id="grid-minimum-price"
            type="text"
            placeholder=""
            v-model="minimumPrice"
            @focus="updateHelpSlide(2)"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700"
          >
            $
          </div>
        </div>
        <div class="text-indigo-600 font-light text-lg mt-2 flex items-center">
          Tip: $23 USD
          <svg
            class="ml-2 h-4 fill-current cursor-pointer"
            :class="{
              'text-indigo-200': minTooltipOn,
              'text-indigo-400': !minTooltipOn,
            }"
            id="min-price-tip"
            @click="toggleTooltip"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
            />
          </svg>
          <Tooltip
            :tip="tipText"
            :show="minTooltipOn"
            :toggle-tooltip="toggleTooltip"
            v-if="minTooltipOn"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-10" v-if="smartPricingOn">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-minimum-price"
        >
          Maximum price
        </label>
        <div class="text-sm font-light tracking-wide leading-snug mb-2">
          If demand is high, e.g. if there’s a popular festival in town, what’s
          the highest price you’re willing to charge guests per night?
        </div>
        <div class="relative">
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-6 leading-tight focus:outline-none focus:bg-white"
            :class="{ 'border-red-500 bg-red-100 mb-3': maximumPriceError }"
            id="grid-maximum-price"
            type="text"
            placeholder=""
            v-model="maximumPrice"
            @focus="updateHelpSlide(2)"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700"
          >
            $
          </div>
        </div>
        <div class="text-indigo-600 font-light text-lg mt-2 flex items-center">
          Tip: $99 USD
          <svg
            class="ml-2 h-4 fill-current cursor-pointer"
            :class="{
              'text-indigo-200': maxTooltipOn,
              'text-indigo-400': !maxTooltipOn,
            }"
            id="max-price-tip"
            @click="toggleTooltip"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
            />
          </svg>
          <Tooltip
            :tip="tipText"
            :show="maxTooltipOn"
            :toggle-tooltip="toggleTooltip"
            v-if="maxTooltipOn"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light"
          for="grid-currency"
        >
          Currency
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-currency"
            v-model="currency"
            @focus="updateHelpSlide(3)"
          >
            <option
              v-for="(option, index) in currencies"
              :key="index"
              :value="option.key"
            >
              {{ option.text }}
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

    <div>
      You’re always in control of your nightly price. By continuing, you agree
      to turn on Smart Pricing. You can change this later in settings.
    </div>

    <hr class="border-gray-300 my-8" />

    <div class="mb-20">
      <a
        class="text-indigo-600 cursor-pointer hover:text-indigo-200"
        @click="toggleSmartPricing"
      >
        Use base price only
      </a>
      <span
        class="bg-gray-300 uppercase text-sm font-normal tracking-wide p-1 text-gray-800"
        v-if="!smartPricingOn"
      >
        recommended
      </span>
    </div>

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip'
import Footer from '@/components/BecomeHost/Footer'

const reg = /^\d+$/

export default {
  components: { Tooltip, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      basePrice: '',
      basePriceError: false,
      minimumPrice: '',
      minimumPriceError: false,
      maximumPrice: '',
      maximumPriceError: false,
      currency: 'USD',
      currencies: [],
      smartPricingOn: true,
      baseTooltipOn: false,
      minTooltipOn: false,
      maxTooltipOn: false,
      tipText:
        'Tips are based on your listing’s qualities, nearby prices and demand.',
    }
  },
  computed: {
    subHeader() {
      return this.smartPricingOn
        ? 'Set up Smart Pricing'
        : 'Set up the same base price for each night'
    },
    errors() {
      return (
        this.basePriceError || this.minimumPriceError || this.maximumPriceError
      )
    },
  },
  methods: {
    checkBasePrice() {
      this.basePriceError =
        this.basePrice == '' || this.basePrice <= 0 || !re.test(this.basePrice)
    },
    checkMinimumPrice() {
      if (this.smartPricingOn) {
        this.minimumPriceError =
          this.minimumPrice == '' ||
          this.minimumPrice <= 0 ||
          !re.test(this.minimumPrice)
      }
    },
    checkMaximumPrice() {
      if (this.smartPricingOn) {
        this.maximumPriceError =
          this.maximumPrice == '' ||
          this.maximumPrice <= 0 ||
          !re.test(this.maximumPrice)
      }
    },
    toggleSmartPricing() {
      this.smartPricingOn = !this.smartPricingOn

      this.$root.$emit('update-slide-pricing-smart-help', this.smartPricingOn)
    },
    toggleTooltip(e) {
      switch (e.target.id) {
        case 'base-price-tip':
          this.baseTooltipOn = !this.baseTooltipOn
          break

        case 'min-price-tip':
          this.minTooltipOn = !this.minTooltipOn
          break

        case 'max-price-tip':
          this.maxTooltipOn = !this.maxTooltipOn
          break

        default:
          this.baseTooltipOn = false
          this.minTooltipOn = false
          this.maxTooltipOn = false
      }
    },
    updateHelpSlide(slide) {
      this.$root.$emit('update-slide-pricing-help', slide)
    },
    proceed() {
      this.checkBasePrice() ||
        this.checkMinimumPrice() ||
        this.checkMaximumPrice()

      if (!this.errors) this.updateAndContinue()
    },
    updateListing() {
      this.$store.dispatch('updateListingPricing', {
        basePrice: this.basePrice,
        minPrice: this.smartPricingOn ? this.minimumPrice : null,
        maxPrice: this.smartPricingOn ? this.maximumPrice : null,
        currency: this.currency,
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

      if (listing.hasOwnProperty('basePrice'))
        this.basePrice = listing.basePrice

      if (listing.hasOwnProperty('minimumPrice') && listing.minimumPrice)
        this.minimumPrice = listing.minimumPrice

      if (listing.hasOwnProperty('maximumPrice') && listing.maximumPrice)
        this.maximumPrice = listing.maximumPrice

      if (listing.hasOwnProperty('currency')) this.currency = listing.currency
    },
    fetchCurrencies() {
      this.$http.get('/location/currencies').then(
        res => {
          this.currencies = res.data
        },
        error => {
          console.log(error)
        }
      )
    },
  },
  created() {
    this.fetchCurrencies()

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
