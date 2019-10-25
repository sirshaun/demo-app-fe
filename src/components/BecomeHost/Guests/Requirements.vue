<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Review Workcation’s guest requirements
    </h1>
    <p class="font-light tracking-wide">
      Workcation has requirements that all guests must meet before they book.
    </p>

    <p class="mt-10 font-light text-xl">All Workcation guests must provide:</p>
    <div
      class="flex items-center"
      :class="{ 'mt-4': index == 0, 'mt-1': index != 0 }"
      v-for="(info, index) in requiredInformation"
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

    <p class="font-light text-xl">
      Before booking your home, each guest must:
    </p>
    <div
      class="flex items-center"
      :class="{ 'mt-4': index == 0, 'mt-1': index != 0 }"
      v-for="(rule, index) in defaultRules"
      :key="100 - index"
    >
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4">{{ rule }}</span>
    </div>

    <hr class="border-gray-300 my-8" />

    <a
      class="text-indigo-600 cursor-pointer hover:text-indigo-200 mb-20"
      @click="toggleAdditionalRequirements"
      v-if="!additionalRequirementsOn"
      >Add additional requirements</a
    >
    <AdditionalRequirements
      :update-additional-requirements="updateAdditionalRequirements"
      :initial-checked-additional-requirements="checkedAdditionalRequirements"
      v-if="additionalRequirementsOn"
    />

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
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      checkedAdditionalRequirements: [],
      additionalRequirementsOn: false,
      requiredInformation: [
        'Email address',
        'Confirmed phone number',
        'Payment information',
      ],
      defaultRules: [
        'Agree to your House Rules',
        'Message you about their trip',
        'Let you know how many guests are coming',
        'Confirm their check-in time if they’re arriving within 2 days',
      ],
    }
  },
  methods: {
    updateAdditionalRequirements(additionalRequirements) {
      this.checkedAdditionalRequirements = additionalRequirements
    },
    toggleAdditionalRequirements() {
      this.additionalRequirementsOn = !this.additionalRequirementsOn
    },
    updateListingState() {
      this.$store.dispatch('updateAdditionalRequirements', {
        additionalRequirements: this.checkedAdditionalRequirements,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 12 : 11,
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

      if (listing.hasOwnProperty('additionalRequirements')) {
        this.checkedAdditionalRequirements = listing.additionalRequirements

        this.additionalRequirementsOn = !!this.checkedAdditionalRequirements
          .length
      }
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
