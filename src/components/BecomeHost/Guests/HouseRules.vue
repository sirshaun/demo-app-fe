<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-900">
      Set House Rules for your guests
    </h1>
    <p class="font-light tracking-wide">
      Guests must agree to your House Rules before they book.
    </p>

    <DefaultRules
      :initial-house-rules="checkedRules"
      :next-btn-clicked="nextBtnClicked"
      @input-error="errorFound"
      @update-checked-rules="updateCheckedRules"
    />

    <CustomRules
      :remove-custom-rule="removeCustomRule"
      :custom-rules="customRules"
    />
    <AddCustomRule :add-custom-rule="addCustomRule" />

    <ExtraDetails
      :initial-extra-details="checkedDetails"
      @update-checked-details="updateCheckedDetails"
    />

    <Footer :back="back" :next="proceed" />
  </div>
</template>

<script>
import DefaultRules from '@/components/BecomeHost/DefaultRules'
import CustomRules from '@/components/BecomeHost/CustomRules'
import AddCustomRule from '@/components/BecomeHost/AddCustomRule'
import ExtraDetails from '@/components/BecomeHost/ExtraDetails'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: {
    DefaultRules,
    CustomRules,
    AddCustomRule,
    ExtraDetails,
    Footer,
  },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      checkedRules: [],
      customRules: [],
      checkedDetails: [],
      nextBtnClicked: false,
      error: false,
    }
  },
  methods: {
    updateCheckedRules(rules) {
      this.checkedRules = rules
    },
    addCustomRule(rule) {
      this.customRules.push(rule)
    },
    removeCustomRule(index) {
      this.customRules.splice(index, 1)
    },
    updateCheckedDetails(details) {
      this.checkedDetails = details
    },
    errorFound() {
      this.error = true
    },
    proceed() {
      this.nextBtnClicked = true

      // NOTE: wait an arbitrary number of milliseconds
      // before moving to the next page, this is done to
      // give the emits a chance to catch up (error check)
      setTimeout(() => {
        if (!this.error) this.updateAndContinue()
      }, 14)
    },
    updateListingState() {
      this.$store.dispatch('updateHouseRules', {
        houseRules: this.checkedRules,
        customRules: this.customRules,
        houseDetails: this.checkedDetails,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 13 : 12,
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

      if (listing.hasOwnProperty('houseRules'))
        this.checkedRules = JSON.parse(JSON.stringify(listing.houseRules))

      if (listing.hasOwnProperty('customRules'))
        this.customRules = listing.customRules

      if (listing.hasOwnProperty('houseDetails'))
        this.checkedDetails = listing.houseDetails
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
