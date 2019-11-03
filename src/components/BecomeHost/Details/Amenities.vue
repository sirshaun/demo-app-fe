<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900">
      What amenities do you offer?
    </h1>
    <p class="font-light tracking-wide">
      These are just the amenities guests usually expect, but you can add even
      more after you publish.
    </p>

    <div class="flex flex-wrap mt-6">
      <div class="w-full">
        <div
          class="mb-4"
          v-for="(option, index) in defaultAmenities"
          :key="index"
        >
          <input
            type="checkbox"
            :id="sluggedName(option.value)"
            :value="option.value"
            v-model="checkedDefaultAmenities"
          />
          <label
            :for="sluggedName(option.value)"
            class="ml-1 font-light inline-block w-11/12"
            >{{ option.value }}</label
          >
          <div class="text-sm tracking wide ml-4">
            {{ option.descr }}
          </div>
        </div>
      </div>
    </div>

    <h1 class="font-semibold text-xl text-gray-900 mt-10">
      Safety Amenities
    </h1>
    <div class="flex flex-wrap mt-6 mb-10">
      <div class="w-full">
        <div
          class="mb-4"
          v-for="(option, index) in safetyAmenities"
          :key="100 - index"
        >
          <input
            type="checkbox"
            :id="sluggedName(option.value)"
            :value="option.value"
            v-model="checkedSafetyAmenities"
          />
          <label
            :for="sluggedName(option.value)"
            class="ml-1 font-light inline-block w-11/12"
            >{{ option.value }}</label
          >
          <div class="text-sm tracking wide ml-4">
            {{ option.descr }}
          </div>
        </div>
      </div>
    </div>

    <Footer :back="back" :next="updateAndContinue" />
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
      checkedDefaultAmenities: [],
      checkedSafetyAmenities: [],
      defaultAmenities: [
        {
          value: 'Essentials',
          descr: 'Towels, bed sheets, soap, toilet paper and pillows',
        },
        { value: 'Air conditioning', descr: '' },
        { value: 'Heat', descr: '' },
        { value: 'Hair dryer', descr: '' },
        { value: 'Closet/drawers', descr: '' },
        { value: 'Iron', descr: '' },
        { value: 'TV', descr: '' },
        { value: 'Fireplace', descr: '' },
        { value: 'Private entrance', descr: '' },
        { value: 'Shampoo', descr: '' },
        { value: 'Wifi', descr: '' },
        { value: 'Desk/workspace', descr: '' },
        { value: 'Breakfast,coffee,tea', descr: '' },
      ],
      safetyAmenities: [
        {
          value: 'Lock on bedroom door',
          descr: 'Private room can be locked for safety and privacy',
        },
        { value: 'Fire extinguisher', descr: '' },
        {
          value: 'Carbon monoxide detector',
          descr:
            'Check your local laws, which may require a working carbon monoxide detector in every room',
        },
        {
          value: 'Smoke detector',
          descr:
            'Check your local laws, which may require a working smoke detector in every room',
        },
        { value: 'First aid kit', descr: '' },
      ],
    }
  },
  methods: {
    sluggedName(name) {
      return name
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, ' ')
        .replace(' ', '_')
    },
    updateListingState() {
      this.$store.dispatch('updateAmenities', {
        basic: this.checkedDefaultAmenities,
        safety: this.checkedSafetyAmenities,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 1,
        page: step ? 7 : 6,
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

      if (listing.hasOwnProperty('amenities'))
        this.checkedDefaultAmenities = listing.amenities

      if (listing.hasOwnProperty('safetyAmenities'))
        this.checkedSafetyAmenities = listing.safetyAmenities
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
