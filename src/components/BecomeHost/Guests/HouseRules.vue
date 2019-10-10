<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-900">
      Set House Rules for your guests
    </h1>
    <p class="font-light tracking-wide">
      Guests must agree to your House Rules before they book.
    </p>

    <div class="mt-6">
      <div class="block tracking-wide text-gray-700 font-bold mb-4">
        Additional Rules
      </div>
      <div
        class="flex items-center justify-between mb-4"
        v-for="(rule, index) in customRules"
        :key="index"
      >
        <div>{{ rule }}</div>
        <div
          class="cursor-pointer text-gray-400 hover:text-gray-700"
          @click="removeCustomRule(index)"
        >
          <svg
            class="h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </div>
      </div>
    </div>

    <CustomRules :add-custom-rule="addCustomRule" />

    <ExtraDetails />

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
  </div>
</template>

<script>
import DefaultRules from '@/components/BecomeHost/DefaultRules'
import CustomRules from '@/components/BecomeHost/CustomRules'
import ExtraDetails from '@/components/BecomeHost/ExtraDetails'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { DefaultRules, CustomRules, ExtraDetails, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      customRules: ['No shoes in the house'],
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
