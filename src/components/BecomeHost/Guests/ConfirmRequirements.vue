<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Review your guest requirements
    </h1>
    <p class="font-light tracking-wide">
      Guests can only book without sending a request if they meet all your
      requirements and agree to your House Rules.
    </p>

    <div class="flex justify-between mt-10">
      <div class="font-light text-xl text-gray-600">
        All Workcation guests must provide
      </div>
      <div>
        <a
          class="text-indigo-600 cursor-pointer text-lg hover:text-indigo-200"
          @click="reviewRequirements"
          >Review</a
        >
      </div>
    </div>

    <div
      class="flex items-center"
      :class="{ 'mt-4': index == 0, 'mt-1': index != 0 }"
      v-for="(info, index) in guestRequirements"
      :key="index"
    >
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4">{{ info }}</span>
    </div>

    <hr class="border-gray-300 my-8" />

    <div class="flex justify-between">
      <div class="font-light text-xl text-gray-600">
        Your additional requirements
      </div>
      <div>
        <a
          class="text-indigo-600 cursor-pointer text-lg hover:text-indigo-200"
          @click="reviewRequirements"
          >Edit</a
        >
      </div>
    </div>

    <p
      class="text-lg font-light tracking-wide mt-6"
      v-if="additionalRequirements.length"
    >
      No additional requirements
    </p>

    <div
      class="flex items-center"
      :class="{ 'mt-4': index == 0, 'mt-1': index != 0 }"
      v-for="(info, index) in additionalRequirements"
      :key="100 - index"
    >
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4">{{ info }}</span>
    </div>

    <hr class="border-gray-300 my-8" />

    <div
      class="flex justify-between"
      :class="{ 'mb-20': combinedHouseRules.length == 0 }"
    >
      <div class="font-light text-xl text-gray-600">
        Your House Rules
      </div>
      <div>
        <a
          class="text-indigo-600 cursor-pointer text-lg hover:text-indigo-200"
          @click="reviewHouseRules"
          >Edit</a
        >
      </div>
    </div>

    <div
      class="flex items-center"
      :class="{
        'mt-4': index == 0,
        'mt-1': index != 0,
        'mb-20': index == combinedHouseRules.length - 1,
      }"
      v-for="(info, index) in combinedHouseRules"
      :key="200 - index"
    >
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4">{{ info }}</span>
    </div>

    <Footer :back="back" :next="updateAndContinue" />
  </div>
</template>

<script>
import AdditionalRequirements from '@/components/BecomeHost/AdditionalRequirements'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { AdditionalRequirements, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    confirmation: { type: Boolean, default: false },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      guestRequirements: [
        'Email address',
        'Confirmed phone number',
        'Payment information',
      ],
      additionalRequirements: [],
      houseRules: [],
      customRules: [],
      extraDetails: [],
    }
  },
  computed: {
    combinedHouseRules() {
      var arr = []

      arr = this.translateHouseRules(arr)

      this.customRules.forEach(e => arr.push(e))

      this.extraDetails.forEach(e => {
        if (!!e && e.hasOwnProperty('detail')) {
          arr.push(e.detail)
        }
      })

      return arr
    },
  },
  methods: {
    reviewRequirements() {
      this.$emit('review-requirements')
    },
    reviewHouseRules() {
      this.$emit('review-house-rules')
    },
    fetchLocalData() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('additionalRequirements'))
        this.additionalRequirements = listing.additionalRequirements

      if (listing.hasOwnProperty('houseRules'))
        this.houseRules = JSON.parse(JSON.stringify(listing.houseRules))

      if (listing.hasOwnProperty('customRules'))
        this.customRules = listing.customRules

      if (listing.hasOwnProperty('houseDetails'))
        this.extraDetails = listing.houseDetails
    },
    translateHouseRules(arr) {
      var translateHouseRules = this.houseRules.map((e, i) => {
        if (i == 0 || i == 1) {
          if (
            this.houseRules[0].choice == 'Yes' &&
            this.houseRules[1].choice == 'Yes'
          ) {
            return 'Not suitable for children and infants'
          }
        }

        if (e.text == 'Suitable for children (2-12)') {
          if (e.choice == 'No') {
            return 'Not suitable for children (2-12 years)'
          }
          return e.text
        }

        if (e.text == 'Suitable for infants (under 2 years)') {
          if (e.choice == 'No') {
            return 'Not suitable for infants (under 2 years)'
          }
          return e.text
        }

        if (e.text == 'Suitable for pets') {
          if (e.choice == 'No') {
            return 'No pets'
          }
          return e.text
        }

        if (e.text == 'Smoking allowed') {
          if (e.choice == 'No') {
            return 'No smoking'
          }
          return e.text
        }

        if (e.text == 'Events or parties allowed') {
          if (e.choice == 'No') {
            return 'No parties or events'
          }
          return e.text
        }

        return ''
      })

      return Array.from(new Set(translateHouseRules))
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 13 : 12,
      })
    },
    updateAndContinue() {
      this.updateProgress(true)

      this.next()
    },
    updateAndExit() {
      this.updateProgress(false)

      this.checkpoint()
    },
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.updateAndExit()
      },
    },
  },
  created() {
    this.fetchLocalData()
  },
}
</script>
