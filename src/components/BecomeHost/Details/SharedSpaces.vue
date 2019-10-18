<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900">
      What spaces can guests use?
    </h1>
    <p class="font-light tracking-wide">
      Include common areas, but don’t add spaces that aren’t on your property.
    </p>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <div class="mb-4" v-for="(option, index) in spaces" :key="index">
          <input
            type="checkbox"
            :id="index"
            :value="option"
            v-model="checkedSpaces"
          />
          <label :for="index" class="ml-1 font-light inline-block w-11/12">{{
            option
          }}</label>
        </div>
      </div>
    </div>

    <Footer :back="back" :next="updateAndContinue" next-btn-text="Done" />
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
      checkedSpaces: [],
      spaces: [
        'Private living room',
        'Kitchen',
        'Laundry - washer',
        'Laundry - dryer',
        'Parking',
        'Gym',
        'Pool',
        'Hot tub',
        'Elevator',
      ],
    }
  },
  methods: {
    updateListingState() {
      this.$store.dispatch('updateSharedSpaces', {
        spaces: this.checkedSpaces,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: step ? 2 : 1,
        page: step ? 8 : 7,
      })
    },
    updateAndContinue() {
      this.updateListingState()

      this.updateProgress(true)

      this.checkpoint()
    },
    updateAndExit() {
      this.updateListingState()

      this.updateProgress(false)

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('spaces')) this.checkedSpaces = listing.spaces
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
