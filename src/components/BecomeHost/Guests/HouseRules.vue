<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-900">
      Set House Rules for your guests
    </h1>
    <p class="font-light tracking-wide">
      Guests must agree to your House Rules before they book.
    </p>

    <DefaultRules />

    <CustomRules
      :remove-custom-rule="removeCustomRule"
      :custom-rules="customRules"
    />
    <AddCustomRule :add-custom-rule="addCustomRule" />

    <ExtraDetails />

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
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
      customRules: [],
    }
  },
  methods: {
    addCustomRule(rule) {
      this.customRules.push(rule)
    },
    removeCustomRule(index) {
      this.customRules.splice(index, 1)
    },
    proceed() {
      //
    },
    updateListingState() {
      // this.$store.dispatch('updateHouseRules', {})
    },
    updateAndContinue() {
      this.updateListingState()

      this.next()
    },
    updateAndExit() {
      this.updateListingState()

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      //
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
