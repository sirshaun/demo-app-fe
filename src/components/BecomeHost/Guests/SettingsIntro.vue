<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Two questions to get started with your settings
    </h1>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5 px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-experience"
        >
          Have you rented out your place before?
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': experienceError,
            }"
            id="grid-experience"
            v-model="experience"
          >
            <option v-for="(option, index) in experienceOptions" :key="index">
              {{ option }}
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
        <p v-show="experienceError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-8">
      <div class="w-3/5 px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-frequency"
        >
          How often do you want to have guests
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': frequencyError,
            }"
            id="grid-frequency"
            v-model="frequency"
          >
            <option
              v-for="(option, index) in frequencyOptions"
              :key="100 - index"
            >
              {{ option }}
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
        <p v-show="frequencyError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>
    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
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
      experience: '',
      experienceError: false,
      frequency: '',
      frequencyError: false,
      experienceOptions: ["I'm new to this", 'I have'],
      frequencyOptions: ['Not sure yet', 'Part-time', 'As often as possible'],
    }
  },
  computed: {
    errors() {
      return this.experienceError || this.frequencyError
    },
  },
  methods: {
    checkExperience() {
      this.experienceError = this.experience == ''
    },
    checkFrequency() {
      this.frequencyError = this.frequency == ''
    },
    proceed() {
      this.checkExperience() || this.checkFrequency()

      if (!this.errors) this.updateAndContinue()
    },
    updateListing() {
      this.$store.dispatch('updateSettingsIntro', {
        experience: this.experience,
        frequency: this.frequency,
      })
    },
    updateAndContinue() {
      this.updateListing()

      this.next()
    },
    updateAndExit() {
      this.updateListing()

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('hostExperience'))
        this.experience = listing.hostExperience

      if (listing.hasOwnProperty('hostingFrequency'))
        this.frequency = listing.hostingFrequency
    },
  },
  created() {
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
