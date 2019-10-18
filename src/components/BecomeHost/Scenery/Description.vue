<template>
  <div class="flex flex-col">
    <p class="font-semibold text-2xl text-gray-900">
      Describe your place to guests
    </p>
    <p>
      Write a quick summary of your place. You can highlight what’s special
      about your space, the neighborhood, and how you’ll interact with guests.
    </p>

    <div class="flex flex-wrap">
      <div class="w-full px-3">
        <textarea
          rows="6"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
          :class="{ 'border-red-500 bg-red-100': descriptionError }"
          id="grid-description"
          placeholder="Describe the decor, light, what’s nearby, etc..."
          v-model="description"
        ></textarea>
        <p v-show="descriptionError" class="text-red-500 text-xs italic">
          We need a description for your place
        </p>
      </div>
    </div>

    <hr class="border-gray-300 my-6" />

    <p class="font-semibold text-2xl text-gray-900">
      Want to add more info? (optional)
    </p>
    <p>
      Use the additional fields below to share more details.
    </p>

    <div class="flex flex-wrap">
      <label
        class="block tracking-wide text-gray-700 font-bold mb-2"
        for="grid-space"
      >
        Your space
      </label>
      <p>
        Add other details that can help set guests’ expectations for their stay.
      </p>
      <div class="w-full px-3">
        <textarea
          rows="6"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
          id="grid-space"
          v-model="space"
        ></textarea>
      </div>
    </div>

    <hr class="border-gray-300 my-6" />

    <div class="flex flex-wrap">
      <label
        class="block tracking-wide text-gray-700 font-bold mb-2"
        for="grid-availability"
      >
        Your availability
      </label>
      <p>
        Let guests know how available you’ll be during their stay. For your
        safety, don’t share your phone number or email until you have a
        confirmed reservation.
      </p>
      <div class="w-full px-3">
        <textarea
          rows="6"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
          id="grid-availability"
          v-model="availability"
        ></textarea>
      </div>
    </div>

    <hr class="border-gray-300 my-6" />

    <div class="flex flex-wrap">
      <label
        class="block tracking-wide text-gray-700 font-bold mb-2"
        for="grid-neighborhood"
      >
        Your neighborhood
      </label>
      <p>
        Share what makes your neighborhood special, like a favorite coffee shop,
        park, or a unique landmark.
      </p>
      <div class="w-full px-3">
        <textarea
          rows="6"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
          id="grid-neighborhood"
          v-model="neighborhood"
        ></textarea>
      </div>
    </div>

    <hr class="border-gray-300 my-6" />

    <div class="flex flex-wrap mb-20">
      <label
        class="block tracking-wide text-gray-700 font-bold mb-2"
        for="grid-travel"
      >
        Getting around
      </label>
      <p>
        Add info about getting around your city or neighborhood, like nearby
        public transportation, driving tips, or good walking routes
      </p>
      <div class="w-full px-3">
        <textarea
          rows="6"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
          id="grid-travel"
          v-model="travel"
        ></textarea>
      </div>
    </div>

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
  data() {
    return {
      description: '',
      space: '',
      availability: '',
      neighborhood: '',
      travel: '',
      descriptionError: false,
    }
  },
  methods: {
    checkDescription() {
      // char limit 500
      this.descriptionError = this.description == ''
    },
    proceed() {
      this.checkDescription()

      if (!this.descriptionError) this.updateAndContinue()
    },
    updateListingState() {
      this.$store.dispatch('updateSummary', {
        description: this.description,
        spaceDescription: this.space,
        hostAvailability: this.availability,
        neighborhood: this.neighborhood,
        gettingAround: this.travel,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 2,
        page: step ? 10 : 9,
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

      if (listing.hasOwnProperty('description'))
        this.description = listing.description

      if (listing.hasOwnProperty('spaceDescription'))
        this.space = listing.spaceDescription

      if (listing.hasOwnProperty('hostAvailability'))
        this.availability = listing.hostAvailability

      if (listing.hasOwnProperty('neighborhood'))
        this.neighborhood = listing.neighborhood

      if (listing.hasOwnProperty('gettingAround'))
        this.travel = listing.gettingAround
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
